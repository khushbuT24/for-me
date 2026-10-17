export const wardrobeCategories = [
  ['tops', 'Tops'], ['bottoms', 'Bottoms'], ['dresses', 'Dresses'],
  ['one_pieces', 'One pieces'], ['outerwear', 'Outerwear'], ['shoes', 'Shoes'],
  ['bags', 'Bags'], ['accessories', 'Accessories'], ['jewellery', 'Jewellery'], ['other', 'Other'],
] as const;

export type WardrobeItem = {
  id: string; name: string; category: string; clothing_type: string;
  colors: string[]; description: string; tags: string[]; image_url: string; confidence?: number;
};

// Development identity shared by wardrobe and ADK chat. Replace with login identity.
export function getUserId() {
  let id = localStorage.getItem('forme-user-id');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('forme-user-id', id);
  }
  return id;
}

export function wardrobePath(path = '') {
  return `/api/users/${encodeURIComponent(getUserId())}/wardrobe${path}`;
}

export class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(path, options);
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new ApiError(typeof body?.detail === 'string' ? body.detail : `Request failed (${response.status}). Please try again.`, response.status);
  }
  if (response.status === 204) return undefined as T;
  return response.json();
}
