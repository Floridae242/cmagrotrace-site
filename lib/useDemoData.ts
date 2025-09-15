import { useEffect, useState } from 'react';
import { DemoState, Lot, Event, Role } from './types';

const STORAGE_KEY = 'cmagrotrace_demo';

const initialState: DemoState = {
  currentRole: 'FARMER',
  lots: []
};

function getStoredState(): DemoState {
  if (typeof window === 'undefined') return initialState;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (err) {
    console.error('Failed to load demo data:', err);
  }
  return initialState;
}

export function useDemoData() {
  const [state, setState] = useState<DemoState>(getStoredState());
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setState(getStoredState());
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (!isLoaded || typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.error('Failed to save demo data:', err);
    }
  }, [state, isLoaded]);

  const setRole = (role: Role) => {
    setState(prev => {
      const newState = { ...prev, currentRole: role };
      // Save immediately
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      }
      return newState;
    });
  };

  const createLot = (farmerName: string, province: string) => {
    const newLot: Lot = {
      id: Math.random().toString(36).slice(2, 11),
      createdAt: new Date().toISOString(),
      farmer: {
        name: farmerName,
        province
      },
      events: []
    };

    setState(prev => {
      const newState = {
        ...prev,
        lots: [...prev.lots, newLot]
      };
      // Save immediately
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      }
      return newState;
    });

    return newLot.id;
  };

  const addEvent = (lotId: string, type: string, data: Record<string, any>) => {
    const newEvent: Event = {
      id: Math.random().toString(36).slice(2, 11),
      lotId,
      type,
      timestamp: new Date().toISOString(),
      actor: {
        role: state.currentRole,
        name: 'Demo User'
      },
      data
    };

    setState(prev => {
      const newState = {
        ...prev,
        lots: prev.lots.map(lot => 
          lot.id === lotId 
            ? { ...lot, events: [...lot.events, newEvent] }
            : lot
        )
      };
      // Save immediately
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      }
      return newState;
    });
  };

  const getLot = (id: string) => {
    return state.lots.find(lot => lot.id === id);
  };

  const reset = () => {
    const newState = initialState;
    setState(newState);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    }
  };

  return {
    role: state.currentRole,
    setRole,
    lots: state.lots,
    createLot,
    addEvent,
    getLot,
    reset,
    isLoaded
  };
}