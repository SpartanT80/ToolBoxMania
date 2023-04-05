import Text from "./Text";

function Wrapper({text}) {
    return (
        <article>
            {
                Object.values(text).map((t, index) => {
                    return <Text text={t} key={index} />
                }
                )
            }
        </article>
    );
}

export default Wrapper;