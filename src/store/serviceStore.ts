import { AllServices } from '@/services/getAllServices';
import { create } from 'zustand';

interface FilterConfig {
    category: string;
    sort: string;
    city: string;
    currency: string;
    verifiedOnly: boolean;
    priceRange: [number, number];
}

interface ServiceStore {
    services: AllServices[] | [];
    setServices: (services: AllServices[]) => void;
    filterConfig: FilterConfig;
    setFilterConfig: (filterConfig: Partial<FilterConfig>) => void;
}

const initialFilterConfig: FilterConfig = {
    category: 'all',
    sort: 'all',
    city: 'all',
    currency: 'all',
    verifiedOnly: false,
    priceRange: [0, 100000]
};

export const useStore = create<ServiceStore>((set) => ({
    services: [],
    setServices: (services: AllServices[]) => set({ services }),
    filterConfig: initialFilterConfig,
    setFilterConfig: (newConfig: Partial<FilterConfig>) => set(state => ({
        filterConfig: { ...state.filterConfig, ...newConfig }
    }))
}));
