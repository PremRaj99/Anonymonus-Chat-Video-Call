import { User } from "./userManager";

let GLOBAL_ROOM_ID = 1;

interface Room {
  user1: User;
  user2: User;
}
export class RoomManager {
  private rooms: Map<string, Room>;
  constructor() {
    this.rooms = new Map<string, Room>();
  }
  createRoom(user1: User, user2: User) {
    const roomId = this.generate().toString();
    this.rooms.set(roomId.toString(), {
      user1,
      user2,
    });
    user1.socket.emit("send-offer", {
      roomId,
    });
  }

//   deleteRoom(roomId: string) {
//     const room = this.rooms.find(x => x.roomId === roomId);
//     if(!room) 
//   }
  onoffer(roomId: string, sdp: string) {
    const user2 = this.rooms.get(roomId)?.user2;
    user2?.socket.emit("offer", {
      sdp,
      roomId
    });
  }
  onAnswer(roomId: string, sdp: string) {
    const user1 = this.rooms.get(roomId)?.user1;
    user1?.socket.emit("answer", {
      sdp,
      roomId
    });
  }
  onIceCandidates(roomId: string, senderSocketId: string, candidate: any, type: "sender" | "receiver") {
    const room = this.rooms.get(roomId);
    if(!room) return
    const receivingUser = room.user1.socket.id === senderSocketId? room.user2 : room.user1
    receivingUser.socket.emit("add-ice-candidate", ({candidate, type}))
  }
  generate() {
    return GLOBAL_ROOM_ID++;
  }

}
