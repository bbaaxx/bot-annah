import wakeUpBot from './bot';
import getServers from './servers';

getServers().then(wakeUpBot);
