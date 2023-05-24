import Link from "next/link";
import React from "react";
import '../css/global.css';
import FriendsList from "./@friends/friendsList";

export const metadata = {
  title: 'Example contacts app',
  description: 'Amy Blankenship\'s learning project',
}


const getUsers = async () => {
  const result = await fetch(`${process.env.HOSTNAME}api/users`, {method: 'GET'});
  if (result.ok) {
    return result.json();
  }
  return [];
}

export default async function RootLayout({
  children, friends, addresses
}: {
  children: React.ReactNode,
  friends: React.ReactNode,
  addresses: React.ReactNode
}) {
  const friendList = await getUsers();

  return (
    <html lang="en">
      <body>
        {children}
        <div className="app">
          <div className="container">
            {friendList.length ?
              (<FriendsList friends={friendList} />):
              (<p className="no-friends">No friends yet</p>)
            }
            <Link href="/add" className="fakeButton">Add Friend</Link>
            {friends}
          </div>
          {addresses}
        </div>
      </body>
    </html>
  )
}
