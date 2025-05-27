// src/services/web-socket.js
const WS_BASE = process.env.REACT_APP_WS_URL;

let socket = null;
let isOpen = false;

export const WsConnection = (roomId) => {
  return new Promise((resolve, reject) => {
    if (socket) return resolve({ isOpen });

    socket = new WebSocket(`${WS_BASE}/${roomId}/`);

    socket.onopen = () => {
      isOpen = true;
      resolve({ isOpen });
    };
    socket.onmessage = (event) => {
      // handle incoming messages…
    };
    socket.onclose = () => {
      isOpen = false;
      socket = null;
    };
    socket.onerror = (error) => {
      isOpen = false;
      reject(error);
    };
  });
};

export const SendData = (data) => {
  return new Promise((resolve, reject) => {
    if (isOpen && socket) {
      socket.send(JSON.stringify(data));
      resolve();
    } else {
      reject(new Error('Socket not open'));
    }
  });
};
