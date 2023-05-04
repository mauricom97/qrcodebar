"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tableCompany_1 = __importDefault(require("./tableCompany"));
const item_1 = __importDefault(require("./item"));
const company_1 = __importDefault(require("./company"));
const collaborator_1 = __importDefault(require("./collaborator"));
const collaboratorLogin_1 = __importDefault(require("./collaboratorLogin"));
const router = express_1.default.Router();
router.use('/tableCompany', tableCompany_1.default);
router.use('/item', item_1.default);
router.use('/company', company_1.default);
router.use('/collaborator', collaborator_1.default);
router.use('/collaboratorLogin', collaboratorLogin_1.default);
exports.default = router;
