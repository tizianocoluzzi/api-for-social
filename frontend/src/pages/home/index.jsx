import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import classes from './styles.module.css';
axios.defaults.withCredentials = true;
export default function Home() {
    const navigate = useNavigate();
    const {
        bearerToken,
        setBearerToken,
        blogList,
        setBlogList,
        pending,
        setPending,
    } = useContext(GlobalContext);
    const { errorHome, setErrorHome } = useContext(GlobalContext); //vedere se si verifica un errore
    async function fetchListOfBlogs() {
        console.log(bearerToken.token);
        setPending(true);
        try {
            const response = await axios.get(
                "http://localhost:5000/api/blog/",
                {
                    headers: { authorization: "Bearer " + bearerToken.token },
                }
            );

            const result = await response.data;
            console.log(result.blogs);
            setErrorHome("");
            if (result && result.blogs && result.blogs.length) {
                setBlogList(result.blogs);
                setPending(false);
                return;
            }
        } catch (err) {
            console.log(err);
            setErrorHome(err.message);
        }

        console.log("errorHome " + errorHome);
        try {
            console.log("tento il refresh");
            const response = await axios.get(
                "http://localhost:5000/api/refresh"
            );
            const result = await response.data;
            console.log(result.accesToken);
            setBearerToken({token:result.accesToken});
        } catch (err) {
            console.log(err + " bah");
        }
    }
    useEffect(() => {
        fetchListOfBlogs();
    }, [bearerToken]);
    return (
        <div>
            <div className={classes.wrapper}>
                {errorHome !== "" ? (
                    <div>
                        <h1>{errorHome}</h1>
                        <p>
                            Probably you should <Link to="/login">Login</Link>
                        </p>
                    </div>
                ) : (
                    <div>
                        <h1>list</h1>
                        {pending ? (
                            <h1>Loading blogs please wait</h1>
                        ) : (
                            <div >
                                {blogList.map((blogItem) => (
                                    <div key={blogItem._id} className={classes.wrapperBlog}>
                                        <p>{blogItem.title}</p>
                                        <div>{blogItem.description}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
