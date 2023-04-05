import Form from "./Form/Index";
import ProductList from "./ProductList/Index";
import styles from "./ProductList/productList.module.css";


function Admin() {
    return (

        <main className={styles.productListadminmain}>
            <h2>Admin Panel</h2>

            <section>
                <h3>Add product</h3>
                <Form />
            </section>

            <section className={styles.productListadmin}>
                <h3>Product List</h3>

                <ProductList />
            </section>
        </main>
    );
}

export default Admin;
