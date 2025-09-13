// components/MenuGroupList.tsx
import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  Stack,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useStore } from '../lib/store';
import MenuGroupForm from './MenuGroupForm';
import MenuForm from './MenuForm';

export default function MenuGroupList() {
  const menuGroups = useStore((s) => s.menuGroups);
  const menus = useStore((s) => s.menus);
  const deleteMenuGroup = useStore((s) => s.deleteMenuGroup);
  const deleteMenu = useStore((s) => s.deleteMenu);

  const [groupFormOpen, setGroupFormOpen] = React.useState(false);
  const [editingGroup, setEditingGroup] = React.useState<any | null>(null);

  const [menuFormOpen, setMenuFormOpen] = React.useState(false);
  const [menuGroupForAdd, setMenuGroupForAdd] = React.useState<string | undefined>(undefined);
  const [editingMenu, setEditingMenu] = React.useState<any | null>(null);

  return (
    <Box>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => { setEditingGroup(null); setGroupFormOpen(true); }}>
          Add Group
        </Button>
      </Stack>

      <Stack spacing={2}>
        {menuGroups.length === 0 && <Typography>No menu groups yet — add one.</Typography>}
        {menuGroups.map((g) => (
          <Card key={g.id}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">{g.name}</Typography>
                <div>
                  <IconButton onClick={() => { setEditingGroup(g); setGroupFormOpen(true); }}><EditIcon /></IconButton>
                  <IconButton onClick={() => deleteMenuGroup(g.id)}><DeleteIcon /></IconButton>
                  <Button startIcon={<AddIcon />} onClick={() => { setMenuGroupForAdd(g.id); setEditingMenu(null); setMenuFormOpen(true); }}>
                    Add Menu
                  </Button>
                </div>
              </Stack>

              <List>
                {menus.filter(m => m.groupId === g.id).length === 0 && (
                  <ListItem><ListItemText primary="No menus in this group." /></ListItem>
                )}

                {menus.filter(m => m.groupId === g.id).map(m => (
                  <ListItem key={m.id} secondaryAction={
                    <div>
                      <IconButton onClick={() => { setEditingMenu(m); setMenuGroupForAdd(g.id); setMenuFormOpen(true); }}><EditIcon /></IconButton>
                      <IconButton onClick={() => deleteMenu(m.id)}><DeleteIcon /></IconButton>
                    </div>
                  }>
                    <ListItemText primary={m.title} secondary={m.url} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <MenuGroupForm open={groupFormOpen} initial={editingGroup || undefined} onClose={() => { setGroupFormOpen(false); setEditingGroup(null); }} />

      <MenuForm open={menuFormOpen} groupId={menuGroupForAdd} initial={editingMenu || undefined} onClose={() => { setMenuFormOpen(false); setMenuGroupForAdd(undefined); setEditingMenu(null); }} />
    </Box>
  );
}
