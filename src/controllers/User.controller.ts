import { Request, Response } from "express";
import { UserService } from "../services/index.service";
import { User } from "../models/User.model";
import { UserDTO } from "../dto/User.dto";

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
}
