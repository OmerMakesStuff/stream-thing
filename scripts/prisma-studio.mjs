import { spawn } from 'node:child_process';
import { connect, createServer } from 'node:net';

const studioPort = 5555;
const exposedPort = 5556;

// Prisma 7 Studio listens on 127.0.0.1, proxy it to the container interface
const proxy = createServer(client => {
  const studio = connect(studioPort, '127.0.0.1');

  client.on('error', () => studio.destroy());
  studio.on('error', () => client.destroy());
  client.pipe(studio).pipe(client);
});

proxy.listen(exposedPort, '0.0.0.0');

const studio = spawn(
  'pnpm',
  [
    'exec',
    'prisma',
    'studio',
    '--port',
    String(studioPort),
    '--browser',
    'none',
  ],
  { stdio: 'inherit' }
);

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => studio.kill(signal));
}

studio.on('exit', code => {
  proxy.close();
  process.exit(code ?? 1);
});
