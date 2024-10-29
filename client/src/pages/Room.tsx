import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

export default function Room({
  name,
  localAudioTrack,
  localVideoTrack,
}: {
  name: string;
  localAudioTrack: MediaStreamTrack | null;
  localVideoTrack: MediaStreamTrack | null;
}) {
  // const [socket, setSocket] = useState<null | Socket>(null);
  // const [connected, setConnected] = useState(false);
  const [lobby, setLobby] = useState(true);
  const [sendingPc, setSendingPc] = useState<RTCPeerConnection | null>(null);
  const [receivingPc, setReceivingPc] = useState<RTCPeerConnection | null>(
    null
  );

  const [remoteVideoTrack, setRemoteVideoTrack] =
    useState<MediaStreamTrack | null>(null);
  const [remoteAudioTrack, setRemoteAudioTrack] =
    useState<MediaStreamTrack | null>(null);

  const [remoteMediaStream, setRemoteMediaStream] =
    useState<MediaStream | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const URL = "http://localhost:3000";

  useEffect(() => {
    const socket = io(URL);
    socket.on("send-offer", async ({ roomId }) => {
      // alert("send Offer Please");
      setLobby(false);
      const pc = new RTCPeerConnection();
      setSendingPc(pc);
      // @ts-ignore
      pc.addTrack(localVideoTrack);
      // @ts-ignore
      pc.addTrack(localAudioTrack);

      pc.onicecandidate = async (e) => {
        if (e.candidate) {
          socket.emit("add-ice-candidate", {
            candidate: e.candidate,
            type: "sender",
          });
        }
      };

      pc.onnegotiationneeded = async () => {
        const sdp = await pc.createOffer();
        // @ts-ignore
        pc.setLocalDescription(sdp);
        socket.emit("offer", {
          sdp,
          roomId,
        });
      };
    });
    socket.on("offer", async ({ roomId, sdp: remoteSdp }) => {
      alert("send answer Please");
      setLobby(false);
      const pc = new RTCPeerConnection();
      pc.setRemoteDescription(remoteSdp);
      const sdp = await pc.createAnswer();
      // @ts-ignore
      pc.setLocalDescription(sdp);
      const stream = new MediaStream();
      if (remoteVideoRef && remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = stream;
      }
      setRemoteMediaStream(stream);
      // trickle ice
      setReceivingPc(pc);

      pc.onicecandidate = async (e) => {
        if (e.candidate) {
          socket.emit("add-ice-candidate", {
            candidate: e.candidate,
            type: "reveiver",
          });
        }
      };

      pc.ontrack = ({ track, type }) => {
        if (type == "audio") {
          // setRemoteAudioTrack(track);
          // @ts-ignore
          remoteVideoRef.current?.srcObject.addTrack(track);
        } else {
          // setRemoteVideoTrack(track);
          // @ts-ignore
          remoteVideoRef.current?.srcObject.addTrack(track);
        }
        // @ts-ignore
        remoteVideoRef.current.play();
      };
      socket.emit("answer", {
        roomId,
        sdp: "",
      });
    });
    socket.on("answer", ({ roomId, sdp: remoteSdp }) => {
      alert("connection done");
      setLobby(false);
      setSendingPc((pc) => {
        pc?.setRemoteDescription(remoteSdp);
        return pc;
      });
    });
    socket.on("lobby", () => {
      setLobby(true);
    });
    socket.on("add-ice-candidate", ({ candidate, type }) => {
      if (type == "sender") {
        setReceivingPc((pc) => {
          pc?.addIceCandidate(candidate);
          return pc;
        });
      } else {
        setSendingPc((pc) => {
          pc?.addIceCandidate(candidate);
          return pc;
        });
      }
    });
    // setSocket(socket);
  }, [name]);

  useEffect(() => {
    if (videoRef && videoRef.current) {
      // @ts-ignore
      videoRef.current.srcObject = new MediaStream([localVideoTrack]);
    }
  }, [videoRef]);

  if (lobby) {
    return <div className="text-white">waiting to connect you to someone</div>;
  }

  return (
    <div className="flex h-[calc(100vh-70px)]">
      <div className="flex flex-col justify-evenly">
        <video
          ref={videoRef}
          className="border w-[400px] rounded-md m-2"
          autoPlay
          playsInline
        />
        <video
          ref={remoteVideoRef}
          className="border w-[400px] rounded-md m-2"
          autoPlay
          playsInline
        />
      </div>
      <div className="flex-1 flex flex-col text-white">
        <div className="flex-1 m-2 rounded-md border bg-gray-700 p-2">
          {/* chatBox */}
          hi {name}
        </div>
        <div className="flex mx-2 my-1">
          <button className="bg-green-500 hover:bg-green-600 px-8 py-2 font-semibold text-lg rounded-l-md">
            Skip (ESC)
          </button>
          <input
            type="text"
            className="flex-1 bg-gray-700 outline-none px-6 rounded-r-md"
            placeholder="Write something here..."
            name=""
            id=""
          />
        </div>
      </div>
    </div>
  );
}
