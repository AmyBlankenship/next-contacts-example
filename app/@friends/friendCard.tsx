import {User} from "../../lib/users";
import Link from "next/link";

export default function FriendCard( { friend } : { friend:  User }) {
  return (
    <div className="friend-card"
      data-testid={`friend-${friend.id}`}
    >
      <a href={`/${friend.id}`} className="select-friend">
      </a>
      <div className="avatar"></div>
      <div className="details">
        <h2>{friend.first_name} {friend.last_name}</h2>
        <div className="controls">
          <Link className="fakeButton" href={`/${friend.id}/edit`}>Edit</Link>
          <Link className="fakeButton" href={`/${friend.id}/delete`}>Delete</Link>
        </div>
      </div>
    </div>
  );
}