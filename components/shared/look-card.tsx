import Link from 'next/link';
import { Icon } from '../icon';
import { Photo } from './photo';

export function LookCard({ src, name, id, saved, toggle }: { src: string; name: string; id: string; saved: string[]; toggle: (id: string) => void }) {
  return <article className="look-card">
    <Link href="/outfit">
      <Photo src={src} alt={name} />
    </Link>
    <button className={`favorite ${saved.includes(id) ? 'selected' : ''}`} aria-label={`Save ${name}`} onClick={() => toggle(id)}>
      <Icon name="heart" size={18} />
    </button>
    <div className="look-copy">
      <div>
        <h3>{name}</h3>
        <p>Considered. Effortless. You.</p>
      </div>
      <Link href="/try-on" aria-label="Try on outfit">
        <Icon name="arrow" />
      </Link>
    </div>
  </article>
}
