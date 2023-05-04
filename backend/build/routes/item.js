"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const create_1 = require("../controllers/itens/create");
const menu_1 = require("../controllers/itens/menu");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.post('/create', auth_1.auth, create_1.create);
router.get('/menu', auth_1.auth, menu_1.menu);
exports.default = router;
