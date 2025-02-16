import { UserRepositories } from "../repositories/User.repositories"
import { User } from "../models/index.model"
import { TipoUsuario } from "../models/index.model"
import { UserDTO } from "../dto/index.dto"

export class UserService {
    private userRepositories: UserRepositories

    constructor() {
        this.userRepositories = new UserRepositories()
    }

    async createUser(nome: string, email: string, senha: string, telefone: string, tipo: TipoUsuario): Promise<UserDTO> {
        const existeUsuario = await this.userRepositories.findByEmail(email)
        if(existeUsuario) {
            throw new Error("Email já cadastrado!")
        }

        const newUser = new User(nome, email, senha, telefone, tipo)

        return await this.userRepositories.create(newUser)
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return await this.userRepositories.findByEmail(email)
    }

    async serchAll(): Promise<UserDTO[]> {
        const users = await this.userRepositories.searchAll()
        return users
    }

}