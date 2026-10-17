'use client';

import { useState } from 'react';
import { Icon } from '../icon';
import { photos } from '@/lib/data';
import { Photo } from '../shared/photo';
import { Button } from '../shared/button';
import type { NotifyProps } from '../shared/screen-props';

export function TryOnScreen({ notify }: NotifyProps) {
  const [pose, setPose] = useState(false);
  return (
    <div className="tryon-layout">
      <div className="tryon-image">
        <Photo src={pose ? photos.classic : photos.city} alt="Outfit style preview" />
        <span className="image-label">STYLE PREVIEW</span>
      </div>
      <div className="tryon-controls">
        <div className="eyebrow">THE LOOK, BROUGHT TO LIFE</div>
        <h2>See yourself<br />in something new.</h2>
        <p>An inspiration preview of your next favorite combination.</p>
        <div className="product-row">{[photos.shirt, photos.bag, photos.shoes].map(src => <Photo key={src} src={src} alt="Outfit item" />)}</div>
        <Button href="/mix-match" secondary>Swap outfit</Button>
        <button className="button secondary" onClick={() => setPose(!pose)}>Change look</button>
        <button className="button" onClick={() => notify('Your look has been saved')}>Save look <Icon name="heart" size={17} />
        </button>
      </div>
    </div>
  );
}
