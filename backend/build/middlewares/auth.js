"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Company_1 = __importDefault(require("../db/models/Company"));
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.token ? req.headers.token : req.query.token;
        if (!token)
            return res.status(401).send({ auth: false, message: 'No token provided.' });
        const collaboratorConfig = extractDataToken(token);
        let company = yield Company_1.default.findOne({ where: { uuid: collaboratorConfig.company_uuid } });
        company = company ? company.dataValues : null;
        req.collaborator = collaboratorConfig;
        req.company = company;
        next();
    }
    catch (error) {
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }
});
exports.auth = auth;
function extractDataToken(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWTKEY);
        return decoded;
    }
    catch (error) {
        throw new Error(`${error}`);
    }
}
