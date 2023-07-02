'use client';
import {ChangeEvent, useCallback, useEffect, useRef, useState} from "react";
import useExitRouteOnFormSubmit from "../../../../hooks/useExitRouteOnFormSubmit";
import useDialogModal from "../../../../hooks/useDialogModal";
import {User} from "../../../../lib/users";
import {updateFriend} from "./actions";

import '../../../@friends/modal.css';
import useGetUserFromList from "../../../../hooks/useGetUserFromList";

export const revalidate = 0;

export default function EditPage({ params:{ id } }: FriendParams) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const { goBack, afterSubmit } = useExitRouteOnFormSubmit();

  const [user, setUser] = useState<User | undefined>();


  const dbUser = useGetUserFromList(id);

  useEffect(() => {
    if (dbUser) setUser(dbUser);
  }, [dbUser]);

  useDialogModal({onClose: goBack, modalRef});

  const setFirstName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const first_name = e.currentTarget.value;
      setUser((u:User | undefined) => u ? {...u, first_name}: undefined);
    },
    [setUser]);
  const setLastName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      const last_name = e.currentTarget.value;
      setUser((u:User | undefined) => u ? {...u, last_name}: undefined);
    },
    [setUser]);
  return (<dialog ref={modalRef} className="ir-modal" id="update-user">
    <form action={updateFriend} onSubmit={afterSubmit}>
      <h2>Update Friend</h2>
      <label>First Name
        <input type="text" id="first_name" name="first_name" autoComplete="nope" required value={user?.first_name} onChange={setFirstName} />
      </label>
      <label>Last Name
        <input type="text" id="last_name" name="last_name" autoComplete="nope" required value={user?.last_name} onChange={setLastName} />
      </label>
      <input type="hidden" id="id" name="id" value={id}/>
      <button>Update Friend</button><button type="button" onClick={goBack}>Cancel</button>
    </form>
  </dialog>);
}