import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "./database/connection";
import { BookModel, UserModel } from "./database/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    const { author } = req.query;
    
    try {
        // Step 1: Find the user by their username to get the user document
        const user = await UserModel.findOne({ username: author });

        if (user) {
            // Step 2: Retrieve the _id of the user's blogs from the user document
            const userBlogsId = user.blogs.map((blog: { _id: any; }) => blog._id);
            console.log(userBlogsId);
            // Step 3: Fetch the blogs using the _id
            const blogsData = await BookModel.find({ _id: { $in: userBlogsId } });
            res.status(200).json(blogsData);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}
