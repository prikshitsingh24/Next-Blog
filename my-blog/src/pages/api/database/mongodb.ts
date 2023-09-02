import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the document
interface IBook extends Document {
  title: string;
  description: string;
  author: string;
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

// Create and export the model
const BookModel = mongoose.models.Book || mongoose.model<IBook>('Book', bookSchema);

export default BookModel;
