import React, { useState } from 'react';
import { Box, CssBaseline, AppBar, Toolbar, IconButton, Typography, Button, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AgentProvider, useAgentContext } from './context/AgentContext';
import AgentDrawer from './components/AgentDrawer';
import AgentList from './components/AgentList';
import { Sidebar, drawerWidth } from './components/Sidebar';

const AppContent = () => {
  const { setDrawerOpen, setSelectedAgent } = useAgentContext();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" sx={{ mr: 2, display: { sm: 'none' } }} onClick={() => setMobileOpen(!mobileOpen)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Agent Management Dashboard</Typography>
          <Button color="inherit" onClick={() => { setSelectedAgent(null); setDrawerOpen(true); }}>Add Agent</Button>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
        <Sidebar onNavigate={(key) => { /* future navigation handler */ }} />
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <Button variant="contained" onClick={() => { setSelectedAgent(null); setDrawerOpen(true); }}>Add New Agent</Button>
          </Box>
          <AgentDrawer />
          <AgentList />
        </Container>
      </Box>
    </Box>
  );
};

const App = () => (
  <AgentProvider>
    <AppContent />
  </AgentProvider>
);

export default App;
