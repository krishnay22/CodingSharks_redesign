import { useState } from "react";

const StudentWorkUploadForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    studentName: "",
    date: "",
    url: "",
    image: null,
    imagePreview: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: file,
          imagePreview: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData);
    alert("Student work successfully uploaded!");

    // Reset form
    setFormData({
      title: "",
      description: "",
      studentName: "",
      date: "",
      url: "",
      image: null,
      imagePreview: null,
    });
  };

  // Custom CSS styles
  const styles = {
    formContainer: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "30px",
      borderRadius: "12px",
      backgroundColor: "#fff",
      fontFamily: "'Poppins', sans-serif",
    },
    header: {
      textAlign: "center",
      marginBottom: "30px",
      color: "#333",
    },
    title: {
      fontSize: "32px",
      fontWeight: "700",
      marginBottom: "10px",
      color: "#FF9A70",
    },
    subtitle: {
      fontSize: "16px",
      fontWeight: "400",
      color: "#666",
    },
    formLayout: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },
    label: {
      fontWeight: "600",
      fontSize: "14px",
      color: "#555",
    },
    input: {
      padding: "12px 16px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      fontSize: "16px",
      transition: "all 0.3s ease",
      outline: "none",
    },
    textArea: {
      padding: "12px 16px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      fontSize: "16px",
      minHeight: "120px",
      resize: "vertical",
      outline: "none",
      transition: "all 0.3s ease",
    },
    fileInput: {
      display: "none",
    },
    fileLabel: {
      display: "inline-block",
      padding: "12px 20px",
      backgroundColor: "#f5f5f5",
      border: "1px dashed #ddd",
      borderRadius: "8px",
      cursor: "pointer",
      color: "#666",
      textAlign: "center",
      transition: "all 0.3s ease",
      width: "100%",
    },
    imagePreviewContainer: {
      width: "100%",
      marginTop: "15px",
      display: "flex",
      justifyContent: "center",
    },
    imagePreview: {
      maxWidth: "100%",
      maxHeight: "200px",
      borderRadius: "8px",
      objectFit: "cover",
    },
    submitButton: {
      padding: "14px 24px",
      backgroundColor: "#FF9A70",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      alignSelf: "center",
      width: "100%",
      marginTop: "10px",
    },
    formSection: {
      display: "flex",
      gap: "20px",
    },
    column: {
      flex: 1,
    },
    previewCard: {
      marginTop: "20px",
      padding: "20px",
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
      border: "1px solid #eee",
    },
    previewTitle: {
      color: "#FF9A70",
      fontSize: "20px",
      fontWeight: "600",
      marginBottom: "10px",
    },
    previewContent: {
      fontSize: "14px",
      color: "#666",
    },
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        fontFamily: "Arial, sans-serif",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "clamp(10px, 2vw, 20px)",
        borderRadius: "20px",
        minHeight: "clamp(400px, 80vh, 650px)",
        background: "#F8F8F8",
        width: "100%",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <div style={styles.formContainer}>
        <div style={styles.header}>
          <h1 style={styles.title}>Student Work Submission</h1>
        </div>

        <div style={styles.formLayout}>
          <div style={styles.formSection}>
            <div style={styles.column}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Student Name</label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Enter your full name"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Project Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="e.g. Portfolio Website"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Project Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  style={styles.textArea}
                  placeholder="Describe your project, technologies used, and key features"
                />
              </div>
            </div>

            <div style={styles.column}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Completion Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Project URL</label>
                <input
                  type="url"
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="https://your-project-url.com"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Project Image</label>
                <label htmlFor="image-upload" style={styles.fileLabel}>
                  {formData.image
                    ? "Change Image"
                    : "Select an image for your project"}
                </label>
                <input
                  type="file"
                  id="image-upload"
                  name="image"
                  onChange={handleImageChange}
                  style={styles.fileInput}
                  accept="image/*"
                />
                {formData.imagePreview && (
                  <div style={styles.imagePreviewContainer}>
                    <img
                      src={formData.imagePreview}
                      alt="Project preview"
                      style={styles.imagePreview}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            style={{
              ...styles.submitButton,
              backgroundColor: "#FF9A70",
              "&:hover": {
                backgroundColor: "#ff8a56",
              },
            }}
          >
            Submit Project
          </button>
        </div>

        {formData.title && formData.description && (
          <div style={styles.previewCard}>
            <h3 style={styles.previewTitle}>Preview</h3>
            <div style={styles.previewContent}>
              <p>
                <strong>Title:</strong> {formData.title}
              </p>
              <p>
                <strong>Student:</strong> {formData.studentName}
              </p>
              <p>
                <strong>Date:</strong> {formData.date}
              </p>
              <p>
                <strong>Description:</strong> {formData.description}
              </p>
              {formData.url && (
                <p>
                  <strong>URL:</strong> {formData.url}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentWorkUploadForm;
