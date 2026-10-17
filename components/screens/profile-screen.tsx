'use client';

import Link from 'next/link';
import { Icon } from '../icon';

export function ProfileScreen() {

  return (
    <div className="profile-panel">
      <div className="profile-user">
        <span className="avatar">K</span>
        <div>
          <h2>Khushbu</h2>
          <p>Welcome to your personal style space.</p>
        </div>
      </div>{[['My style profile', '/style-profile', 'sparkle'], ['Wardrobe', '/wardrobe', 'wardrobe'], ['Saved looks', '/looks', 'heart'], ['Plan your look', '/plan', 'calendar'], ['Travel packing', '/packing', 'bag']].map(([label, url, icon]) => <Link className="settings-row" href={url} key={url}>
        <Icon name={icon} />{label}<Icon name="arrow" size={18} />
      </Link>)}<label className="settings-row">
        <Icon name="bell" />Style reminders<input type="checkbox" defaultChecked />
      </label>
      <Link className="settings-row" href="/welcome">
        <Icon name="profile" />Welcome to FORME<Icon name="arrow" size={18} />
      </Link>
    </div>
  );
}
