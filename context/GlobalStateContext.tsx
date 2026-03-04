import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface GlobalState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  
  // Risk Predictor / Assessment
  savedScore: number | null;
  setSavedScore: (score: number) => void;
  
  // Hardware Shopping List
  shoppingList: string[];
  addToShoppingList: (item: string) => void;
  removeFromShoppingList: (item: string) => void;
  clearShoppingList: () => void;
  
  // Tenant Request Autosave
  tenantDraft: Record<string, string>;
  setTenantDraft: (draft: Record<string, string>) => void;
  
  // Leaderboard/Viral Simulation
  mockLeaderboardRank: number;
}

// Generate a random mocked rank for the user upon first visit for gamification
const initialMockRank = Math.floor(Math.random() * 5000) + 1000;

export const useGlobalStore = create<GlobalState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      toggleTheme: () => set({ theme: get().theme === 'light' ? 'dark' : 'light' }),
      
      savedScore: null,
      setSavedScore: (score) => set({ savedScore: score }),
      
      shoppingList: [],
      addToShoppingList: (item) => set({ shoppingList: [...get().shoppingList, item] }),
      removeFromShoppingList: (item) => set({ shoppingList: get().shoppingList.filter(i => i !== item) }),
      clearShoppingList: () => set({ shoppingList: [] }),
      
      tenantDraft: {},
      setTenantDraft: (draft) => set({ tenantDraft: draft }),
      
      mockLeaderboardRank: initialMockRank,
    }),
    {
      name: 'electrosafe-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
