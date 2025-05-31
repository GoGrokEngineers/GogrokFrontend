// const BASE_URL = "ws://139.162.134.90:8001/ws/waiting-room";

// let socket = null;
// let isOpen = false;


// export function WsConnection(roomId) {
//   return new Promise((resolve, reject) => {
//     // If there’s already an open socket, reuse it
//     if (socket && socket.readyState === WebSocket.OPEN) {
//       isOpen = true;
//       return resolve({ isOpen, socket });
//     }

//     // Otherwise, create a brand-new WebSocket connection to ws://.../<roomId>/
//     socket = new WebSocket(`${BASE_URL}/${roomId}/`);

//     socket.onopen = () => {
//       console.log("WebSocket connected to room:", roomId);
//       isOpen = true;
//       resolve({ isOpen, socket });
//     };

//     socket.onmessage = (event) => {
//       // Generic logger; MatchingRoom.jsx will add its own listeners
//       console.log("WS Message Received:", event.data);
//     };

//     socket.onclose = () => {
//       console.log("WebSocket connection closed");
//       isOpen = false;
//       socket = null;
//     };

//     socket.onerror = (error) => {
//       console.error("WebSocket error:", error);
//       isOpen = false;
//       reject({ error });
//     };
//   });
// }

// /**
//  * Sends a JSON-serializable payload over the open WebSocket.
//  * Resolves on success, rejects if socket is not open or send fails.
//  */
// export function SendData(data) {
//   return new Promise((resolve, reject) => {
//     if (isOpen && socket) {
//       try {
//         socket.send(JSON.stringify(data));
//         resolve({ success: true });
//       } catch (err) {
//         console.error("WebSocket send failed:", err);
//         reject({ error: err.message || "Failed to send data" });
//       }
//     } else {
//       console.warn("WebSocket is not open—cannot send data");
//       reject({ error: "WebSocket not open" });
//     }
//   });
// }


// src/services/ws-connection.js
const BASE_URL = "ws://139.162.134.90:8001/ws/waiting-room";

let socket = null;
let isOpen = false;

/**
 * Opens (or re-uses) a WebSocket for the given roomId.
 * Resolves with { isOpen: boolean, socket: WebSocket }.
 */
export function WsConnection(roomId) {
  return new Promise((resolve, reject) => {
    // If there's already an open socket, just reuse it
    if (socket && socket.readyState === WebSocket.OPEN) {
      isOpen = true;
      return resolve({ isOpen, socket });
    }

    // Otherwise, create a brand-new WebSocket to ws://…/<roomId>/
    socket = new WebSocket(`${BASE_URL}/${roomId}/`);

    socket.onopen = () => {
      console.log("WebSocket connected to room:", roomId);
      isOpen = true;
      resolve({ isOpen, socket });
    };

    socket.onmessage = (event) => {
      // Generic log; each component/page can add its own listener later
      console.log("WS Message Received:", event.data);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
      isOpen = false;
      socket = null;
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      isOpen = false;
      reject({ error });
    };
  });
}

/**
 * Sends a JSON-serializable payload over the open WebSocket.
 */
export function SendData(data) {
  return new Promise((resolve, reject) => {
    if (isOpen && socket) {
      try {
        socket.send(JSON.stringify(data));
        resolve({ success: true });
      } catch (err) {
        console.error("WebSocket send failed:", err);
        reject({ error: err.message || "Failed to send data" });
      }
    } else {
      console.warn("WebSocket is not open—cannot send data");
      reject({ error: "WebSocket not open" });
    }
  });
}

