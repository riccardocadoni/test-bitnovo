import { useEffect, useState } from "react";

const usePaymentStatus = (paymentId: string, initialPaymentStatus: string) => {
  const [paymentStatus, setPaymentStatus] = useState(initialPaymentStatus);

  /* Create a web socket connection to update payment status if necessary */
  useEffect(() => {
    let socket = new WebSocket(`${process.env.NEXT_PUBLIC_WEB_SOCKET_ENDPOINT}/${paymentId}`);

    socket.addEventListener("open", () => {
      console.log("WebSocket connection established");
    });

    socket.addEventListener("message", (event) => {
      const { status } = JSON.parse(event.data);
      setPaymentStatus(status);
    });

    socket.addEventListener("error", (error) => {
      console.error("WebSocket error:", error);
    });

    socket.addEventListener("close", (event) => {
      console.log("WebSocket connection closed:");
    });

    return () => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, [paymentId]);

  return {
    paymentStatus,
  };
};

export default usePaymentStatus;
