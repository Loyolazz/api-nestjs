import {UserService} from "../services/user.service";
import {Controller, Get, HttpStatus, Req, Res} from "@nestjs/common";
import {Request, Response} from "express";
import {MESSAGES} from "../utils/messages/user.message";

@Controller('users')
export class UserControllers {
    constructor(private readonly userService: UserService) {}

        /**
     * Recupera todos os usuários do banco de dados.
     *
     * @param {Request} req - O objeto de solicitação recebido.
     * @param {Response} res - O objeto de resposta.
     * @returns {Promise<any>} - Uma promessa que resolve para o objeto de resposta.
     *
     * A função envia uma solicitação GET para o ponto de extremidade '/users'. Ela recupera todos os usuários do banco de dados usando o
     * `userService.findAllUsers()` métod. Se os usuários são recuperados com êxito, ela envia uma resposta JSON com um código de status
     * de 200 e os usuários recuperados. Se não forem encontrados usuários, ela envia uma resposta JSON com um código de status de 404.
     * Se ocorrer um erro durante o processo de recuperação, ela envia uma resposta JSON com um código de status de 500.
     */
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
                message: MESSAGES.INTERNAL_SERVER_ERROR.description || (err as Error).message,
            });
        }
    }
}