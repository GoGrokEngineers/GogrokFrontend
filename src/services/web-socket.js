const BASE_URL = "ws://139.162.134.90:8001/ws/waiting-room";

let socket = null;
let isOpen = false;

const WsConnection = (roomId) => {
  return new Promise((resolve, reject) => {
    if (socket) {
      resolve({ message: "connection is exist...", isOpen });
      return;
    }

    socket = new WebSocket(`${BASE_URL}/${roomId}/`);

    socket.onopen = () => {
      console.log("connected...");
      isOpen = true;
      resolve({ isOpen });
    };

    socket.onmessage = (event) => {
      console.log(event.data);
    };

    socket.onclose = () => {
      console.log("connection lost");
      isOpen = false;
      socket = null;
    };

    socket.onerror = (error) => {
      console.log(error);
      isOpen = false;
      reject({ error });
    };
  });
};

const SendData = (data) => {
  return new Promise((resolve, reject) => {
    if (isOpen && socket) {
      socket.send(JSON.stringify(data));
      resolve({ success: true });
    } else {
      console.log("connection is not available yet!!!");
      reject({ error: "Failed to send data" });
    }
  });
};

export { WsConnection, SendData };
