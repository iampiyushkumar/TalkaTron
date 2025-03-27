import React from "react";
import useConversation from "../../statemanage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { CiMenuFries } from "react-icons/ci";

function Chatuser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const getOnlineUsersStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };

  return (
    <div className=" pl-5 pt-5 h-[12vh] flex space-x-4 bg-gray-700 hover:bg-gray-600 duration-300">
      <div>
        <div className="avatar online">
          <div className="w-14 rounded-full">
            <img src="https://media-hosting.imagekit.io//ce676a6ddbf74812/My%20image23%20march.jpg?Expires=1837375421&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=yDNdjFWGoOaB8h3HNzse7UqHclo2yg3CfIb9QIJ2L9QJ6X~KXK4W9wwHefk1JGiIZ5pJ6d8SDnMVGfZx9kVbrLGBib5LCQI2kRpOxa1n9RAzbrN0LkauEV2c7Bs-N3ujvj6urhSFX-PbZdsAIK9belOnDkNhQmYXC8rAIFcGq6A4clJEJdeasLp-umD8z2-n-goYw2HQnCdYHbgT~HY01~cDKjDF7kV-TNOmTbqddsuPKkxWpK4pHRdKTkWAXkLpIOdUGXWWU-i-XWLr7so8P4HfC-72-7t3tapbaCRd3qdIwP5QGPEGAsM-BIh5ztYjlHR0sPtKiqtix4RnSpox~w__" />
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-xl">{selectedConversation.name}</h1>
        <span className="text-sm">
          {getOnlineUsersStatus(selectedConversation._id)}
        </span>
      </div>
    </div>
  );
}

export default Chatuser;
