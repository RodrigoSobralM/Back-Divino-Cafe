export enum TipoUsuario {
  Cliente = "cliente",
  Admin = "admin",
}

export class User {
  private id?: number;
  private nome: string;
  private email: string;
  private senha: string;
  private telefone?: string;
  private tipo: TipoUsuario;
  private dataCriacao?: Date;

  constructor(
    nome: string,
    email: string,
    senha: string,
    telefone?: string,
    tipo?: TipoUsuario,
    id?: number,
    dataCriacao?: Date
  ) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.telefone = telefone;
    this.tipo = tipo?? TipoUsuario.Cliente;
    this.dataCriacao = dataCriacao;
  }

  // Getters
  getId(): number | undefined {
    return this.id;
  }

  getNome(): string {
    return this.nome;
  }

  getEmail(): string {
    return this.email;
  }

  getSenha(): string {
    return this.senha;
  }

  getTelefone(): string | undefined {
    return this.telefone;
  }

  getTipo(): TipoUsuario {
    return this.tipo;
  }

  getDataCriacao(): Date | undefined {
    return this.dataCriacao;
  }
}
