export type SavedLooksProps = {
  saved: string[];
  toggle: (id: string) => void;
};

export type NotifyProps = {
  notify: (message: string) => void;
};
