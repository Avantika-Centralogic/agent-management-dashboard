import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Box, Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux';
import { deleteAgent, Agent } from '../redux/agentSlice';
import { useAgentContext } from '../context/AgentContext';

const AgentList: React.FC = () => {
  const agents = useSelector((state: RootState) => state.agent.agents);
  const dispatch = useDispatch();
  const { setSelectedAgent, setDrawerOpen, selectedAgent, setIsEditing } = useAgentContext();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [agentToDelete, setAgentToDelete] = useState<Agent | null>(null);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Agents</Typography>
      {agents.length === 0 ? (
        <Typography color="text.secondary">No agents added yet.</Typography>
      ) : (
        <TableContainer component={Paper} elevation={0} sx={{ mt: 1 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Qualification</TableCell>
                <TableCell>Age</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {agents.map(agent => (
                <TableRow key={agent.id} hover sx={{ cursor: 'pointer' }} onClick={() => { setSelectedAgent(agent); setDrawerOpen(true); }}>
                  <TableCell>{agent.name}</TableCell>
                  <TableCell>{agent.email}</TableCell>
                  <TableCell>{agent.phone}</TableCell>
                  <TableCell>{agent.qualification}</TableCell>
                  <TableCell>{agent.age}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={(e) => { e.stopPropagation(); setSelectedAgent(agent); setDrawerOpen(true); }} aria-label="view"><VisibilityIcon /></IconButton>
                    <IconButton size="small" onClick={(e) => { e.stopPropagation(); setSelectedAgent(agent); setIsEditing(true); setDrawerOpen(true); }} aria-label="edit"><EditIcon /></IconButton>
                    <IconButton size="small" onClick={(e) => { e.stopPropagation(); setAgentToDelete(agent); setConfirmOpen(true); }} aria-label="delete"><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)} aria-labelledby="confirm-delete-title">
        <DialogTitle id="confirm-delete-title">Confirm delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {agentToDelete ? agentToDelete.name : 'this agent'}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setConfirmOpen(false); setAgentToDelete(null); }}>Cancel</Button>
          <Button color="error" variant="contained" onClick={() => {
            if (agentToDelete) {
              dispatch(deleteAgent(agentToDelete.id));
              // if the deleted agent was selected in the drawer, clear selection and close drawer
              if (selectedAgent && selectedAgent.id === agentToDelete.id) {
                setSelectedAgent(null);
                setDrawerOpen(false);
              }
            }
            setConfirmOpen(false);
            setAgentToDelete(null);
          }}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AgentList;
