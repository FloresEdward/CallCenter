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
const express_1 = __importDefault(require("express"));
const queryHandlingService_1 = __importDefault(require("../services/queryHandlingService"));
const router = express_1.default.Router();
//find all
router.get('/', (req, resp, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queries = yield queryHandlingService_1.default.getInstance().findAll();
        resp.status(200).json(queries);
    }
    catch (err) {
        next(err);
    }
}));
router.get('/:id', (req, resp, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingQuery = yield queryHandlingService_1.default.getInstance().findById(req.params.id);
        if (existingQuery) {
            resp.status(200).json(existingQuery);
        }
        else {
            resp.status(404).json({
                message: `query_not_found: ${req.params.id}`,
            });
        }
    }
    catch (err) {
        next(err);
    }
}));
router.post('/', (req, resp, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = Object.assign({}, req.body);
        const newQueryHandling = yield queryHandlingService_1.default.getInstance().save(payload);
        resp.status(201).json(Object.assign({}, newQueryHandling.dataValues));
    }
    catch (err) {
        next(err);
    }
}));
router.put('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryId = req.params.id;
        const data = yield queryHandlingService_1.default.getInstance().update(queryId, Object.assign({}, req.body));
        res.status(200).json(data);
    }
    catch (err) {
        next(err);
    }
}));
router.delete('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryId = req.params.id;
        yield queryHandlingService_1.default.getInstance().deleteByPrimaryKey(queryId);
        res.status(200).json({
            message: `product_successfully_deleted: ${queryId}`,
        });
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
