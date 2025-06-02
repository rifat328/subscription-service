import { Router } from "express";

const productRouter =Router();

productRouter.get('/', (req, res)=> res.send({title:'GET all the Products'}));

productRouter.get('/:id', (req, res)=> res.send({title:'GET The Product'}));

productRouter.post('/', (req, res)=> res.send({title:'CREATE A Product'}));

productRouter.put('/id', (req, res)=> res.send({title:'Update The Product'}));

productRouter.delete('/:id', (req, res)=> res.send({title:'DELETE The Product'}));

productRouter.get('/category/:id', (req, res)=> res.send({title:'GET all product from category'}));

productRouter.get('/user/:id', (req, res)=> res.send({title:'GET all users products'}));

productRouter.put('/:id/cancel', (req, res)=> res.send({title:'Cancel The Product'}));

export default productRouter;