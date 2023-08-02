import React, { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { updateDatas } from '../../services/api.js';

import style from "./dashboard.module.css";

function Dashboard() {
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            const token = localStorage.getItem('auth');
            if (token) {
                const decodedToken = jwt_decode(token);
                setUser(decodedToken);
                console.log("Decoded Token:", decodedToken);
            }
        }
    }, []);
    

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            if (!user) {
                throw new Error('User data not available.');
            }
            await updateDatas(`/user/update/${user.id}`, user);
            console.log('Updated User:', user);
            localStorage.setItem("user", JSON.stringify(user));
            setEditMode(false);
            alert('Changes saved successfully!');
        } catch (error) {
            console.error("Update Error:", error);
            alert(error.message);
        }
    };

    return (
        <section className={style.ctn}>
            <h1>Dashboard</h1>
            {user ? (
                <article className={style.info}>
                    {editMode ? (
                        <section className={style.editForm}>
                            <h3>Edit your account information:</h3>
                            
                            <div className={style.formGroup}>
                                <label htmlFor="address">Your address:</label>
                                <input type="text" id="address" name="address" value={user.address} onChange={handleInputChange} />
                            </div>

                            <div className={style.formGroup}>
                                <label htmlFor="city">City:</label>
                                <input type="text" id="city" name="city" value={user.city} onChange={handleInputChange} />
                            </div>

                            <div className={style.formGroup}>
                                <label htmlFor="postal_code">Postal Code:</label>
                                <input type="text" id="postal_code" name="postal_code" value={user.postal_code} onChange={handleInputChange} />
                            </div>

                            <div className={style.formGroup}>
                                <label htmlFor="country">Country:</label>
                                <input type="text" id="country" name="country" value={user.country} onChange={handleInputChange} />
                            </div>

                            <div className={style.formGroup}>
                                <label htmlFor="phone_number">Phone Number:</label>
                                <input type="text" id="phone_number" name="phone_number" value={user.phone_number} onChange={handleInputChange} />
                            </div>

                            <div className={style.btnGroup}>
                                <button className={style.btnSave} onClick={handleSubmit}>Save Changes</button>
                                <button className={style.btnCancel} onClick={() => setEditMode(false)}>Cancel</button>
                            </div>
                        </section>
                    ) : (
                        <>
                            <h3>Here you will find all the information about your account:</h3>
                            <p><strong>First name:</strong> {user.first_name}</p>
                            <p><strong>Last name:</strong> {user.last_name}</p>
                            <p><strong>Your address:</strong> {user.address}</p>
                            <p><strong>City:</strong> {user.city}</p>
                            <p><strong>Postal Code:</strong> {user.postal_code}</p>
                            <p><strong>Country:</strong> {user.country}</p>
                            <p><strong>Phone Number:</strong> {user.phone_number}</p>
                            <p><strong>Mail:</strong> {user.email}</p>
                            <button className={style.btnEdit} onClick={() => setEditMode(true)}>Edit</button>
                        </>
                    )}
                </article>
            ) : (
                <p className={style.loading}>Loading...</p>
            )}
        </section>
    );
}

export default Dashboard;
