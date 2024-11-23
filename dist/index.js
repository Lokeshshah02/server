import express from "express";
import "dotenv/config";
import cors from "cors";
import router from "./routes/index.js";
import { Server } from "socket.io";
import { createServer } from "http";
import { setupSocket } from "./socket.js";
import { createAdapter } from "@socket.io/redis-streams-adapter";
import redis from "./config/redis.config.js";
import { instrument } from "@socket.io/admin-ui";
const app = express();
const PORT = process.env.PORT || 7000;
// * Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000", "https://admin.socket.io"],
        credentials: true,
    },
    adapter: createAdapter(redis)
});
instrument(io, {
    auth: false,
    mode: "development",
});
setupSocket(io);
export { io };
app.get("/", (req, res) => {
    return res.send("It's working 🙌");
});
app.use("/api", router);
server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
