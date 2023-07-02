import FriendsList from "../friendsList";
import React from "react";
import {getUsers} from "../util";
import Link from "next/link";

export default async function FriendsPage ({params: {id}}: FriendParams) {
  const friendList = await getUsers();

  return (<div className="container">
    {friendList.length ?
      (<FriendsList friends={friendList} id={id} />):
      (<p className="no-friends">No friends yet</p>)
    }
    <Link href="/add" className="fakeButton" >Add Friend</Link>
  </div>);
}