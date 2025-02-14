const BASE_URL = "ws://139.162.134.90:8001/ws/waiting-room/";

const WebsocketServices = {
  Handshake: (roomId) => {
    return new Promise((resolve, reject) => {
      try {
        const ws = new WebSocket(`${BASE_URL}${roomId}/`);

        ws.onopen = () => {
          resolve({ success: true, ws });
        };

        ws.onerror = (error) => {
          reject({ success: false, error: "WebSocket ulanib bo‘lmadi!" });
        };

        ws.onclose = (event) => {
          console.warn(
            `⚠️ WebSocket yopildi, code: ${event.code}, reason: ${event.reason}`
          );
          if (event.code === 403) {
            reject({
              success: false,
              error: "❌ 403 Access Denied - Ruxsat berilmagan!",
            });
          }
        };
      } catch (error) {
        reject({ success: false, error: error.message });
      }
    });
  },
};

export default WebsocketServices;
