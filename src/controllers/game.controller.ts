import { Body, Controller, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../authentication/auth.guard';
import axios from 'axios';

@Controller('games')
export class GameController {

  @UseGuards(JwtAuthGuard)
  @Post('/steam-apps')
  async searchGames(
    @Res() res: Response,
    @Body('name') name?: string,
    @Body('page') page: number = 1,
  ): Promise<any> {
    try {
      const apiKey = process.env.sApiK;

      // 1. Se o 'name' for passado, busca um jogo específico
      if (name) {
        const { exactMatch, similarGames } = await this.searchSpecificGame(name, apiKey);
        return res.status(HttpStatus.OK).json({
          status: HttpStatus.OK,
          message: exactMatch ? 'Game found' : 'No exact match found',
          exactMatch: exactMatch ? exactMatch : null,
          similarGames: similarGames.length ? similarGames : 'No similar games found',
        });
      }

      // 2. Se não houver 'name', retorna a página de jogos
      const allGames = await this.getAllGames(apiKey, page);
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: allGames.length ? 'All games retrieved successfully' : 'No more games to display',
        data: allGames,
      });

    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to fetch games',
      });
    }
  }

  // Função para buscar todos os jogos paginados
  private async getAllGames(apiKey: string, page: number): Promise<any[]> {
    const pageSize = 50000; // Limite de 50k jogos por página
    const lastAppId = (page - 1) * pageSize; // Calcula o último appId com base na página atual

    const response = await axios.get('https://api.steampowered.com/IStoreService/GetAppList/v1/', {
      params: {
        key: apiKey,
        include_games: true,
        include_dlc: true,
        max_results: pageSize,
        last_appid: lastAppId
      }
    });

    const games = response.data?.apps ?? [];
    return games;
  }

  // Função para buscar um jogo específico e os similares
  private async searchSpecificGame(name: string, apiKey: string): Promise<{ exactMatch: any | null, similarGames: any[] }> {
    const response = await axios.get('https://api.steampowered.com/IStoreService/GetAppList/v1/', {
      params: {
        key: apiKey,
        include_games: true,
        include_dlc: true,
      }
    });

    const games = response.data?.apps ?? [];

    // 1. Filtra o jogo exato pelo nome
    const exactMatch = games.find((game: any) => game.name.toLowerCase() === name.toLowerCase()) || null;

    // 2. Filtra os jogos que contêm o nome, mas não são o exato
    const similarGames = games.filter((game: any) =>
      game.name.toLowerCase().includes(name.toLowerCase()) && game.name.toLowerCase() !== name.toLowerCase()
    );

    return { exactMatch, similarGames };
  }
}
