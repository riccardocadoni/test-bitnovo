import { useEffect } from "react";

const useNotificationSocket = (url: string) => {
  useEffect(() => {
    let socket = new WebSocket(url);

    socket.addEventListener("open", () => {
      console.log("WebSocket connection established");
    });

    socket.addEventListener("message", (event) => {
      console.log("Message from server", event.data);
      const { status } = JSON.parse(event.data);
      console.log("status: ", status);
    });

    socket.addEventListener("error", (error) => {
      console.error("WebSocket error:", error);
    });

    socket.addEventListener("close", (event) => {
      console.log("WebSocket connection closed:", event);
    });

    return () => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, [url]);
};

export default useNotificationSocket;
