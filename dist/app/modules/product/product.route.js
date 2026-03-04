"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoute = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const product_controller_1 = require("./product.controller");
const route = (0, express_1.Router)();
route.post('/', (0, auth_1.default)('admin'), product_controller_1.CapController.create);
route.get('/', product_controller_1.CapController.findMany);
route.get('/:productId', product_controller_1.CapController.findById);
route.patch('/:productId', product_controller_1.CapController.update);
route.delete('/:productId', product_controller_1.CapController.remove);
exports.productRoute = route;
