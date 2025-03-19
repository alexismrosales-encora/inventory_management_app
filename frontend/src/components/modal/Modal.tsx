import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import React, { ReactNode } from 'react'


/**
 * ModalProps - Interface defining the properties for the Modal component.
 *
 * @property {boolean} isOpen - Flag indicating whether the modal is open.
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setIsOpen - Function to update the modal open state.
 * @property {string} dialogTitle - Title text displayed in the modal header.
 * @property {ReactNode} dialogContent - Content to be displayed inside the modal.
 */
interface ModalProps {
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  dialogTitle: string,
  dialogContent: ReactNode,
}


/**
* Modal Component
*
* Renders a modal dialog using Headless UI's Dialog components.
* The modal visibility is controlled by the isOpen prop and can be closed
* by calling setIsOpen(false) when the Dialog requests to close.
*
* @param {ModalProps} props - The properties for the modal.
* @returns {JSX.Element} The rendered modal component.
*
* @example
* <Modal
*   isOpen={isModalOpen}
*   setIsOpen={setModalOpen}
*   dialogTitle="Example Modal"
*   dialogContent={<div>Modal content goes here</div>}
* />
*/
const Modal = ({ isOpen, setIsOpen, dialogTitle, dialogContent }: ModalProps) => {
  return (

    // Headless UI Dialog component manages modal accessibility and transitions.
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} transition className="relative z-50 bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0">
      <div className="fixed inset-0 bg-black/50"></div>
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg space-y-4 border bg-white p-12 border-none rounded-lg">
          <DialogTitle className="text-center text-2xl font-semibold"> {dialogTitle}</DialogTitle>
          {dialogContent}
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default Modal
