'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Icon } from '../icon';
import { Photo } from '../shared/photo';
import { api, wardrobeCategories, wardrobePath, type WardrobeItem } from '@/lib/wardrobe-api';

export function WardrobeScreen() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [items, setItems] = useState<WardrobeItem[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reload, setReload] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      setError('');
      try {
        const query = new URLSearchParams({ q: search, limit: '24', offset: String(page * 24) });
        if (category) query.set('category', category);
        const [result, overview] = await Promise.all([
          api<{ items: WardrobeItem[]; total: number }>(wardrobePath(`/items?${query}`), { signal: controller.signal }),
          api<{ categories: { category: string; count: number }[] }>(wardrobePath('/categories'), { signal: controller.signal }),
        ]);
        if (controller.signal.aborted) return;
        setItems(result.items);
        setTotal(result.total);
        setCounts(Object.fromEntries(overview.categories.map(c => [c.category, c.count])));
      } catch (err) {
        if (!controller.signal.aborted) setError(err instanceof Error ? err.message : 'Could not load your wardrobe.');
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 180);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [search, category, page, reload]);

  return <>
    <label className="search"><Icon name="search" size={19} />
      <input aria-label="Search your wardrobe" placeholder="Search names, colours, styles…" value={search}
        onChange={event => { setSearch(event.target.value); setPage(0); }} />
    </label>
    <div className="wardrobe-filters" aria-label="Wardrobe categories">
      <button aria-pressed={!category} onClick={() => { setCategory(''); setPage(0); }}>All pieces</button>
      {wardrobeCategories.map(([id, label]) => <button key={id} aria-pressed={category === id}
        onClick={() => { setCategory(id); setPage(0); }}>{label} <span>{counts[id] ?? 0}</span></button>)}
    </div>
    {error ? <div role="alert" className="wardrobe-error"><p>{error}</p><button className="button" onClick={() => setReload(n => n + 1)}>Try again</button></div>
      : loading ? <p role="status">Loading your pieces…</p>
      : !items.length ? <div className="wardrobe-empty"><h2>{search || category ? 'No matching pieces yet' : 'Make room for your favourites'}</h2>
        <p>Add photos and we’ll organise your clothing, accessories and jewellery.</p><Link className="button" href="/upload">Add your first pieces</Link></div>
      : <>
        <div className="section-heading"><h2>{total} {total === 1 ? 'piece' : 'pieces'}</h2><Link href="/stylist">Style my wardrobe →</Link></div>
        <div className="wardrobe-items">{items.map(item => <Link className="wardrobe-item" key={item.id} href={`/item?id=${item.id}`}>
          <Photo src={item.image_url} alt={item.name} /><h3>{item.name}</h3>
          <p>{wardrobeCategories.find(([id]) => id === item.category)?.[1]} · {item.colors.join(', ')}</p>
        </Link>)}</div>
        {total > 24 && <div className="wardrobe-pagination">
          <button className="button secondary" disabled={!page} onClick={() => setPage(p => p - 1)}>Previous</button>
          <span>Page {page + 1} of {Math.ceil(total / 24)}</span>
          <button className="button secondary" disabled={(page + 1) * 24 >= total} onClick={() => setPage(p => p + 1)}>Next</button>
        </div>}
      </>}
  </>;
}
