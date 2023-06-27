'use client';
import {useEffect, useRef, useState} from "react";
import useExitInterceptingRouteOnFormSubmit from "../../../../hooks/useExitInterceptingRouteOnFormSubmit";
import useDialogModal from "../../../../hooks/useDialogModal";
import {User} from "../../../../lib/users";
import {eradicateFriend} from "./actions";

import '../../modal.css';

export default function RemoveFriendPage({ params:{ id } }: { params: { id: string } }) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const { goBack, afterSubmit } = useExitInterceptingRouteOnFormSubmit();

  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    function getUser() {
      fetch(`../api/users/${id}`).then(async (response) => {
        const user = await response.json();
        setUser(user);
      });
    }
    getUser();
  }, []);

  useDialogModal({onClose: goBack, modalRef});

  return (<dialog ref={modalRef} className="ir-modal" id="update-user">
    <form action={eradicateFriend} onSubmit={afterSubmit}>
      <h2>{user ? `Delete ${user.first_name} ${user.last_name}?`: ''}</h2>
      <input type="hidden" id="id" name="id" value={id}/>
      <button>Delete Friend</button><button type="button" onClick={goBack}>Cancel</button>
    </form>
  </dialog>);
}