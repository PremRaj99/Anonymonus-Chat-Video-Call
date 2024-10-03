import { useNavigate } from 'react-router-dom';
import logo from '../assets/Anoymonus Chat Logo.png'

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="px-40 flex items-center justify-center h-[calc(100vh-90px)] gap-10">
      <div className="">
        <img src={logo} className="w-96" alt="" />
      </div>
      <div className="flex items-center justify-center flex-col gap-8">
        <h1 className="w-[25ch] text-4xl text-white font-semibold text-center">
          Chat and Video call with Anonymonus and make <span className="text-green-500">Friend!</span>
        </h1>
        <button className="px-16 py-2 bg-green-500 text-lg font-semibold rounded-md hover:bg-green-600 text-white shadow-md shadow-green-400 border-2" onClick={() => navigate("/room")}>Join Room →</button>
      </div>
    </div>
  );
}
