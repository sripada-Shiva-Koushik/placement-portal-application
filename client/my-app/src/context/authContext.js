import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";

export const AuthContext = createContext()


export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user") || null))
    // const navigate = useNavigate()

    const axiosInstance = axios.create({
        baseURL: "/",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
    });

    const login = async (inputs) => {
        const res = await axios.post("/auth/login", inputs)
        setCurrentUser(res.data);
    };
    // const login = async (inputs) => {
    //     try {
    //         const res = await axios.post("/auth/login", inputs)
    //         setCurrentUser(res.data);
    //         if (res.data.role === "admin") {
    //             navigate("/adminHome");
    //         } else {
    //             navigate("/userHome");
    //         }
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };


    const logout = async (inputs) => {
        await axiosInstance.post("/auth/logout")
        setCurrentUser(null);
    }



    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);


    return (<AuthContext.Provider value={{ currentUser, login, logout }}>
        {children}
    </AuthContext.Provider>
    )
}