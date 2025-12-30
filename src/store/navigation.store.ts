import { create } from 'zustand';
import type { ExperienceCategory, NavigationItem } from '../core/entities';

interface NavigationState {
  activeSection: ExperienceCategory;
  navigationItems: NavigationItem[];
  setActiveSection: (section: ExperienceCategory) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  activeSection: 'travel-around',
  navigationItems: [
    { id: 'travel-around', label: 'Travel Around', path: '/travel-around' },
    { id: 'stays', label: 'Stays', path: '/stays' },
    { id: 'transportation', label: 'Transportation', path: '/transportation' },
    { id: 'tours-activities', label: 'Tours & Activities', path: '/tours-activities' },
    { id: 'eat-drink', label: 'Eat & Drink', path: '/eat-drink' },
    { id: 'flights', label: 'Book Flights', path: '/flights' },
  ],
  setActiveSection: (section) => set({ activeSection: section }),
}));
