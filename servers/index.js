import getWebServer from './web';
import getSocketsServer from './sockets';
// import getDatabaseConnection from './database';

export default async () => {
  const webServer = await getWebServer();
  const webSocketServer = await getSocketsServer(webServer);
  // const databaseConnection = await getDatabaseConnection();

  return {
    ws: webServer,
    wss: webSocketServer,
    // db: databaseConnection,
  };
};
