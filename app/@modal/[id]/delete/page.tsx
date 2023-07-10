'use client';
import { useRef } from "react";
import useExitRouteOnFormSubmit from "../../../../hooks/useExitRouteOnFormSubmit";
import useDialogModal from "../../../../hooks/useDialogModal";
import {eradicateFriend} from "./actions";

import '../../../@friends/modal.css';
import useGetUserFromList from "../../../../hooks/useGetUserFromList";

export const revalidate = 0;

export default function RemoveFriendPage({ params:{ id } }: FriendParams) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const { goBack, afterSubmit } = useExitRouteOnFormSubmit();

  const user = useGetUserFromList(id);

  useDialogModal({onClose: goBack, modalRef});

  return (<dialog ref={modalRef} className="ir-modal" id="delete-user">
    <form action={eradicateFriend} onSubmit={afterSubmit}>
      <h2>{user ? `Delete ${user?.first_name} ${user?.last_name}?`: ''}</h2>
      <input type="hidden" id="id" name="id" value={id}/>
      <button>Delete Friend</button><button type="button" onClick={goBack}>Cancel</button>
    </form>
  </dialog>);
}