import { Webhook } from "svix";
import User from "../models/user.js";

const clerkWebHooks = async (req, res) => {
  try {
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    const payload = req.body.toString();
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const evt = await wh.verify(payload, headers);
    const { data, type } = JSON.parse(payload);

    const userData = {
      clerkId: data.id,
      email: data.email_addresses[0].email_address,
      username: `${data.first_name} ${data.last_name}`,
      image: data.image_url,
    };

    switch (type) {
      case "user.created":
        await User.create(userData);
        break;
      case "user.updated":
        await User.findOneAndUpdate({ clerkId: data.id }, userData);
        break;
      case "user.deleted":
        await User.findOneAndDelete({ clerkId: data.id });
        break;
      default:
        break;
    }

    res.json({ success: true, message: "Webhook received" });
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export default clerkWebHooks;
