import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {createSubscription, getUserSubscriptions }from "../controllers/subscriptions.controller.js"
const subscriptionRouter =Router();

subscriptionRouter.get('/', (req, res)=> res.send({title:'GET all the Subscriptions'}));

subscriptionRouter.get('/:id', (req, res)=> res.send({title:'GET The Subscription'}));

subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.put('/id', (req, res)=> res.send({title:'Update The Subscription'}));

subscriptionRouter.delete('/:id', (req, res)=> res.send({title:'DELETE The Subscription'}));

subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);

subscriptionRouter.put('/:id/cancel', (req, res)=> res.send({title:'Cancel The Subscription'}));

subscriptionRouter.get('/upcoming-renewals', (req, res)=> res.send({title:'Get Upcoming Renewals'}));


export default subscriptionRouter;