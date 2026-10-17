'use client';

import { useState } from 'react';
import { Icon } from '../icon';
import { categories } from '@/lib/data';
import { Photo } from '../shared/photo';
import type { SavedLooksProps, NotifyProps } from '../shared/screen-props';

export function MixMatchScreen({ saved, toggle, notify }: SavedLooksProps & NotifyProps) {
  const [filter, setFilter] = useState('All');
  return (
    <>
      <div className="filter-row">{['All', 'Tops', 'Bottoms', 'Shoes', 'Accessories'].map(f => <button key={f} className={filter === f ? 'active' : ''} onClick={() => setFilter(f)}>{f}</button>)}</div>
      <div className="mix-grid">{categories.filter(([name]) => filter === 'All' || name === filter).map(([name, , src]) => <button key={name} className={`mix-item ${saved.includes(name) ? 'picked' : ''}`} onClick={() => toggle(name)}>
        <Photo src={src} alt={name} />
        <span>{name}{saved.includes(name) && <Icon name="check" size={18} />}</span>
      </button>)}</div>
      <div className="mix-bottom">
        <p>{saved.length} pieces selected. Make it your own.</p>
        <button className="button" onClick={() => notify(saved.length ? 'Your combination has been saved' : 'Select a few pieces to create your look')}>Save to looks</button>
      </div>
    </>
  );
}
