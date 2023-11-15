import mongoose, { Schema, Document, Types } from 'mongoose';

const categoriesList = [
  'Food',
  'Travel',
  'Movie',
  'News',
  'Fashion',
  'Sports',
  'Political',
  'Religion',
  'Health and Fitness',
  'Video Game',
  'Anime',
];
// Define the interface for the document
interface IBook extends Document {
  title: string;
  description: string;
  author: string;
  category: typeof categoriesList[number];
}

interface UserDetails{
  username:string;
  email:string;
  password:string;
  blogs:[]
}

interface Comment{
  blogId:Types.ObjectId;
  text:string;
  user:string;
  parentCommentId:Types.ObjectId
  replies:[]
}
// Define the schema
const bookSchema = new Schema<IBook>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  category:{
    type: String,
    required:true,
    trim: true,
    validate: {
      validator: (value: string) => categoriesList.includes(value),
      message: 'Invalid category.',
    },
  }
  
});

const userSchema=new Schema<UserDetails>({
  username:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]

});

const commentSchema=new Schema<Comment>({
  blogId:{type:mongoose.Schema.Types.ObjectId,ref:'Books',required:true},
  text:{type:String,required:true},
  user:{type:String,required:true},
  parentCommentId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
  replies:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]

})
// Create and export the model
const BookModel = mongoose.models.Book || mongoose.model<IBook>('Book', bookSchema);
const UserModel=mongoose.models.User || mongoose.model<UserDetails>('User',userSchema);
const CommentModel=mongoose.models.Comment || mongoose.model<Comment>('Comment',commentSchema);

export {BookModel,UserModel,CommentModel};
