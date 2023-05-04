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
exports.create = void 0;
const Company_1 = __importDefault(require("../../db/models/Company"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestData = extractData(req);
        let company = yield createCompany(requestData);
        return res.send(company);
    }
    catch (error) {
        console.log(error);
        return res.send(error);
    }
});
exports.create = create;
function extractData(req) {
    try {
        const { cnpj, stateRegistration, razaoSocial, nomeFantasia, phone, email, state, city, neighborhood, address, schemaName } = req.body;
        return { cnpj, stateRegistration, razaoSocial, nomeFantasia, phone, email, state, city, neighborhood, address, schemaName };
    }
    catch (error) {
        throw new Error(`${error}`);
    }
}
function createCompany(request) {
    return __awaiter(this, void 0, void 0, function* () {
        const newCompany = { cnpj: request.cnpj, stateRegistration: request.stateRegistration, razaoSocial: request.razaoSocial, nomeFantasia: request.nomeFantasia, phone: request.phone, email: request.email, state: request.state, city: request.city, neighborhood: request.neighborhood, address: request.address, schemaName: request.schemaName };
        let company = yield Company_1.default.schema('qrcodebaradmin').create(newCompany);
        company = company.dataValues;
        return {
            cnpj: company.cnpj,
            stateRegistration: company.stateRegistration,
            razaoSocial: company.razaoSocial,
            nomeFantasia: company.nomeFantasia,
            phone: company.phone,
            email: company.email,
            state: company.state,
            city: company.city,
            neighborhood: company.neighborhood,
            address: company.address
        };
    });
}
