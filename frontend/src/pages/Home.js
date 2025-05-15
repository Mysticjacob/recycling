import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      {/* Header Section */}
      <header className="header">
        <h1>Cloud-Based Sustainable Recycling</h1>
        <p>IWB is revolutionizing electronic recycling, backed by cutting-edge cloud solutions.</p>
      </header>

      {/* Navigation Buttons */}
      <section className="nav-buttons">
        <h2>🔗 Quick Access</h2>
        <button onClick={() => navigate("/products")}>🛍 View Recycled Products</button>
        <button onClick={() => navigate("/login")}>🔐 Login</button>
        <button onClick={() => navigate("/register")}>Sign-Up</button>
      </section>

      {/* Business Overview */}
      <section className="overview">
        <h2>📌 About IWB</h2>
        <p>Founded in 2024, IWB leads **electronic waste recycling**, repurposing **RAM, hard drives, and motherboard components**. In 2025, it expanded beyond Lesotho to become a **pioneer in Southern Africa’s recycling industry**.</p>
      </section>

      {/* Advantages of Using Recycled Products */}
      <section className="advantages">
        <h2>♻️ Advantages of Using Recycled Products</h2>
        <ul>
          <li>✅ **Cost-Effective** – Recycled products are often more affordable.</li>
          <li>✅ **Energy Efficient** – Producing goods with recycled materials saves resources.</li>
          <li>✅ **Environmental Protection** – Reduces pollution and preserves ecosystems.</li>
          <li>✅ **Sustainable Consumption** – Encourages reuse over waste.</li>
        </ul>
      </section>

      {/* Benefits of Recycling */}
      <section className="benefits">
        <h2>🌍 Why Recycling Matters</h2>
        <ul>
          <li>♻ **Conserves Natural Resources** – Less demand for raw materials.</li>
          <li>♻ **Reduces Pollution** – Minimizes air and water contamination.</li>
          <li>♻ **Saves Energy** – Recycling aluminum saves 95% of new production energy.</li>
          <li>♻ **Creates Jobs** – Supports the recycling industry and economy.</li>
        </ul>
      </section>

      {/* Learn More About Recycling */}
      <section className="learn-more">
        <h2>📚 Resources on Recycling</h2>
        <p>Explore these guides to understand the importance of recycling:</p>
        <ul>
          <li><a href="https://sustainability-success.com/important-benefits-of-recycling" target="_blank">Benefits of Recycling</a></li>
          <li><a href="https://friendsoftheearth.uk/sustainable-living/7-benefits-recycling" target="_blank">How Recycling Helps the Planet</a></li>
          <li><a href="https://www.epa.gov/recycle/recycling-basics-and-benefits" target="_blank">Recycling Basics (US EPA)</a></li>
        </ul>
      </section>

      {/* Call-to-Action */}
      <section className="cta">
        <h2>🌍 Join the Future of Sustainable Recycling</h2>
        <p>Leverage **cloud technology** to drive environmental change and business growth.</p>
        <button onClick={() => navigate("/register")}>🚀 Get Started</button>
      </section>
    </div>
  );
};

export default Home;
