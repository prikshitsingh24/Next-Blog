import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from './database/connection'
import BookModel from './database/mongodb';


export default async function handler(req:NextApiRequest,res:NextApiResponse){
    await dbConnect();
    if(req.method==='GET'){
        try{
            const books=await BookModel.find();
            res.status(200).json(books);
        }catch(error){
            console.error(error);
            res.status(500).json({error:"internal server error"})
        }
    }else if(req.method==='POST'){
        const{title,description,author}=req.body;
        try{
            const newBook=new BookModel({title,description,author});
            await newBook.save();
            res.status(200).json(newBook);
        }catch(error){
            console.error(error);
            res.status(500).json({error:"internal server error"});
        }
    }else{
        res.status(405).end();
    }
}