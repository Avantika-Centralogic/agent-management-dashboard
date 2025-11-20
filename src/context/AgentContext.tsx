import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Agent } from '../redux/agentSlice';

interface AgentContextProps {
  isDrawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  selectedAgent: Agent | null;
  setSelectedAgent: (agent: Agent | null) => void;
}

const AgentContext = createContext<AgentContextProps | undefined>(undefined);

export const useAgentContext = () => {
  const context = useContext(AgentContext);
  if (!context) throw new Error("useAgentContext must be used within AgentProvider");
  return context;
};

export const AgentProvider = ({ children }: { children: ReactNode }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  return (
    <AgentContext.Provider value={{ isDrawerOpen, setDrawerOpen, selectedAgent, setSelectedAgent }}>
      {children}
    </AgentContext.Provider>
  );
};
