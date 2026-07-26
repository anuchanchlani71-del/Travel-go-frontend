import React from "react";

const features = [
  {
    icon: "💰",
    title: "Best Price Guarantee",
    description:
      "Find a lower price elsewhere? We'll match it and give you an extra discount.",
  },
  {
    icon: "🔒",
    title: "Secure Payments",
    description:
      "256-bit SSL encryption and PCI-DSS compliance keeps your transactions safe.",
  },
  {
    icon: "📞",
    title: "24/7 Customer Support",
    description:
      "Our travel experts are available round the clock to help you anytime.",
        link: "/contact-us",
  },
  {
    icon: "⚡",
    title: "Instant Booking",
    description:
      "Confirm tickets within seconds. No waiting, no hassle, just travel.",
     
  },
];

const WhyChooseUs = () => {
  return (
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
          textAlign: "center",
        }}
      >
        {/* Heading */}
        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: "800",
            marginBottom: "10px",
          }}
        >
          Why Choose <span style={{ color: "#4f46e5" }}>TravelGo</span>
        </h2>

        <p
          style={{
            color: "#6b7280",
            maxWidth: "500px",
            margin: "0 auto 50px",
          }}
        >
          Trusted by millions of travelers for a seamless booking experience
        </p>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              onClick={() => {
  if (feature.link) {
    window.location.href = feature.link;
  }
}}
              style={{
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "16px",
                padding: "24px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 18px 35px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 8px 20px rgba(0,0,0,0.05)";
              }}
            >
              {/* Icon */}
              <div
                style={{
                  fontSize: "28px",
                  marginBottom: "12px",
                }}
              >
                {feature.icon}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "700",
                  marginBottom: "8px",
                }}
              >
                {feature.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#6b7280",
                  lineHeight: "1.5",
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;