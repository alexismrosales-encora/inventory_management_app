import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import React, { ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  dialogTitle: string,
  dialogContent: ReactNode,
}

const Modal = ({ isOpen, setIsOpen, dialogTitle, dialogContent }: ModalProps) => {
  return (
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
