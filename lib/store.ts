import { create } from 'zustand';
import { MenuGroup, MenuItem } from '../types';
import * as db from './db';

type State = {
  menuGroups: MenuGroup[];
  menus: MenuItem[];
  user?: string | null;
  loadFromDb: () => Promise<void>;
  setUser: (u?: string | null) => void;
  addMenuGroup: (name: string) => Promise<void>;
  updateMenuGroup: (id: string, name: string) => Promise<void>;
  deleteMenuGroup: (id: string) => Promise<void>;
  addMenu: (groupId: string, title: string, url?: string) => Promise<void>;
  updateMenu: (id: string, title: string, url?: string) => Promise<void>;
  deleteMenu: (id: string) => Promise<void>;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const genId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? (crypto as any).randomUUID()
    : `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

export const useStore = create<State>((set, get) => ({
  menuGroups: [],
  menus: [],
  user: null,

  setUser: (u) => set({ user: u ?? null }),

  loadFromDb: async () => {
    const groups = await db.getAllMenuGroups();
    const menus = await db.getAllMenus();
    set({ menuGroups: groups, menus });
  },

  addMenuGroup: async (name) => {
    const g: MenuGroup = { id: genId(), name, createdAt: Date.now() };
    await db.addMenuGroup(g);
    set((s) => ({ menuGroups: [...s.menuGroups, g] }));
  },

  updateMenuGroup: async (id, name) => {
    const state = get();
    const found = state.menuGroups.find((g) => g.id === id);
    if (!found) return;
    const updated = { ...found, name };
    await db.updateMenuGroup(updated);
    set((s) => ({ menuGroups: s.menuGroups.map((g) => (g.id === id ? updated : g)) }));
  },

  deleteMenuGroup: async (id) => {
    await db.deleteMenuGroup(id);
    await db.deleteMenusByGroup(id);
    set((s) => ({
      menuGroups: s.menuGroups.filter((g) => g.id !== id),
      menus: s.menus.filter((m) => m.groupId !== id),
    }));
  },

  addMenu: async (groupId, title, url) => {
    const m: MenuItem = { id: genId(), groupId, title, url, createdAt: Date.now() };
    await db.addMenu(m);
    set((s) => ({ menus: [...s.menus, m] }));
  },

  updateMenu: async (id, title, url) => {
    const state = get();
    const found = state.menus.find((m) => m.id === id);
    if (!found) return;
    const updated = { ...found, title, url };
    await db.updateMenu(updated);
    set((s) => ({ menus: s.menus.map((m) => (m.id === id ? updated : m)) }));
  },

  deleteMenu: async (id) => {
    await db.deleteMenu(id);
    set((s) => ({ menus: s.menus.filter((m) => m.id !== id) }));
  },

  login: async (username, password) => {
    // simple hardcoded auth
    if (username === 'admin' && password === 'password123') {
      set({ user: username });
      localStorage.setItem('cms_user', username);
      return true;
    }
    return false;
  },

  logout: () => {
    localStorage.removeItem('cms_user');
    set({ user: null });
  },
}));
