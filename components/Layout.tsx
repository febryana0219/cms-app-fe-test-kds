// components/Layout.tsx
import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/router';
import { useStore } from '../lib/store';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const menuGroups = useStore((s) => s.menuGroups);
  const menus = useStore((s) => s.menus);
  const logout = useStore((s) => s.logout);

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [activeGroup, setActiveGroup] = React.useState<string | null>(null);

  const handleOpenGroupMenu = (e: React.MouseEvent<HTMLElement>, groupId: string) => {
    setAnchorEl(e.currentTarget);
    setActiveGroup(groupId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setActiveGroup(null);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={() => setMobileOpen(true)}>
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => router.push('/home')}>
            CMS App
          </Typography>

          <Button color="inherit" onClick={() => router.push('/home')}>Home</Button>

          {/* menu yang baru ditambahkan akan muncul di sini */}
          {menuGroups.map((g) => {
            const groupMenus = menus.filter((m) => m.groupId === g.id);
            return (
              <span key={g.id}>
                <Button
                  color="inherit"
                  onClick={(e) => (groupMenus.length ? handleOpenGroupMenu(e, g.id) : router.push('/settings'))}
                  endIcon={groupMenus.length ? <ArrowDropDownIcon /> : null}
                >
                  {g.name}
                </Button>
              </span>
            );
          })}

          <Button color="inherit" onClick={() => router.push('/settings')}>Settings</Button>
          <Button color="inherit" onClick={() => { logout(); router.push('/'); }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {activeGroup &&
          menus
            .filter((m) => m.groupId === activeGroup)
            .map((m) => (
              <MenuItem key={m.id} onClick={() => { handleClose(); router.push('/settings'); }}>
                {m.title}
              </MenuItem>
            ))}
      </Menu>

      <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={() => setMobileOpen(false)}>
          <List>
            <ListItem button onClick={() => router.push('/home')}>
              <ListItemText primary="Home" />
            </ListItem>

            {/* menu yang baru ditambahkan akan muncul di sini */}
            {menuGroups.map(g => (
              <React.Fragment key={g.id}>
                <ListItem>
                  <ListItemText primary={g.name} />
                </ListItem>
                {menus.filter(m => m.groupId === g.id).map(m => (
                  <ListItem key={m.id} sx={{ pl: 4 }}>
                    <ListItemText primary={m.title} />
                  </ListItem>
                ))}
              </React.Fragment>
            ))}

            <ListItem button onClick={() => router.push('/settings')}>
              <ListItemText primary="Settings" />
            </ListItem>
            <ListItem button onClick={() => { logout(); router.push('/'); }}>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Container sx={{ mt: 3 }}>
        {children}
      </Container>
    </>
  );
};

export default Layout;
