import { Router } from "express";

const subscriptionRouter =Router();

subscriptionRouter.get('/', (req, res)=> res.send({title:'GET all the Subscriptions'}));

subscriptionRouter.get('/:id', (req, res)=> res.send({title:'GET The Subscription'}));

subscriptionRouter.post('/', (req, res)=> res.send({title:'CREATE A Subscription'}));

subscriptionRouter.put('/id', (req, res)=> res.send({title:'Update The Subscription'}));

subscriptionRouter.delete('/:id', (req, res)=> res.send({title:'DELETE The Subscription'}));

subscriptionRouter.get('/user/:id', (req, res)=> res.send({title:'GET all users Subscriptions'}));

subscriptionRouter.put('/:id/cancel', (req, res)=> res.send({title:'Cancel The Subscription'}));

subscriptionRouter.get('/upcoming-renewals', (req, res)=> res.send({title:'Get Upcoming Renewals'}));


export default subscriptionRouter;