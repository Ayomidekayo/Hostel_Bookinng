import { Webhook } from "svix";
import User from "../models/user.js";

const clerkWebHooks = async (req, res) => {
  try {

    //Create a svix  instance with the webhook secret
       const whook=new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    //getting the headers
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    //verify the headers
     await whook.verify(JSON.stringify(req.body), headers);
   //Getting Data from the request body
    const {data,type } = req.body;
    const userData = {
      _Id: data.id,
      email: data.email_addresses[0].email_address,
      username: `${data.first_name} ${data.last_name}`,
      image: data.image_url,
    };

    switch (type) {
      case "user.created":
        await User.create(userData);
        break;
      case "user.updated":
        await User.findByIdAndUpdate(data.id ,userData);
        break;
      case "user.deleted":
        await User.findByIdAndDelete(data.id);
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
