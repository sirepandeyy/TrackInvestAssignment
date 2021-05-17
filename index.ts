import express from "express";
import bodyParser from "body-parser";
import { Database } from "./database/db";
import { Department } from "./routes/department";
import { Employee } from "./routes/employee";
import fs from 'fs';

import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from "swagger-jsdoc";
const swaggerDocument = require('./swagger.json');

class Server {
  private app = express();
  private db = new Database();

  private options={
    definition:{
      info:{
        title:'Employee Department Management',
        version:'1.0.0',
        description:'Server to add/delete/update/get employee detail'
      },
      servers:[
        {
          url:'http://localhost:3001'
        }
      ]
    },
    apis:["./routes/*.js"]
  } 



  constructor(port = 3000) {
    this.db.connect();
    this.startServer(port);
  }
  startServer(port: number) {
    this.app.listen(port, "0.0.0.0", () => {
      console.log("The application is listening on port" + port);
    });
  }
  private createLog(req:any,res:any,next:any){
    var requestdata={
      url:req.url,
      body:req.body,
      reqTime:Date.now(),
      method:req.method
    };
    var date = new Date();
    date = new Date(date.setHours(0,0,0,0));
    var location = `logs/${date}.txt`
    location=location.split(' ').join('_');
    try{
      var data:any = fs.readFileSync(location, 'utf8');
      data = eval(data);
      data.push(requestdata);
      fs.createWriteStream(location, 'utf8').write(JSON.stringify(data));
    }
    catch(err){
      var newFile = fs.createWriteStream(location);
      newFile.write(JSON.stringify([requestdata]));
    }
      
    next();
  }
  handleRoutes() {
    this.app.use(bodyParser())
    var employeeRoute = new Employee(this.db);
    var departmentRoute = new Department(this.db);
    this.app.use(this.createLog)

    const specs = swaggerJSDoc(this.options)
    this.app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocument))
    this.app.use("/employee", employeeRoute.route());
    this.app.use("/department", departmentRoute.route());
  }
}
const obj = new Server(3001);
obj.handleRoutes()