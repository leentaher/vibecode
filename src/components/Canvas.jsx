import React, { useCallback, useRef, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { getElementById } from '../elements/index.jsx';
import CanvasElement from './CanvasElement.jsx';

// Traditional celadon ikebana vessel — modeled after the classic suiban/vase forms
function IkebanaVessel() {
  return (
    <div style={{
      position: 'absolute',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      pointerEvents: 'none',
      userSelect: 'none',
      zIndex: 0,
    }}>
      <svg width="140" height="130" viewBox="-70 -110 140 130" fill="none" xmlns="http://www.w3.org/2000/svg" opacity="0.28">
        {/* Pedestal table — disk top */}
        <ellipse cx="0" cy="-14" rx="62" ry="8" stroke="#8EAAA0" strokeWidth="0.9" />
        <ellipse cx="0" cy="-14" rx="60" ry="6" stroke="#8EAAA0" strokeWidth="0.4" opacity="0.5" />
        {/* Table edge band */}
        <path d="M -62 -14 L -62 -8 Q 0 -2 62 -8 L 62 -14" stroke="#8EAAA0" strokeWidth="0.6" opacity="0.4" />
        {/* Table column */}
        <rect x="-7" y="-14" width="14" height="22" rx="2" stroke="#8EAAA0" strokeWidth="0.8" opacity="0.6" />
        {/* Column decorative band */}
        <line x1="-7" y1="-4" x2="7" y2="-4" stroke="#8EAAA0" strokeWidth="0.5" opacity="0.4" />
        {/* Base feet — tripod */}
        <line x1="-4" y1="8" x2="-10" y2="20" stroke="#8EAAA0" strokeWidth="0.9" strokeLinecap="round" />
        <line x1="0" y1="8" x2="0" y2="21" stroke="#8EAAA0" strokeWidth="0.9" strokeLinecap="round" />
        <line x1="4" y1="8" x2="10" y2="20" stroke="#8EAAA0" strokeWidth="0.9" strokeLinecap="round" />
        {/* Foot ornaments */}
        <circle cx="-10" cy="20" r="2" stroke="#8EAAA0" strokeWidth="0.5" opacity="0.5" />
        <circle cx="0" cy="21" r="2" stroke="#8EAAA0" strokeWidth="0.5" opacity="0.5" />
        <circle cx="10" cy="20" r="2" stroke="#8EAAA0" strokeWidth="0.5" opacity="0.5" />

        {/* Vase body — bulbous, tapers to neck */}
        <path d="M -26 -52 C -30 -42 -30 -26 -24 -18 L -18 -14 L 18 -14 L 24 -18 C 30 -26 30 -42 26 -52 Z"
          stroke="#8EAAA0" strokeWidth="0.9" />
        {/* Vase body inner shading lines */}
        <path d="M -24 -46 C -26 -36 -26 -24 -20 -18" stroke="#8EAAA0" strokeWidth="0.4" opacity="0.4" />
        <path d="M 24 -46 C 26 -36 26 -24 20 -18" stroke="#8EAAA0" strokeWidth="0.4" opacity="0.4" />
        {/* Decorative body band */}
        <path d="M -29 -36 C -14 -30 14 -30 29 -36" stroke="#8EAAA0" strokeWidth="0.5" opacity="0.35" />
        <path d="M -29 -30 C -14 -24 14 -24 29 -30" stroke="#8EAAA0" strokeWidth="0.4" opacity="0.25" />
        {/* Cross-hatch pattern on lower body (like image 1 vessel) */}
        {[-22,-16,-10,-4,4,10,16,22].map((x, i) => (
          <line key={`h${i}`} x1={x} y1="-20" x2={x} y2="-14" stroke="#8EAAA0" strokeWidth="0.3" opacity="0.3" />
        ))}
        {/* Neck */}
        <rect x="-10" y="-72" width="20" height="20" rx="1" stroke="#8EAAA0" strokeWidth="0.8" />
        {/* Neck decorative ring */}
        <line x1="-10" y1="-66" x2="10" y2="-66" stroke="#8EAAA0" strokeWidth="0.4" opacity="0.4" />
        <line x1="-10" y1="-60" x2="10" y2="-60" stroke="#8EAAA0" strokeWidth="0.4" opacity="0.4" />
        {/* Neck to body shoulder */}
        <path d="M -10 -52 C -14 -54 -16 -56 -10 -52" stroke="#8EAAA0" strokeWidth="0.5" opacity="0.3" />
        <path d="M 10 -52 C 14 -54 16 -56 10 -52" stroke="#8EAAA0" strokeWidth="0.5" opacity="0.3" />
        {/* Vase mouth rim */}
        <ellipse cx="0" cy="-72" rx="11" ry="3" stroke="#8EAAA0" strokeWidth="0.8" />
        <ellipse cx="0" cy="-72" rx="9" ry="2" stroke="#8EAAA0" strokeWidth="0.4" opacity="0.4" />
        {/* Side handles / ears */}
        <path d="M -26 -44 C -36 -44 -36 -32 -26 -32" stroke="#8EAAA0" strokeWidth="0.7" opacity="0.5" />
        <path d="M 26 -44 C 36 -44 36 -32 26 -32" stroke="#8EAAA0" strokeWidth="0.7" opacity="0.5" />
      </svg>
    </div>
  );
}

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
        {/* Vessel anchor — always visible at canvas bottom center */}
        <IkebanaVessel />

        {/* Empty state hint */}
        {elements.length === 0 && (
          <div className="canvas-empty">
            <p className="canvas-empty__text">Select an element, then place it above the vessel</p>
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
