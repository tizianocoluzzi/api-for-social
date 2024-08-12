import { Link, useNavigate } from "react-router-dom";
import classes from "./styles.module.css";
import { useContext } from "react";
import { GlobalContext } from "../../context";
import axios from "axios";
export default function Login() {
  const { loginData, setLoginData } = useContext(GlobalContext); //dati del login
  const { bearerToken, setBearerToken } = useContext(GlobalContext); //access token
  const navigate = useNavigate();
  async function handleLogin() {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        {
          email: loginData.email,
          password: loginData.password,
        }
      );
      const result = await response.data;
      await setBearerToken({
        token: result.accessToken,
      });
      console.log(bearerToken);
      navigate("/");
    } catch (err) {
      console.log(err.response.data.message);
      setBearerToken({
        token: "",
      });
    }
  }

  return (
    <div className={classes.wrapper}>
      <h1>Login</h1>
      <div className={classes.formWrapper}>
        <input
          placeholder="email"
          type="email"
          id="email"
          value={loginData.email}
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
          }
        ></input>
        <input
          placeholder="password"
          type="password"
          id="password"
          value={loginData.password}
          onChange={(event) =>
            setLoginData({ ...loginData, password: event.target.value })
          }
        ></input>
        <button onClick={handleLogin}>Login</button>
      </div>
      <p>
        non ti sei ancora registrato?
        <Link to="/signup">signup</Link>
      </p>
    </div>
  );
}
