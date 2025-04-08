import "./styles.css";

export default function SidebarFooter({ username, email }) {
  const initialChar = username[0];
  return (
    <footer className="sidebar__footer">
      <div className="sidebar__profile-image">
        <span>{initialChar}</span>
      </div>
      <div className="sidebar_profile-information">
        <p className="profile__username">{username}</p>
        <p className="profile__email">{email}</p>
      </div>
    </footer>
  );
}
