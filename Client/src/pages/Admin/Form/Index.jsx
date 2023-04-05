import React, { useState, useEffect } from "react";
import { getDatas, addDatas } from "../../../services/api";
import Input from "./Input";
import styles from "./form.module.css";

function Form() {

    const [categories, setCategories] = useState(null);
    const [packagings, setPackagings] = useState(null);

    const [inputs, setInputs] = useState({
        main_title: "",
        secondary_title: "",
        main_description: "",
        image_name: "",
        image_alt: "",
        ref_product: "",
        category: "",
        quantity: "",
        price: "",
        packaging_type: ""
    });

    const { main_title,
        secondary_title,
        main_description,
        image_name,
        image_alt,
        ref_product,
        category,
        quantity,
        price,
        packaging_type } = inputs;

    useEffect(() => {
        async function fetchData() {
            try {
                const categories = await getDatas(`/category/all`);
                const packagings = await getDatas(`/packaging/all`);
                setCategories(categories.data.result);
                setPackagings(packagings.data.result);
            } catch (error) {
                throw Error(error);
            }
        }
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setInputs({ ...inputs, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const dataTool = {
                main_title,
                secondary_title,
                main_description,
                image_name: image_name ? image_name : null,
                image_alt: image_alt ? image_alt : null,
                ref_product,
                category
            };

            const toolResult = await addDatas("/tool/add", dataTool);
            const toolId = toolResult.data.toolId;
            const packagingId = packaging_type;
            const dataPackaging = {
                price,
                quantity,
                toolId,
                packagingId
            };
            console.log("dataPackaging ==== ", dataPackaging);


            await addDatas("/tool_packaging/add", dataPackaging);
            console.log('Document ajouté avec succès');

        } catch (error) {
            console.error(`Erreur lors de l'ajout du document: `, error);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit} >
            <Input
                className={styles.inputs}
                type={"text"}
                placeholder={"main_title"}
                name="main_title"
                value={main_title}
                onChange={handleChange} />

            <Input
                className={styles.inputs}
                type={"text"}
                placeholder={"secondary_title"}
                name="secondary_title"
                value={secondary_title}
                onChange={handleChange} />

            <textarea
                className={styles.inputs}
                placeholder={"main_description"}
                name="main_description"
                value={main_description}
                onChange={handleChange} />

            <Input
                className={styles.inputs}
                type={"text"}
                placeholder={"image adress"}
                name="image_name"
                value={image_name}
                onChange={handleChange} />

            <Input
                className={styles.inputs}
                type={"text"}
                placeholder={"image description"}
                alt="image_alt"
                value={image_alt}
                onChange={handleChange} />


            <Input
                className={styles.inputs}
                type={"text"}
                placeholder={"ref_product"}
                name="ref_product"
                value={ref_product}
                onChange={handleChange} />

            <label className={styles.label}>
                Choose the category:
                <select className={styles.select} name="category" value={category} onChange={handleChange}>
                    {categories &&
                        categories.map((c) =>
                            <option value={c.id} key={c.id}>{c.title}</option>
                        )
                    }
                </select>
            </label>

            <Input
                className={styles.inputs}
                type={"number"}
                placeholder={"price"}
                name="price"
                value={price}
                onChange={handleChange} />

            <Input
                className={styles.inputs}
                type={"number"}
                placeholder={"quantity"}
                name="quantity"
                value={quantity}
                onChange={handleChange} />

            <label className={styles.label}>
                Packaging:
                <select className={styles.select} name="packaging_type" value={packaging_type} onChange={handleChange}>
                    {packagings &&
                        packagings.map((p) =>
                            <option value={p.id} key={p.id}>{p.type}</option>
                        )
                    }
                </select>
            </label>

            <Input className={`${styles.inputs} ${styles.btnSend}`} type={"submit"} />

        </form>
    )
}

export default Form;
