import React from "react";
import '../css/global.css';

export const revalidate = 0;

export const metadata = {
  title: 'Example contacts app',
  description: 'Amy Blankenship\'s learning project',
}


export default async function RootLayout({
  children, friends, addresses, modal
}: {
  children: React.ReactNode;
  friends: React.ReactNode;
  addresses: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <h1>My Friends</h1>
        <div className="app">
          {friends}
          {addresses}
          {children}
          {modal}
        </div>
      </body>
    </html>
  )
}
