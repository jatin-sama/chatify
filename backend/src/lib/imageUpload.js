import cloudinary from "./cloudinary.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.URL);
const __dirname = path.dirname(__filename);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

/**
 * Upload image with fallback options
 * 1. Try Cloudinary first
 * 2. Fall back to local storage if Cloudinary fails
 */
export const uploadImage = async (base64Image, options = {}) => {
  try {
    // Validate input
    if (!base64Image || !base64Image.startsWith('data:image/')) {
      throw new Error('Invalid image format');
    }

    // Extract image info
    const matches = base64Image.match(/^data:image\/([a-zA-Z]*);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      throw new Error('Invalid base64 image format');
    }

    const imageType = matches[1];
    const imageData = matches[2];

    // Try Cloudinary upload first
    try {
      console.log('Attempting Cloudinary upload...');
      const cloudinaryResult = await cloudinary.uploader.upload(base64Image, {
        folder: options.folder || "chat_app_profiles",
        transformation: [
          { width: 200, height: 200, crop: "fill" },
          { quality: "auto" },
          { fetch_format: "auto" }
        ],
        ...options
      });

      console.log('Cloudinary upload successful');
      return {
        url: cloudinaryResult.secure_url,
        publicId: cloudinaryResult.public_id,
        method: 'cloudinary'
      };
    } catch (cloudinaryError) {
      console.warn('Cloudinary upload failed, falling back to local storage:', cloudinaryError.message);
      
      // Fallback to local storage
      const fileName = `profile_${Date.now()}_${Math.random().toString(36).substring(7)}.${imageType}`;
      const filePath = path.join(uploadsDir, fileName);
      
      // Convert base64 to buffer and save
      const buffer = Buffer.from(imageData, 'base64');
      fs.writeFileSync(filePath, buffer);
      
      // Return local URL (you'll need to serve this statically)
      const localUrl = `/uploads/${fileName}`;
      
      console.log('Local storage upload successful');
      return {
        url: localUrl,
        publicId: fileName,
        method: 'local'
      };
    }
  } catch (error) {
    console.error('Image upload failed:', error);
    throw new Error(`Failed to upload image: ${error.message}`);
  }
};

/**
 * Delete uploaded image
 */
export const deleteImage = async (publicId, method = 'cloudinary') => {
  try {
    if (method === 'cloudinary') {
      await cloudinary.uploader.destroy(publicId);
    } else if (method === 'local') {
      const filePath = path.join(uploadsDir, publicId);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
  } catch (error) {
    console.error('Failed to delete image:', error);
    // Don't throw error for deletion failures
  }
};
