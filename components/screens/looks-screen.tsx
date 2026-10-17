import { LookGallery } from '../shared/look-gallery';
import type { SavedLooksProps } from '../shared/screen-props';

export function SavedLooksScreen(props: SavedLooksProps) {
  return <LookGallery screen="looks" {...props} />;
}
