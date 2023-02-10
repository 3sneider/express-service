import { Schema, Document, model, ObjectId } from 'mongoose';
import { User } from './user';

interface Product extends Document {
  name: string;
  year: number;
  price?: number;
  description?: string;
  user: ObjectId | User;
}

const schema = new Schema({
  name: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, default: 0 },
  description: String,
  user: { type: Schema.Types.ObjectId, ref: 'user', required: true } // de esta manera simulamos llaves foraneas, a esto se le llama documentos envebidos  
});

export default  model<Product>('product', schema);