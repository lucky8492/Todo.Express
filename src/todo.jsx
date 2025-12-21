import axios from 'axios'
import {React , useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

function todo() {
  const [val , setVal] = useState("")
  const [values , setValues] = useState("")
  const [id, setId] = useState()
  const [todo , setTodo] = useState([])
  const [editId , setEditId] = useState()
  const [editVal , setEditVal] = useState("")
  const [username , setUsername] = useState()
  const navigate = useNavigate()

 useEffect(()=> {
  console.log("This is inside useEffect val is:", val)
  if(val == "")return
    async function getTodo(){
      console.log("THis is inside getTodo function")
      const res = await axios.post("http://localhost:3000/" , {
      "a" : val,
    })
    const data = res.data
    console.log("This is data:" , data)
    setTodo(data)
    console.log("THis is ending of useEffect ")
    }
     getTodo()
     setVal("")
  },[values])

// Fetch all todos on component mount
useEffect(() => {
  async function fetchAllTodos(){
    try {
      const res = await axios.get("http://localhost:3000/")  // GET request to fetch all
      const data = res.data
      setTodo(data)
    } catch(e) {
      console.log("Error fetching todos:", e)
    }
  }
  fetchAllTodos()
}, [])  // Empty array = runs only once on mount

  function handleClick(){
    setValues(val)
  }
   function handleEdit(todoId){
   setEditId(todoId)
  }
  async function newHandleEdit(todoId , todoTask){
   if(!todoId || !todoTask)return

    try{
    const res = await axios.put("http://localhost:3000" , {
      "id": todoId,
      "a" : todoTask
    })
    const data = res.data
    setTodo(data)
     setEditVal("")
     setEditId(null)
    }catch(e){
      console.log("error was: " , e);
    }
      
  }

  async function handleWrong(todoId){
     if(todoId == "") return
     console.log("The id of the todo is:", id)
     const res = await axios.delete(`http://localhost:3000/?id=${todoId}`)
     const data = res.data
     setTodo(data)
  }




  async function getUserinfo(){
   try{
     const token = localStorage.getItem("token");
     const res = await axios.get("http://localhost:3000/user",{
      headers: {
        token : token
      }
     })
      setUsername(res.data)
   }catch(e){
      navigate("/signin")
   }
  } 
  getUserinfo()

  function logout(){
    localStorage.removeItem("token")
    getUserinfo()
  }

  return (
    <>
  <div className='bg-black h-screen  w-screen  '>
    <div className='flex justify-between w-full'>
      <div className='p-4 text-2xl font-bold'>welcome: {username}</div>
      <div onClick={logout} className='w-auto p-4 hover:cursor-pointer'>logout🔚</div>
    </div>
    <div className= 'flex flex-col justify-center  items-center  rounded-2xl p-4 m-2'>
     <div className='border-2  border-white p-2 m-2 rounded-3xl'>

        <div className='text-3xl text-white font-bold w-fit mb-4'>
          <p>This is TODO APP</p>
        </div>

        <div className='flex justify-between items-center gap-4 p-2'>
          
          <div className='bg-white text-black w-fit m-2 rounded-2xl'>
            <input id='userText' 
            value={val}
            onChange={(e) => setVal(e.target.value)} 
             placeholder='Enter any work' 
             className='outline-0 p-2 rounded-2xl text-black' />
          </div>

          <div>
            <button onClick={handleClick}  className='rounded-2xl bg-white text-white px-4 py-2 hover:bg-gray-200'>
              add
            </button>
          </div>

        </div>
  
     {todo?.map((item) => (
        <div key={item.id}  className='flex justify-between items-center w-full max-w-md mt-4'>

          {editId === item.id && (
            <>
            <input id='userText' 
             value={editVal}
             onChange={(e) => setEditVal(e.target.value)} 
             placeholder='enter new todo' 
             className='outline-0 p-2 rounded-2xl text-black bg-white ' /> 
             <button onClick={() => newHandleEdit(item.id , editVal)} className='hover:cursor-pointer m-1 p-2 bg-white rounded-lg'>
               ✔️
            </button>
            </>
          )}
          {editId != item.id && (
          <div className='bg-white text-black rounded-xl p-2 m-2 break-words w-64 overflow-wrap'>
            {item.task}
           </div>
          )}

          <div className='w-auto flex'>
            <button onClick={() => handleEdit(item.id)} className='hover:cursor-pointer m-1 p-2 bg-white rounded-lg'>
                ✏️
            </button>
            <button onClick={() => handleWrong(item.id)} className='hover:cursor-pointer m-1 p-2 bg-white rounded-lg'>
              ❌
            </button>
          </div>

        </div>
     ))
     }

      </div>
    </div>
   
     </div>
    </>
  )
}

export default todo
