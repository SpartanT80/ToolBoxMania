import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDatas } from '../../services/api.js';

import style from './tool.module.css';

function Tool() {

    const [tools, setTools] = useState(null);
    const [categories, setCategories] = useState(null);
    const [visibleTools, setVisibleTools] = useState({});

    useEffect(() => {

        async function fetchData() {
            try {
                const tools = await getDatas("/tool/all");
                const categories = await getDatas("/category/all");

                setTools(tools.data.result);
                setCategories(categories.data.result);

            } catch (err) {
                throw new Error(err);
            }

        }
        fetchData();
    }, []);

    const toggleCategory = categoryId => {
        setVisibleTools({
            ...visibleTools,
            [categoryId]: !visibleTools[categoryId]
        });
    };

    return (
        <>
            {categories &&
                categories.map((c) => {
                    return (
                        <section key={c.id} className={style.container}>
                            <h2 className={style.categoryTitle} onClick={() => toggleCategory(c.id)}>
                                {c.title}
                            </h2>
                            <p className={style.description}>{c.description}</p>
                            <div className={style.linkContainer} style={{ display: visibleTools[c.id] ? "block" : "none" }}>
                                <div className={style.cardContainer}>
                                    {tools &&
                                        tools
                                            .filter((t) => t.category_id === c.id)
                                            .map((t) => {
                                                return (
                                                    <div key={t.id} className={`${style.card}`}>
                                                        <Link to={`/tool/${t.id}`}>
                                                            <div className={style.cardContent}>
                                                                <div className={style.cardImageContainer}>
                                                                    <img src={`/img/tool/${t.image_name}`} alt={t.image_alt} className={style.cardImage} />
                                                                </div>
                                                                <div className={style.cardBody}>
                                                                    <h3 className={style.cardTitle}>{t.main_title}</h3>
                                                                    <p className={style.cardDescription}>{t.main_description}</p>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                );
                                            })}
                                </div>
                            </div>
                        </section>
                    );
                })}
        </>
    );

}

export default Tool;
