import {Address} from "../../../lib/addresses";

export default function AddressCard ({ address } : { address: Address }) {
  return (<div className="address-card vcard">
    <span className="street-address">{address.line_1}</span>
    <span className="extended-address">{address.line_2}</span>
    <span className="locality">{address.city}</span>
    <span className="region">{address.state}</span>
    <span className="postal-code">{address.zip}</span>
  </div>);
}