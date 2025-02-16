import { Connection, ResultSetHeader, RowDataPacket } from "mysql2";
import { connectDb } from "../config/connectionDb";
import { User } from "../models/index.model";
import { UserDTO } from "../dto/index.dto";
import bcrypt from "bcrypt";

export class UserRepositories {
  private connection: Connection;

  constructor() {
    this.connection = connectDb();
  }

  async create(user: User) {
    return new Promise<UserDTO>((resolve, reject) => {
      const query = `
        INSERT INTO usuario (nome, email, senha, telefone, tipo) 
        VALUES (?, ?, ?, ?, ?)
      `;

      const senhaCriptografada = bcrypt.hashSync(user.getSenha(), 10);

      this.connection.query(
        query,
        [
          user.getNome(),
          user.getEmail(),
          senhaCriptografada,
          user.getTelefone(),
          user.getTipo(),
        ],
        (err, result: ResultSetHeader) => {
          if (err) {
            reject(err);
          } else {
            const novoUsuario = new User(
              user.getNome(),
              user.getEmail(),
              senhaCriptografada,
              user.getTelefone(),
              user.getTipo(),
              result.insertId,
              new Date()
            );
            resolve(new UserDTO(novoUsuario));
          }
        }
      );
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return new Promise<User | null>((resolve, reject) => {
      const query = "SELECT * FROM usuario WHERE email = ? LIMIT 1";

      this.connection.query(query, [email], (err, result: RowDataPacket[]) => {
        if (err) {
          reject(err);
        } else if (result.length === 0) {
          resolve(null); // Retorna null se o usuário não existir
        } else {
          const user = new User(
            result[0].nome,
            result[0].email,
            result[0].senha,
            result[0].telefone,
            result[0].tipo
          );
          resolve(user);
        }
      });
    });
  }
}
