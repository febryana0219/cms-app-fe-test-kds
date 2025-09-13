import React from 'react';
import { Typography, Box } from '@mui/material';
import MenuGroupList from '../components/MenuGroupList';

export default function Settings() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Settings — Menu Management</Typography>
      <MenuGroupList />
    </Box>
  );
}
