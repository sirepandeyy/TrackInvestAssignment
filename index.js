"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var db_1 = require("./database/db");
var department_1 = require("./routes/department");
var employee_1 = require("./routes/employee");
var fs_1 = __importDefault(require("fs"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
var swaggerDocument = require('./swagger.json');
var Server = /** @class */ (function () {
    function Server(port) {
        if (port === void 0) { port = 3000; }
        this.app = express_1.default();
        this.db = new db_1.Database();
        this.options = {
            definition: {
                info: {
                    title: 'Employee Department Management',
                    version: '1.0.0',
                    description: 'Server to add/delete/update/get employee detail'
                },
                servers: [
                    {
                        url: 'http://localhost:3001'
                    }
                ]
            },
            apis: ["./routes/*.js"]
        };
        this.db.connect();
        this.startServer(port);
    }
    Server.prototype.startServer = function (port) {
        this.app.listen(port, "0.0.0.0", function () {
            console.log("The application is listening on port" + port);
        });
    };
    Server.prototype.createLog = function (req, res, next) {
        var requestdata = {
            url: req.url,
            body: req.body,
            reqTime: Date.now(),
            method: req.method
        };
        var date = new Date();
        date = new Date(date.setHours(0, 0, 0, 0));
        var location = "logs/" + date + ".txt";
        location = location.split(' ').join('_');
        try {
            var data = fs_1.default.readFileSync(location, 'utf8');
            data = eval(data);
            data.push(requestdata);
            fs_1.default.createWriteStream(location, 'utf8').write(JSON.stringify(data));
        }
        catch (err) {
            var newFile = fs_1.default.createWriteStream(location);
            newFile.write(JSON.stringify([requestdata]));
        }
        next();
    };
    Server.prototype.handleRoutes = function () {
        this.app.use(body_parser_1.default());
        var employeeRoute = new employee_1.Employee(this.db);
        var departmentRoute = new department_1.Department(this.db);
        this.app.use(this.createLog);
        var specs = swagger_jsdoc_1.default(this.options);
        this.app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
        this.app.use("/employee", employeeRoute.route());
        this.app.use("/department", departmentRoute.route());
    };
    return Server;
}());
var obj = new Server(3001);
obj.handleRoutes();
