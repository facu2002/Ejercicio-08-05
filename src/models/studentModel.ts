import { Document, Schema, model } from 'mongoose';
import validator from 'validator';

export interface StudentDocumentInterface extends Document {
  nombre: string;
  apellidos: string;
  edad: number;
  email: string;
  asignaturas: Schema.Types.ObjectId[];
}


const StudentSchema = new Schema<StudentDocumentInterface>({
  nombre: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  apellidos: {
    type: String,
    required: true,
  },
  edad: {
    type: Number,
    required: true,
    validate(value: number) {
      if (value < 0) {
        throw new Error('La edad no puede ser negativa');
      }
    }
  },
  email: {
    type: String,
    required: true,
    validate(value: string) {
      if (!validator.default.isEmail(value)) {
        throw new Error('El email no es válido');
      }
    }
  },
  asignaturas: {
    type: [Schema.Types.ObjectId],
    ref: 'Course',
    default: [],
  },
});
  
  
export const Student = model<StudentDocumentInterface>('student', StudentSchema);
