import { Server } from 'socket.io';

export default function createSocket(server:any) {
  const io = new Server(server, {
    cors: {
      origin: `${process.env.NEXT_PUBLIC_URL}`,
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  return io;
}