'use client';

import { useState } from 'react';
import { photos } from '@/lib/data';
import { LookCard } from './look-card';
import type { SavedLooksProps } from './screen-props';

export function LookGallery({ screen, saved, toggle }: SavedLooksProps & { screen: 'looks' | 'suggestions' }) {
  const [filter, setFilter] = useState('All');
  return (
    <>
      <div className="filter-row">{(screen === 'suggestions' ? ['All', 'Date night', 'Office', 'Weekend'] : ['All', 'My Looks', 'Try On', 'Inspiration', 'Saved this session']).map(f => <button className={filter === f ? 'active' : ''} onClick={() => setFilter(f)} key={f}>{f}</button>)}</div>
      <div className="looks-grid">{[photos.evening, photos.city, photos.classic, photos.coat].filter((_, i) => filter === 'Saved this session' ? saved.includes(String(i)) : filter === 'Try On' ? i < 2 : filter === 'My Looks' ? i % 2 === 0 : filter === 'Inspiration' ? i % 2 === 1 : true).map((src) => <LookCard saved={saved} toggle={toggle} src={src} name={['Evening elegance', 'Modern classic', 'City essentials', 'Quiet luxury'][[photos.evening, photos.city, photos.classic, photos.coat].indexOf(src)]} id={String([photos.evening, photos.city, photos.classic, photos.coat].indexOf(src))} key={src} />)}</div>{filter === 'Saved this session' && !saved.length && <p className="empty-state">Tap a heart on a look to save it here.</p>}</>
  );
}
