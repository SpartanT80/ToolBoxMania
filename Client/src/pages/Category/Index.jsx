import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDatas } from "../../services/api";
import { Link } from 'react-router-dom';

function Category() {
    const [categories, setCategories] = useState(null)
    const [tools, setTools] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
                const categories = await getDatas("/category/all");
                const tools = await getDatas(`/tool/byCategory/${id}`);

                setTools(tools.data.result);
                setCategories(categories.data.result);
            } catch (error) {
                throw Error(error);
            }
        }
        fetchData();
    }, [id]);

    return (
        <>
            <h2>Categories:</h2>
            {
                categories ?
                    categories.map(c => {
                        return (
                            <section key={c.id}>
                                <Link to={`/tool/byCategory/${c.id}`}>
                                    <h3>{c.title}</h3>
                                </Link>
                            </section>

                        )
                    })
                    :
                    null
            }
            <h2>Tools:</h2>
            {
                tools ?
                    tools.map(t => {
                        return (
                            <section key={t.id}>
                                <Link to={`/tool/${t.id}`}>
                                    <h3>{t.main_title}</h3>
                                    <p>{t.description}</p>
                                    <img src={`/img/tool/${t.image_name}`} alt={`/img/tool/${t.image_alt}`} />
                                </Link>
                            </section>

                        )
                    })
                    :
                    null
            }
        </>
    )
}

export default Category;
