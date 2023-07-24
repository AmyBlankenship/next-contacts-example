'use client';

import {useRef} from "react";
import useExitRouteOnFormSubmit from "../../../../../hooks/useExitRouteOnFormSubmit";
import {addContact} from "./actions";
import useDialogModal from "../../../../../hooks/useDialogModal";
import '../contact_modal.css';

export const revalidate = 0;
export default function ({ params: {id}}: FriendParams) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const { goBack, afterSubmit } = useExitRouteOnFormSubmit();
  useDialogModal({onClose: goBack, modalRef});

  return (
    <>
      <dialog ref={modalRef} className="ir-modal" id="add-contact">
        <form action={addContact} onSubmit={afterSubmit} className="contact-form">
          <h2>Add Contact</h2>
          <input type="hidden" id="user_id" name="user_id" value={id}/>
          <label>Line 1
            <input type="text" id="line_1" name="line_1" autoComplete="nope" required/>
          </label>
          <label>Line 2
            <input type="text" id="line_2" name="line_2" autoComplete="nope"/>
          </label>
          <label>City
            <input type="text" id="city" name="city" autoComplete="nope" required/>
          </label>
          <div className="region_details">
            <label>State
              <input type="text" id="state" name="state" autoComplete="nope" required/>
            </label>
            <label>Zipcode
              <input type="text" id="zip" name="zip" autoComplete="nope" required/>
            </label>
          </div>
          <div className="form-buttons">
            <button>Create Contact</button>
            <button type="button" onClick={goBack}>Cancel</button>
          </div>
        </form>
      </dialog>
    </>);
}