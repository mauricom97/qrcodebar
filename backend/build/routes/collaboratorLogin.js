"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const create_1 = require("../controllers/collaboratorLogin/create");
const login_1 = require("../controllers/collaboratorLogin/login");
const router = express_1.default.Router();
router.post('/create', create_1.create);
router.post('/login', login_1.login);
exports.default = router;
