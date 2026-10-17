'use client';

import type { SavedLooksProps, NotifyProps } from '../shared/screen-props';

export function StyleProfileScreen({ saved, toggle, notify }: SavedLooksProps & NotifyProps) {

  return (
    <div className="style-panel">
      <div className="eyebrow">UNIQUELY, UNMISTAKABLY YOU</div>
      <h2>Your style DNA</h2>
      <p>Based on your wardrobe, choices, and the things you love.</p>
      <div className="filter-row">{['Minimal', 'Classic', 'Elegant', 'Neutral tones', 'Modern'].map(x => <button className={!saved.includes(x) ? 'active' : ''} onClick={() => toggle(x)} key={x}>{x}</button>)}</div>
      <h3>Your color palette</h3>
      <div className="palette">{['#e4d0b7', '#a3a3a0', '#d5d4ce', '#78654e', '#c5a681'].map(c => <button key={c} style={{ background: c }} aria-label={`Select ${c}`} onClick={() => notify('Color preference updated')} />)}</div>
      <h3>Preferred brands</h3>
      <div className="brands">COS <span>ZARA</span>
        <span>THE ROW</span>
        <span>MANGO</span>
      </div>
      <button className="button" onClick={() => notify('Your style preferences have been updated')}>Save preferences</button>
    </div>
  );
}
