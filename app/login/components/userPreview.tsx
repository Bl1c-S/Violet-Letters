import React, { useCallback } from "react";
import { useUser } from "@/app/components/contexts/userContext";
import DropdownMenu from "@/app/components/dropdownMenu";
import { useRouter } from "next/navigation";
import { User } from "@/backend/database/userDbManager";

const dM_ItemsStyle = "w-full px-4 py-2 text-left text-black hover:bg-gray-100";

const UserPreview: React.FC = () => {
  const { user, logout } = useUser();
  const router = useRouter();

  const goToProfile = useCallback(() => {
    router.push("/me");
  }, []);

  const addLetter = useCallback(() => {
    router.push("/letter");
  }, []);

  return (
    <div className="flex flex-row items-center">
      <DropdownMenu trigger={<MiniProfile user={user} />}>
        <ListItem title={"Письма"} action={addLetter} />
        <ListItem title={"Профиль"} action={goToProfile} />
        <ListItem title={"Выйти"} action={logout} />
      </DropdownMenu>
    </div>
  );
};

const MiniProfile: React.FC<{ user: User | null }> = ({ user }) => {
  if (user)
    return (
      <div className="flex flex-row items-center">
        <p>{user.username}</p>
        <div
          className="w-8 h-8 rounded-full bg-cover bg-center mx-4"
          style={{ backgroundImage: `url(${user.avatarUrl})` }}
        />
      </div>
    );
  else return <p>Нихуя</p>;
};

const ListItem: React.FC<{ title: string; action: () => void }> = ({
  title,
  action,
}) => {
  return (
    <button
      className={dM_ItemsStyle}
      onClick={() => {
        action();
      }}
    >
      {title}
    </button>
  );
};

export default UserPreview;
