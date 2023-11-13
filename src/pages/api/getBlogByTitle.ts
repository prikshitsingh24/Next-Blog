import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "./database/connection";
import { UserModel, BookModel } from "./database/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const {title} = req.query;

  try {
    if(title){
      console.log(title)
      const searchTitle = Array.isArray(title) ? title[0] : title;
      const regex = new RegExp(searchTitle, "i");
      const blogData = await BookModel.find({title:regex});
      if (blogData) {
        res.status(200).json(blogData);
      } else {
        res.status(404).json({ message: "Blog not found" });
      }
    }       
      }catch(error){
        console.error(error);
      } 

    }
