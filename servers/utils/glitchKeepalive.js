import request from 'request';

export default () => {
  const reqOpts = { url: 'http://' + process.env.PROJECT_DOMAIN + '.glitch.me/its-alive' };
  const keepalive = () =>
    request(
      reqOpts,
      () => setTimeout(() => keepalive(), 55000)
    );
  // if this is running on Glitch, call self every 55 secs
  if (process.env.PROJECT_DOMAIN) keepalive();
}