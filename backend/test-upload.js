import { uploadImage } from "./src/lib/imageUpload.js";

// Test base64 image (small 1x1 pixel PNG)
const testBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";

async function testUpload() {
  try {
    console.log("Testing image upload...");
    const result = await uploadImage(testBase64, { folder: "test" });
    console.log("Upload successful:", result);
  } catch (error) {
    console.error("Upload failed:", error.message);
  }
}

testUpload();
