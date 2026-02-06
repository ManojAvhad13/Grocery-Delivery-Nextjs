import { v2 as cloudinary } from "cloudinary";

// ✅ Fail fast if env vars are missing
if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
) {
    throw new Error("Cloudinary environment variables are not set");
}

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

const uploadOnCloudinary = (buffer: Buffer): Promise<string> => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "groceries",
                resource_type: "auto",
            },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary Error:", error);
                    return reject(error);
                }

                if (!result?.secure_url) {
                    return reject(new Error("Cloudinary upload failed"));
                }

                resolve(result.secure_url);
            }
        );

        stream.end(buffer);
    });
};

export default uploadOnCloudinary;
