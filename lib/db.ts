import { openDB } from 'idb';
import { MenuGroup, MenuItem } from '../types';

const DB_NAME = 'cms-db';
const DB_VERSION = 1;
const STORE_MENU_GROUPS = 'menuGroups';
const STORE_MENUS = 'menus';

async function db() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(database) {
      if (!database.objectStoreNames.contains(STORE_MENU_GROUPS)) {
        database.createObjectStore(STORE_MENU_GROUPS, { keyPath: 'id' });
      }
      if (!database.objectStoreNames.contains(STORE_MENUS)) {
        database.createObjectStore(STORE_MENUS, { keyPath: 'id' });
      }
    },
  });
}

export async function getAllMenuGroups(): Promise<MenuGroup[]> {
  const d = await db();
  return d.getAll(STORE_MENU_GROUPS);
}

export async function addMenuGroup(g: MenuGroup) {
  const d = await db();
  return d.put(STORE_MENU_GROUPS, g);
}

export async function updateMenuGroup(g: MenuGroup) {
  const d = await db();
  return d.put(STORE_MENU_GROUPS, g);
}

export async function deleteMenuGroup(id: string) {
  const d = await db();
  return d.delete(STORE_MENU_GROUPS, id);
}

export async function getAllMenus(): Promise<MenuItem[]> {
  const d = await db();
  return d.getAll(STORE_MENUS);
}

export async function addMenu(m: MenuItem) {
  const d = await db();
  return d.put(STORE_MENUS, m);
}

export async function updateMenu(m: MenuItem) {
  const d = await db();
  return d.put(STORE_MENUS, m);
}

export async function deleteMenu(id: string) {
  const d = await db();
  return d.delete(STORE_MENUS, id);
}

export async function deleteMenusByGroup(groupId: string) {
  const d = await db();
  const all = await d.getAll(STORE_MENUS) as MenuItem[];
  const toDelete = all.filter(m => m.groupId === groupId);
  const tx = d.transaction(STORE_MENUS, 'readwrite');
  for (const m of toDelete) {
    tx.store.delete(m.id);
  }
  await tx.done;
}
