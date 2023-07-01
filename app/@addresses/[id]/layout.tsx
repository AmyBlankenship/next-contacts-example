import {ReactNode} from "react";

type AddressLayoutParams = {
  params: { id: string; children: ReactNode }
};
export default function ContactsLayout({params: {id, children}}: AddressLayoutParams) {
  return (
    <div className="container">
      <div className="addresses">
        <h3>Contacts</h3>
        <p>No addresses yet...</p>
      </div>
      { children }
    </div>
  );
}