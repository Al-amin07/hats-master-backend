import { Router } from "express";
import auth from "../../middlewares/auth";
import { CapController } from "./product.controller";

const route = Router()

route.post('/',  CapController.create)
route.get('/', CapController.findMany)
route.get('/:productId', CapController.findById)
route.patch('/:productId', CapController.update)
route.delete('/:productId', CapController.remove)

export const productRoute = route