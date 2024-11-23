export function setupSocket(io) {
    io.use((socket, next) => {
        const room = socket.handshake.auth.room || socket.handshake.headers.room;
        if (!room) {
            return next(new Error("Invalid room please pass the correct room id"));
        }
        socket.room = room;
        next();
    });
    io.on("connection", (socket) => {
        // join room
        socket.join(socket.room);
        console.log("The socket connect..", socket.id);
        socket.on("message", (data) => {
            console.log("Server side message", data);
            // socket.broadcast.emit("message", data) 
            // for room
            io.to(socket.room).emit("message", data);
        });
        socket.on("disconnect", () => {
            console.log("A user disconnected", socket.id);
        });
    });
}
