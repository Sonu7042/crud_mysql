const express = require("express");
const app = express();
const connection=require('./config/db')
const bodyParser=require('body-parser')
const cors=require('cors')
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set("view engine", "ejs")


app.listen(9000, (error)=>{
  if(error) throw error

  console.log(`server listening port on ${9000}`)
});


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});


app.post('/create', (req,res)=>{
  try{
    const {name, email, password}=req.body
    connection.query('INSERT into employee(name,email,password) value(?,?,?)',[name, email, password],
    function(err){
      if(err)
      console.log(err)
    else(
      res.redirect("/data")
    )
    })

  }catch(err){
    console.log(err)

  }
})



app.get('/data',(req,res)=>{
  try{
    const alldata='select * from employee'
     const data=connection.query(alldata,(err,rows)=>{
      if(err){
        console.log(err)
      }
      else{
        res.render(__dirname + "/view/read.ejs",{rows})
      }
     })
    //  console.log(data)
  }
  catch (err){
    console.log(err)

  }
  
})


app.get('/delete-data',(req,res)=>{
  const deletedata= 'delete from employee where id=?'
  connection.query(deletedata,[req.query.id],(err,rows)=>{
    if(err){
      res.send(err)
    }else{
      res.redirect('/data')
    }
  })


})


app.get('/update-data',(req,res)=>{
  connection.query("select * from employee where id=?",
  [req.query.id],
  (err,eachRow)=>{
    if(err){
      res.send(err)
    }else{
      result = JSON.parse(JSON.stringify(eachRow[0]))
      // console.log(result)
      res.render(__dirname + "/view/edit.ejs", ({result}))
    }
  }
  )
  

})



//update route
//final update
app.post("/update", (req, res) => {
  const id_data = req.body.hidden_id;
  const name_data = req.body.name;
  const email_data = req.body.email;
  const password_data = req.body.password;



  const updateQuery = "update employee set name=?, email=?, password=? where id=?";

  connection.query(
    updateQuery,
    [name_data, email_data, password_data, id_data],
    (err, rows) => {
      if (err) {
        res.send(err);
      } else {
        res.redirect( "/data");
      }
    }
  );
});