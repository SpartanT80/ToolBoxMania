import { text } from "./text.js"
import Wrapper from "./Components/Wrapper"
import Title from "../../Components/UI/Title/Index"

import pierre from "../../assets/img/team/pierre.avif"
import julie from "../../assets/img/team/julie.avif"
import thomas from "../../assets/img/team/thomas.avif"

import style from "./about.module.css"

function About() {

    return (
        <main className={style.ctn}>
            <section className={style.story}>
                <Title level={2} title={"Our story"} />
                <Wrapper text={text.story} />
            </section>

            <section className={style.ourTeam}>
                <Title level={2} title={"Our team"} />
                <div className={style.team}>

                    <article className={style["team-member"]}>
                        <img src={pierre} alt="Pierre" />
                        <h3>Pierre</h3>
                        <Wrapper text={text.pierre} />
                    </article>

                    <article className={style["team-member"]}>
                        <img src={julie} alt="Julie" />
                        <h3>Julie</h3>
                        <Wrapper text={text.julie} />
                    </article>

                    <article className={style["team-member"]}>
                        <img src={thomas} alt="Thomas" />
                        <h3>Thomas</h3>
                        <Wrapper text={text.thomas} />
                    </article>

                </div>
            </section>

            <section className={style.network}>
                <Title level={2} title={"Our network"} />
                <Wrapper text={text.network} />
            </section>

        </main>
    );
}

export default About;