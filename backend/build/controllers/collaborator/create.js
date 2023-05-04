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
const Collaborator_1 = __importDefault(require("../../db/models/Collaborator"));
const moment_1 = __importDefault(require("moment"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestData = extractData(req);
        const collaborator = yield createCollaborator(requestData);
        return res.send(collaborator);
    }
    catch (error) {
        console.log(error);
        res.send(error);
    }
});
exports.create = create;
function extractData(request) {
    try {
        const { firstName, lastName, email, phone, birthday, type } = request.body;
        return { firstName, lastName, email, phone, birthday, type };
    }
    catch (error) {
        throw new Error(`${error}`);
    }
}
function createCollaborator(request) {
    return __awaiter(this, void 0, void 0, function* () {
        const newCollaborator = { firstName: request.firstName, lastName: request.lastName, email: request.email, phone: request.phone, birthday: (0, moment_1.default)(request.birthday, 'YYYY-MM-DD').format('YYYY-MM-DD'), type: request.type };
        console.log(newCollaborator);
        let collaborator = yield Collaborator_1.default.schema('qrcodebaradmin').create(newCollaborator);
        collaborator = collaborator.dataValues;
        return {
            firstName: collaborator.firstName,
            lastName: collaborator.lastName,
            email: collaborator.email,
            phone: collaborator.phone,
            birthday: collaborator.birthday,
            type: collaborator.type
        };
    });
}
