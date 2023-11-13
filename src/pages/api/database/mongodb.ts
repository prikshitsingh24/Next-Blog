import mongoose, { Schema, Document } from 'mongoose';

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
// Create and export the model
const BookModel = mongoose.models.Book || mongoose.model<IBook>('Book', bookSchema);
const UserModel=mongoose.models.User || mongoose.model<UserDetails>('User',userSchema);

export {BookModel,UserModel};
