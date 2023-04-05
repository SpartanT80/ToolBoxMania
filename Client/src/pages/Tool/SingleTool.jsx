import { useEffect, useState } from 'react';
import { getDatas } from "../../services/api";
import { useParams } from 'react-router-dom';

import { addOneToCart, calculateTotalAmount } from "../../helpers/cart";
import { useDispatch, useSelector } from "react-redux";
import { modifyCart } from "../../store/slices/cart";

import style from "./singleTool.module.css";

function SingleTool() {
    
    const { id } = useParams();

    const {cart} = useSelector(state => ({...state.cart}));
    const dispatch = useDispatch();

    const [tool, setTool] = useState(null);
    const [price, setPrice] = useState(null);
    const [idPackaging, setIdPackaging] = useState(null);
    const [type, setType] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const tool = await getDatas(`/tool/${id}`);
                setTool(tool.data.result);
                setPrice(tool.data.result.toolInfo[0].price);
                setIdPackaging(tool.data.result.toolInfo[0].idPackaging);
                setType(tool.data.result.toolInfo[0].type);
            } catch (error) {
                throw Error(error);
            }
        }
        fetchData();
    }, [id]);

    const averageVote = () => {
        return tool.avg_vote;
    };

    const changeHandler = (e) => {
        setIdPackaging(parseInt(e.target.value));
        setPrice(tool.toolInfo[e.target.value - 1].price)
    };

    const handleAddToCart = (e) => {
        const toolToAdd = {
            id: tool.id,
            name: tool.main_title, 
            price, 
            idPackaging,
            type,
            totalAmount: price
        };
        const newCart = addOneToCart(cart, toolToAdd);
        const totalAmount = calculateTotalAmount(newCart).toFixed(2);
        dispatch(modifyCart({ cart: newCart, totalAmount }));
    };

    return (
        <>
            {tool ? (
                <section className={style.section}>
                    <h3 className={style.toolTitle}>{tool.main_title}</h3>
                    <p className={style.toolDescription}>{tool.main_description}</p>
                    <img className={style.toolImg} src={`/img/tool/${tool.image_name}`} alt={tool.image_alt} />
                    <div className={style.toolVote}>
                    {averageVote()}
                    <p>Total reviews: {tool.vote_count}</p>
                </div>
                <form>
                    <select value={idPackaging} onChange={changeHandler}>
                        {
                            tool.toolInfo.map((info, index) => {
                                return (
                                    <option key={index} value={info.idPackaging}>Packaging: {info.type}</option>
                                )
                            })
                        }
                    </select>
                </form>
                <p className={style.toolPrice}>{price}€</p>
                <button className={style.addToCart} onClick={handleAddToCart}>Add To Cart !</button>
                </section>
            ) : (
                <p>Loading...</p>
            )}
        </>
    )
}

export default SingleTool;