"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactRoute = void 0;
// contact.route.ts
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const contact_controller_1 = require("./contact.controller");
const route = (0, express_1.Router)();
route.post('/', (0, auth_1.default)('admin'), contact_controller_1.contactController.createContact);
route.post('/contact-us', contact_controller_1.contactController.contactUs);
route.get('/', contact_controller_1.contactController.getAllContact);
route.get('/:contactId', contact_controller_1.contactController.getSingleContact);
route.patch('/:contactId', (0, auth_1.default)('admin'), contact_controller_1.contactController.updateContact);
route.delete('/:contactId', (0, auth_1.default)('admin'), contact_controller_1.contactController.deleteContact);
exports.contactRoute = route;
