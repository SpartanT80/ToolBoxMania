import Title from "../../../Components/UI/Title/Index"
import Text from "./Text";
import style from "../../About/about.module.css"

function Wrapper({ title, text, image }) {

    return (

            <article className={style.teamMember}>
                <img src={image} alt="" />
                <Title level={3} title={title} />
                {
                    Object.values(text).map((t, index) => {
                        return <Text text={t} key={index} />
                    })
                }
            </article>
    )
}

export default Wrapper