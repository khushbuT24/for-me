'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Photo } from '../shared/photo';
import type { NotifyProps } from '../shared/screen-props';
import { api, wardrobeCategories, wardrobePath, type WardrobeItem } from '@/lib/wardrobe-api';

function ItemEditor({ notify }: NotifyProps) {
  const id = useSearchParams().get('id');
  const router = useRouter();
  const [item, setItem] = useState<WardrobeItem | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();
    api<WardrobeItem>(wardrobePath(`/items/${encodeURIComponent(id)}`), { signal: controller.signal })
      .then(setItem).catch(err => { if (!controller.signal.aborted) setError(err.message); });
    return () => controller.abort();
  }, [id]);

  async function save(event: React.FormEvent) {
    event.preventDefault();
    if (!item) return;
    setBusy(true); setError('');
    try {
      const { name, category, clothing_type, colors, description, tags } = item;
      const updated = await api<WardrobeItem>(wardrobePath(`/items/${item.id}`), {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, category, clothing_type, colors, description, tags }),
      });
      setItem(updated); notify('Wardrobe item updated');
    } catch (err) { setError(err instanceof Error ? err.message : 'Could not save changes.'); }
    finally { setBusy(false); }
  }

  async function remove() {
    if (!item || !window.confirm(`Remove ${item.name} from your wardrobe?`)) return;
    setBusy(true); setError('');
    try {
      await api(wardrobePath(`/items/${item.id}`), { method: 'DELETE' });
      notify('Item removed'); router.push('/wardrobe');
    } catch (err) { setError(err instanceof Error ? err.message : 'Could not remove item.'); setBusy(false); }
  }

  if (!id) return <div className="wardrobe-empty"><h2>Choose a piece to view</h2><Link className="button" href="/wardrobe">Open wardrobe</Link></div>;
  if (!item) return <p role={error ? 'alert' : 'status'}>{error || 'Loading your piece…'}</p>;
  return <div className="detail-grid">
    <Photo className="detail-photo" src={item.image_url} alt={item.name} />
    <form className="wardrobe-edit" onSubmit={save}>
      <h2>Make it yours</h2><p>Review the identification and adjust any details.</p>
      <label>Name<input required maxLength={120} value={item.name} onChange={e => setItem({ ...item, name: e.target.value })} /></label>
      <label>Category<select value={item.category} onChange={e => setItem({ ...item, category: e.target.value })}>
        {wardrobeCategories.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
      </select></label>
      <label>Type<input required maxLength={80} value={item.clothing_type} onChange={e => setItem({ ...item, clothing_type: e.target.value })} /></label>
      <label>Colours (comma separated)<input value={item.colors.join(', ')} onChange={e => setItem({ ...item, colors: e.target.value.split(',').map(s => s.trim()) })} /></label>
      <label>Description<textarea maxLength={1000} value={item.description} onChange={e => setItem({ ...item, description: e.target.value })} /></label>
      {error && <p role="alert" className="wardrobe-error">{error}</p>}
      <button className="button" disabled={busy} type="submit">{busy ? 'Saving…' : 'Save changes'}</button>
      <button className="button secondary" disabled={busy} type="button" onClick={remove}>Remove item</button>
    </form>
  </div>;
}

export function ItemScreen(props: NotifyProps) {
  return <Suspense fallback={<p>Loading your piece…</p>}><ItemEditor {...props} /></Suspense>;
}
