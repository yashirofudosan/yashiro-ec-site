"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import "./contact.css";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", topic: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", topic: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <main className="contact-page main-content">
      <div className="contact-container glass-panel">
        <div className="contact-info">
          <h1>CONNECT<br/>WITH YASHIRO</h1>
          <p>
            Environmental alignment begins with precise communication. 
            Reach out for spatial diagnostics, bespoke element sourcing, 
            or general inquiries.
          </p>
          
          <div className="contact-details">
            <div className="detail-item">
              <span className="detail-label">OFFICE</span>
              <span>Tokyo, Japan</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">SUPPORT</span>
              <span>concierge@yashiro.ai</span>
            </div>
          </div>
        </div>

        <div className="contact-form-wrapper">
          {status === "success" ? (
            <div className="success-message">
              <h2>INQUIRY RECEIVED</h2>
              <p>Your trajectory has been noted. Our concierge will reach out to align your environmental parameters shortly.</p>
              <button className="reset-btn hover-lift" onClick={() => setStatus("idle")}>
                SEND ANOTHER
              </button>
            </div>
          ) : status === "error" ? (
            <div className="success-message">
              <h2 style={{color: "rgba(255,100,100,0.8)"}}>TRANSMISSION ERROR</h2>
              <p>There was an environmental error processing your request. Please try again.</p>
              <button className="reset-btn hover-lift" onClick={() => setStatus("idle")}>
                RETRY
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="input-group">
                <input type="text" id="name" required placeholder=" " value={formData.name} onChange={handleChange} />
                <label htmlFor="name">NAME</label>
              </div>

              <div className="input-group">
                <input type="email" id="email" required placeholder=" " value={formData.email} onChange={handleChange} />
                <label htmlFor="email">EMAIL ADDRESS</label>
              </div>

              <div className="input-group">
                <select id="topic" required value={formData.topic} onChange={handleChange}>
                  <option value="" disabled selected hidden>SELECT INQUIRY TYPE</option>
                  <option value="tuning">Spatial Tuning & Diagnostics</option>
                  <option value="product">Product Information</option>
                  <option value="maintenance">Botanical Maintenance</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="input-group">
                <textarea id="message" rows={5} required placeholder=" " value={formData.message} onChange={handleChange}></textarea>
                <label htmlFor="message">YOUR MESSAGE</label>
              </div>

              <button 
                type="submit" 
                className="submit-btn hover-lift"
                disabled={status === "sending"}
              >
                {status === "sending" ? "TRANSMITTING..." : "SUBMIT INQUIRY"}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
