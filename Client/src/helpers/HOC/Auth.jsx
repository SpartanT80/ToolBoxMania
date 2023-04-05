import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getUserAuth } from '../../services/api.js';

// HOC for user routes -> access to cart, access admin page
function HOCAuth({ child, auth }) {
    const navigate = useNavigate();
    const [isAuthorized, setIsAuthorized] = useState(false);

    const Child = child;

    useEffect(() => {
        async function checkAuth() {
            if (auth) {
                const TOKEN = localStorage.getItem("auth");
                let res = null;
                if (TOKEN) {
                    res = await getUserAuth("/user/checkToken", TOKEN);
                    if (res.status === 200 && res.data.result && res.data.result.isAdmin) {
                        setIsAuthorized(true);
                    }
                }
                if (res.code || !TOKEN) navigate("/");
                if (!res.data.result || !res.data.result.isAdmin) {
                    navigate("/", { state: { error: "You are not a admin !!!" } });
                }
            }
        }
        checkAuth();
    });

    if (isAuthorized) return <Child />

}

export default HOCAuth;
