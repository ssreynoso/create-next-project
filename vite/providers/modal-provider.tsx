import { useIsMounted } from '@/hooks/use-is-mounted'
import { DeleteModal } from '@/components/modals/delete'

export const ModalProvider = () => {
    const isMounted = useIsMounted()

    if (!isMounted) {
        return null
    }

    return (
        <>
            <DeleteModal />
        </>
    )
}
