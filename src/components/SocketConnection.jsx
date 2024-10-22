import { useState } from "react";

import { io } from "socket.io-client";
import { BASE_URL } from "../api-config/endpoints";

const SocketConnection = () => {
  const socket = io(BASE_URL);

  const [clientMessage, setClientMessage] = useState("");

  const [serverResponse, setServerResponse] = useState("");

  socket.on("server-message", (message) => {
    setServerResponse(message);
  });

  const sendMessage = () => {
    socket.emit("client-message", clientMessage);
  };

  return (
    <div className="w-full min-h-screen bg-white p-8 text-xl">
      <h1>{`Send Message:`}</h1>
      <div className="mt-5 text-center flex gap-4">
        <input
          id="message"
          type="text"
          className="bg-blue-200 w-96"
          onChange={(e) => setClientMessage(e.target.value)}
        />
        <button
          id="sendbtn"
          className="btn btn-primary btn-sm"
          onClick={sendMessage}
        >
          {`Send`}
        </button>
      </div>
      <div className="mt-5">
        <h1>{`Server Response:`}</h1>
        <div className="card bg-gray-200 w-96 h-96 p-4">
          <p>{serverResponse}</p>
        </div>
      </div>
    </div>
  );
};

export default SocketConnection;
