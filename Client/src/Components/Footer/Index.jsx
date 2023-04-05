import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faMoneyBill, faTruck, faPhone, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { BsFacebook, BsInstagram, BsTwitter, BsYoutube } from 'react-icons/bs';

import style from "./footer.module.css";

function Footer() {
	return (
		<footer className={style.footerCtn}>
			<div className={style.info}>
				<dl>
					<dt><FontAwesomeIcon icon={faLock}/></dt>
					<dd>secure payment</dd>
				</dl>
				<dl>
					<dt><FontAwesomeIcon icon={faTruck}/></dt>
					<dd>free shipping</dd>
				</dl>
				<dl>
					<dt><FontAwesomeIcon icon={faMoneyBill}/></dt>
					<dd>loyalty card</dd>
				</dl>
				<dl>
					<dt><FontAwesomeIcon icon={faPhone}/></dt>
					<dd>customer service</dd>
				</dl>
				<dl>
					<dt><FontAwesomeIcon icon={faCircleCheck}/></dt>
					<dd>quality guarantee</dd>
				</dl>
			</div>

			<div>
			
				<nav className={style.menu}>
					<h4>ToolBoxMania</h4>
					<Link to={"#"}>Our story</Link>
					<Link to={"#"}>Our shops</Link>
					<Link to={"#"}>Tools from A to Z</Link>
					<Link to={"#"}>Professional customers space</Link>
					<Link to={"#"}>Recruitment</Link>
					<Link to={"#"}>Contact us</Link>
				</nav>

				<nav className={style.menu}>
					<h4>order online</h4>
					<Link to={"#"}>First visit</Link>
					<Link to={"#"}>Help - FAQ</Link>
					<Link to={"#"}>Customer service</Link>
					<Link to={"#"}>Track my order</Link>
					<Link to={"#"}>Recruitment</Link>
					<Link to={"#"}>CGV</Link>
					<Link to={"#"}>Legal information</Link>
				</nav>
				
				<nav className={style.menu}>
					<h4>Follow us</h4>
					<Link className={style.social}  to={"#"}><BsFacebook /></Link>
					<Link className={style.social}  to={"#"}><BsInstagram /></Link>
					<Link className={style.social}  to={"#"}><BsTwitter /></Link>
					<Link className={style.social}  to={"#"}><BsYoutube /></Link>
					
				</nav>
			</div>
		</footer>
	)
}

export default Footer;
