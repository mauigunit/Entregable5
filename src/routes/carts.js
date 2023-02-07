const { Router } = require('express');
const cartsRouter = Router();

const carts = require('../utils/cartsManager');
ClassCarts = new carts();


//const carts = [];

/*const getCid = () => {
    let maxCid = Math.max(...carts.map(cid => cid.cid));
    if (maxCid === -Infinity)
        return 1;
    maxCid++
    return maxCid;
}*/

// RETORNA EL INDICE DEL CARRITO
/*const indexCarts = (idCart) => {
    let indexCart = carts.findIndex(cid => cid.cid == idCart);
    return indexCart;
}*/

// RETORNA EL INDICE DEL PRODUCTO
/*const indexProducts = (idCart, idProduct) => {
    let indexProduct = carts[idCart].products.findIndex(uid => uid.uid == idProduct);
    return indexProduct;
}*/

cartsRouter.get('/:cid', (req, res) => {
    let idCart = req.params.cid;
    ClassCarts.getCartById(parseInt(idCart)).then(
        result => {
            if (result)
                res.json({ "status": true, "cart": result })
            else
                res.status(404).json({ "status": false, "message": "carrito no encontrado" });
        }
    ).catch(error => {
        res.status(500).json({ "status": false, "message": error });
    });
});

cartsRouter.post('/', (req, res) => {
    ClassCarts.addNewCart().then(
        result => {
            if (result > 0)
                res.json({ "status": true, "message": `Nuevo carrito iniciado con id ${result}.` })
            else
                res.status(404).json({ "status": false, "message": "No fue posible iniciar un nuevo carrito." });
        }
    ).catch(error => {
        res.status(500).json({ "status": false, "message": error });
    });
});

cartsRouter.post('/:cid/product/:uid', (req, res) => {
    let idCart = req.params.cid;
    let idProd = req.params.uid;
    ClassCarts.addProductCart(parseInt(idCart), parseInt(idProd)).then(
        result => {
            if (result === 1) { res.json({ "status": true, "message": `Producto agregado al carrito ${idCart}` }) }
            else if (result === -1) { res.status(400).json({ "status": false, "message": "Carrito no encontrado." }); }
            else if (result === -2) { res.status(400).json({ "status": false, "message": "Producto no encontrado." }); }
            else if (result === -3) { res.status(400).json({ "status": false, "message": "Producto sin stock." }); }
            else { res.status(400).json({ "status": false, "message": "No fue posible agregar producto al carrito." }); }
        }
    ).catch(error => {
        res.status(500).json({ "status": false, "message": error });
    });





    /*let indexCart = indexCarts(req.params.cid);
    if (indexCart === -1)
        res.status(404).json({ "status": false, "message": "Identificador de carrito no encontrado" });
    else {
        let indexProduct = indexProducts(indexCart, req.params.uid);
        if (indexProduct === -1) {
            carts[indexCart].products.push({"uid" : req.params.uid, "quantity" : 1});
            res.json({ "status": true, "message": "Nuevo producto agregado." });
        } else {
            let productCart = carts[indexCart].products[indexProduct];
            let quantity = productCart.quantity;
            quantity++;
            carts[indexCart].products[indexProduct].quantity = quantity;
            res.json({ "status": true, "message": "Cantidad agregada al producto." });
        }
    }*/
});

module.exports = cartsRouter;