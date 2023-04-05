import Title from "../../../Components/UI/Title/Index";
import Button from "../../../Components/UI/Button/Index";
import FromPrice from "../../../Components/UI/Text/FromPrice";

function Wrapper({pathImg, item}) {      
    return (
        <article>
            <Title title={item.main_title} level={3}/>
            {
                !item ? <p>No sells 😒😒😭😭😭</p>
                :
                <>
                    <figure>
                        <img src={`/img/${pathImg}/${item.image_name}`} alt={item.image_alt} />
                        <figcaption>{item.title}</figcaption>
                    </figure>
                
                    <p>{item.main_description}</p>

                    <FromPrice item={item} />
                    

                    <Button id={item.id}>See more</Button>
                </>
            }
        </article>
    )
}

export default Wrapper;
