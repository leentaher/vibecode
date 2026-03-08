import { useState, useCallback, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

const STORAGE_KEY = 'ikebana-arrangements';

function loadArrangements() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveArrangementsToStorage(arrangements) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arrangements));
  } catch {
    // Storage full or unavailable
  }
}

export function useArrangement() {
  const [elements, setElements] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [savedArrangements, setSavedArrangements] = useState(() => loadArrangements());

  // Persist saved arrangements
  useEffect(() => {
    saveArrangementsToStorage(savedArrangements);
  }, [savedArrangements]);

  const addElement = useCallback((element) => {
    setElements(prev => [...prev, element]);
    setSelectedId(element.id);
  }, []);

  const updateElement = useCallback((id, updates) => {
    setElements(prev => prev.map(el => el.id === id ? { ...el, ...updates } : el));
  }, []);

  const deleteElement = useCallback((id) => {
    setElements(prev => prev.filter(el => el.id !== id));
    setSelectedId(prev => prev === id ? null : prev);
  }, []);

  const bringForward = useCallback((id) => {
    setElements(prev => {
      const maxZ = Math.max(...prev.map(el => el.zIndex || 1));
      return prev.map(el => el.id === id ? { ...el, zIndex: maxZ + 1 } : el);
    });
  }, []);

  const sendBack = useCallback((id) => {
    setElements(prev => {
      const minZ = Math.min(...prev.map(el => el.zIndex || 1));
      return prev.map(el => el.id === id ? { ...el, zIndex: Math.max(0, minZ - 1) } : el);
    });
  }, []);

  const clearCanvas = useCallback(() => {
    setElements([]);
    setSelectedId(null);
  }, []);

  const saveArrangement = useCallback((name) => {
    const arrangement = {
      id: uuid(),
      name,
      savedAt: new Date().toISOString(),
      elements: [...elements],
    };
    setSavedArrangements(prev => [arrangement, ...prev]);
    return arrangement;
  }, [elements]);

  const loadArrangement = useCallback((arrangement) => {
    setElements(arrangement.elements.map(el => ({ ...el })));
    setSelectedId(null);
  }, []);

  const deleteArrangement = useCallback((id) => {
    setSavedArrangements(prev => prev.filter(a => a.id !== id));
  }, []);

  return {
    elements,
    selectedId,
    setSelectedId,
    addElement,
    updateElement,
    deleteElement,
    bringForward,
    sendBack,
    clearCanvas,
    savedArrangements,
    saveArrangement,
    loadArrangement,
    deleteArrangement,
  };
}
