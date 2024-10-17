import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";


function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await fetch(route,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify({username, password}),
            });
            if (!res.ok) {
                throw new Error('Nerwork response was not okay');
            }
            const data = await res.json();

            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, data.access);
                localStorage.setItem(REFRESH_TOKEN, data.refresh);
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg mt-36"
        >
            <h1 className="text-2xl font-bold mb-6 text-center">{name}</h1>
            <input
                className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500" type="text"
                value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"/>
            <input
                className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500" type="password"
                value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
            <p className="p-8 font-semibold">Not Registered <span className="text-blue-500"><Link to='/register'>Register</Link></span></p>
            <button
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
                type="submit"
            >
                {name}
            </button>
        </form>
    );
}

export default Form;
