import {Address} from "../../../lib/addresses";
import AddressCard from "./addressCard";

export default function AddressList ({ addressList }: { addressList: Address[] }) {
  return (<ul className="address-list">
    {
      addressList.map((address) => {
        return (<li key={address.id}>
          <AddressCard address={address} />
        </li>)
      })
    }
  </ul>);
}