import { EquipmentController } from "@/interfaces/http/controllers/equipmentController";
import * as equipmentService from "@/application/use-cases/equipmentUseCase";
import { Request, Response } from "express";

jest.mock("@/application/use-cases/equipmentUseCase");

describe("Equipment Controller", () => {
  let equipmentController: EquipmentController;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    equipmentController = new EquipmentController();
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  const equipmentData = {
    name: "Projector",
    type: "Electronics",
    quantity: 10,
  };

  const equipmentEntity = { id: 1, ...equipmentData };

  it("should create an equipment", async () => {
    (equipmentService.createEquipment as jest.Mock).mockResolvedValue(
      equipmentEntity
    );

    req.body = equipmentData;

    await equipmentController.create(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(equipmentEntity);
  });

  it("should get all equipments", async () => {
    (equipmentService.getAllEquipments as jest.Mock).mockResolvedValue([
      equipmentEntity,
    ]);

    await equipmentController.getAll(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith([equipmentEntity]);
  });

  it("should get equipment by id", async () => {
    (equipmentService.getEquipmentById as jest.Mock).mockResolvedValue(
      equipmentEntity
    );

    req.params = { id: "1" };

    await equipmentController.getById(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(equipmentEntity);
  });

  it("should update an equipment", async () => {
    const updatedData = {
      name: "Updated Projector",
      type: "Updated Electronics",
      quantity: 5,
    };
    const updatedEntity = { id: 1, ...updatedData };

    (equipmentService.updateEquipment as jest.Mock).mockResolvedValue(
      updatedEntity
    );

    req.params = { id: "1" };
    req.body = updatedData;

    await equipmentController.update(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(updatedEntity);
  });

  it("should delete an equipment", async () => {
    const deletedEntity = { id: 1 };

    (equipmentService.deleteEquipment as jest.Mock).mockResolvedValue(
      deletedEntity
    );

    req.params = { id: "1" };

    await equipmentController.remove(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith({
      message: "Equipment deleted",
      id: deletedEntity.id,
    });
  });
});
