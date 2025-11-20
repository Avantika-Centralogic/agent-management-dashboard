import { configureStore } from '@reduxjs/toolkit';
import agentReducer from './agentSlice';

export const store = configureStore({
  reducer: {
    agent: agentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Persist agents to localStorage on changes
store.subscribe(() => {
  try {
    const state = store.getState();
    localStorage.setItem('agents', JSON.stringify(state.agent.agents));
  } catch (e) {
    // ignore
  }
});
