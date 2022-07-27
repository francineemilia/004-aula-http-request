const express = require('express');
const app = express();
const products = require('./products');

app.use(express.json());

app.get('/',(req,res) =>{
    const {name,price,stock} = req.query;
    let result;
    
    if (!name && !price && !stock){
        return res.status(200).json(products);
    }else if (name && price && stock){
        result = products.filter((product) => product.name === name && product.price === Number(price) && product.stock > 0);
    }else if (name && price && !stock){
        result = products.filter((product) => product.name === name && product.price === Number(price));
    }else if (name && !price &&  stock){
        result = products.filter((product) => product.name === name && product.stock > 0);
    }else if (name && !price && !stock){
        result = products.filter((product) => product.name === name);
    }else if (!name && price &&  stock){
        result = products.filter((product) => product.price === Number(price) && product.stock > 0);
    }else if (!name && price && !stock){
        result = products.filter((product) => product.price === Number(price));
    }else if (!name && !price && stock){
        result = products.filter((product) => product.stock > 0);
    }
    
    if (!result || result.length === 0 ){
        return res.status(404).json({ message: 'Nenhum produto encontrado com os parâmetros de busca. Verifique se os parâmetros estão corretos'});
    }
    return res.status(200).json(result);
})

app.listen(3001, () => {
    console.log('Servidor online')
})