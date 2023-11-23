import React ,{useState,useEffect}from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
const AddBlog = () => {
    const navigate=useNavigate();
    const [input,setInput] = useState({
        title:" ",
        description:" ",
        category:" ",
    });
    const [file,setFile]=useState([]);
    const [categories,setCategories] = useState([]);
    useEffect(()=>{
         const fetchAllCategories=async ()=> {
            const res=await axios.get(`http://localhost:9000/api/v1/get/categories`,{
                headers:{
                    Authorization:` Bearer ${localStorage.getItem("token")}`,
                },
            });
            setCategories(res.data);
         }; 
            fetchAllCategories();   
        },[]);
        const formdata =new FormData();
        formdata.append("title",input.title);
        formdata.append("category",input.category);
        formdata.append("description",input.description);
        formdata.append("thumbnail",file);
        const handlesubmit = async (e) => {
        e.preventDefault();
         try{
             const res =await axios.post("http://localhost:9000/api/v1/add/blog",formdata,{
                headers:{
                    Authorization:` Bearer ${localStorage.getItem("token")}`,
                }
             });
             console.log(res);
             alert(res.data.message);
             navigate("/");
         }catch(error){
            alert(error.res.data.message)
         }
};
  return (
    <>
   <div className='container shadow'>
   <h2 className='text-center my-3'>Add a New Blog</h2>
   <div className='col-xl-12 my-3 d-flex justify-content-center'>
    <div className='row'>
        <form  onSubmit={handlesubmit}>
            <div className='mb-3'>
             <label htmlFor='formGroupExampleInput' className='form-label'>Title</label>
             <input type="text" name="title" value={input.title} onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})} className="form-control" id="formGroupExampleInput" placeholder="Blog Title"/>
             </div>
             <div className='mb-3'>
            <label htmlFor='formGroupExampleInput2' className='form-label'>Category</label>
            <select className='from-control' name='category'
            
            onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})}>
             <option disabled>Select Category</option>
             {categories && categories.map((item)=>{
                    return(
                        <option  value={item._id}>{item.title}</option>
                    )
             })}
                </select>
             </div>
             <div className='mb-3'>
                <label htmlFor='formGroupExampleInput2' className='form-label'>Description</label>
                <textarea className='form-control'  value={input.description}  onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})}    name='description' placeholder='Blog description' rows='5'></textarea>
                </div>
                <div className='mb-3'>
                <label htmlFor='formGroupExampleInput2' className='form-label'>Thumbnail</label>
                <input type='file' onChange={(e)=>setFile(e.target.files[0])} name='Thumbnail' className='form-control' placeholder='select Thumbnail' id="formGroupExampleInput" />
                </div>
                <div className='mb-3'>
                    <button type='submit' className='btn btn-primary'>Add Blog</button>
                    </div>
        </form>
    </div>
   </div>
   </div>
    </>
  )
}

export default AddBlog;