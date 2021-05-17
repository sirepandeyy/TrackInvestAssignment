import express, { Router } from 'express';
export class Department{
    private router:Router = express.Router();
    constructor(private database:any){
        const db = this.database.db();
        this.router.get('/',async (req,res,next)=>{
            try{
                const query='select * from department WHERE active =$1';
                var result = await db.query(query,[true]);
                res.json(result.rows)
            }
            catch(err){
                console.log(err)
            }
            next();
        })
        this.router.get('/:id',async (req,res,next)=>{
            try{
                const id = req.params.id
                const query='select * from department where d_id=$1';
                var result = await db.query(query,[id]);
                if(result.rowCount!=0)res.status(200).json(result.rows);
                else res.status(404).json({message:'not found'});
            }
            catch(err){
                console.log(err)
                res.status(500).json({
                    success:false
                })
            }
        })
        this.router.get('/sortby/:key',async (req,res,next)=>{
            try{
                var key=req.params.key;
                if(key=='d_name' || key=='d_id'){
                    const query='select * from department ORDER BY '+req.params.key;
                    var result = await db.query(query);
                    res.status(200).json(result.rows)
                }else{
                    res.status(422).json({success:false,message:'Invalid sort'});
                }
            }
            catch(err){
                console.log(err)
                res.status(500).json({
                    success:false
                })
            }
        })
        this.router.post('/',async (req,res,next)=>{
            try{
                var data=req.body;
                const query='INSERT INTO department(d_name) VALUES($1)';
                var result = await db.query(query,[data.d_name]);
                res.status(201).json({success:true})
            }
            catch(err){
                console.log(err)
                res.status(500).json({
                    success:false
                })
            }
        })
        this.router.put('/:id',async (req,res,next)=>{
            try{
                var data=req.body;
                const query='UPDATE department SET d_name=$1 WHERE d_id=$2';
                var result = await db.query(query,[data.d_name,req.params.id]);
                if(result.rowCount==1)res.status(200).json({success:true})
                else res.status(422).json({success:false,message:'Failed to update'})
            }
            catch(err){
                console.log(err)
                res.status(500).json({
                    success:false
                })
            }
        })
        // http://localhost:3001/department/:id (:Delete)
        this.router.delete('/:id',async (req,res,next)=>{
            try{
                const query='UPDATE department SET active=$1 WHERE d_id=$2';
                var result = await db.query(query,[false,req.params.id]);
                if(result.rowCount==1)res.status(200).json({success:true})
                else res.status(422).json({success:false,message:'Failed to delete'})
            }
            catch(err){
                console.log(err)
                res.status(500).json({
                    success:false
                })
            }
        })
    }
    route():Router{
        return this.router
    }
}


// 2. log 
// 3. swagger
// 4. Docker
// 5. Screen record 
