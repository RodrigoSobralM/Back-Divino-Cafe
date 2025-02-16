import { User } from "../models/index.model";

export class UserDTO {
  id?: number;
  nome: string;
  email: string;
  telefone?: string;
  dataCriacao?: Date;

  constructor(user: User) {
    this.id = user.getId();
    this.nome = user.getNome();
    this.email = user.getEmail();
    this.telefone = user.getTelefone();
    this.dataCriacao = user.getDataCriacao();
  }
}
