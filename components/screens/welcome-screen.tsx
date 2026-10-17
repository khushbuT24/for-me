'use client';

import { Icon } from '../icon';
import { photos } from '@/lib/data';
import { Photo } from '../shared/photo';
import { Button } from '../shared/button';

export function WelcomeScreen() {

  return (
    <div className="welcome">
      <Photo src={photos.classic} alt="Discover your personal style" />
      <div>
        <span className="wordmark">FORME</span>
        <h2>Your personal style,<br />intelligently curated.</h2>
        <Button href="/">Get started <Icon name="arrow" size={18} />
        </Button>
        <p>Your wardrobe. Your world. Your style.</p>
      </div>
    </div>
  );
}
