import { model, models, Model } from "mongoose";
import { ActivitySchema, IActivity } from "../schemas/activity.schema";

export const Activity = (models.Activity as Model<IActivity>) || model<IActivity>("Activity", ActivitySchema);
