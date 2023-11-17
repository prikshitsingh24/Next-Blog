import { createServer } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "./database/connection";
import { BookModel, CommentModel, UserModel } from "./database/mongodb";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
    if (req.method === 'GET') {
        const { blogId, commentId } = req.query;

        if (blogId) {
          const blog = await BookModel.findById(blogId);
    
          if (blog) {
            const commentData = await CommentModel.find({ blogId: blog });
            res.status(200).json({ comments: commentData });
          } else {
            res.status(404).json({ error: 'blog not found' });
          }
        } else if (commentId) {
          const isCommentId = await CommentModel.findById(commentId);
          
          if (isCommentId) {
            res.status(200).json(isCommentId);
          } else {
            res.status(404).json({ error: 'comment not found' });
          }
        } else {
          res.status(400).json({ error: 'Invalid query parameters' });
        }
    } else if (req.method === 'POST') {
      const {blogId,text,user,parentCommentId,replies}=req.body;
      const isBlog = await BookModel.findOne({ _id: blogId });
      const isUser = await UserModel.findOne({ username: user });  
      const reply=await CommentModel.findById(parentCommentId);   
      if(isUser && isBlog){
        try{
            if(parentCommentId){
                const newComment=new CommentModel({blogId:blogId,text:text,user:user,parentCommentId:parentCommentId})
                await newComment.save();
                if(newComment){
                    reply.replies.push(newComment._id);
                    await reply.save();
                }
                res.status(201).json({message:'new comment created successfully'})
            }else{
                const newParentComment=new CommentModel({blogId:blogId,text:text,user:user})
                await newParentComment.save();
                res.status(201).json({message:'new parent comment created successfully'})
            }
        }catch(error){
            console.log(error);

        }
      }else{
        res.status(404).json({error:'user or blog not found in the database'});
        return;
      }
  }
}




