import type { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "@/types/next.types";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";
import AuthHelper from "@/server/helpers/auth.helper";

export default function handler(req: NextApiRequest, res: NextApiResponseServerIO) {

  if (!res.socket.server.io) {

    const httpServer: NetServer = res.socket.server as any
    const io: ServerIO = new ServerIO(httpServer)

    io.on('connection', (socket) => {
      let authenticated = false;

      socket.on('authenticate', async (token) => {
        if (AuthHelper.authenticateUserToken(token, ['ADMIN', 'CUSTUMER', 'SUPPLIER']).success) {
          authenticated = true;
          socket.emit('authenticated', socket.id);
        }
      })

      socket.on('message', async (msg, socketRecipientId) => {
        if (!authenticated) {
          socket.emit('unauthenticated');
          return
        };
        io.to(socketRecipientId).emit('message', msg, socket.id);
      })

      socket.on('disconnect', () => {
        authenticated = false;
      });
    });

    res.socket.server.io = io
  }

  res.end()
}