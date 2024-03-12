import { create } from 'zustand'

type Callback = () => void

type useDeleteModal = {
    callback: Callback | null
    isOpen: boolean
    onOpen: (callback: Callback) => void
    onClose: () => void
}

export const useDeleteModal = create<useDeleteModal>((set) => ({
    callback: null,
    isOpen: false,
    onOpen: (callback: Callback) => set({ isOpen: true, callback }),
    onClose: () => set({ isOpen: false })
}))