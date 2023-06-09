import {User} from "../../lib/users";
import Link from "next/link";

export default function FriendCard( { friend } : { friend:  User }) {
  return (
    <div className="friend-card" data-testid={`friend-${friend.id}`}>
      <div className="avatar"></div>
      <div className="details">
        <h2>{friend.first_name} {friend.last_name}</h2>
        <div className="controls">
          <Link className="fakeButton" href={`/edit/${friend.id}`}>Edit</Link>
          <Link className="fakeButton" href={`/delete/${friend.id}`}>Delete</Link>
        </div>
      </div>
    </div>
  );
}