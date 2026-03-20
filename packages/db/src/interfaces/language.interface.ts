import { Document } from "mongoose";

// export interface ILanguage extends Document {
//   name: string;
//   judge0Id: number;
//   createdAt: Date;
//   updatedAt: Date;
// }

export interface ILanguage extends Document {
  name: string;       
  runtime: string;    
  version: string;    
  aliases?: string[]; 

  createdAt: Date;
  updatedAt: Date;
}