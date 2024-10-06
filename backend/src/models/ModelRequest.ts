// src/models/ModelRequest.ts
import { url } from 'inspector';
import mongoose, { Schema, model, Document, Types } from 'mongoose';

export interface IModelRequest extends Document {
  user: Types.ObjectId; // Updated type
  prompt: string;
  style_prompt?: string;
  art_style: string;
  negative_prompt?: string;
  mode: string;
  resultId: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'SUCCEEDED' | 'FAILED' | 'EXPIRED';
  createdAt: Date;
  updatedAt: Date;
  progress?: number;
  glb?: string; // URL
  fbx?: string; // URL
  usdz?: string; // URL
  obj?: string; // URL
  mtl?: string; // URL
  thumbnail_url?: string; // URL
  video_url?: string; // URL;
  // Texture
  textureResultId?: string;
  textureStatus?: 'PENDING' | 'IN_PROGRESS' | 'SUCCEEDED' | 'FAILED' | 'EXPIRED';
  // texture_urls
  base_color?: string; // URL
  metallic?: string; // URL
  normal?: string; // URL
  roughness?: string; // URL
}

const modelRequestSchema = new Schema<IModelRequest>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Updated type
    prompt: { type: String, required: true },
    style_prompt: { type: String },
    art_style: { type: String, required: true },
    negative_prompt: { type: String },
    mode: { type: String, required: true },
    resultId: { type: String, required: true },
    status: {
      type: String,
      enum: ['PENDING', 'IN_PROGRESS', 'SUCCEEDED', 'FAILED', 'EXPIRED'],
      default: 'PENDING',
    },
    progress: { type: Number },
    // URLs
    glb: { type: String },
    fbx: { type: String },
    usdz: { type: String },
    obj: { type: String },
    mtl: { type: String },
    thumbnail_url: { type: String },
    video_url: { type: String },
    // Texture
    textureResultId: { type: String },
    textureStatus: {
      type: String,
      enum: ['NOT_STARTED', 'PENDING', 'IN_PROGRESS', 'SUCCEEDED', 'FAILED', 'EXPIRED'],
      default: 'NOT_STARTED',
    },
    // URLs
    base_color: { type: String },
    metallic: { type: String },
    normal: { type: String },
    roughness: { type: String }
  },
  { timestamps: true }
);

export default model<IModelRequest>('ModelRequest', modelRequestSchema);
