import React, { useEffect, useState } from 'react';
import { Drawer, Box, Typography, IconButton, Divider, Button, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AgentForm from './AgentForm';
import { useAgentContext } from '../context/AgentContext';

const AgentDrawer = () => {
  const { isDrawerOpen, setDrawerOpen, selectedAgent, setSelectedAgent } = useAgentContext();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    // if opening for add, go to edit mode
    if (isDrawerOpen && !selectedAgent) setIsEditing(true);
    if (isDrawerOpen && selectedAgent) setIsEditing(false);
  }, [isDrawerOpen, selectedAgent]);

  const close = () => {
    setDrawerOpen(false);
    setSelectedAgent(null);
    setIsEditing(false);
  };

  return (
    <Drawer anchor="right" open={isDrawerOpen} onClose={close}>
      <Box sx={{ width: { xs: '100%', sm: 480, md: 520 }, maxWidth: 700, p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{selectedAgent ? (isEditing ? 'Edit Agent' : 'Agent Details') : 'Add New Agent'}</Typography>
          <IconButton onClick={close}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ my: 2 }} />
        {selectedAgent && !isEditing ? (
          <Box sx={{ maxHeight: '70vh', overflowY: 'auto' }}>
            <Stack spacing={1}>
              <Typography variant="subtitle1" fontWeight={600}>{selectedAgent.name}</Typography>
              <Typography variant="body2"><strong>Email:</strong> {selectedAgent.email}</Typography>
              <Typography variant="body2"><strong>Phone:</strong> {selectedAgent.phone}</Typography>
              <Typography variant="body2"><strong>Qualification:</strong> {selectedAgent.qualification}</Typography>
              <Typography variant="body2"><strong>Age:</strong> {selectedAgent.age}</Typography>
              <Typography variant="body2"><strong>Birthdate:</strong> {selectedAgent.birthdate}</Typography>
              {selectedAgent.address && <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}><strong>Address:</strong> {selectedAgent.address}</Typography>}
              {selectedAgent.department && <Typography variant="body2"><strong>Department:</strong> {selectedAgent.department}</Typography>}
              {selectedAgent.experience !== undefined && <Typography variant="body2"><strong>Experience:</strong> {selectedAgent.experience} yrs</Typography>}
            </Stack>
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <Button variant="outlined" onClick={() => setIsEditing(true)}>Edit</Button>
              <Button variant="contained" color="secondary" onClick={close}>Close</Button>
            </Box>
          </Box>
        ) : (
          <AgentForm initialData={selectedAgent ?? undefined} onClose={close} />
        )}
      </Box>
    </Drawer>
  );
};

export default AgentDrawer;
