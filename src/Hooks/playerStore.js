import { create } from "zustand"

export const usePlayerStore = create((set)=>({
    isPlaying : false,
    currentMusic: null,
    setIsPlaying : (isPlaying) => set ({isPlaying}),
    setCurrentMusic: (currentMusic) => set ({currentMusic}),
}))