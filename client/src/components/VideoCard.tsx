import { useEffect, useRef } from "react";

export default function VideoCard() {
  const videoRef = useRef(null);

  useEffect(() => {
    const getVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    getVideo();
  }, []);
  return <video ref={videoRef} className="border w-[400px] rounded-md m-2" autoPlay playsInline />;
}
