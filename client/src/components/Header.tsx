import { useNavigate } from "react-router-dom";
import logo from "../assets/Anoymonus Chat Logo.png";
export default function Header() {
  const navigate = useNavigate();
  return (
    <div className="bg-black text-white px-40 py-4 flex items-start cursor-pointer">
      <div
        className="flex items-center justify-center gap-4"
        onClick={() => navigate("/")}
      >
        <img src={logo} className="w-8" alt="" />
        <h1 className="text-2xl">Anonymonus Chat | Video Call</h1>
      </div>
    </div>
  );
}
