import { create } from 'zustand';

interface AppState {
  isLoading: boolean;
}

interface AppAction {
  showLoading: () => void;
  hideLoading: () => void;
}

type AppStore = AppState & AppAction;

export const useAppStore = create<AppStore>((set) => ({
  isLoading: false,
  showLoading: () => set({ isLoading: true }),
  hideLoading: () => set({ isLoading: false }),
}));
