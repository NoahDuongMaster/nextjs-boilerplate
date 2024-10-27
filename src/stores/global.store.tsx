import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { useStore, type StoreApi } from 'zustand';
import { createStore } from 'zustand/vanilla';

type GlobalState = {
  theme: 'dark' | 'light';
};

type GlobalActions = {
  setTheme: (theme: 'dark' | 'light') => void;
};

type GlobalStore = GlobalState & GlobalActions;

const defaultInitState: GlobalState = {
  theme: 'light',
};

const createGlobalStore = (initState: GlobalState = defaultInitState) => {
  return createStore<GlobalStore>()((set) => ({
    ...initState,
    setTheme: (theme: 'light' | 'dark') => {
      const body = document.body;

      if (theme === 'dark') {
        if (!body.hasAttribute('theme-mode')) {
          body.setAttribute('theme-mode', 'dark');
        }
      } else {
        if (body.hasAttribute('theme-mode')) {
          body.removeAttribute('theme-mode');
        }
      }
      return set({ theme });
    },
  }));
};

interface GlobalStoreProviderProps {
  children: ReactNode;
}

const GlobalStoreContext = createContext<StoreApi<GlobalStore> | null>(null);

const GlobalStoreProvider = ({ children }: GlobalStoreProviderProps) => {
  const storeRef = useRef<StoreApi<GlobalStore>>();
  if (!storeRef.current) {
    storeRef.current = createGlobalStore();
  }

  function matchMode(e: MediaQueryListEvent) {
    if (!storeRef.current) return;
    storeRef.current.setState({
      theme: e.matches ? 'dark' : 'light',
    });
  }

  useEffect(() => {
    if (!localStorage.getItem('theme')) {
      const mql = window.matchMedia('(prefers-color-scheme: dark)');
      mql.addEventListener('change', matchMode);
    }

    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light';
    const userTheme = localStorage.getItem('theme') as GlobalState['theme'];

    storeRef.current?.setState({ theme: userTheme || systemTheme });
  }, []);

  return (
    <GlobalStoreContext.Provider value={storeRef.current}>
      {children}
    </GlobalStoreContext.Provider>
  );
};

const useGlobalStore = <T,>(selector: (store: GlobalStore) => T): T => {
  const globalStoreContext = useContext(GlobalStoreContext);

  if (!globalStoreContext) {
    throw new Error(`globalStore must be use within GlobalStoreProvider`);
  }

  return useStore(globalStoreContext, selector);
};

export { GlobalStoreProvider, useGlobalStore };
