const BASE_URL = "ws://139.162.134.90:8001/ws/waiting-room/";

const WebsocketServices = {
  Handshake: (roomId) => {
    const ws = new WebSocket(`${BASE_URL}${roomId}/`);

    ws.onopen = () => {
      console.log("opened");
      ws.send(JSON.stringify(roomId));
      console.log("Yuborildi:", roomId);
    };

    ws.onmessage = (event) => {
      console.log("Response", event.data);
    };

    ws.onclose = (event) => {
      console.log("WebSocket yopildi!", event.code, event.reason);
    };

    return ws;
  },
};
export default WebsocketServices;
