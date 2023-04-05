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
                        <Wrapper image={pierre} title="Pierre" text={text.pierre} />
                        <Wrapper image={julie} title="Julie" text={text.julie} />
                        <Wrapper image={thomas} title="Thomas" text={text.thomas} />
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