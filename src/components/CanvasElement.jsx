import React, { useRef, useCallback, useState } from 'react';
import { getElementById } from '../elements/index.jsx';

const HANDLE_SIZE = 18;

export default function CanvasElement({
  element,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
  onBringForward,
  onSendBack,
}) {
  const def = getElementById(element.type);
  if (!def) return null;

  const Comp = def.component;
  const containerRef = useRef(null);
  const dragStartRef = useRef(null);
  const rotateStartRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const w = (element.scale || 1) * def.defaultWidth;
  const h = (element.scale || 1) * def.defaultHeight;

  // ── Drag to move ─────────────────────────────────────────────
  const handleMouseDown = useCallback((e) => {
    if (e.target.closest('[data-handle]')) return;
    e.stopPropagation();
    onSelect(element.id);

    const startX = e.clientX;
    const startY = e.clientY;
    const origX = element.x;
    const origY = element.y;

    dragStartRef.current = { startX, startY, origX, origY };
    setIsDragging(false);

    const onMove = (me) => {
      const dx = me.clientX - startX;
      const dy = me.clientY - startY;
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
        setIsDragging(true);
        onUpdate(element.id, { x: origX + dx, y: origY + dy });
      }
    };

    const onUp = () => {
      setIsDragging(false);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, [element, onSelect, onUpdate]);

  // ── Rotate handle ─────────────────────────────────────────────
  const handleRotateMouseDown = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();

    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const startAngle = Math.atan2(e.clientY - cy, e.clientX - cx);
    const origRotation = element.rotation || 0;

    const onMove = (me) => {
      const angle = Math.atan2(me.clientY - cy, me.clientX - cx);
      const delta = (angle - startAngle) * (180 / Math.PI);
      onUpdate(element.id, { rotation: origRotation + delta });
    };

    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, [element, onUpdate]);

  // ── Scale handle ──────────────────────────────────────────────
  const handleScaleMouseDown = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();

    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const startDist = Math.hypot(e.clientX - cx, e.clientY - cy);
    const origScale = element.scale || 1;

    const onMove = (me) => {
      const dist = Math.hypot(me.clientX - cx, me.clientY - cy);
      const newScale = Math.max(0.2, Math.min(4, origScale * (dist / startDist)));
      onUpdate(element.id, { scale: newScale });
    };

    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, [element, onUpdate]);

  return (
    <div
      ref={containerRef}
      className={`canvas-element ${isSelected ? 'canvas-element--selected' : ''} ${isDragging ? 'canvas-element--dragging' : ''}`}
      style={{
        position: 'absolute',
        left: element.x - w / 2,
        top: element.y - h / 2,
        width: w,
        height: h,
        transform: `rotate(${element.rotation || 0}deg)`,
        transformOrigin: 'center center',
        zIndex: element.zIndex || 1,
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
      }}
      onMouseDown={handleMouseDown}
    >
      {/* The actual SVG element */}
      <svg
        width="100%"
        height="100%"
        viewBox={def.viewBox}
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', pointerEvents: 'none' }}
      >
        <Comp seed={element.seed} ink="#1c1917" />
      </svg>

      {/* Selection overlay */}
      {isSelected && (
        <>
          {/* Selection border */}
          <div className="canvas-element__selection-border" />

          {/* Rotate handle — top center */}
          <div
            className="canvas-element__handle canvas-element__handle--rotate"
            data-handle="rotate"
            onMouseDown={handleRotateMouseDown}
            title="Rotate"
            style={{
              position: 'absolute',
              top: -HANDLE_SIZE - 12,
              left: '50%',
              transform: 'translateX(-50%)',
              width: HANDLE_SIZE,
              height: HANDLE_SIZE,
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4.5 10.5A7.5 7.5 0 0 1 12 4.5v0a7.5 7.5 0 0 1 7.5 7.5" strokeLinecap="round" />
              <path d="M19.5 10.5l0 -4 -4 0" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Connector line to rotate handle */}
          <div style={{
            position: 'absolute',
            top: -12,
            left: '50%',
            width: 1,
            height: 12,
            background: 'var(--accent)',
            transform: 'translateX(-50%)',
            opacity: 0.5,
            pointerEvents: 'none',
          }} />

          {/* Scale handle — bottom right */}
          <div
            className="canvas-element__handle canvas-element__handle--scale"
            data-handle="scale"
            onMouseDown={handleScaleMouseDown}
            title="Scale"
            style={{
              position: 'absolute',
              bottom: -HANDLE_SIZE / 2,
              right: -HANDLE_SIZE / 2,
              width: HANDLE_SIZE,
              height: HANDLE_SIZE,
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 20l6-6M20 4l-6 6M14 4h6v6M4 14v6h6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Action buttons */}
          <div className="canvas-element__actions">
            <button
              className="element-action-btn"
              data-handle="action"
              onClick={(e) => { e.stopPropagation(); onBringForward(element.id); }}
              title="Bring forward"
            >↑</button>
            <button
              className="element-action-btn"
              data-handle="action"
              onClick={(e) => { e.stopPropagation(); onSendBack(element.id); }}
              title="Send back"
            >↓</button>
            <button
              className="element-action-btn element-action-btn--delete"
              data-handle="action"
              onClick={(e) => { e.stopPropagation(); onDelete(element.id); }}
              title="Remove"
            >×</button>
          </div>
        </>
      )}
    </div>
  );
}
