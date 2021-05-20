import express, { Router } from "express";

export class Employee {
  private router: Router = express.Router();
  constructor(private database: any) {
    const db = this.database.db();



    this.router.get("/", async (req, res, next) => {
      try {
        var result = await db.query("select e.*,d.d_name from employee e,department d WHERE e.dept=d.d_id and e.active=$1", [true]);
        res.json(result.rows);
      } catch (err) {
        console.log(err);
      }
      next();
    });
    this.router.get("/:id", async (req, res, next) => {
      try {
        const id = req.params.id;
        var result = await db.query("select e.*,d.d_name from employee e,department d WHERE e.dept=d.d_id and e_id=$1", [id]);
        if(result.rowCount!=0)res.status(200).json(result.rows);
        else res.status(404).json({message:'not found'});
      } catch (err) {
        console.log(err);
        res.status(500).json({
          success: false,
        });
      }
    });
    this.router.get("/sortby/:key", async (req, res, next) => {
      try {
        var key = req.params.key;
        if (key == "age" || key == "dept" || key == "e_name" || key=='e_id') {
          var result = await db.query("select e.*,d.d_name from employee e,department d WHERE e.dept=d.d_id ORDER BY " + req.params.key);
          res.status(200).json(result.rows);
        } else {
          res.status(422).json({ success: false, message: "Invalid sort" });
        }
      } catch (err) {
        console.log(err);
        res.status(500).json({
          success: false,
        });
      }
    });
    this.router.get("/searchby/:key", async (req, res, next) => {
      try {
        var key = req.params.key;
        var result = await db.query("select e.*,d.* from employee e,department d WHERE e.dept=d.d_id");
        const data = result.rows;
        var final = [];
        for (let d of data) {
          if (JSON.stringify(d).toLowerCase().includes(key.toLowerCase())) {
            final.push(d);
          }
        }
        if(final.length)res.status(200).json(final);
        else res.status(404).json(final)
      } catch (err) {
        console.log(err);
        res.status(500).json({
          success: false,
        });
      }
    });
    this.router.post("/", async (req, res, next) => {
      try {
        var data = req.body;
        const result1 = await db.query(
          "SELECT * FROM department WHERE d_id=$1",
          [data.dept]
        );
        if (result1.rowCount == 0) {
          return res
            .status(422)
            .json({ success: false, message: "Invalid department" });
        }
        var result = await db.query("INSERT INTO employee(e_name,dept,age) VALUES($1,$2,$3)", [data.e_name, data.dept, data.age]);
        res.status(201).json({ success: true });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          success: false,
        });
      }
    });
    this.router.put("/:id", async (req, res, next) => {
      try {
        var data = req.body;
        
        var result = await db.query("UPDATE employee SET e_name=$1,dept=$2,age=$3 WHERE e_id=$4", [
          data.e_name,
          data.dept,
          data.age,
          req.params.id,
        ]);
        if (result.rowCount == 1) res.status(200).json({ success: true });
        else
          res.status(422).json({ success: false, message: "Failed to update" });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          success: false,
        });
      }
    });
    this.router.delete("/:id", async (req, res, next) => {
      try {
        var result = await db.query("UPDATE employee SET active=$1 WHERE e_id=$2", [false, req.params.id]);
        if (result.rowCount == 1) res.status(200).json({ success: true });
        else
          res.status(422).json({ success: false, message: "Failed to delete" });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          success: false,
        });
      }
    });
  }
  route(): Router {
    return this.router;
  }
}
