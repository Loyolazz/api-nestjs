import { PrismaClient } from "@prisma/client";
import { prisma } from "../database/prisma.service";

export class Repository {
    protected db: PrismaClient;

    constructor() {
        this.db = prisma;
    }
}