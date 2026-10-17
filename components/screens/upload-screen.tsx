'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Icon } from '../icon';
import { Photo } from '../shared/photo';
import type { NotifyProps } from '../shared/screen-props';
import { api, wardrobePath, type WardrobeItem } from '@/lib/wardrobe-api';

export function UploadScreen({ notify }: NotifyProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [items, setItems] = useState<WardrobeItem[]>([]);

  useEffect(() => {
    return () => { if (preview) URL.revokeObjectURL(preview); };
  }, [preview]);

  function choose(next?: File) {
    if (!next) return;
    setError('');
    setItems([]);
    if (next.size > 10 * 1024 * 1024) {
      setError('Choose a photo smaller than 10 MB.');
      return;
    }
    setFile(next);
    setPreview(URL.createObjectURL(next));
  }

  async function upload() {
    if (!file || busy) return;
    setBusy(true);
    setError('');
    try {
      const form = new FormData();
      form.append('file', file);
      const result = await api<{ items: WardrobeItem[] }>(wardrobePath('/items'), { method: 'POST', body: form });
      setItems(result.items);
      notify(`${result.items.length} item${result.items.length === 1 ? '' : 's'} added to your wardrobe`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed. Try again.');
    } finally {
      setBusy(false);
    }
  }

  return <div className="narrow-panel">
    <div className="upload-options">{['Camera', 'Gallery'].map(option => <label className="upload-box" key={option}>
      <Icon name={option === 'Camera' ? 'camera' : 'upload'} size={34} />
      <h2>{option}</h2>
      <p>{option === 'Camera' ? 'Take a photo of your piece' : 'Choose a photo to identify'}</p>
      <input aria-label={option === 'Camera' ? 'Take a clothing photo' : 'Upload a clothing photo'} disabled={busy}
        type="file" accept="image/jpeg,image/png,image/webp" capture={option === 'Camera' ? 'environment' : undefined}
        onChange={event => { choose(event.target.files?.[0]); event.target.value = ''; }} />
    </label>)}</div>
    {preview && <div className="upload-preview">
      <Photo src={preview} alt="Selected wardrobe photo" />
      {!items.length && <button className="button" disabled={busy} onClick={upload}>
        {busy ? 'Identifying and saving…' : 'Identify & add to wardrobe'}
      </button>}
    </div>}
    {error && <p role="alert" className="wardrobe-error">{error}</p>}
    {!!items.length && <section aria-live="polite">
      <div className="section-heading"><h2>Added to your wardrobe</h2><Link href="/wardrobe">View wardrobe →</Link></div>
      <p>Review each piece. You can correct its name and category.</p>
      <div className="wardrobe-items">{items.map(item => <Link className="wardrobe-item" href={`/item?id=${item.id}`} key={item.id}>
        <Photo src={item.image_url} alt={item.name} /><h3>{item.name}</h3><p>{item.category.replaceAll('_', ' ')}</p>
      </Link>)}</div>
    </section>}
    <div className="tips">
      <h3>A few tips for a great capture</h3>
      <p>Use a clear, well-lit photo with the full piece visible.</p>
      <p>Clothing, shoes, bags, accessories and jewellery are welcome.</p>
      <p>JPEG, PNG or WebP · up to 10 MB. One piece per photo works best.</p>
    </div>
  </div>;
}
