import {UserService} from "../services/user.service";
import {Controller, Get, HttpStatus, Req, Res} from "@nestjs/common";
import {Request, Response} from "express";
import {MESSAGES} from "../utils/messages/user.message";

@Controller('users')
export class UserControllers {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getAllUsers(@Req() req: Request, @Res() res: Response):Promise<any> {
        try {
            const result = await this.userService.findAllUsers();
            if (!result) {
                res.status(HttpStatus.NOT_FOUND).json({
                    code: MESSAGES.ERROR_RETURN_ALL_USER.code,
                    message: MESSAGES.ERROR_RETURN_ALL_USER.description,
                });
                return;
            }
            return res.status(HttpStatus.OK).json({
                status: MESSAGES.RETURN_ALL_USER.code,
                message: MESSAGES.RETURN_ALL_USER.description,
                result: result
            });
        }catch (err){
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: MESSAGES.INTERNAL_SERVER_ERROR.code,
                message: MESSAGES.INTERNAL_SERVER_ERROR.description,
            });
        }
    }
}