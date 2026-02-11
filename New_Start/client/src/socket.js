import { io } from "socket.io-client";

// 🔥 ALWAYS connect via public domain, NOT localhost
const SOCKET_URL = "https://craftdex.in";

let visitorId = localStorage.getItem("visitorId");
if (!visitorId) {
  visitorId = crypto.randomUUID();
  localStorage.setItem("visitorId", visitorId);
}

export const socket = io(SOCKET_URL, {
  withCredentials: true,
  transports: ["websocket", "polling"],
  auth: { visitorId },
});
export default socket;