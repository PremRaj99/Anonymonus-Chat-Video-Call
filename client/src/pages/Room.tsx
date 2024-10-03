import VideoCard from "../components/VideoCard";

export default function Room() {
  return (
    <div className="flex h-[calc(100vh-70px)]">
      <div className="flex flex-col justify-evenly">
        <VideoCard />
        <VideoCard />
      </div>
      <div className="flex-1 flex flex-col text-white">
        <div className="flex-1 m-2 rounded-md border bg-gray-700 p-2">
            {/* chatBox */}
        </div>
        <div className="flex mx-2 my-1">
            <button className="bg-green-500 hover:bg-green-600 px-8 py-2 font-semibold text-lg rounded-l-md">Skip (ESC)</button>
            <input type="text" className="flex-1 bg-gray-700 outline-none px-6 rounded-r-md" placeholder="Write something here..." name="" id="" />
        </div>
      </div>
    </div>
  );
}
