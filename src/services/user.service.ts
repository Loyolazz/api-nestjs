import {UsernameInUseException} from "../utils/exceptions/unauthorized.exception";
import {PrismaService} from "../database/prisma.service";
//import {User} from "@prisma/client";
import {Users} from "../models/user.model";


export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAllUsers(): Promise<Users[]> {
    return this.prisma.user.findMany();
  }

}