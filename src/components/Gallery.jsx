import React, { useMemo } from 'react';
import { getElementById } from '../elements/index.jsx';

function ArrangementPreview({ arrangement }) {
  const { elements } = arrangement;

  // Compute bounding box and scale to fit preview
  const PREVIEW_W = 200;
  const PREVIEW_H = 180;

  const canvasWidth = 700;
  const canvasHeight = 560;

  const scale = Math.min(PREVIEW_W / canvasWidth, PREVIEW_H / canvasHeight) * 0.9;
  const offsetX = (PREVIEW_W - canvasWidth * scale) / 2;
  const offsetY = (PREVIEW_H - canvasHeight * scale) / 2;

  return (
    <div className="gallery-preview" style={{ width: PREVIEW_W, height: PREVIEW_H, position: 'relative', overflow: 'hidden' }}>
      {elements.map(el => {
        const def = getElementById(el.type);
        if (!def) return null;
        const Comp = def.component;
        const w = (el.scale || 1) * def.defaultWidth * scale;
        const h = (el.scale || 1) * def.defaultHeight * scale;
        const x = el.x * scale + offsetX - w / 2;
        const y = el.y * scale + offsetY - h / 2;

        return (
          <div
            key={el.id}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: w,
              height: h,
              transform: `rotate(${el.rotation || 0}deg)`,
              transformOrigin: 'center center',
              zIndex: el.zIndex || 1,
            }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox={def.viewBox}
              xmlns="http://www.w3.org/2000/svg"
            >
              <Comp seed={el.seed} ink="#1c1917" />
            </svg>
          </div>
        );
      })}
    </div>
  );
}

function GalleryCard({ arrangement, onLoad }) {
  const date = new Date(arrangement.savedAt);
  const dateStr = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <article className="gallery-card" onClick={() => onLoad(arrangement)}>
      <div className="gallery-card__preview">
        <ArrangementPreview arrangement={arrangement} />
      </div>
      <div className="gallery-card__meta">
        <h3 className="gallery-card__name">{arrangement.name}</h3>
        <time className="gallery-card__date" dateTime={date.toISOString()}>
          {dateStr}
        </time>
        <p className="gallery-card__count">
          {arrangement.elements.length} element{arrangement.elements.length !== 1 ? 's' : ''}
        </p>
      </div>
      <div className="gallery-card__hover-hint">Open arrangement →</div>
    </article>
  );
}

// Seed arrangements to populate gallery on first visit
const SEED_ARRANGEMENTS = [
  {
    id: 'seed-1',
    name: 'Morning Stillness',
    savedAt: new Date('2024-03-15').toISOString(),
    elements: [
      { id: 's1-1', type: 'bamboo', x: 340, y: 300, rotation: 5, scale: 1.3, seed: 42, zIndex: 1 },
      { id: 's1-2', type: 'chrysanthemum', x: 310, y: 150, rotation: -8, scale: 0.9, seed: 7, zIndex: 2 },
      { id: 's1-3', type: 'large-leaf', x: 420, y: 350, rotation: 25, scale: 1.1, seed: 15, zIndex: 1 },
      { id: 's1-4', type: 'grass', x: 260, y: 380, rotation: -15, scale: 0.85, seed: 33, zIndex: 2 },
    ],
  },
  {
    id: 'seed-2',
    name: 'First Plum',
    savedAt: new Date('2024-03-20').toISOString(),
    elements: [
      { id: 's2-1', type: 'branch', x: 350, y: 320, rotation: -3, scale: 1.2, seed: 91, zIndex: 1 },
      { id: 's2-2', type: 'plum-blossom', x: 280, y: 160, rotation: 12, scale: 0.95, seed: 55, zIndex: 2 },
      { id: 's2-3', type: 'plum-blossom', x: 400, y: 220, rotation: -5, scale: 0.75, seed: 63, zIndex: 2 },
      { id: 's2-4', type: 'round-leaf', x: 450, y: 310, rotation: 30, scale: 0.9, seed: 22, zIndex: 1 },
    ],
  },
  {
    id: 'seed-3',
    name: 'Water Garden',
    savedAt: new Date('2024-04-02').toISOString(),
    elements: [
      { id: 's3-1', type: 'stem', x: 360, y: 300, rotation: -2, scale: 1.4, seed: 11, zIndex: 1 },
      { id: 's3-2', type: 'lotus', x: 355, y: 145, rotation: 0, scale: 1.1, seed: 77, zIndex: 3 },
      { id: 's3-3', type: 'stem', x: 295, y: 310, rotation: 8, scale: 1.2, seed: 19, zIndex: 1 },
      { id: 's3-4', type: 'iris', x: 290, y: 145, rotation: -6, scale: 0.9, seed: 44, zIndex: 2 },
      { id: 's3-5', type: 'fern', x: 440, y: 280, rotation: 18, scale: 1.0, seed: 88, zIndex: 1 },
    ],
  },
  {
    id: 'seed-4',
    name: 'Autumn Study',
    savedAt: new Date('2024-04-10').toISOString(),
    elements: [
      { id: 's4-1', type: 'willow', x: 350, y: 200, rotation: -5, scale: 1.2, seed: 66, zIndex: 1 },
      { id: 's4-2', type: 'maple-branch', x: 290, y: 240, rotation: 10, scale: 1.0, seed: 34, zIndex: 2 },
      { id: 's4-3', type: 'wildflower', x: 430, y: 300, rotation: -12, scale: 0.85, seed: 50, zIndex: 2 },
      { id: 's4-4', type: 'grass', x: 370, y: 380, rotation: 5, scale: 1.1, seed: 28, zIndex: 1 },
    ],
  },
];

export default function Gallery({ savedArrangements, onLoad, onDelete }) {
  // Merge seed arrangements with user-saved ones
  const allArrangements = useMemo(() => {
    const userIds = new Set(savedArrangements.map(a => a.id));
    const seeds = SEED_ARRANGEMENTS.filter(a => !userIds.has(a.id));
    return [...savedArrangements, ...seeds].sort(
      (a, b) => new Date(b.savedAt) - new Date(a.savedAt)
    );
  }, [savedArrangements]);

  return (
    <section className="gallery" id="gallery">
      <div className="gallery__header">
        <div className="gallery__title-group">
          <h2 className="gallery__title">
            <span className="gallery__title-jp">花園</span>
            The Garden
          </h2>
          <p className="gallery__subtitle">
            Arrangements held in memory — each one a moment of composition
          </p>
        </div>
        {savedArrangements.length > 0 && (
          <p className="gallery__count">
            {savedArrangements.length} arrangement{savedArrangements.length !== 1 ? 's' : ''} saved
          </p>
        )}
      </div>

      <div className="gallery__grid">
        {allArrangements.map(arrangement => (
          <GalleryCard
            key={arrangement.id}
            arrangement={arrangement}
            onLoad={onLoad}
          />
        ))}
      </div>

      {savedArrangements.length === 0 && (
        <p className="gallery__empty-note">
          Seed arrangements shown above. Your saved compositions will appear here.
        </p>
      )}
    </section>
  );
}
