"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryHandlingRoute = exports.productRoute = exports.employeeRoute = exports.gtgRoute = void 0;
const gtgRoute_1 = __importDefault(require("./gtgRoute"));
exports.gtgRoute = gtgRoute_1.default;
const employeeRoutes_1 = __importDefault(require("./employeeRoutes"));
exports.employeeRoute = employeeRoutes_1.default;
const productRoutes_1 = __importDefault(require("./productRoutes"));
exports.productRoute = productRoutes_1.default;
const queryHandlingRoutes_1 = __importDefault(require("./queryHandlingRoutes"));
exports.queryHandlingRoute = queryHandlingRoutes_1.default;
