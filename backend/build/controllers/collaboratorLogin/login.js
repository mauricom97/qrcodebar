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
exports.login = void 0;
const CollaboratorLogin_1 = __importDefault(require("../../db/models/CollaboratorLogin"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestData = extractData(req);
        const collaborator = yield getCollaboratorLogin(requestData);
        const token = generateToken(collaborator);
        return res.send({ token });
    }
    catch (error) {
        console.log(error);
        res.send(error);
    }
});
exports.login = login;
function extractData(request) {
    try {
        const { username, password } = request.body;
        return { username, password };
    }
    catch (error) {
        throw new Error(`${error}`);
    }
}
function getCollaboratorLogin(request) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collaborator = yield CollaboratorLogin_1.default.schema('qrcodebaradmin').findOne({ where: { username: request.username } });
            if (collaborator) {
                const isMatch = yield bcryptjs_1.default.compare(request.password, collaborator.password);
                if (isMatch) {
                    return {
                        username: collaborator.username,
                        collaborator_uuid: collaborator.collaborator_uuid,
                        company_uuid: collaborator.company_uuid
                    };
                }
                else {
                    throw new Error('Password incorrect');
                }
            }
            else {
                throw new Error('Collaborator not found');
            }
        }
        catch (error) {
            console.log(error);
            throw new Error(`${error}`);
        }
    });
}
function generateToken(payload) {
    const secret = process.env.JWTKEY; // coloque sua chave secreta aqui
    const options = { expiresIn: '1h' }; // defina a expiração do token (opcional)
    const token = jsonwebtoken_1.default.sign(payload, secret, options);
    return token;
}
