import { LookGallery } from '../shared/look-gallery';
import type { SavedLooksProps } from '../shared/screen-props';

export function SuggestionsScreen(props: SavedLooksProps) {
  return <LookGallery screen="suggestions" {...props} />;
}
