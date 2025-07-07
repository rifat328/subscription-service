import { Router } from "express";
import { getUsers, getUser } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";
// This code defines a user router for handling user-related routes in an Express application.
const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/:id", authorize, getUser);

userRouter.post("/", (reg, res) =>
  res.send({
    title:
      "CREATE A User ,Caution :: User creation logic handeled by auth sign up , to handle duplication this fild is empty",
  })
);

userRouter.put("/:id", (reg, res) => res.send({ title: "UPDATE A User" }));

userRouter.delete("/:id", (reg, res) => res.send({ title: "DELETE A User" }));

export default userRouter;
