import React from 'react';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Divider, Toolbar } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import { blueGrey } from '@mui/material/colors';

const drawerWidth = 240;

const Sidebar: React.FC<{ onNavigate?: (key: string) => void }> = ({ onNavigate }) => {
  return (
    <Box sx={{ width: { sm: drawerWidth }, flexShrink: 0 }} aria-label="sidebar">
      <Box sx={{ width: drawerWidth, bgcolor: blueGrey[100], color: 'white', minHeight: '100vh', p: 2 }}>
        <Toolbar />
        <Divider sx={{ borderColor: '#add8e6' }} />
        <List>
          <ListItemButton sx={{ color: 'inherit' }} onClick={() => onNavigate && onNavigate('agents')}>
            <ListItemIcon sx={{ color: 'black' }}>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Agents" primaryTypographyProps={{ color: 'black' }} />
          </ListItemButton>
        </List>
      </Box>
    </Box>
  );
};

export { Sidebar, drawerWidth };
