const { Router } = require('express');
const prodRouter = Router();
const upload = require('../utils/utils');
const products = require('../utils/productsManager');
ClassProducts = new products();

const productos = [];

prodRouter.get('/', (req, res) => {
    let { limit } = req.query;
    ClassProducts.getProducts(limit).then(
        result => {
            res.json({ "status": true, "products": result })
        }
    ).catch(error => {
        res.status(500).json({ "status": false, "message": error });
    });
});

prodRouter.get('/:uid', (req, res) => {
    let idProducto = req.params.uid;
    ClassProducts.getProductByUid(idProducto).then(
        result => {
            if (result)
                res.json({ "status": true, "products": result })
            else
                res.status(404).json({ "status": false, "message": "Producto no encontrado" });
        }
    ).catch(error => {
        res.status(500).json({ "status": false, "message": error });
    });
});

prodRouter.post('/', (req, res) => {
    let data = req.body;
    const { title, description, code, price, stock, category, thumbnails } = req.body;
    if (!title || !description || !code || !price || !stock || !category) {
        res.status(400).json({ "status": false, "message": "Faltan datos obligatorios." });
    } else {
        ClassProducts.addNewProduct(title, description, code, price, stock, category, thumbnails).then(
            result => {
                if (result)
                    res.json({ "status": true, "message": "Producto agregado correctamente." })
                else
                    res.json(404).json({ "status": false, "message": "No fue posible agregar producto." });
            }
        ).catch(error => {
            res.status(500).json({ "status": false, "message": error });
        });
    }
});

prodRouter.put('/:uid', (req, res) => {
    let uid = req.params.uid;
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;
    if (!title || !description || !code || !price || !status || !stock || !category) {
        console.log({ title, description, code, price, status, stock, category, thumbnails });
        res.status(400).json({ "status": false, "message": "Faltan datos para actualizar." });
    } else {
        ClassProducts.putProduct(parseInt(uid), title, description, code, price, status, stock, category, thumbnails ).then(
            result => {
                if (result === 1) { res.json({ "status": true, "message": "Producto actualizado correctamente." }); }
                else if (result === -1) { res.status(400).json({ "status": false, "message": "Producto no encontrado para actualización." }); }
                else { res.status(400).json({ "status": false, "message": "No fue posible actualizar producto." }); }
            }
        ).catch(error => {
            res.status(500).json({ "status": false, "message": error });
        });
    }
});

prodRouter.delete('/:uid', (req, res) => {
    let uid = req.params.uid;
    ClassProducts.deleteProduct(parseInt(uid)).then(
        result => {
            if (result === 1) { res.json({ "status": true, "message": "Producto eliminado correctamente." }); }
            else if (result === -1) { res.status(400).json({ "status": false, "message": "Producto no encontrado para eliminación." }); }
            else { res.status(400).json({ "status": false, "message": "No fue posible eliminar producto." }); }
        }
    ).catch(error => {
        res.status(500).json({ "status": false, "message": error });
    });
});

module.exports = prodRouter;