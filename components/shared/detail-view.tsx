'use client';

import { Icon } from '../icon';
import { photos } from '@/lib/data';
import { Photo } from './photo';
import { Button } from './button';
import { Tags } from './tags';
import type { NotifyProps } from './screen-props';

export function DetailView({ screen, notify }: NotifyProps & { screen: 'item' | 'outfit' }) {

  return (
    <div className="detail-grid">
      <Photo className="detail-photo" src={screen === 'item' ? photos.shirt : photos.city} alt={screen === 'item' ? 'White linen shirt' : 'Modern classic outfit'} />
      <div className="detail-copy">
        <div className="eyebrow">A TIMELESS ESSENTIAL</div>
        <h2>{screen === 'item' ? 'The linen shirt' : 'Modern classic'}</h2>
        <Tags items={screen === 'item' ? ['Top', 'Linen', 'White', 'Oversized'] : ['Work', 'Day', 'Minimal']} />
        <div className="swatches">
          <span />
          <span />
        </div>
        <p>A breathable, beautifully simple essential. Effortlessly versatile, thoughtfully styled for your everyday.</p>
        <dl>
          <dt>Season</dt>
          <dd>Spring / Summer</dd>
          <dt>Style</dt>
          <dd>Minimal / Elegant</dd>
          <dt>Occasion</dt>
          <dd>Casual / Smart casual</dd>
        </dl>
        <button className="button" onClick={() => notify(screen === 'item' ? 'Linen shirt added to your wardrobe' : 'Look saved to your collection')}>
          <Icon name="check" size={18} />{screen === 'item' ? 'Add to wardrobe' : 'Save look'}</button>
        <Button href="/try-on" secondary>Try this look <Icon name="arrow" size={18} />
        </Button>
      </div>
    </div>
  );
}
