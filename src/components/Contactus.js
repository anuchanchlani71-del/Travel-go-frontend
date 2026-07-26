import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import toast, { Toaster } from "react-hot-toast";

const ContactUs = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // input change handler
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // submit API call
  const handleSubmit = async (e) => {
    e?.preventDefault(); // ✅ FIX

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/v1/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      toast.success(data.message);
      if (data.success) {
        setForm({
          name: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />
  <Toaster position="top-right" />
      <section
        style={{
          padding: "80px 0",
          background: "#f9fafb",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "0 20px",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "800" }}>
              Contact <span style={{ color: "#4f46e5" }}>TravelGo</span>
            </h2>
            <p style={{ color: "#6b7280" }}>
              We’re here to help you 24/7 for all your travel needs
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "30px",
            }}
          >
            {/* FORM */}
            <div
              style={{
                background: "#fff",
                padding: "25px",
                borderRadius: "16px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
              }}
            >
              <h3 style={{ marginBottom: "20px", fontWeight: "700" }}>
                Send a Message
              </h3>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                style={inputStyle}
              />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your Email"
                style={inputStyle}
              />

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows="5"
                style={{ ...inputStyle, resize: "none" }}
              />

              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  ...buttonStyle,
                  opacity: loading ? 0.6 : 1,
                }}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>

            {/* INFO */}
            <div
              style={{
                background: "#fff",
                padding: "25px",
                borderRadius: "16px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
              }}
            >
              <h3 style={{ marginBottom: "20px", fontWeight: "700" }}>
                Get in Touch
              </h3>

              <p style={infoText}>📍 Address: Jaipur, Rajasthan, India</p>
              <p style={infoText}>📞 Phone: +91 98765 43210</p>
              <p style={infoText}>📧 Email: support@travelgo.com</p>
              <p style={infoText}>⏰ Support: 24/7 Available</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

/* styles (UNCHANGED) */
const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  outline: "none",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  background: "#4f46e5",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontWeight: "600",
  cursor: "pointer",
};

const infoText = {
  marginBottom: "10px",
  color: "#4b5563",
};

export default ContactUs;