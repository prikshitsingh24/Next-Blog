import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "./database/connection";
import { UserModel, BookModel } from "./database/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const {id } = req.query;

  try {
        const blogData = await BookModel.findById(id);

        if (blogData) {
          res.status(200).json(blogData);
        } else {
          res.status(404).json({ message: "Blog not found" });
        }
      }catch(error){
        console.error(error);
      } 

    }
