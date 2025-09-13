export interface MenuGroup {
  id: string;
  name: string;
  createdAt: number;
}

export interface MenuItem {
  id: string;
  groupId: string;
  title: string;
  url?: string;
  createdAt: number;
}
