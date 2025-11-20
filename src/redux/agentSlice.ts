import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Agent {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  qualification: string;
  age: number;
  birthdate: string;
  address?: string;
  department?: string;
  experience?: number;
}

interface AgentState {
  agents: Agent[];
}

const persisted = (() => {
  try {
    const raw = localStorage.getItem('agents');
    return raw ? JSON.parse(raw) as Agent[] : [];
  } catch (e) {
    return [];
  }
})();

const initialState: AgentState = {
  agents: persisted,
};

const agentSlice = createSlice({
  name: 'agent',
  initialState,
  reducers: {
    addAgent: (state, action: PayloadAction<Agent>) => {
      state.agents.push(action.payload);
    },
    updateAgent: (state, action: PayloadAction<Agent>) => {
      const index = state.agents.findIndex(a => a.id === action.payload.id);
      if (index !== -1) state.agents[index] = action.payload;
    },
    deleteAgent: (state, action: PayloadAction<number>) => {
      state.agents = state.agents.filter(a => a.id !== action.payload);
    },
    setAgents: (state, action: PayloadAction<Agent[]>) => {
      state.agents = action.payload;
    }
  },
});

export const { addAgent, updateAgent, deleteAgent, setAgents } = agentSlice.actions;
export default agentSlice.reducer;
