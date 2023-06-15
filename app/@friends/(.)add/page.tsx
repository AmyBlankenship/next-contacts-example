'use client';
import {useCallback, useEffect, useRef} from "react";
import {addMe} from "./actions";
import './add-user.css';
import {usePathname, useRouter} from "next/navigation";

export default async function AddFriend() {
  const modalRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const pathName = usePathname();
  const closeMe = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    let result = () => {};
    const currentCloseme = closeMe;
    if (modalRef.current) {
      //can change before we call the callback
      const modal = modalRef.current;
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
  }, [modalRef, pathName, closeMe]);

  return (
    <dialog ref={modalRef} id="add-user">
      <form action={addMe} onSubmit={closeMe}>
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