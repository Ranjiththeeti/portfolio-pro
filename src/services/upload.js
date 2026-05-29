export const uploadToCloudinary = async (file) => {

  const formData = new FormData();

  formData.append("file", file);

  formData.append(
    "upload_preset",
    "portfolio_unsigned"
  );

  // CHECK FILE TYPE

  const isPDF =
    file.type === "application/pdf";

  // PDF -> RAW
  // IMAGE -> IMAGE

  const resourceType =
    isPDF ? "raw" : "image";

  const response = await fetch(

    `https://api.cloudinary.com/v1_1/dj0jwlb3z/${resourceType}/upload`,

    {
      method: "POST",
      body: formData,
    }
  );

  const data =
    await response.json();

  return data.secure_url;
};