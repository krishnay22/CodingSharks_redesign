// CreateUserPage.jsx
import React, { useState, useRef } from "react";
import {
  LockIcon,
  UserIcon,
  MapPinIcon,
  PhoneIcon,
  CalendarIcon,
  MailIcon,
  BookOpenIcon,
  ImageIcon,
} from "lucide-react";

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    borderRadius: "20px",
    justifyContent: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)",
    padding: "20px",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: "500px",
    background: "white",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)",
    padding: "40px",
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
  },
  headerH1: {
    margin: 0,
    fontSize: "28px",
    fontWeight: 700,
    color: "#333",
  },
  headerP: {
    margin: "10px 0 0",
    color: "#666",
    fontSize: "16px",
  },
  inputGroup: {
    marginBottom: "24px",
    position: "relative",
  },
  formInput: {
    position: "relative",
    borderRadius: "8px",
    border: "2px solid #e1e1e1",
    background: "#f9f9f9",
    transition: "all 0.3s ease",
  },
  formInputActive: {
    borderColor: "#FF9A70",
    background: "white",
    boxShadow: "0 0 0 4px rgba(255, 154, 112, 0.1)",
  },
  inputIcon: {
    position: "absolute",
    left: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#999",
    width: "20px",
    height: "20px",
  },
  input: {
    width: "100%",
    padding: "16px 16px 16px 50px",
    border: "none",
    background: "transparent",
    fontSize: "16px",
    outline: "none",
  },
  label: {
    position: "absolute",
    left: "50px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#999",
    pointerEvents: "none",
    fontSize: "16px",
    transition: "all 0.3s ease",
  },
  labelActive: {
    top: "8px",
    left: "16px",
    fontSize: "12px",
    color: "#FF9A70",
  },
  submitButton: {
    width: "100%",
    padding: "16px",
    background: "#FF9A70",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: 600,
    cursor: "pointer",
    marginTop: "10px",
  },
  footer: {
    textAlign: "center",
    marginTop: "24px",
  },
  signInLink: {
    color: "#FF9A70",
    textDecoration: "none",
    fontSize: "14px",
  },
  checkboxContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "24px",
  },
  checkbox: {
    marginRight: "10px",
    width: "20px",
    height: "20px",
    accentColor: "#FF9A70",
  },
  checkboxLabel: {
    fontSize: "16px",
    color: "#666",
  },
  twoColumns: {
    display: "flex",
    gap: "16px",
  },
  halfWidth: {
    flex: "1",
  },
  photoUploadContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "2px dashed #e1e1e1",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "24px",
    backgroundColor: "#f9f9f9",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  photoUploadActive: {
    borderColor: "#FF9A70",
    backgroundColor: "rgba(255, 154, 112, 0.05)",
  },
  photoPreview: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "10px",
  },
  photoUploadText: {
    color: "#666",
    fontSize: "14px",
    textAlign: "center",
  },
  photoInput: {
    opacity: 0,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    cursor: "pointer",
  },
};

export default function CreateUserPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    location: "",
    joinedDate: new Date().toISOString().split("T")[0], // Default to today
    course: "",
    isAdmin: false,
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Create form data for file upload
      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        submitData.append(key, formData[key]);
      });

      if (photoFile) {
        submitData.append("photo", photoFile);
      }

      const response = await fetch("http://localhost:5000/api/create-user", {
        method: "POST",
        body: submitData, // Don't set Content-Type header when using FormData
      });

      const data = await response.json();

      if (response.ok) {
        console.log("User created:", data);
        alert("User created successfully!");
        // Redirect or update UI accordingly
      } else {
        alert(data.message || "Failed to create user");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const renderInputField = (name, label, icon, type = "text") => {
    const value = formData[name];
    const Icon = icon;

    return (
      <div style={styles.inputGroup}>
        <div
          style={{
            ...styles.formInput,
            ...(value ? styles.formInputActive : {}),
          }}
        >
          <Icon style={styles.inputIcon} />
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={handleInputChange}
            style={styles.input}
            required
          />
          <label
            htmlFor={name}
            style={{
              ...styles.label,
              ...(value ? styles.labelActive : {}),
            }}
          >
            {label}
          </label>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.headerH1}>Create New User</h1>
          <p style={styles.headerP}>
            Enter details to create a new user account
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Photo upload section */}
          <div
            style={{
              ...styles.photoUploadContainer,
              ...(photoPreview ? styles.photoUploadActive : {}),
            }}
            onClick={handlePhotoUploadClick}
          >
            {photoPreview ? (
              <img
                src={photoPreview}
                alt="Profile preview"
                style={styles.photoPreview}
              />
            ) : (
              <ImageIcon size={48} color="#999" />
            )}
            <p style={styles.photoUploadText}>
              {photoPreview ? "Change photo" : "Upload profile photo"}
            </p>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handlePhotoChange}
              style={styles.photoInput}
            />
          </div>

          {/* Basic user information */}
          <div style={styles.twoColumns}>
            <div style={styles.halfWidth}>
              {renderInputField("username", "Username", UserIcon)}
            </div>
            <div style={styles.halfWidth}>
              {renderInputField("email", "Email", MailIcon, "email")}
            </div>
          </div>

          {/* Password fields */}
          <div style={styles.twoColumns}>
            <div style={styles.halfWidth}>
              {renderInputField(
                "password",
                "Create Password",
                LockIcon,
                "password"
              )}
            </div>
            <div style={styles.halfWidth}>
              {renderInputField(
                "confirmPassword",
                "Confirm Password",
                LockIcon,
                "password"
              )}
            </div>
          </div>

          {/* Contact information */}
          <div style={styles.twoColumns}>
            <div style={styles.halfWidth}>
              {renderInputField("phone", "Phone Number", PhoneIcon, "tel")}
            </div>
            <div style={styles.halfWidth}>
              {renderInputField("location", "Location", MapPinIcon)}
            </div>
          </div>

          {/* Additional information */}
          <div style={styles.twoColumns}>
            <div style={styles.halfWidth}>
              {renderInputField(
                "joinedDate",
                "Joined Date",
                CalendarIcon,
                "date"
              )}
            </div>
            <div style={styles.halfWidth}>
              {renderInputField("course", "Course", BookOpenIcon)}
            </div>
          </div>

          {/* Admin checkbox */}
          <div style={styles.checkboxContainer}>
            <input
              id="isAdmin"
              name="isAdmin"
              type="checkbox"
              checked={formData.isAdmin}
              onChange={handleInputChange}
              style={styles.checkbox}
            />
            <label htmlFor="isAdmin" style={styles.checkboxLabel}>
              Admin User
            </label>
          </div>

          <button type="submit" style={styles.submitButton}>
            Create User
          </button>
        </form>

        <div style={styles.footer}>
          <a href="#" style={styles.signInLink}>
            Already have an account? Sign in
          </a>
        </div>
      </div>
    </div>
  );
}
