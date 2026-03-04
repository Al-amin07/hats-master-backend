"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processRoute = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const process_controller_1 = require("./process.controller.");
const route = (0, express_1.Router)();
route.post('/', (0, auth_1.default)('admin'), process_controller_1.processController.createProcess);
route.get('/', process_controller_1.processController.getAllProcess);
route.get('/:processId', process_controller_1.processController.getSingleProcess);
route.patch('/:processId', (0, auth_1.default)('admin'), process_controller_1.processController.updateProcess);
route.delete('/:processId', (0, auth_1.default)('admin'), process_controller_1.processController.deleteProcess);
exports.processRoute = route;
