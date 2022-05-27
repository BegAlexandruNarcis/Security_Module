const cart = [];

const handleCart = (state = cart, action) => {
    const product = action.payload;
    switch (action.type) {
        case "ADDITEM":
            //Verificam daca produsul exista deja in cart
            const exist = state.find((x) => x.id === product.id);
            if (exist) {
                //Qty++
                return state.map((x) =>
                    x.id === product.id ? { ...x, qty: x.qty + 1 } : x);
            }
            else {
                const product = action.payload;
                return [
                    ...state,
                    {
                        ...product,
                        qty: 1,
                    }
                ]
            }
            

        case "DELITEM":
            const exist1 = state.find((x) => x.id === product.id);
            if (exist1.qty === 1) {
                return state.filter((x) => x.id !== product.id);
            }
            else {
                return state.map((x) =>
                    x.id === product.id ? { ...x, qty: x.qty - 1 } : x
                );
            }
          
        case "CLOSEITEM":
            const exist2 = state.find((x) => x.id === product.id);
            if(exist2.qty !== 0){
                return state.filter((x) => x.id !== product.id);
            }
            break;
        default:
            return state;
          


    }
}

export default handleCart;