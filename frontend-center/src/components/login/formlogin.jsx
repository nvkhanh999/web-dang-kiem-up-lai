
import React, { createContext, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./formlogin.css";
import { UserContext } from "../../context/UserContext";
import { Navigate } from 'react-router-dom';


const FormLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
	const [token, setToken] = useState(localStorage.getItem("theFuckingToken"));

    const usenavigate = useNavigate();

    useEffect(()=>{ sessionStorage.clear(); },[]);

		const ProceedLogin = async (e) => {
        	e.preventDefault();
        	if (validate()) {
            	const requestOptions = {
					method: "POST",
					headers: { "Content-Type": "application/x-www-form-urlencoded" },
					body: JSON.stringify(`grant_type=&username=${username}&password=${password}&scope=&client_id=&client_secret=`),
				};

				const fetchData = await fetch("http://127.0.0.1:8000/login", requestOptions);
				const data = await fetchData.json();

				if (!fetchData.ok) {
					toast.error(data.detail);
				}
				else {
					setToken(data.access_token);
            		localStorage.setItem("theFuckingToken", data.access_token);
					localStorage.setItem("centerID", data.id)
            		usenavigate('/')
				}
        	}
   		}

    const validate = () => {
        let result = true;
        if (username === '' || username === null) {
            result = false;
            toast.warning('Hãy nhập tên đăng nhập');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Hãy nhập mật khẩu');
        }
        return result;
    }

	if (useContext(UserContext) != undefined) {
		return <>{<Navigate to='/'/>}</>
	}

    return (
        <form onSubmit={ProceedLogin} className="cover">
            <img class="logo" src="https://upload.wikimedia.org/wikipedia/vi/9/9a/Logo_C%E1%BB%A5c_%C4%90%C4%83ng_ki%E1%BB%83m_Vi%E1%BB%87t_Nam.png"/>
            <input type="username" value={username} onChange={(x) => setUsername(x.target.value)} className="input-botton" placeholder="Enter username"/>
            <input type="password" value={password} onChange={(x) => setPassword(x.target.value)} className="input-botton" placeholder="Enter password"/>
            <button type="submit" className="login-btn" >Đăng nhập</button>
        </form> 
    )
}
export default FormLogin