import {useEffect, useState} from "react";
import {User} from "../lib/users";

export default function useGetUserFromList(id: string) {
  const [user, setUser] = useState<User | undefined>();
  useEffect(() => {
    function getUser() {
      // the "pick" endpoint changes '10' to '1' in some scenarios, so it's safer to get the full list
      // since calls are deduplicated this should perform fine
      fetch(`../api/users/`).then(async (response) => {
        const users = await response.json();
        const thisUser = users.find((u:User) => (u.id || '').toString() === id);
        thisUser && setUser(thisUser);
      });
    }
    getUser();
  }, [id]);
  return user;
}