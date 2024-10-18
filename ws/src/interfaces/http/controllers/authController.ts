import { Request, Response } from "express";
import {
  registerUser,
  loginUser,
  getUserDetails,
} from "@/application/use-cases/authUseCase";
import { LoginDTO, UserDTO } from "@/application/dtos/userDTO";
import { verifyToken } from "@/shared/utils/tokenManager";

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const userData = UserDTO.parse(req.body);
      const user = await registerUser(userData);
      res.status(201).json({ user });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async login(req: Request, res: Response) {
    try {
      // Valida o corpo da requisição com o DTO de Login
      const loginData = LoginDTO.parse(req.body);
      const token = await loginUser(loginData);

      if (token) {
        res.json({ token }); // Retorna o token de autenticação
      } else {
        res.status(401).json({ error: "Invalid credentials" }); // Credenciais inválidas
      }
    } catch (error) {
      this.handleError(res, error); // Trata os erros de validação e outros
    }
  }

  async verifyAccess(req: Request, res: Response) {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Token is required" });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ error: "Invalid token" });
    }

    try {
      // Pega os detalhes do usuário pelo ID do token
      const user = await getUserDetails(decoded.id);

      res.status(200).json({
        name: user.name,
        role: user.role,
        profilePicture: user.profilePicture,
      });
    } catch (error) {
      res.status(404).json({ error: "User not found" });
    }
  }

  private handleError(res: Response, error: any) {
    const status = error.status || 400;
    const message = error.message || "Internal Server Error";
    res.status(status).json({ error: message });
  }
}
