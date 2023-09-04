import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from './database/connection'
import { UserModel } from './database/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();
  if (req.method === "POST") {
    const { username, email, password } = req.body;
    try {
      const user = await UserModel.findOne({ username: username });
      if (user) {
        res.status(202).json({ message: "User already exists" });
      } else {
        const newUser = new UserModel({ username: username, email: email, password: password });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
