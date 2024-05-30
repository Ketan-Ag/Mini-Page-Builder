import { create } from "zustand";

const useModalStore = create((set) => ({
    isModalOpen: false,
    setIsModalOpen: (value) => set((state) => ({ isModalOpen: value })),
    labelState: {
        title: 'This is a label',
        xCord: 0,
        yCord: 0,
        fontSize: 16,
        fontWeight: 300,
    },
    setLabelState: async (newState) => {
        set((state) => ({
            labelState: { ...state.labelState, ...newState }
        }))
    },
    resetLableState: () => set((state) => ({
        labelState: {
            title: 'This is a label',
            xCord: 0,
            yCord: 0,
            fontSize: 16,
            fontWeight: 300,
        }
    })),
}));

export default useModalStore;