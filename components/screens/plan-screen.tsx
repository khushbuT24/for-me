'use client';

import { Icon } from '../icon';
import { photos } from '@/lib/data';
import { Photo } from '../shared/photo';

export function PlanScreen() {

  return (
    <div className="plan-layout">
      <form className="plan-form" action="/suggestions">
        <div className="eyebrow">DRESS FOR THE MOMENT</div>
        <h2>A little planning.<br />An effortless entrance.</h2>{[['Occasion', ['Office', 'Date night', 'Weekend', 'Celebration']], ['Location', ['Bangalore', 'Mumbai', 'Delhi', 'Anywhere']], ['Weather', ['28°C · Partly cloudy', 'Warm & sunny', 'Cool & breezy', 'Rainy day']], ['Style vibe', ['Minimal / Elegant', 'Classic', 'Modern', 'Relaxed']]].map(([label, options]) => <label key={String(label)}>{label}<select>{(options as string[]).map(o => <option key={o}>{o}</option>)}</select>
        </label>)}<label>Date & time<input type="datetime-local" defaultValue="2026-09-26T19:00" required />
        </label>
        <button className="button">Get suggestions <Icon name="sparkle" size={18} />
        </button>
      </form>
      <Photo src={photos.city} alt="An effortlessly styled city look" />
    </div>
  );
}
