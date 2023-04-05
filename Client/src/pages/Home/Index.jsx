import { useEffect, useState } from 'react';
import { getDatas } from "../../services/api";
import Title from "../../Components/UI/Title/Index";
import Wrapper from "./Components/Wrapper";
import { text } from "./text.js";
import style from "./home.module.css";
import { Link } from 'react-router-dom';


function Home() {

    const [categories, setCategories] = useState(null);


    useEffect(() => {
        async function fetchCategories() {

            try {
                const categories = await getDatas("/category/all");
                setCategories(categories.data.result);

            } catch (error) {
                throw Error(error);
            }
        }
        fetchCategories();
    }, []);

    return (
        <main>
            <section>
                <Title level={1} title={"ToolBoxMania 🧰"} />
                <Wrapper text={text.catchPhrase} />
            </section>
            <button className={style.btnDiscover}><a href="/">Discover the store !</a></button>

            <section>
                {
                    categories ?
                        categories.map(c => {
                            return (
                                <section key={c.id}>
                                    <Link to={`/tool/byCategory/${c.id}`}>
                                        <h2>{c.title}</h2>
                                        <p>{c.description}</p>
                                        <img src={`/img/category/${c.image_name}`} alt={`/img/category/${c.image_alt}`} />
                                    </Link>
                                </section>
                            )
                        })
                        :
                        null
                }
            </section>
        </main>
    )
}

export default Home;