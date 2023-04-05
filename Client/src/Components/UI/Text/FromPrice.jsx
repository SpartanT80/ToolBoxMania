import style from "./FromPrice.module.css";

function FromPrice({item}) {
  return (
    <p className={style.priceCtn}>from <span className={style.price}>{item.price}€</span></p>
  )
}

export default FromPrice;