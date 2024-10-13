import { UserRepository } from "@/infra/repositories/userRepository";
import { hashPassword, comparePassword } from "@/shared/utils/hashPassword";
import { generateToken } from "@/shared/utils/tokenManager";
import { LoginDTO, UserDTO } from "@/application/dtos/userDTO";
import { User } from "@/domain/entities/userEntity";

const userRepository = new UserRepository();

export async function registerUser(data: UserDTO): Promise<User> {
  const hashedPassword = await hashPassword(data.password);
  const userData = { ...data, password: hashedPassword }; // Adiciona a senha hash
  return userRepository.createUser(userData);
}

export async function loginUser(data: LoginDTO): Promise<string | null> {
  const user = await userRepository.getUserByEmail(data.email);

  if (user && (await comparePassword(data.password, user.password))) {
    return generateToken({ id: user.id }); // Gera o token usando o ID do usuário
  }
  return null;
}
