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
const CollaboratorLogin_1 = __importDefault(require("../../db/models/CollaboratorLogin"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestData = extractData(req);
        const collaborator = yield createCollaboratorLogin(requestData);
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
        const { username, password, collaborator_uuid, company_uuid } = request.body;
        return { username, password, collaborator_uuid, company_uuid };
    }
    catch (error) {
        throw new Error(`${error}`);
    }
}
function createCollaboratorLogin(request) {
    return __awaiter(this, void 0, void 0, function* () {
        const newCollaborator = { username: request.username, password: yield getHash(request.password), collaborator_uuid: request.collaborator_uuid, company_uuid: request.company_uuid };
        console.log(newCollaborator);
        let collaborator = yield CollaboratorLogin_1.default.schema('qrcodebaradmin').create(newCollaborator);
        collaborator = collaborator.dataValues;
        return {
            username: collaborator.username,
            password: collaborator.password,
            collaborator_uuid: collaborator.collaborator_uuid,
            company_uuid: collaborator.company_uuid
        };
    });
}
function getHash(password) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hash = yield bcryptjs_1.default.hash(password, salt);
        return hash;
    });
}
;
