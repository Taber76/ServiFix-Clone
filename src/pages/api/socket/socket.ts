import type { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "@/types/next.types";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";
import { prisma } from "@/server/lib/prisma";
import ChatController from "@/server/controllers/chat.controller";
import AuthMiddleware from "@/server/middlewares/auth.middleware";

export default function handler(req: NextApiRequest, res: NextApiResponseServerIO) {

  const middlewareResponse = AuthMiddleware.checkAuth(req, ['ADMIN', 'CUSTUMER', 'SUPPLIER']);
  if (!middlewareResponse.success) return res.status(401).json({ msg: 'Unauthorized.' });
  const { user_id } = middlewareResponse

  if (!res.socket.server.io) {

    const httpServer: NetServer = res.socket.server as any
    const io: ServerIO = new ServerIO(httpServer)

    io.on('connection', async (socket) => {
      let online = await prisma.online.findFirst({ where: { user_id: Number(user_id) } })
      if (online) {
        online = await prisma.online.update({ where: { id: online.id }, data: { socket_id: socket.id } })
      } else {
        online = await prisma.online.create({ data: { user_id: Number(user_id), socket_id: socket.id } })
      }

      socket.on('message', async (msg, recipientId) => {
        const recipient = await prisma.online.findFirst({ where: { user_id: recipientId } })
        if (recipient) {
          io.to(recipient.socket_id).emit('message', msg, socket.id);
        }
        await ChatController.socketSaveMessage(Number(user_id), Number(recipientId), msg)
      })

      socket.on('disconnect', () => {
        prisma.online.delete({ where: { id: online.id } })
      });
    });

    res.socket.server.io = io
  }

  res.end()
}