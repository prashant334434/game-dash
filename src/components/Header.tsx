import type { ComponentProps } from "react";
import UserProfile from "./UserProfile";

type HeaderProps = {
  appName: string;
  user: ComponentProps<typeof UserProfile>;
};

function Header({ appName, user }: HeaderProps) {
  return (
    <header className="header">
      <h1 className="header-title">{appName}</h1>
      <UserProfile {...user} />
    </header>
  );
}

export default Header;
