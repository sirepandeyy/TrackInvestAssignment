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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
var express_1 = __importDefault(require("express"));
var Employee = /** @class */ (function () {
    function Employee(database) {
        var _this = this;
        this.database = database;
        this.router = express_1.default.Router();
        var db = this.database.db();
        this.router.get("/", function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var query, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        query = "select e.*,d.d_name from employee e,department d WHERE e.dept=d.d_id and e.active=$1";
                        return [4 /*yield*/, db.query(query, [true])];
                    case 1:
                        result = _a.sent();
                        res.json(result.rows);
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [3 /*break*/, 3];
                    case 3:
                        next();
                        return [2 /*return*/];
                }
            });
        }); });
        this.router.get("/:id", function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var id, query, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        query = "select e.*,d.d_name from employee e,department d WHERE e.dept=d.d_id and e_id=$1";
                        return [4 /*yield*/, db.query(query, [id])];
                    case 1:
                        result = _a.sent();
                        if (result.rowCount != 0)
                            res.status(200).json(result.rows);
                        else
                            res.status(404).json({ message: 'not found' });
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        console.log(err_2);
                        res.status(500).json({
                            success: false,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        this.router.get("/sortby/:key", function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var key, query, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        key = req.params.key;
                        if (!(key == "age" || key == "dept" || key == "e_name" || key == 'e_id')) return [3 /*break*/, 2];
                        query = "select e.*,d.d_name from employee e,department d WHERE e.dept=d.d_id ORDER BY " + req.params.key;
                        return [4 /*yield*/, db.query(query)];
                    case 1:
                        result = _a.sent();
                        res.status(200).json(result.rows);
                        return [3 /*break*/, 3];
                    case 2:
                        res.status(422).json({ success: false, message: "Invalid sort" });
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        err_3 = _a.sent();
                        console.log(err_3);
                        res.status(500).json({
                            success: false,
                        });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
        this.router.get("/searchby/:key", function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var key, query, result, data, final, _i, data_1, d, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        key = req.params.key;
                        query = "select e.*,d.* from employee e,department d WHERE e.dept=d.d_id";
                        return [4 /*yield*/, db.query(query)];
                    case 1:
                        result = _a.sent();
                        data = result.rows;
                        final = [];
                        for (_i = 0, data_1 = data; _i < data_1.length; _i++) {
                            d = data_1[_i];
                            if (JSON.stringify(d).toLowerCase().includes(key.toLowerCase())) {
                                final.push(d);
                            }
                        }
                        if (final.length)
                            res.status(200).json(final);
                        else
                            res.status(404).json(final);
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _a.sent();
                        console.log(err_4);
                        res.status(500).json({
                            success: false,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        this.router.post("/", function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var data, result1, query, result, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        data = req.body;
                        return [4 /*yield*/, db.query("SELECT * FROM department WHERE d_id=$1", [data.dept])];
                    case 1:
                        result1 = _a.sent();
                        if (result1.rowCount == 0) {
                            return [2 /*return*/, res
                                    .status(422)
                                    .json({ success: false, message: "Invalid department" })];
                        }
                        query = "INSERT INTO employee(e_name,dept,age) VALUES($1,$2,$3)";
                        return [4 /*yield*/, db.query(query, [data.e_name, data.dept, data.age])];
                    case 2:
                        result = _a.sent();
                        res.status(201).json({ success: true });
                        return [3 /*break*/, 4];
                    case 3:
                        err_5 = _a.sent();
                        console.log(err_5);
                        res.status(500).json({
                            success: false,
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        this.router.put("/:id", function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var data, query, result, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        data = req.body;
                        query = "UPDATE employee SET e_name=$1,dept=$2,age=$3 WHERE e_id=$4";
                        return [4 /*yield*/, db.query(query, [
                                data.e_name,
                                data.dept,
                                data.age,
                                req.params.id,
                            ])];
                    case 1:
                        result = _a.sent();
                        if (result.rowCount == 1)
                            res.status(200).json({ success: true });
                        else
                            res.status(422).json({ success: false, message: "Failed to update" });
                        return [3 /*break*/, 3];
                    case 2:
                        err_6 = _a.sent();
                        console.log(err_6);
                        res.status(500).json({
                            success: false,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        this.router.delete("/:id", function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var query, result, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        query = "UPDATE employee SET active=$1 WHERE e_id=$2";
                        return [4 /*yield*/, db.query(query, [false, req.params.id])];
                    case 1:
                        result = _a.sent();
                        if (result.rowCount == 1)
                            res.status(200).json({ success: true });
                        else
                            res.status(422).json({ success: false, message: "Failed to delete" });
                        return [3 /*break*/, 3];
                    case 2:
                        err_7 = _a.sent();
                        console.log(err_7);
                        res.status(500).json({
                            success: false,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    }
    Employee.prototype.route = function () {
        return this.router;
    };
    return Employee;
}());
exports.Employee = Employee;
