import { Client as EasyPanelClient } from 'easypanel.js';

const easypanel = new EasyPanelClient({
  endpoint: process.env.EASYPANEL_URL ?? '',
  token: process.env.EASYPANEL_API_KEY ?? '',
  credentials: { email: '', password: '' }, // to silent the TypeScript error
});

easypanel.on('ready', async () => {
  console.log('Client is ready!');
  console.log(await easypanel.projects.list());
});

export { easypanel };
