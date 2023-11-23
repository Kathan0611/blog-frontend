import React,{useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  const [input,setInput] = useState({
    email:" ",
    password:"",
  });
  const handlesubmit = async (e) => {
    e.preventDefault();
    try{
         const  res =await axios.post("http://localhost:9000/api/v1/user/login",input);
         alert(res.data.message);
         localStorage.setItem("token",res.data.token);
         localStorage.setItem("username",res.data.name);
         navigate("/");

    }
    catch(error){
      alert(error.response.data.message)
    }
  }
  return (
   <>
    <div className="container shadow">
    <h2 className="text-center my-3">Login Here</h2>
    <div className="col-xl-12 my-3 d-flex item-center justify-content-center">
    <div className="row">
        <form onSubmit={handlesubmit}>
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">Email</label>
                <input type="email" name="email" className="form-control" id="formGroupExampleInput" placeholder="Enter Email"
                   value={input.email} onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})}/>
                </div>
                <div className="mb-3">
                <label htmlFor="formGroupExampleInput2" className="form-label">Password</label>
                <input type="password" name="password" className="form-control" id="formGroupExampleInput2" placeholder="Enter Password"
                value={input.password} onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})}/>
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn btn-primary btn-block">
                        Login
                    </button>
                    </div>
                    </form>

      </div>
      </div>
      </div>
   </>
  )
}

export default Login