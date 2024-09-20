import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';

async function server() {
  const app = await NestFactory.create(AppModule);

  const cors = {
    origin: ['http://localhost:3666'],
    methods: 'GET, HEAD, PUT, OPTIONS, PATCH, POST, DELETE',
    credentials: true,
  }

  app.enableCors(cors);
  await app.listen(3666);
  console.log('Server is running on http://localhost:3666');
}
server().catch((error) => {
  console.error('Error: ' + error);
  process.exit(1);
})