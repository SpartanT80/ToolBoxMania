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

    const [filledInputs, setFilledInputs] = useState({
        main_title: false,
        secondary_title: false,
        main_description: false,
        image_name: false,
        image_alt: false,
        ref_product: false,
        category: false,
        quantity: false,
        price: false,
        packaging_type: false,
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

        setFilledInputs((prevState) => ({
            ...prevState,
            [name]: value.trim() !== "",
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!filledInputs.main_title) {
            alert("Please enter the main title.");
            return;
        }

        if (!filledInputs.category) {
            alert("Please choose a category.");
            return;
        }

        if (!filledInputs.packaging_type) {
            alert("Please choose a packaging.");
            return;
        }

        try {
            const dataTool = {
                main_title,
                secondary_title,
                main_description,
                image_name: image_name ? image_name : null,
                image_alt: image_alt ? image_alt : null,
                ref_product,
                category,
            };

            const toolResult = await addDatas("/tool/add", dataTool);
            const toolId = toolResult.data.toolId;
            const packagingId = packaging_type;
            const dataPackaging = {
                price,
                quantity,
                toolId,
                packagingId,
            };

            await addDatas("/tool_packaging/add", dataPackaging);

            alert("Successfully added!");
            window.location.reload();
        } catch (error) {
            throw Error(error);
        }
    };


    return (
        <section className="style.ctn">

            <form className={styles.form} onSubmit={handleSubmit}>
                <Input
                    className={`${styles.inputs} ${filledInputs.main_title ? styles.filled : ""}`}
                    type={"text"}
                    placeholder={"main_title"}
                    name="main_title"
                    value={main_title}
                    onChange={handleChange}
                />

                <Input
                    className={`${styles.inputs} ${filledInputs.secondary_title ? styles.filled : ""}`}
                    type={"text"}
                    placeholder={"secondary_title"}
                    name="secondary_title"
                    value={secondary_title}
                    onChange={handleChange}
                />

                <textarea
                    className={`${styles.inputs} ${filledInputs.main_description ? styles.filled : ""}`}
                    placeholder={"main_description"}
                    name="main_description"
                    value={main_description}
                    onChange={handleChange}
                />

                <Input
                    className={`${styles.inputs} ${filledInputs.image_name ? styles.filled : ""}`}
                    type={"text"}
                    placeholder={"image adress"}
                    name="image_name"
                    value={image_name}
                    onChange={handleChange}
                />

                <Input
                    className={`${styles.inputs} ${filledInputs.image_alt ? styles.filled : ""}`}
                    type={"text"}
                    placeholder={"image description"}
                    name="image_alt"
                    value={image_alt}
                    onChange={handleChange}
                />

                <Input
                    className={`${styles.inputs} ${filledInputs.ref_product ? styles.filled : ""}`}
                    type={"text"}
                    placeholder={"ref_product"}
                    name="ref_product"
                    value={ref_product}
                    onChange={handleChange}
                />

                <label className={styles.label}>
                    Choose the category:
                    <select className={`${styles.select} ${filledInputs.category ? styles.filled : ""}`} name="category" value={category} onChange={handleChange}>
                        <option value="">Choose a category</option>
                        {categories &&
                            categories.map((c) => (
                                <option value={c.id} key={c.id}>
                                    {c.title}
                                </option>
                            ))}
                    </select>
                </label>

                <Input
                    className={`${styles.inputs} ${filledInputs.price ? styles.filled : ""}`}
                    type={"number"}
                    placeholder={"price"}
                    name="price"
                    value={price}
                    onChange={handleChange}
                />

                <Input
                    className={`${styles.inputs} ${filledInputs.quantity ? styles.filled : ""}`}
                    type={"number"}
                    placeholder={"quantity"}
                    name="quantity"
                    value={quantity}
                    onChange={handleChange}
                />

                <label className={styles.label}>
                    Packaging:
                    <select className={`${styles.select} ${filledInputs.packaging_type ? styles.filled : ""}`} name="packaging_type" value={packaging_type} onChange={handleChange}>
                        <option value="">Choose a packaging</option>
                        {packagings &&
                            packagings.map((p) => (
                                <option value={p.id} key={p.id}>
                                    {p.type}
                                </option>
                            ))}
                    </select>
                </label>

                <Input className={`${styles.inputs} ${styles.btnSend}`} type={"submit"} />
            </form >
        </section>
    );
}

export default Form;
