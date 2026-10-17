import { DetailView } from '../shared/detail-view';
import type { NotifyProps } from '../shared/screen-props';

export function OutfitScreen(props: NotifyProps) {
  return <DetailView screen="outfit" {...props} />;
}
