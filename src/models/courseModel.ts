import { Document, Schema, model } from 'mongoose';


export interface CourseDocumentInterface extends Document {
  nombre: string;
  descripcion: string;
}


const CourseSchema = new Schema<CourseDocumentInterface>({
  nombre: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    required: true,
  },
});
  
  
export const Course = model<CourseDocumentInterface>('course', CourseSchema);
