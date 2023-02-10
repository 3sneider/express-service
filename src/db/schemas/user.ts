import { Schema, model, Document } from 'mongoose';

export interface User extends Document {
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string;
  password: string;
}
    
const schema = new Schema({
    email: { type: String, unique: true, required: true, lowercase: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    avatar: String,
    password: { type: String, required: true },
});
  
export default  model<User>('user', schema);



