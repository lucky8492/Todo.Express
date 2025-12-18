import express from "express"
import cors from "cors"

const app = express();
let cnt = 1
const todo = [];

app.use(express.json());
app.use(cors())


app.get('/', function(req, res){
  res.send(todo);
});


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