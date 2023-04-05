import React, { useEffect, useState } from 'react';

import style from "./dashboard.module.css";

function Dashboard() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const userString = localStorage.getItem('user');
        const userObj = JSON.parse(userString);
        setUser(userObj);
    }, []);

    return (
        <section className={style.ctn}>
            <h1>Dashboard</h1>
            {user ? (
                <article className={style.info}>
                    <h3>Here you will find all the information about your account:</h3>
                    <p>First name: {user.first_name}</p>
                    <p>Last name: {user.last_name}</p>
                    <p>Your address: {user.address}</p>
                    <p>City: {user.city}</p>
                    <p>Postal Code: {user.postal_code}</p>
                    <p>Country: {user.country}</p>
                    <p>Phone Number: {user.phone_number}</p>
                    <p>Mail: {user.email}</p>
                </article>
            ) : (
                <p className={style.loading}>Loading...</p>
            )}
        </section>
    );
}

export default Dashboard;
