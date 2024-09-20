import { INestApplication, OnModuleInit} from "@nestjs/common";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export { prisma };

export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }
    async enableShutdownHooks(app: INestApplication) {
        // @ts-ignore
        this.$on('beforeExit', async () => {
          await app.close();
        });
    }
}