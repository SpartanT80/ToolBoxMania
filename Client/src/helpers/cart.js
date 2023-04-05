export const calculateTotalAmount = (cart) => {
    const defaultTotalAmount = 0;
    return cart.length ?
        cart.map(t => parseFloat(t.totalAmount)).reduce((acc, curr) => acc + curr)
        :
        defaultTotalAmount
};

export const removeFromCart = (cart, id, idPackaging) => {
    const itemIndex = cart.findIndex(item => item.id === id && item.idPackaging === idPackaging);
    if (itemIndex === -1) {
        // Item not found, return the original cart
        return cart;
    }
    const updatedCart = [...cart];
    if (updatedCart[itemIndex].quantity > 0) {
        // Remove the item from the cart
        updatedCart.splice(itemIndex, 1);
    } else {
        // Decrease the item's quantity and update its total price
        updatedCart[itemIndex].quantity -= 1;
        updatedCart[itemIndex].totalAmount = (updatedCart[itemIndex].quantity * updatedCart[itemIndex].price).toFixed(2);
    }
    return updatedCart;
};

export const addOneToCart = (cartLS, toolToAdd) => {
    const {id, price, idPackaging, totalAmount, name} = toolToAdd;
    const newCart = JSON.parse(JSON.stringify(cartLS));
    const itemFoundIndex = newCart.findIndex(t => (t.id === id) && (t.idPackaging === idPackaging));

    if (itemFoundIndex === -1) { // product and packaging absent, add 1
        newCart.push({ id, idPackaging, quantity: 1, price, totalAmount, name });
    }
    else { // existing product, quantity +1
        newCart[itemFoundIndex].quantity += 1;
        const newTotalAmount = parseFloat(price) * newCart[itemFoundIndex].quantity;
        newCart[itemFoundIndex].totalAmount = newTotalAmount.toFixed(2);
    }

    localStorage.setItem("cart", JSON.stringify(newCart));
    return newCart;
};


export const deleteOneFromCart = (cartLS, toolToRemove) => {
    const { id, price, idPackaging} = toolToRemove;
    const newCart = JSON.parse(JSON.stringify(cartLS));
    const itemFoundIndex = newCart.findIndex(t => (t.id === id) && (t.idPackaging === idPackaging));
    

    if (itemFoundIndex >= 0) {  //Existing product, minus one
        newCart[itemFoundIndex].quantity -= 1;
        const newTotalAmount = parseFloat(price) * newCart[itemFoundIndex].quantity;
        newCart[itemFoundIndex].totalAmount = newTotalAmount.toFixed(2);
        if(newCart[itemFoundIndex].quantity <= 0 ){
            newCart.splice(itemFoundIndex, 1)
        }
    }
    
    if (itemFoundIndex === -1) { //error, not in the basket
        return newCart;
    }
    localStorage.setItem("cart", JSON.stringify(newCart));
    return newCart;
};