import Icon from "./Icon";
import { getInitials } from "../utils/initials";

type UserProfileProps = {
  name: string;
  role?: string;
  avatarUrl?: string;
  hasNotifications?: boolean;
};

function UserProfile({
  name,
  role,
  avatarUrl,
  hasNotifications,
}: UserProfileProps) {
  const initials = getInitials(name);

  return (
    <div className="profile">
      <button className="profile-bell" aria-label="Notifications">
        <Icon name="bell" />
        {hasNotifications && <span className="profile-dot" />}
      </button>
      <div className="profile-info">
        <span className="profile-name">{name}</span>
        {role && <span className="profile-role">{role}</span>}
      </div>
      {avatarUrl ? (
        <img className="profile-avatar" src={avatarUrl} alt={name} />
      ) : (
        <span className="profile-avatar" aria-label={name}>
          {initials}
        </span>
      )}
    </div>
  );
}

export default UserProfile;
