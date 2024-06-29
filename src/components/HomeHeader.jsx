import { useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { REVERSE_ROLES, ROLES } from "../utils/enums";

export default function HomeHeader(props) {
  const { user } = props;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return user ? (
    <div className="max-w-7xl flex justify-between mx-auto mb-8">
      <p className="text-2xl first-letter:capitalize cursor-default">
        {REVERSE_ROLES[user.role].toLowerCase() + " "}page
      </p>
      <div
        className="flex gap-2 items-center text-center z-10 cursor-pointer"
        onClick={handleLogout}
      >
        <p className="text-2xl">Logout</p>
        <MdLogout className="text-[32px] cursor-pointer" />
      </div>
    </div>
  ) : (
    <></>
  );
}
