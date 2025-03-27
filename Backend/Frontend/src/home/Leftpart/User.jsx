import React from "react";
import useConversation from "../../statemanage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { socket, onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);
  return (
    <div
      className={`hover:bg-slate-600 duration-300 ${
        isSelected ? "bg-slate-700" : ""
      }`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="flex space-x-4 px-8 py-3 hover:bg-slate-700 duration-300 cursor-pointer">
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
             <img src="https://media-hosting.imagekit.io//ce676a6ddbf74812/My%20image23%20march.jpg?Expires=1837375421&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=yDNdjFWGoOaB8h3HNzse7UqHclo2yg3CfIb9QIJ2L9QJ6X~KXK4W9wwHefk1JGiIZ5pJ6d8SDnMVGfZx9kVbrLGBib5LCQI2kRpOxa1n9RAzbrN0LkauEV2c7Bs-N3ujvj6urhSFX-PbZdsAIK9belOnDkNhQmYXC8rAIFcGq6A4clJEJdeasLp-umD8z2-n-goYw2HQnCdYHbgT~HY01~cDKjDF7kV-TNOmTbqddsuPKkxWpK4pHRdKTkWAXkLpIOdUGXWWU-i-XWLr7so8P4HfC-72-7t3tapbaCRd3qdIwP5QGPEGAsM-BIh5ztYjlHR0sPtKiqtix4RnSpox~w__" />
        
          </div>
        </div>
        <div>
          <h1 className=" font-bold">{user.name}</h1>
          <span>{user.email}</span>
        </div>
      </div>
    </div>
  );
}

export default User;
