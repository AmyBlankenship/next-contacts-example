import {RefObject, useEffect} from "react";

type DialogModalProps = {
  modalRef: RefObject<HTMLDialogElement>;
  onClose: () => void;
}

export default function useDialogModal({ modalRef, onClose }: DialogModalProps) {
  useEffect(() => {
    let result = () => {};
    const currentCloseme = onClose;
    if (!modalRef) return;
    //can change before we call the callback
    const modal = modalRef?.current;
    if (modal) {
      if (!modal.open) {
        modal.showModal();
      }
      // catches closes with esc key
      modal!.addEventListener('close', currentCloseme);
      modal!.addEventListener('cancel', currentCloseme);
      result = () => {
        modal!.removeEventListener('close', currentCloseme);
        modal!.removeEventListener('cancel', currentCloseme);
      }
      return result;
    }
  }, [modalRef, onClose]);
}