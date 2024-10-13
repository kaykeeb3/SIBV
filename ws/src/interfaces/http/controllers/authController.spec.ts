import { Request, Response } from "express";
import { AuthController } from "@/interfaces/http/controllers/authController";
import * as authUseCase from "@/application/use-cases/authUseCase";

jest.mock("@/application/use-cases/authUseCase");

describe("Auth Controller", () => {
  let req: Partial<Request>; // Usar Partial para permitir adicionar apenas o que é necessário
  let res: Partial<Response>; // Usar Partial para permitir adicionar apenas o que é necessário
  const authController = new AuthController();

  beforeEach(() => {
    req = {}; // Inicializa req como um objeto vazio
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(), // Retorna 'this' para encadear chamadas
    };
    jest.clearAllMocks();
  });

  it("should register a user", async () => {
    req.body = {
      name: "User Name",
      email: "user@example.com",
      password: "123456",
      institution: "Institution",
      limit: 10,
      role: "USER",
    };
    (authUseCase.registerUser as jest.Mock).mockResolvedValue({
      id: 1,
      email: "user@example.com",
    });

    await authController.register(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      user: { id: 1, email: "user@example.com" },
    });
  });

  it("should login a user", async () => {
    req.body = { email: "user@example.com", password: "123456" };
    (authUseCase.loginUser as jest.Mock).mockResolvedValue("jwt-token");

    await authController.login(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith({ token: "jwt-token" });
  });

  it("should return 401 for invalid credentials", async () => {
    req.body = { email: "user@example.com", password: "wrong_password" };
    (authUseCase.loginUser as jest.Mock).mockResolvedValue(null);

    await authController.login(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid credentials" });
  });

  // Adicione mais testes conforme necessário
});
