import {React , useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function signin() {
    const [username , setUsername] =useState("");
    const [password , setPassword] =useState("");
    const [message , setMessage] = useState();
    const navigate  = useNavigate()

   async function login(){
     const res = await axios.post("http://localhost:3000/signin",{
      username : username,
      password: password
     })

     const isValidToNavigateTodo = res.data;

     if(isValidToNavigateTodo.token === 0){
       setMessage(isValidToNavigateTodo.message)
     }else{
       const token = isValidToNavigateTodo.token 
       localStorage.setItem("token" , token)
        navigate("/todo")
     }
     setUsername("")
     setPassword("")
    
   }

   function navigateSignup(){
      navigate("/")
   }


  return (
    <>
       <div className='bg-blue-800 flex flex-row justify-center items-center h-screen w-screen'>
       <div className='p-2 m-2  rounded-3xl'>
       <div className='pt-0 text-3xl font-extrabold mb-30'><h3>Get Started with TODO</h3></div> 
       <div className='bg-emerald-950 p-2 m-2 border-0 rounded-3xl w-fit'>
        <div className='border-2 rounded-3xl h-11 flex justify-center m-2 p-1 '>
           <input type='text'
             value={username}
             onChange={(e) => setUsername(e.target.value)} 
             className='outline-0 ml-3'
            placeholder='username'></input>
         </div>
         <div className='border-2 rounded-3xl h-11 flex justify-center m-2 p-1 '> 
           <input type='password' 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                  className='outline-0 ml-3'             
                  placeholder='password'></input>
          </div>
          <div className='flex justify-between max-w-full p-2'>
            <button  
              className='p-2 m-1'
              onClick={login}
              >Login</button>
              <div onClick={navigateSignup} className='text-blue-500 hover:underline hover:cursor-pointer w-auto m-2'>signup</div>
          
          </div>
              <div className='m-1 p-2'>{message}</div>
       </div>
         
       </div>

    </div>
    </>
  )
}

export default signin
