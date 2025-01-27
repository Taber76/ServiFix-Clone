import { type Service } from '@/types/front.types';
import { create } from 'zustand';


interface FilterConfig {
    category: string;
    sort: string;
    city: string;
    currency: string;
    verifiedOnly: boolean;
    priceRange: [number, number];
    user_id?: number;
}


interface ServiceStore {
    services: Service[] | [];
    setServices: (services: Service[]) => void;
    filterConfig: FilterConfig;
    setFilterConfig: (filterConfig: Partial<FilterConfig>) => void;
}

const initialFilterConfig: FilterConfig = {
    category: 'all',
    sort: 'all',
    city: 'all',
    currency: 'all',
    verifiedOnly: false,
    priceRange: [0, 100000],
    user_id: undefined
};



export const useStore = create<ServiceStore>((set) => ({
    services: [],
    setServices: (services: Service[]) => set({ services }),
    filterConfig: initialFilterConfig,
    setFilterConfig: (newConfig: Partial<FilterConfig>) => set(state => ({
        filterConfig: { ...state.filterConfig, ...newConfig }
    })),
}));

