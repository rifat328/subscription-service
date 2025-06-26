import Subscription from "../models/subscription.model.js";
import { workflowClient } from "@upstash/workflow";
import { SERVER_URL } from "../config/env.js";

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    const { workflowRunId } = await workflowClient.trigger(
      { url, body, headers, workflowId, retries },
      {
        url: `${SERVER_URL}/api/vi/workflows/subscription/reminder`,
        body: {
          subscriptionId: subscription.id,
        },
        header: {
          "content-type": "application/json",
        },
        retries: 0,
      }
    );

    res.status(201).json({
      success: true,
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserSubscriptions = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      const error = new Error("You Are Not the Owner of this account");
      error.status = 401;
      throw error;
    }
    const subscription = await Subscription.find({ user: req.params.id });

    res.status(200).json({
      success: true,
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};
