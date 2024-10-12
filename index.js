const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

//conexion al servidor local
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"empleados_crud"
});

//peticion de guardado 
app.post("/create",(req,res)=>{
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;
   
    //obtecion devalores, y envio de estos a la base de datos.
    db.query('INSERT INTO empleados(nombre,edad,pais,cargo,anios) VALUES(?,?,?,?,?)',[nombre,edad,pais,cargo,anios],
       //para comprobar los guardados de los registros
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
    }
    );
});

//nuevo metodo: obtencion de datos
app.get("/empleados",(req,res)=>{
   
    //obtecion devalores, y envio de estos a la base de datos.
    db.query('SELECT * FROM empleados',
       //para comprobar los guardados de los registros
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
    }
    );
});

//insercion/actualizado de datos
app.put("/update",(req,res)=>{
    const id= req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;
   
    //obtecion devalores, y envio de estos a la base de datos.
    db.query('UPDATE empleados SET nombre=?,edad=?,pais=?,cargo=?,anios=? WHERE id=?',[nombre,edad,pais,cargo,anios, id],
       //para comprobar los guardados de los registros
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
    }
    );
});

//eliminado de empleado de la base de datos
app.delete("/delete/:id",(req,res)=>{
    const id= req.params.id; //ya no va body si no params de parametro
    //Eliminacion del usuario desde la busqueda del ID.
    db.query('DELETE FROM empleados WHERE id=?',id,
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
    }
    );
});

app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001")
})