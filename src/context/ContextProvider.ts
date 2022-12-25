import { createContext } from "react";
import { io, Socket } from "socket.io-client";

export const socket = io("http://localhost:5000");

export const ContextProvider = createContext<Socket>(socket);

export const ContextSocketProvider = ContextProvider.Provider;
