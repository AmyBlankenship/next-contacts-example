'use client';

import {useEffect, useRef} from "react";
import {addMe} from "./actions";

export default async function AddFriend() {
  const modalRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    modalRef.current && modalRef.current.showModal();
  }, [modalRef.current]);

  return (
    <dialog ref={modalRef}>
      <form action={addMe}>
        <h2>Create New Friend</h2>
        <label>First Name
          <input type="text" id="first_name" name="first_name"/>
        </label>
        <label>Last Name
          <input type="text" id="last_name" name="last_name"/>
        </label>
        <button>Create Friend</button>
      </form>
    </dialog>
  )
}