import React from 'react';
import ContactForm from './ContactForm';

const Contact = () => {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-title">
          <h2>Contact Me</h2>
        </div>
        <div className="contact-container">
          <div className="contact-info">
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <div>
                <h3>Email</h3>
                <p>shivendra16062005@gmail.com</p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <h3>Location</h3>
                <p>Jabalpur Madhya Pradesh</p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <div>
                <h3>Phone</h3>
                <p>+91 9770155849</p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fab fa-linkedin"></i>
              <div>
                <h3>LinkedIn</h3>
                <p>https://www.linkedin.com/in/shivendra-patel-011ba528b/</p>
              </div>
            </div>
          </div>
          <div className="contact-form">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
