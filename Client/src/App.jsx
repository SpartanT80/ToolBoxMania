import Router from "./Router/Index";
import Header from "./Components/Header/Index";
import Footer from "./Components/Footer/Index";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { signIn } from "./store/slices/user";
import { getUserAuth } from "./services/api.js";

function App() {
	const dispatch = useDispatch();
	
	useEffect(() => {
		async function checkAuth() {
			const TOKEN = localStorage.getItem("auth");
			const user = localStorage.getItem("user");
			if (TOKEN) {
				const res = await getUserAuth("/user/checkToken", TOKEN);
				
				if (res.status === 200) {
					dispatch(signIn(res.data.email));
				}
			}
			if (user) {
				dispatch(signIn(JSON.parse(user)));
			}
		}
		checkAuth();
	}, [dispatch]);

	return (
		<>
			<Header />
			<Router />
			<Footer />
		</>
	);
}

export default App;