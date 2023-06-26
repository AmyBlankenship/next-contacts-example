'use client';
import {useRef} from "react";
import {addMe} from "./actions";
import './add-user.css';
import useDialogModal from "../../../hooks/useDialogModal";
import useExitInterceptingRouteOnFormSubmit from "../../../hooks/useExitInterceptingRouteOnFormSubmit";


export default async function AddFriend() {
  const modalRef = useRef<HTMLDialogElement>(null);

  const { goBack, afterSubmit } = useExitInterceptingRouteOnFormSubmit();

  useDialogModal({onClose: goBack, modalRef});

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
        <button>Create Friend</button><button type="button" onClick={goBack}>Cancel</button>
      </form>
    </dialog>
  )
}