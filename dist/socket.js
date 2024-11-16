export function setupSocket(io) {
    io.on("connection", (socket) => {
        console.log("The socket connect..", socket.id);
        socket.on("disconnect", () => {
            console.log("A user disconnected", socket.id);
        });
    });
}
