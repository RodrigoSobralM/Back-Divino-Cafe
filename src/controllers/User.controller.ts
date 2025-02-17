import { Request, Response } from "express";
import { UserService } from "../services/index.service";
import { User } from "../models/User.model";
import { UserDTO } from "../dto/User.dto";
import { json } from "stream/consumers";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async createUser(req: Request, res: Response): Promise<void> {
    const { nome, email, senha, telefone, tipo } = req.body;

    if (!nome || !email || !senha) {
      res.status(400).json({
        message: "Todos os campos são obrigatórios",
      });
    }

    try {
      const user = await this.userService.createUser(
        nome,
        email,
        senha,
        telefone,
        tipo
      );
      res.status(201).json({
        message: "Usuário criado com sucesso",
        user,
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Erro ao criar usuário",
        error: error.message,
      });
    }
  }

  async searchAll(res: Response): Promise<void> {
    try {
      const users = await this.userService.serchAll();
      res.status(200).json({
        message: "Usuários encontrados com sucesso!",
        users,
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Erro ao buscar usuários",
        error: error.message,
      });
    }
  }

  async searchById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const userId = Number(id)

    if (isNaN(userId)) {
      res.status(400).json({
        message: "O ID é obrigatório",
      });
      return;
    }

    try {
      const user = await this.userService.searchById(userId);

      if (!user) {
        res.status(404).json({
          message: "Usuário não encontrado",
        });
        return;
      }

      res.status(200).json({
        message: "Usuário encontrado com sucesso!",
        user,
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Erro desconhecido ao buscar o usuário.",
        error: error.message
      })
    }
  }
}
