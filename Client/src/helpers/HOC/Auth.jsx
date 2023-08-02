import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getUserAuth } from '../../services/api.js';


function HOCAuth({ child, auth }) {
    const navigate = useNavigate();
    const [isAuthorized, setIsAuthorized] = useState(false);

    const Child = child;

    useEffect(() => {
        async function checkAuth() {
            if (auth) {
                const TOKEN = localStorage.getItem("auth");
                if (!TOKEN) {
                    navigate("/"); 
                    return;
                }
                
                try {
                    const res = await getUserAuth("/user/checkToken", TOKEN);
                    if (res.status === 200 && res.data && res.data.result.isAdmin) {
                        setIsAuthorized(true);
                    } else {
                        navigate("/", { state: { error: "You are not an admin !!!" } });
                    }
                } catch (error) {
                    navigate("/", { state: { error: "An error occurred while checking authentication." } });
                }
            }
        }
        checkAuth();
    }, [auth, navigate]);

    if (isAuthorized) return <Child />;

    return null;
}

export default HOCAuth;
