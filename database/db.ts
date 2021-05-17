import PG from "pg" ;

export class Database{

  private database:any=null;


  connect(){
    this.database= new PG.Pool({
        user:'postgres',
        host: 'localhost',
        database:'postgres',
        password: '12345678',
        port: 5432,
    })
    const connect= this.database.connect().then(()=>{
        console.log('database successfully connected..')
    }).catch((err:any)=>{
        console.log(err)
    })
  }


  db(){
      return this.database
  }
}