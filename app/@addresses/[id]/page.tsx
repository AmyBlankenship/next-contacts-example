import Link from "next/link";
import React from "react";
import {Address} from "../../../lib/addresses";
import AddressList from "./addressList";
import '../addresses.css'

export const revalidate = 0;

const getContacts = async (id:string)  => {
  //throw into draft mode for testing
  await fetch(`${process.env.HOSTNAME}api/checkDraftMode`)
  const result = await fetch(
    `${process.env.HOSTNAME}api/addresses/?user_id=${id}`
  );
  if (result.ok) {
    return result.json();
  }
  return [];
}
export default async function ContactPage({params: {id}}: {params: {id: string}}) {
  const contacts: Address[] = await getContacts(id);

  return (
    <div className="container">
      <div className="addresses">
        <h3>Contacts</h3>
        {contacts.length ?
          <AddressList addressList={contacts}></AddressList> :
          <p>No addresses yet...</p>
        }
        <Link href={`${id}/contact/add`} className="fakeButton" >New Contact</Link>
      </div>
    </div>
  );
}