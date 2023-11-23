import axios from 'axios';
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
const AddCategory = () => {
    const [input, setInput] = useState({title:''});
     const navigate = useNavigate();
    const handleCategory = async (e)=>{
        e.preventDefault();
        try{
            const res = await axios.post(`http://localhost:9000/api/v1/add/category`,input,{
                headers:{
                    Authorization:` Bearer ${localStorage.getItem("token")}`,
                },
            });
            alert(res.data.message);
            navigate("/add-blog");
        }
        catch(error){
            alert(error.response.data.message);
        }
    };
  return (
    <>

    <div className='container shadow'>
    <h2 className='text-center my-3'>Add a New Category</h2>
    <div className='col-xl-12 my-3 d-flex item-center justify-content-center'>
    <div className='row'>
        <form onSubmit={handleCategory}>
            <div className='mb-3'>
                <label htmlFor='formGroupExampleInput' className='form-label'>Title</label>
                <input type="text" name="title" value={input.title} onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})} className="form-control" id="formGroupExampleInput" placeholder="Enter Title"/>
                </div>
                <div className='mb-3'>
                    <button type='submit' className='btn btn-primary btn-block'>
                        Add Category
                    </button>
                    
                </div>
        </form>
    </div>
    </div>
    </div>
    </>
  )
};

export default AddCategory;