import { create } from 'zustand'

export const useStore = create((set, get) => ({
    count: 1,
    inc: () => set((state: any) => ({ count: state.count + 1 })),
}))