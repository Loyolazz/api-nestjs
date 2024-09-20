import {Module} from "@nestjs/common";
import {UserControllers} from "../controllers/user.controller";
import {UserService} from "../services/user.service";
import {PrismaService} from "../database/prisma.service";


@Module({
    controllers: [UserControllers],
    providers: [UserService, PrismaService],
})
 export class UserModule{ }