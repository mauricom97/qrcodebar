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
const Item_1 = __importDefault(require("../../db/models/Item"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestData = extractData(req);
        const item = yield createItem(req, requestData);
        return res.send(item);
    }
    catch (error) {
        console.log(error);
        return res.send(error);
    }
});
exports.create = create;
function extractData(request) {
    try {
        const { name, price, menu, description, category } = request.body;
        return { name, price, menu, description, category };
    }
    catch (error) {
        throw new Error(`${error}`);
    }
}
function createItem(req, request) {
    return __awaiter(this, void 0, void 0, function* () {
        const newItem = { name: request.name, price: request.price, menu: request.menu, description: request.description, category: request.category };
        let item = yield Item_1.default.schema(req.company.schemaName).create(newItem);
        item = item.dataValues;
        return {
            name: item.name,
            price: item.price,
            menu: item.menu,
            category: item.category
        };
    });
}
