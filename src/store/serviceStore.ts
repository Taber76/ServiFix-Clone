import { AllServices } from '@/services/getAllServices'
import { create } from 'zustand'

export const useStore = create((set) => ({
    services: [],
    setServices: (services: AllServices) => set({ services }),
}))