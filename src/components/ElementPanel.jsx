import React, { useState } from 'react';
import { ELEMENTS, CATEGORIES } from '../elements/index.jsx';

const ElementCard = ({ element, isSelected, onSelect }) => {
  const Comp = element.component;
  const [hovered, setHovered] = useState(false);

  return (
    <button
      className={`element-card ${isSelected ? 'element-card--selected' : ''} ${hovered ? 'element-card--hovered' : ''}`}
      onClick={() => onSelect(element)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={element.hint}
      aria-label={element.label}
      aria-pressed={isSelected}
    >
      <div className="element-card__preview">
        <svg
          width="100%"
          height="100%"
          viewBox={element.viewBox}
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'block' }}
        >
          <Comp seed={element.id.charCodeAt(0) % 20 + 1} ink="#1c1917" />
        </svg>
      </div>
      <span className="element-card__label">
        {element.label.split(' ').slice(1).join(' ')}
      </span>
      <span className="element-card__kanji">
        {element.label.split(' ')[0]}
      </span>
    </button>
  );
};

export default function ElementPanel({ selectedElement, onSelectElement }) {
  const [activeCategory, setActiveCategory] = useState('flowers');

  const filteredElements = ELEMENTS.filter(el => el.category === activeCategory);

  return (
    <aside className="element-panel">
      <div className="element-panel__header">
        <h2 className="element-panel__title">
          <span className="element-panel__title-jp">花材</span>
          <span className="element-panel__title-en">Elements</span>
        </h2>
        <p className="element-panel__instruction">
          {selectedElement
            ? `${selectedElement.label.split(' ').slice(1).join(' ')} selected — click canvas to place`
            : 'Select an element to place'}
        </p>
      </div>

      <nav className="element-panel__categories">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={`category-tab ${activeCategory === cat.id ? 'category-tab--active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </nav>

      <div className="element-panel__grid">
        {filteredElements.map(el => (
          <ElementCard
            key={el.id}
            element={el}
            isSelected={selectedElement?.id === el.id}
            onSelect={onSelectElement}
          />
        ))}
      </div>

      <div className="element-panel__footer">
        <p className="element-panel__quote">
          「空を活かす」
        </p>
        <p className="element-panel__quote-en">
          Let emptiness live
        </p>
      </div>
    </aside>
  );
}
