import { createContext } from "react";
import { useState } from "react";
export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
    });
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
    const [bearerToken, setBearerToken] = useState({
        token: "",
    });
    const [blogList, setBlogList] = useState([]);
    const [pending, setPending] = useState(false);
    const [errorHome, setErrorHome] = useState('');
    return (
        <GlobalContext.Provider
            value={{
                formData,
                setFormData,
                loginData,
                setLoginData,
                bearerToken,
                setBearerToken,
                blogList,
                setBlogList,
                pending,
                setPending,
                errorHome,
                setErrorHome,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}
