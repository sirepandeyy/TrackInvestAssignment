"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
var pg_1 = __importDefault(require("pg"));
var Database = /** @class */ (function () {
    function Database() {
        this.database = null;
    }
    Database.prototype.connect = function () {
        this.database = new pg_1.default.Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'postgres',
            password: '12345678',
            port: 5432,
        });
        var connect = this.database.connect().then(function () {
            console.log('database successfully connected..');
        }).catch(function (err) {
            console.log(err);
        });
    };
    Database.prototype.db = function () {
        return this.database;
    };
    return Database;
}());
exports.Database = Database;
