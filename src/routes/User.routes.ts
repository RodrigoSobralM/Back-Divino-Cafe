import { Request, Response, Router } from "express";
import { UserController } from "../controllers/index.controller";

const router = Router();
const userController = new UserController();

router.post("/users", async (req: Request, res: Response) => {
  await userController.createUser(req, res);
});

router.get("/users", async (req:Request, res: Response) => {
  await userController.searchAll(res)
})

export const UserRouter = router;
