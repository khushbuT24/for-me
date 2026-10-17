'use client';

import Link from 'next/link';
import { Icon } from '../icon';
import { photos } from '@/lib/data';
import { Photo } from '../shared/photo';
import { Button } from '../shared/button';
import { LookCard } from '../shared/look-card';
import type { SavedLooksProps } from '../shared/screen-props';

export function HomeScreen({ saved, toggle }: SavedLooksProps) {

  return (
    <div className="page home-page">
      <div className="page-heading">
        <div>
          <div className="eyebrow">A LITTLE INSPIRATION, JUST FOR YOU</div>
          <h1>Good evening, Khushbu<span className="heading-spark">✧</span>
          </h1>
          <p>Let’s make getting dressed the best part of your day.</p>
        </div>
        <span className="date-label">SATURDAY, SEPTEMBER 26</span>
      </div>
      <div className="home-grid">
        <section className="hero">
          <Photo src={photos.hero} alt="Personal style inspiration in the city" />
          <div className="hero-shade" />
          <div className="hero-content">
            <span className="eyebrow">LESS EFFORT. MORE YOU.</span>
            <h2>Your next great look<br />is already in your wardrobe.</h2>
            <p>A fresh perspective on the pieces you love.<br />Styled for your life, inspired by you.</p>
            <Button href="/stylist">Find my look <Icon name="arrow" size={18} />
            </Button>
          </div>
          <span className="hero-caption">THE EVERYDAY EDIT — 01</span>
        </section>
        <section className="daily-note">
          <div className="eyebrow">
            <Icon name="sparkle" size={17} /> YOUR DAILY STYLE NOTE</div>
          <span className="quote-mark">“</span>
          <h2>Style is a way to say<br />who you are without<br />having to speak.</h2>
          <p>— RACHEL ZOE</p>
          <div className="note-rule" />
          <div className="note-bottom">
            <span>A little confidence.<br />A lot of you.</span>
            <span className="drawn-star">✳</span>
          </div>
        </section>
      </div>
      <div className="quick-actions">{[['sparkle', 'Get outfit ideas', 'A look for every occasion', '/plan'], ['profile', 'Ask AI stylist', 'A little advice. A lot of style.', '/stylist'], ['upload', 'Upload clothes', 'Make room for possibilities', '/upload'], ['wardrobe', 'Virtual try-on', 'See it. Style it. Make it yours.', '/try-on']].map(([icon, label, desc, url]) => <Link className="action-card" key={url} href={url}>
        <span className="action-icon">
          <Icon name={icon} />
        </span>
        <div>
          <h3>{label}</h3>
          <p>{desc}</p>
        </div>
        <Icon name="arrow" size={18} />
      </Link>)}</div>
      <div className="section-heading">
        <div>
          <div className="eyebrow">CURATED FOR YOUR EVERYDAY</div>
          <h2>Today’s inspiration</h2>
        </div>
        <Link href="/looks">Explore all looks <Icon name="arrow" size={17} />
        </Link>
      </div>
      <div className="inspiration-grid">
        <LookCard saved={saved} toggle={toggle} src={photos.evening} name="Effortless evening" id="evening" />
        <LookCard saved={saved} toggle={toggle} src={photos.city} name="The modern classic" id="classic" />
        <LookCard saved={saved} toggle={toggle} src={photos.classic} name="Off-duty, elevated" id="casual" />
        <Link href="/mix-match" className="closet-card">
          <div className="eyebrow">YOUR WARDROBE, REIMAGINED</div>
          <Icon name="wardrobe" size={38} />
          <h2>Old favorites.<br />New possibilities.</h2>
          <p>Rediscover what you own with<br />combinations you haven’t tried.</p>
          <span>Let’s mix & match <Icon name="arrow" size={18} />
          </span>
        </Link>
      </div>
      <footer>THOUGHTFULLY STYLED. ENTIRELY YOU.<span>F O R M E</span>
      </footer>
    </div>
  );
}
