import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Room from "./Room";

export default function Landing() {
  const navigate = useNavigate();
  const name = "Random-" + Math.floor(Math.random() * 10000);
  // console.log(name)
  const [localVideoTrack, setLocalVideoTrack] =
    useState<MediaStreamTrack | null>(null);
  const [localAudioTrack, setLocalAudioTrack] =
    useState<MediaStreamTrack | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [joined, setJoined] = useState(false);

  useEffect(() => {
    const getVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        const videoTrack = stream.getVideoTracks()[0];
        setLocalVideoTrack(videoTrack);
        const audioTrack = stream.getAudioTracks()[0];
        setLocalAudioTrack(audioTrack);

        if (!videoRef.current) return;
        videoRef.current.srcObject = new MediaStream([videoTrack]);
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    getVideo();
  }, []);

  if (!joined)
    return (
      <div className="px-10 md:px-40 flex md:flex-row flex-col items-center justify-center h-[calc(100vh-90px)] gap-10">
        <div className="">
          <video
            ref={videoRef}
            className="border w-[400px] rounded-md m-2"
            autoPlay
            playsInline
          />
        </div>
        <div className="flex items-center justify-center flex-col gap-8">
          <h1 className="w-[25ch] text-4xl text-white font-semibold text-center">
            Chat and Video call with Anonymonus and make{" "}
            <span className="text-green-500">Friend!</span>
          </h1>
          <button
            className="px-16 py-2 bg-green-500 text-lg font-semibold rounded-md hover:bg-green-600 text-white shadow-md shadow-green-400 border-2"
            onClick={() => setJoined(true)}
          >
            Join Room →
          </button>
        </div>
      </div>
    );

  return (
    <Room name={name} localAudioTrack={localAudioTrack} localVideoTrack={localVideoTrack} />
  );
}
