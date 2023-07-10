'use client';

import {useRef} from "react";
import useExitRouteOnFormSubmit from "../../../../../hooks/useExitRouteOnFormSubmit";
import {addContact} from "./actions";

export default function ({ params: {id}}: FriendParams) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const { goBack, afterSubmit } = useExitRouteOnFormSubmit();
  return (<dialog ref={modalRef} className="ir-modal" id="add-contact">
    <form action={addContact} onSubmit={afterSubmit}>
      <h2>New Contact</h2>
      <input type="hidden" id="user_id" name="user_id" value={id}/>
      <button>Create Contact</button>
      <button type="button" onClick={goBack}>Cancel</button>
    </form>
  </dialog>);
}