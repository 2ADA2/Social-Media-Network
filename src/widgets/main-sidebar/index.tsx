import './main-sidebar.css';
import { UserCard } from "@/entities/user/ui/user-card.tsx";
import type { User } from "@/entities/user";
import type { Community } from "@/entities/community";

export interface MainSidebarProps {
  title: string;
  users: User[] | Community[];
}

const isUserArray = (items: User[] | Community[]): items is User[] => {
  return items.length > 0 && "username" in items[0];
};

export const MainSidebar = ({ title, users }: MainSidebarProps) => {
  if (users.length === 0) {
    return null;
  }

  if (isUserArray(users)) {
    return (
      <aside className="main-sidebar">
        <h2>{ title }</h2>
        { users.map((user) => (
          <UserCard
            key={ user.id }
            { ...user }
            title={ user.name }
            subtitle={ user.username }
            avatarUrl={ user.avatar }
          />
        )) }
      </aside>
    );
  }

  return (
    <aside className="main-sidebar">
      <h2>{ title }</h2>
      { users.map((user) => (
        <UserCard
          key={ user.id }
          { ...user }
          title={ user.name }
          subtitle={ user.members }
          avatarUrl={ user.avatar }
        />
      )) }
    </aside>
  );
};
