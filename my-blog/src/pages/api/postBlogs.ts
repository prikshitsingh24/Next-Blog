import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "./database/connection";
import { BookModel, UserModel } from "./database/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    
    if (req.method === 'GET') {
      try {
        const books = await BookModel.find();
        res.status(200).json(books);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    } else if (req.method === 'POST') {
      const { title, description, author } = req.body;
      
      try {
        const newBook = new BookModel({ title, description, author });
        await newBook.save();
        
        // Assuming you have the userId available (the ID of the user)
        const userName:string=author; // Replace with the actual user ID
  
        // Find the user by ID and update the 'blogs' array with the book's ID
        const user = await UserModel.findOne({username:userName});
        if (user) {
          user.blogs.push(newBook._id); // Add the book's ID to the 'blogs' array
          await user.save(); // Save the user document with the updated 'blogs' array
        }
  
        res.status(200).json(newBook);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    } else {
      res.status(405).end();
    }
  }
  