import React, { useState } from "react";

function Contact() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [filePath, setFilePath] = useState(null);
  const uploadfile = async (e) => {
    e.preventDefault();

    // Create a FormData object
    const formData = new FormData();
    const fileField = document.querySelector('input[type="file"]');

    // Append the file to the FormData object
    formData.append("productFile", fileField.files[0]);

    try {
      const response = await fetch(`https://localhost:7283/api/File/upload`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setUploadedFile(data.fileName);
        setFilePath(data.filePath);
        console.log(data);
        console.log(uploadedFile , "fileee")
        alert("File uploaded successfully");
      } else {
        const errorData = await response.json();
        alert(`Upload failed: ${errorData.title}`);
      }
    } catch (error) {
      alert(`Upload failed: ${error.message}`);
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={uploadfile} encType="multipart/form-data">
          <div className="mb-3">
            <label htmlFor="exampleInputFile" className="form-label">
              Image
            </label>
            <input
              type="file"
              className="form-control"
              id="exampleInputFile"
              aria-describedby="fileHelp"
              name="productFile"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        {/* Display uploaded file */}
        {uploadedFile && (
          <div>
            <h3>Uploaded File:</h3>
            <img src={`D:/csharp/Project2/backend/backend/wwwroot/Files/${uploadedFile}`} alt="Uploaded" />
          </div>
        )}
      </div>
    </>
  );
}

export default Contact;
