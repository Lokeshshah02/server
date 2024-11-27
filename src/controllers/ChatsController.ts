import { Request, Response } from "express";
import prisma from "../config/db.config.js";

class ChatsController {
  static async index(req: Request, res: Response) {
    const { groupId } = req.params;

    try {
      const chats = await prisma.chats.findMany({
        where: {
          group_id: groupId,
        },
      });

      return res.status(200).json({ data: chats });
    } catch (error) {
      console.error("Error fetching chats:", error);

      return res.status(500).json({ error: "Failed to fetch chats." });
    }
  }
}

export default ChatsController;
