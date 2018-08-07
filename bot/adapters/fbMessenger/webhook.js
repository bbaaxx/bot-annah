const { FB_MESSENGER_VALIDATION_TOKEN } = process.env;

const getMessages = entries => 
  [].concat(
    ...entries.map(entry => 
      entry.messaging.map(message => ({
        ...message,
        pageId: entry.id,
        eventTime: entry.time,
      }))
    )
  );

export const mainController = subj$ => (req, res) => {
  const data = req.body;
  if (data.object === 'page' && Array.isArray(data.entry)) {
    getMessages(data.entry).forEach(v => subj$.next(v));
  }
  res.sendStatus(200);  
};

export const authController = (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  if (mode && token) {
    if (mode === 'subscribe' && token === FB_MESSENGER_VALIDATION_TOKEN) {
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);      
    }
  } else {
    res.sendStatus(400);
  }
};

