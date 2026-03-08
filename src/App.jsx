import React, { useState } from 'react';
import ElementPanel from './components/ElementPanel.jsx';
import Canvas from './components/Canvas.jsx';
import SaveDialog from './components/SaveDialog.jsx';
import Gallery from './components/Gallery.jsx';
import { useArrangement } from './hooks/useArrangement.js';

export default function App() {
  const [selectedElement, setSelectedElement] = useState(null);
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const {
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
  } = useArrangement();

  const handleSelectElement = (element) => {
    setSelectedElement(prev => prev?.id === element.id ? null : element);
  };

  const handleCancelPlacing = () => {
    setSelectedElement(null);
  };

  const handleAddElement = (elementData) => {
    addElement(elementData);
  };

  const handleSaveArrangement = (name) => {
    saveArrangement(name);
    setShowSaveDialog(false);
  };

  const handleLoadArrangement = (arrangement) => {
    loadArrangement(arrangement);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearCanvas = () => {
    if (elements.length === 0) return;
    clearCanvas();
    setSelectedElement(null);
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="app-header__inner">
          <div className="app-header__brand">
            <span className="app-header__kanji">生け花</span>
            <div className="app-header__text">
              <h1 className="app-header__title">Ikebana</h1>
              <p className="app-header__sub">Digital Flower Arranging</p>
            </div>
          </div>
          <nav className="app-header__nav">
            <a href="#gallery" className="app-header__link">Gallery</a>
            <span className="app-header__dot" aria-hidden="true">·</span>
            <span className="app-header__season">Spring</span>
          </nav>
        </div>
        <div className="app-header__rule" aria-hidden="true" />
      </header>

      {/* Main workspace */}
      <main className="app-main">
        <ElementPanel
          selectedElement={selectedElement}
          onSelectElement={handleSelectElement}
        />

        <Canvas
          placingElement={selectedElement}
          onCancelPlacing={handleCancelPlacing}
          elements={elements}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onAdd={handleAddElement}
          onUpdate={updateElement}
          onDelete={deleteElement}
          onBringForward={bringForward}
          onSendBack={sendBack}
          onClear={handleClearCanvas}
          onSave={() => setShowSaveDialog(true)}
        />
      </main>

      {/* Gallery */}
      <Gallery
        savedArrangements={savedArrangements}
        onLoad={handleLoadArrangement}
        onDelete={deleteArrangement}
      />

      {/* Footer */}
      <footer className="app-footer">
        <p className="app-footer__text">
          花道 · <em>Kadō</em> — the way of flowers
        </p>
        <p className="app-footer__sub">
          Every arrangement is a meditation. Every element, a choice.
        </p>
      </footer>

      {/* Save Dialog */}
      {showSaveDialog && (
        <SaveDialog
          elements={elements}
          onSave={handleSaveArrangement}
          onClose={() => setShowSaveDialog(false)}
        />
      )}
    </div>
  );
}
