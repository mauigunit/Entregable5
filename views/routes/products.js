const { Router } = require('express');
const prodViewsRouter = Router();
const products = require('../../src/utils/productsManager');
ClassProducts = new products();

prodViewsRouter.get('/', (req, res) => {
    let limit = undefined;
    ClassProducts.getProducts(limit).then(
        result => {
            res.render('home', {result});
        }
    ).catch(error => {
        console.log(error);
    }); 
});

prodViewsRouter.get('/realtimeproducts', (req, res) => {
    let limit = undefined;
    ClassProducts.getProducts(limit).then(
        result => {
            res.render('realTimeProducts', {result});
        }
    ).catch(error => {
        console.log(error);
    }); 
});

module.exports = prodViewsRouter;