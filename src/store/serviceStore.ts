import { AllServices } from '@/services/getAllServices';
import { create } from 'zustand';

interface ServiceStore {
    services: AllServices[];
    setServices: (services: AllServices[]) => void;
}

export const useStore = create<ServiceStore>((set) => ({
    services: [],
    setServices: (services: AllServices[]) => set({ services }),
}));
