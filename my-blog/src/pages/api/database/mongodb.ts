import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the document
interface IBook extends Document {
  title: string;
  description: string;
  author: string;
}

interface UserDetails{
  username:string;
  email:string;
  password:string;
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
  }
});
// Create and export the model
const BookModel = mongoose.models.Book || mongoose.model<IBook>('Book', bookSchema);
const UserModel=mongoose.models.User || mongoose.model<UserDetails>('User',userSchema);

export {BookModel,UserModel};
