import React, { useCallback, useRef, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { getElementById } from '../elements/index.jsx';
import CanvasElement from './CanvasElement.jsx';

function GhostElement({ element, position, canvasRect }) {
  const def = getElementById(element.id);
  if (!def || !position) return null;

  const Comp = def.component;
  const w = def.defaultWidth;
  const h = def.defaultHeight;
  const x = position.x - canvasRect.left - w / 2;
  const y = position.y - canvasRect.top - h / 2;

  return (
    <div
      className="canvas-ghost"
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: w,
        height: h,
        pointerEvents: 'none',
        opacity: 0.45,
        transform: 'scale(1.03)',
        transition: 'none',
      }}
    >
      <svg width="100%" height="100%" viewBox={def.viewBox} xmlns="http://www.w3.org/2000/svg">
        <Comp seed={element.id.charCodeAt(0) % 20 + 1} ink="#1c1917" />
      </svg>
    </div>
  );
}

export default function Canvas({
  placingElement,
  onCancelPlacing,
  elements,
  selectedId,
  onSelect,
  onAdd,
  onUpdate,
  onDelete,
  onBringForward,
  onSendBack,
  onClear,
  onSave,
}) {
  const canvasRef = useRef(null);
  const [ghostPos, setGhostPos] = useState(null);
  const [canvasRect, setCanvasRect] = useState(null);
  const [placingAnim, setPlacingAnim] = useState(null);

  useEffect(() => {
    const update = () => {
      if (canvasRef.current) {
        setCanvasRect(canvasRef.current.getBoundingClientRect());
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Track ghost while placing
  const handleMouseMove = useCallback((e) => {
    if (placingElement) {
      setGhostPos({ x: e.clientX, y: e.clientY });
    }
  }, [placingElement]);

  const handleMouseLeave = useCallback(() => {
    setGhostPos(null);
  }, []);

  const handleCanvasClick = useCallback((e) => {
    if (e.target.closest('[data-handle]')) return;

    if (placingElement) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const def = getElementById(placingElement.id);
      const seed = Math.floor(Math.random() * 200) + 1;

      const newElement = {
        id: uuid(),
        type: placingElement.id,
        x,
        y,
        rotation: 0,
        scale: 1,
        seed,
        zIndex: elements.length + 1,
      };

      onAdd(newElement);
      setPlacingAnim({ id: newElement.id, x, y });
      setTimeout(() => setPlacingAnim(null), 600);
    } else {
      onSelect(null);
    }
  }, [placingElement, elements.length, onAdd, onSelect]);

  // Keyboard handling
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        if (placingElement) onCancelPlacing();
        else onSelect(null);
      }
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId) {
        const target = e.target;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;
        onDelete(selectedId);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [placingElement, selectedId, onCancelPlacing, onSelect, onDelete]);

  const sortedElements = [...elements].sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));

  return (
    <div className="canvas-wrapper">
      {/* Canvas toolbar */}
      <div className="canvas-toolbar">
        <div className="canvas-toolbar__left">
          {placingElement && (
            <span className="canvas-status">
              <span className="canvas-status__dot" />
              Placing {placingElement.label.split(' ').slice(1).join(' ')} — click to set, Esc to cancel
            </span>
          )}
          {!placingElement && elements.length === 0 && (
            <span className="canvas-hint">Select an element from the panel to begin your arrangement</span>
          )}
          {!placingElement && elements.length > 0 && !selectedId && (
            <span className="canvas-hint">Click an element to select · drag to move · scroll to explore</span>
          )}
        </div>
        <div className="canvas-toolbar__right">
          {elements.length > 0 && (
            <>
              <button className="toolbar-btn" onClick={onSave}>
                <span>Save arrangement</span>
              </button>
              <button className="toolbar-btn toolbar-btn--ghost" onClick={onClear}>
                Clear
              </button>
            </>
          )}
        </div>
      </div>

      {/* The canvas */}
      <div
        ref={canvasRef}
        className={`canvas ${placingElement ? 'canvas--placing' : ''}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleCanvasClick}
      >
        {/* Background: subtle kenzan (flower frog) reference — a single centered mark */}
        {elements.length === 0 && (
          <div className="canvas-empty">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="18" stroke="#c8bfb0" strokeWidth="0.75" />
              <circle cx="24" cy="24" r="10" stroke="#c8bfb0" strokeWidth="0.5" />
              <circle cx="24" cy="24" r="2" fill="#c8bfb0" />
              {Array.from({ length: 12 }, (_, i) => {
                const a = (i * 30) * Math.PI / 180;
                return (
                  <line key={i}
                    x1={24 + Math.cos(a) * 12} y1={24 + Math.sin(a) * 12}
                    x2={24 + Math.cos(a) * 22} y2={24 + Math.sin(a) * 22}
                    stroke="#c8bfb0" strokeWidth="0.5"
                  />
                );
              })}
            </svg>
            <p className="canvas-empty__text">Your arrangement begins with a single element</p>
          </div>
        )}

        {/* Placed elements */}
        {sortedElements.map(el => (
          <CanvasElement
            key={el.id}
            element={el}
            isSelected={el.id === selectedId}
            onSelect={onSelect}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onBringForward={onBringForward}
            onSendBack={onSendBack}
          />
        ))}

        {/* Ghost while placing */}
        {placingElement && ghostPos && canvasRect && (
          <GhostElement
            element={placingElement}
            position={ghostPos}
            canvasRect={canvasRect}
          />
        )}

        {/* Placement ripple animation */}
        {placingAnim && (
          <div
            className="placement-ripple"
            style={{
              left: placingAnim.x,
              top: placingAnim.y,
              position: 'absolute',
              pointerEvents: 'none',
            }}
          />
        )}
      </div>
    </div>
  );
}
