'use client';
import {useCallback, useEffect, useRef, useState} from "react";
import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import {addMe} from "./actions";
import './add-user.css';
import { useRouter } from "next/navigation";


export default async function AddFriend() {
  const modalRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const {pending} = useFormStatus();
  const [isSent, setIsSent] = useState(false);
  const closeMe = useCallback(() => {
    router.refresh();
    router.back();
  }, [router]);

  const afterSubmit = useCallback(() => {
    setIsSent(true)
  }, [setIsSent])

  useEffect(() => {
    let result = () => {};
    const currentCloseme = closeMe;
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
  }, [modalRef, closeMe]);

  useEffect(() => {
    if (isSent) closeMe();
  }, [isSent, pending])

  return (
    <dialog ref={modalRef} id="add-user">
      <form action={addMe} onSubmit={afterSubmit}>
        <h2>Create New Friend</h2>
        <label>First Name
          <input type="text" id="first_name" name="first_name" autoComplete="nope" required />
        </label>
        <label>Last Name
          <input type="text" id="last_name" name="last_name" autoComplete="nope" required />
        </label>
        <button>Create Friend</button>
      </form>
    </dialog>
  )
}