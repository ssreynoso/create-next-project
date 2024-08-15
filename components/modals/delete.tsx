import { useDeleteModal } from '@/hooks/modals/use-delete-modal'
import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'

export const DeleteModal = () => {
    const { isOpen, onClose, callback } = useDeleteModal((state) => ({
        isOpen: state.isOpen,
        onClose: state.onClose,
        callback: state.callback,
    }))
    
    const handleDelete = () => {
        if (callback) callback()
        onClose()
    }

    return (
        <Modal
            title="¿Está seguro que desea eliminar?"
            description="Esta acción no se puede deshacer."
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className='w-[500px] h-[50px] flex gap-2 justify-end items-end'>
                <Button variant='outline' onClick={onClose}>Cancelar</Button>
                <Button variant='destructive' onClick={handleDelete}>Eliminar</Button>
            </div>
        </Modal>
    )
}
