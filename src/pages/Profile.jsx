import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { FaUser, FaEnvelope, FaUserShield } from "react-icons/fa";
import apiClient from "../api/apiClient";

export default function Profile() {
  const { user, login } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  // local states for editable fields
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Handle profile update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { data } = await apiClient.put(`/users/${user._id}`, {
        name,
        email,
        password: password || undefined, // only send if entered
      });

      // Update context with new user info
      login(data);

      setMessage("Profile updated successfully ✅");
      setIsEditing(false);
    } catch (err) {
      setMessage(
        err?.response?.data?.message ||
          "Failed to update profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center text-primary fw-bold">My Profile</h2>

      <div
        className="card shadow-lg p-4 p-md-5 mx-auto"
        style={{ maxWidth: "500px", borderRadius: "15px" }}
      >
        {!isEditing ? (
          <>
            <div className="text-center mb-4">
              <div
                className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto"
                style={{ width: "100px", height: "100px", fontSize: "2.5rem" }}
              >
                <FaUser />
              </div>
              <h3 className="mt-3">{user?.name}</h3>
            </div>

            <div className="list-group list-group-flush">
              <div className="list-group-item d-flex align-items-center">
                <FaEnvelope className="me-3 text-secondary" />
                <div>
                  <small className="text-muted">Email</small>
                  <div className="fw-bold">{user?.email}</div>
                </div>
              </div>

              <div className="list-group-item d-flex align-items-center">
                <FaUserShield className="me-3 text-secondary" />
                <div>
                  <small className="text-muted">Role</small>
                  <div>
                    {user?.isAdmin ? (
                      <span className="badge bg-danger">Admin</span>
                    ) : (
                      <span className="badge bg-success">User</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-4">
              <button
                className="btn btn-primary btn-lg px-5 shadow-sm"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            </div>
          </>
        ) : (
          // ✅ Edit Form
          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <label className="form-label fw-bold">Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Password (optional)</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {message && (
              <div className="alert alert-info py-2">{message}</div>
            )}

            <div className="d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-success"
                disabled={loading}
              >
                {loading ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
