import React from 'react';
import { getDatas, deleteDatas, updateDatas } from '../../../services/api.js';
import { useEffect, useState } from 'react';
import style from "./productList.module.css"

function ProductList() {
    const [tools, setTools] = useState(null);
    const [mainTitle, setMainTitle] = useState("");
    const [secondaryTitle, setSecondaryTitle] = useState("");
    const [mainDescription, setMainDescription] = useState("");
    const [imageName, setImageName] = useState("");
    const [imageAlt, setImageAlt] = useState("");
    const [refProduct, setRefProduct] = useState("");
    const [selectedTool, setSelectedTool] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const tools = await getDatas("/tool/all");
                setTools(tools.data.result);
            } catch (err) {
                throw new Error(err);
            }
        }
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteDatas(`/tool/remove/${id}`);
            setTools(tools.filter(t => t.id !== id));
        } catch (error) {
            throw Error(error);
        }
    }

    const handleUpdate = async (id) => {
        try {
            const selectedTool = tools.find(t => t.id === id);
            const updatedTool = {
                main_title: mainTitle || selectedTool.main_title,
                secondary_title: secondaryTitle || selectedTool.secondary_title,
                main_description: mainDescription || selectedTool.main_description,
                image_name: imageName || selectedTool.image_name,
                image_alt: imageAlt || selectedTool.image_alt,
                ref_product: refProduct || selectedTool.ref_product,
                id,
            };
            await updateDatas(`/tool/update/${id}`, updatedTool);
            setTools(tools.map(t => t.id === id ? updatedTool : t));
            setSelectedTool(null);
        } catch (error) {
            console.error(error);
        }
    };
    

    return (
        <section className={style.ctn}>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Main_title</th>
                        <th>Secondary_title</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tools &&
                        tools.map((t) => (
                            <React.Fragment key={t.id}>
                                <tr>
                                    <td>{t.id}</td>
                                    <td>{t.main_title}</td>
                                    <td>{t.secondary_title}</td>
                                    <td>{t.price}€</td>
                                    <td>
                                        <button className={style.btn} onClick={() => setSelectedTool(t)}>Edit</button>
                                        <button className={`${style.btn} ${style.btnDelete}`} onClick={() => handleDelete(t.id)}>Delete</button>
                                    </td>
                                </tr>
                                {selectedTool && selectedTool.id === t.id && (
                                    <tr key={`update-${t.id}`}>
                                        <td colSpan="5">
                                            <section className={style.updateSection} id="updateSection">
                                                <h2>Update tool {selectedTool.id}</h2>
                                                <label htmlFor="mainTitle">Main Title:</label>
                                                <input
                                                    type="text"
                                                    id="mainTitle"
                                                    name="mainTitle"
                                                    defaultValue={selectedTool.main_title}
                                                    onChange={e => setMainTitle(e.target.value)} />

                                                <label htmlFor="secondaryTitle">Secondary Title:</label>
                                                <input
                                                    type="text"
                                                    id="secondaryTitle"
                                                    name="secondaryTitle"
                                                    defaultValue={selectedTool.secondary_title}
                                                    onChange={e => setSecondaryTitle(e.target.value)} />

                                                <label htmlFor="mainDescription">Main Description:</label>
                                                <input
                                                    type="text"
                                                    id="mainDescription"
                                                    name="mainDescription"
                                                    defaultValue={selectedTool.main_description}
                                                    onChange={e => setMainDescription(e.target.value)} />

                                                <label htmlFor="imageName">Image Name:</label>
                                                <input
                                                    type="text"
                                                    id="imageName"
                                                    name="imageName"
                                                    defaultValue={selectedTool.image_name}
                                                    onChange={e => setImageName(e.target.value)} />

                                                <label htmlFor="imageAlt">Image Alt:</label>
                                                <input
                                                    type="text"
                                                    id="imageAlt"
                                                    name="imageAlt"
                                                    defaultValue={selectedTool.image_alt}
                                                    onChange={e => setImageAlt(e.target.value)} />

                                                <label htmlFor="refProduct">Reference Product:</label>
                                                <input
                                                    type="text"
                                                    id="refProduct"
                                                    name="refProduct"
                                                    defaultValue={selectedTool.ref_product}
                                                    onChange={e => setRefProduct(e.target.value)} />

                                                <button className="updateButton" onClick={() => handleUpdate(selectedTool.id)}>Update</button>
                                                <button onClick={() => setSelectedTool(null)}>Cancel</button>
                                            </section>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))
                    }
                </tbody>
            </table>
        </section>
    );
}

export default ProductList;
