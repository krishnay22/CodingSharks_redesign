// src/components/LoginPage.jsx
import React, { useState } from "react";
import { LockIcon, MailIcon } from "lucide-react"; // Changed UserIcon to MailIcon
import { useNavigate } from "react-router-dom";

const styles = {
  loginContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)",
    padding: "20px",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
  },
  loginCard: {
    width: "100%",
    maxWidth: "400px",
    background: "white",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)",
    padding: "40px",
  },
  loginHeader: {
    textAlign: "center",
    marginBottom: "30px",
  },
  loginHeaderH1: {
    margin: 0,
    fontSize: "28px",
    fontWeight: 700,
    color: "#333",
  },
  loginHeaderP: {
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
  loginButton: {
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
  loginFooter: {
    textAlign: "center",
    marginTop: "24px",
  },
  forgotPassword: {
    color: "#FF9A70",
    textDecoration: "none",
    fontSize: "14px",
  },
  errorMessage: {
    color: "#e74c3c",
    textAlign: "center",
    marginTop: "15px",
    fontSize: "14px",
  },
  loadingSpinner: {
    display: "inline-block",
    width: "16px",
    height: "16px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderRadius: "50%",
    borderTopColor: "#fff",
    animation: "spin 1s ease-in-out infinite",
    marginLeft: "10px",
  },
};

export default function LoginPage() {
  const [email, setEmail] = useState(""); // Corrected setter name to setEmail
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store token and user info in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.user.username); // Correctly accessing from data.user
      localStorage.setItem("isAdmin", data.user.isAdmin); // Correctly accessing from data.user
      localStorage.setItem("userId", data.user.id); // <--- ADD THIS LINE

      // Redirect to home page
      navigate("/");
      window.location.reload(); // Reload to ensure auth state is picked up by other components

      console.log("Login successful!", data);
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.loginContainer}>
      <div style={styles.loginCard}>
        <div style={styles.loginHeader}>
          <h1 style={styles.loginHeaderH1}>Welcome Back</h1>
          <p style={styles.loginHeaderP}>Enter your credentials to sign in</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <div
              style={{
                ...styles.formInput,
                ...(email ? styles.formInputActive : {}),
              }}
            >
              <MailIcon style={styles.inputIcon} /> {/* Changed to MailIcon */}
              <input
                id="email"
                type="email" // Changed type to "email" for better validation
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Corrected setter to setEmail
                style={styles.input}
                required
              />
              <label
                htmlFor="email"
                style={{
                  ...styles.label,
                  ...(email ? styles.labelActive : {}),
                }}
              >
                Email {/* Corrected label text to "Email" */}
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
                Password
              </label>
            </div>
          </div>

          {error && <div style={styles.errorMessage}>{error}</div>}

          <button type="submit" style={styles.loginButton} disabled={isLoading}>
            {isLoading ? (
              <>
                Logging in...
                <span style={styles.loadingSpinner}></span>
              </>
            ) : (
              "Log In"
            )}
          </button>
        </form>

        <div style={styles.loginFooter}>
          <a href="#" style={styles.forgotPassword}>
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
}
