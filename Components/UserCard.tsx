import { DefaultSession } from "next-auth";

function UserCard({ user }: { user: DefaultSession["user"] }) {
  return (
    <div className="flex gap-2">
      <h5>{user?.name},</h5>
      <p>{user?.email}</p>
    </div>
  );
}

export default UserCard;
