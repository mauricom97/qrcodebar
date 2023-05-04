"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.create = void 0;
const TableCompany_1 = __importDefault(require("../../db/models/TableCompany"));
const QrCode_1 = __importDefault(require("../../db/models/QrCode"));
const qr = __importStar(require("qrcode"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestData = extractData(req);
        const tableCompany = yield createTableCompany(req, requestData);
        const qrcode = yield createQrCode(req, tableCompany);
        return res.send({ num: tableCompany.num, description: tableCompany.description, qrcode: qrcode });
    }
    catch (error) {
        console.log(error);
        return res.send(error);
    }
});
exports.create = create;
function extractData(request) {
    try {
        return {
            num: request.body.num,
            description: request.body.description
        };
    }
    catch (error) {
        console.log(error);
        throw new Error(`${error}`);
    }
}
function createTableCompany(req, request) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let table = yield TableCompany_1.default.schema(req.company.schemaName).create(request);
            table = table.dataValues;
            return table;
        }
        catch (error) {
            console.log(error);
            throw new Error(`${error}`);
        }
    });
}
function createQrCode(req, tableCompany) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = generateToken({ dbname: req.company.schemaName, company_uuid: req.company.uuid, table_uuid: tableCompany.uuid });
            const url = `http://10.199.11.41:8080?token=${token}`;
            const qrCodeUrl = yield qr.toDataURL(url);
            yield QrCode_1.default.schema(req.company.schemaName).create({ uuid_company_table: tableCompany.uuid, image: qrCodeUrl });
            return qrCodeUrl;
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    });
}
function generateToken(payload) {
    const options = { expiresIn: '1y' };
    const secret = process.env.JWTKEY; // coloque sua chave secreta aqui
    const token = jsonwebtoken_1.default.sign(payload, secret, options);
    return token;
}
