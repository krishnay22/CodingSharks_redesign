// CreateUserPage.jsx
import React, { useState } from "react";
import { LockIcon, UserIcon, ShieldIcon } from "lucide-react";

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)",
    padding: "20px",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
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
};

export default function CreateUserPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, isAdmin }),
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
          <div style={styles.inputGroup}>
            <div
              style={{
                ...styles.formInput,
                ...(username ? styles.formInputActive : {}),
              }}
            >
              <UserIcon style={styles.inputIcon} />
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={styles.input}
                required
              />
              <label
                htmlFor="username"
                style={{
                  ...styles.label,
                  ...(username ? styles.labelActive : {}),
                }}
              >
                Username
              </label>
            </div>
          </div>

          <div style={styles.inputGroup}>
            <div
              style={{
                ...styles.formInput,
                ...(password ? styles.formInputActive : {}),
              }}
            >
              <LockIcon style={styles.inputIcon} />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                required
              />
              <label
                htmlFor="password"
                style={{
                  ...styles.label,
                  ...(password ? styles.labelActive : {}),
                }}
              >
                Create Password
              </label>
            </div>
          </div>

          <div style={styles.inputGroup}>
            <div
              style={{
                ...styles.formInput,
                ...(confirmPassword ? styles.formInputActive : {}),
              }}
            >
              <LockIcon style={styles.inputIcon} />
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={styles.input}
                required
              />
              <label
                htmlFor="confirmPassword"
                style={{
                  ...styles.label,
                  ...(confirmPassword ? styles.labelActive : {}),
                }}
              >
                Confirm Password
              </label>
            </div>
          </div>

          <div style={styles.checkboxContainer}>
            <input
              id="isAdmin"
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
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
