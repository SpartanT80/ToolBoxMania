import { Link } from "react-router-dom";

function Button({children, id}) {
    return (
        <Link to={"/" + id} >{children}</Link>
    )
}

export default Button;