'use client';

import { photos } from '@/lib/data';
import { Photo } from '../shared/photo';

export function PackingScreen() {

  return (
    <div className="plan-layout">
      <div>
        <div className="eyebrow">YOUR NEXT CHAPTER</div>
        <h2>Bali, beautifully packed.</h2>
        <p>7 days · 28°C · A little escape</p>
        <div className="section-heading">
          <h3>Your packing list</h3>
          <span>7 essentials</span>
        </div>{['Linen shirt', 'Tailored trousers', 'Evening dress', 'Everyday sneakers', 'Black heels', 'Leather bag', 'Light jacket'].map(item => <label className="packing-item" key={item}>
          <input type="checkbox" />{item}</label>)}<button className="button" onClick={() => window.print()}>Print / save packing list</button>
      </div>
      <Photo src={photos.travel} alt="Scenic lake travel destination" />
    </div>
  );
}
