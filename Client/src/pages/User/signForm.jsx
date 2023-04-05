import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { signup, signin } from "../../services/api";
import { useDispatch } from "react-redux";
import { signIn } from "../../store/slices/user";

function SignForm() {
    const { state } = useLocation();
    const type = state?.type || "sign in";
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [msg, setMsg] = useState(null);

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        address: "",
        city: "",
        postal_code: "",
        country: "",
        phone_number: "",
    });

    const {
        email,
        password,
        first_name,
        last_name,
        address,
        city,
        postal_code,
        country,
        phone_number,
    } = inputs;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        type === "sign in" ? handleSignIn() : handleSignUp();
    };

    const handleSignIn = async () => {
        try {
            const res = await signin(inputs);
            const user = {
                email: res.data.result.email,
                first_name: res.data.result.first_name,
                last_name: res.data.result.last_name,
                address: res.data.result.address,
                city: res.data.result.city,
                postal_code: res.data.result.postal_code,
                country: res.data.result.country,
                phone_number: res.data.result.phone_number,
            }
            localStorage.setItem("auth", res.data.result.TOKEN);
            localStorage.setItem("user", JSON.stringify(user));

        
            dispatch(signIn(user));
            navigate("/");
        } catch (error) {
            setMsg("Identification problem");
        }
    };

    const handleSignUp = async () => {
        const res = await signup(inputs);
        if (res.status === 201) {
            setInputs({
                email: "",
                password: "",
                first_name: "",
                last_name: "",
                address: "",
                city: "",
                postal_code: "",
                country: "",
                phone_number: "",
            });
            navigate("/register", { state: { type: "sign in" } });
        } else {
            setMsg("Identification problem");
        }
    };

    return (
        <main>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={handleInputChange}
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={handleInputChange}
                />

                {type === "sign up" && (
                    <>
                        <label htmlFor="first_name">First Name:</label>
                        <input
                            type="text"
                            name="first_name"
                            id="first_name"
                            value={first_name}
                            onChange={handleInputChange}
                        />

                        <label htmlFor="last_name">Last Name:</label>
                        <input
                            type="text"
                            name="last_name"
                            id="last_name"
                            value={last_name}
                            onChange={handleInputChange}
                        />

                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            name="address"
                            id="address"
                            value={address}
                            onChange={handleInputChange}
                        />

                        <label htmlFor="city">City:</label>
                        <input
                            type="text"
                            name="city"
                            id="city"
                            value={city}
                            onChange={handleInputChange}
                        />

                        <label htmlFor="postal_code">Postal Code:</label>
                        <input
                            type="text"
                            name="postal_code"
                            id="postal_code"
                            value={postal_code}
                            onChange={handleInputChange}
                        />

                        <label htmlFor="country">Country:</label>
                        <input
                            type="text"
                            name="country"
                            id="country"
                            value={country}
                            onChange={handleInputChange}
                        />

                        <label htmlFor="phone_number">Phone Number:</label>
                        <input
                            type="tel"
                            name="phone_number"
                            id="phone_number"
                            value={phone_number}
                            pattern="[0-9+]{10,14}"
                            onChange={handleInputChange}
                        />
                    </>
                )}
                <input type="submit" value={type} />
            </form>

            {msg && <p>{msg}</p>}

            {type === "sign in" && (
                <p>
                    No account? Create one {" "}
                    <Link to={"/register"} state={{ type: "sign up" }}>
                        👉 here 👈
                    </Link>
                </p>
            )}
        </main>
    );
}

export default SignForm;
