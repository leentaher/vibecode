import React, { useState, useRef, useEffect } from 'react';

export default function SaveDialog({ elements, onSave, onClose }) {
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);

    // Brief pause for feel
    await new Promise(r => setTimeout(r, 500));

    onSave(name.trim());
    setSaving(false);
  };

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="dialog-backdrop" onClick={handleBackdrop}>
      <div className="dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
        <div className="dialog__header">
          <h3 className="dialog__title" id="dialog-title">
            <span className="dialog__title-jp">保存</span>
            Save Arrangement
          </h3>
          <p className="dialog__subtitle">
            {elements.length} element{elements.length !== 1 ? 's' : ''} in this composition
          </p>
        </div>

        <form onSubmit={handleSubmit} className="dialog__form">
          <div className="dialog__field">
            <label htmlFor="arrangement-name" className="dialog__label">
              Name your arrangement
            </label>
            <input
              ref={inputRef}
              id="arrangement-name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Morning Light, Still Water..."
              className="dialog__input"
              maxLength={60}
              disabled={saving}
            />
          </div>

          <div className="dialog__actions">
            <button
              type="submit"
              className={`dialog__submit ${saving ? 'dialog__submit--saving' : ''}`}
              disabled={!name.trim() || saving}
            >
              {saving ? (
                <>
                  <span className="dialog__spinner" />
                  Preserving...
                </>
              ) : 'Pin this arrangement'}
            </button>
            <button
              type="button"
              className="dialog__cancel"
              onClick={onClose}
              disabled={saving}
            >
              Not yet
            </button>
          </div>
        </form>

        <button className="dialog__close" onClick={onClose} aria-label="Close">×</button>
      </div>
    </div>
  );
}
