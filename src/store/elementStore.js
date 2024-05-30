import { create } from "zustand";

const useElementStore = create((set) => ({
    selectedElement: null, 
    setSelectedElement: (element) => {
        set(() => ({
            selectedElement: element
        }))
    }
}));

export default  useElementStore;