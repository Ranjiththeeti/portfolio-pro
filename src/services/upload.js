export const uploadToCloudinary = async (file) => {

  const formData = new FormData();

  formData.append("file", file);

  formData.append(
    "upload_preset",
    "portfolio_upload"
  );

  const resourceType =
    file.type === "application/pdf"
      ? "raw"
      : "image";

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/dighe85qb/${resourceType}/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  console.log("Cloudinary:", data);

  if (!response.ok) {
    throw new Error(
      data.error?.message || "Upload Failed"
    );
  }

  return data.secure_url;
};