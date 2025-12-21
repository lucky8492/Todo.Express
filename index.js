import express from "express"
import cors from "cors"
import jwt from 'jsonwebtoken'
const SECRET_KEY = "LKY"

const app = express();
let cnt = 1
const todo = [];
const users = [];

app.use(express.json());
app.use(cors())

//middleware
function auth(req, res, next){
  const authorization  = req.headers.token
  const decodedInfo = jwt.verify(authorization,SECRET_KEY); 
  if(decodedInfo){
    req.username = decodedInfo.username
    next()
  }else{
    res.send("Invalid token")
  }
}

//root element
app.get('/', function(req, res){
  res.send(todo);
});

//signup
app.post("/signup" , function(req, res){
   const username = req.body.username;
   const password = req.body.password;
     if(username == ""){
    res.send("Please enter Username")
  }else if(password == ""){
    res.send("Please enter Password")
  }
   const foundUser = users.find((e) => e.username === username);
   if(foundUser){
    res.send("This username already exist")
   }else{
    users.push({
      username : username,
      password:password
    })
    res.send("You are succefully signed up")
   }
})

//signin
app.post("/signin" , function(req, res){
  const username = req.body.username
  const password = req.body.password
  if(username == ""){
    res.json({
      token:0,
      message:"Please enter Username"})
  }else if(password == ""){
    res.json({
      token:0,
      message :"Please enter Password"})
  }
  const foundUser  = users.find((e) =>e.username === username && e.password === password)

  if(foundUser){
    const token = jwt.sign({username} , SECRET_KEY);
    res.json({
      token : token,
      message: "You are logged in"
    }) 
  }else{
    res.json({
      token:0,
      message :"Invlid Username or Password"});
  }

})

//user section
app.get("/user" , auth ,  function(req, res){
  const decodedInfo  = req.username
  
    res.send(decodedInfo)//read.file
 
})




//todo section
app.post('/', function(req, res){
   const a = req.body.a
   todo.push({
    id : cnt,
    task: a
   })
   cnt++
   console.log("Data from backend that has been pushed in Todo: " , a)
   res.json(todo);

});


app.put('/' , function(req, res){
    const n = todo.length
    const upadatedId = parseInt(req.body.id)//req.query.id use kar sakte hai 
    const a = req.body.a
    for(let i = 0; i < n; i++){
        if(todo[i].id === upadatedId){
        todo[i].task = a;
        }     
   }
   res.send(todo)
});


app.delete('/', function(req, res){
    const n = todo.length
    if(n== 0){
      cnt = 1;
    }
    const upadatedId = parseInt(req.query.id)
    const idx  = todo.findIndex(item => item.id === upadatedId)
    
    if(idx != -1 ){
        todo.splice(idx ,1);
    }
  res.send(todo);
   if(cnt > 1 )cnt--;
});

app.listen(3000, () => {
    console.log("The port is running on port: 3000")
})