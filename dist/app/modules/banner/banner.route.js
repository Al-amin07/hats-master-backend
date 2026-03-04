"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bannerRoute = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const banner_controller_1 = require("./banner.controller.");
const route = (0, express_1.Router)();
route.post('/', (0, auth_1.default)('admin'), banner_controller_1.bannerController.createBanner);
route.get('/', banner_controller_1.bannerController.getAllBanner);
route.get('/:bannerId', banner_controller_1.bannerController.getSingleBanner);
route.patch('/:bannerId', (0, auth_1.default)('admin'), banner_controller_1.bannerController.updateBanner);
route.delete('/:bannerId', (0, auth_1.default)('admin'), banner_controller_1.bannerController.deleteBanner);
exports.bannerRoute = route;
