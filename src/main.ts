import 'dotenv/config'

import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

const port = process.env.PORT

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bodyParser: true,
  })
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(port)
}

bootstrap()
