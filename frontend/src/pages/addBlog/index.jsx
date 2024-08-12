import { useContext } from "react";
import classes from "./styles.module.css";
import { GlobalContext } from "../../context";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function AddBlog() {
    const navigate = useNavigate();
    const { formData, setFormData } = useContext(GlobalContext);
    async function handleSaveBlogToDatabase(){
    try{
        const response = await axios.post('http://localhost:5000/api/blog/add', {
            title: formData.title,
            description: formData.description,
        });
        const result = await response.data;
        console.log(result);
    }catch(err){
        console.log(err.response.status);
    }
   
    //navigate("/login");
  }
  return (
    <div className={classes.wrapper}>
      <h1>addBlog</h1>
      <div className={classes.formWrapper}>
        <input
          name="title"
          placeholder="Blog Title"
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <textarea
          name="description"
          placeholder="Blog Description"
          id="description"
          value={formData.description}
          onChange={(event) =>
            setFormData({ ...formData, description: event.target.value })
          }
        />
      </div>
      <button onClick={handleSaveBlogToDatabase}>add new Blog</button>
    </div>
  );
}
