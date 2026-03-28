'use client';

import { useState } from 'react';
import styles from '../brochure.module.css';
import MotionWrapper from '@/app/components/motion/MotionWrapper';
import { brandCatalog, buildBrandWhatsAppUrl, buildBrandMailToUrl } from '@/app/lib/brands';
import { brandMeta } from '../data/products';

export default function BrochureContact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    brand: '',
    message: '',
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Build WhatsApp message from form data
    const whatsappMessage = `Hello! I am interested in your products.\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nBrand: ${formData.brand}\n\nMessage: ${formData.message}`;

    // Build WhatsApp URL and open
    const whatsappUrl = `https://wa.me/919790600220?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');

    // Reset form
    setFormData({
      name: '',
      phone: '',
      email: '',
      brand: '',
      message: '',
    });
  };

  // Filter brandCatalog to only 'femison' and 'neat-fresh'
  const brandCards = brandCatalog.filter((brand) => brand.slug === 'femison' || brand.slug === 'neat-fresh');

  return (
    <section id="contact" className={styles.contactSection}>
      <div className={styles.container}>
        {/* Section Heading */}
        <div className={styles.sectionHeading}>
          <div className={styles.sectionEyebrow}>Contact</div>
          <h2 className={styles.sectionTitle}>Get in Touch</h2>
          <p className={styles.sectionLead}>Every brand has a dedicated contact person. Reach the right team directly.</p>
        </div>

        {/* Contact Grid */}
        <div className={styles.contactGrid}>
          {/* Corporate Card */}
          <MotionWrapper>
            <div className={styles.contactCard}>
              <h3 className={styles.contactCardTitle}>Firose Enterprises (Corporate)</h3>
              <ul className={styles.contactInfo}>
                <li>
                  <strong>Address:</strong> Firose Enterprises, India
                </li>
                <li>
                  <strong>Phone:</strong> +91 9790600220
                </li>
                <li>
                  <strong>Email:</strong> info.firoseenterprises@gmail.com
                </li>
              </ul>
              <div className={styles.contactActions}>
                <a
                  href="https://wa.me/919790600220?text=Hello! I am interested in Firose Enterprises products."
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.btnWhatsapp}`}
                  style={{ minHeight: '44px' }}
                >
                  WhatsApp
                </a>
                <a
                  href="mailto:info.firoseenterprises@gmail.com"
                  className={styles.btnSecondary}
                  style={{ minHeight: '44px' }}
                >
                  Email
                </a>
              </div>
            </div>
          </MotionWrapper>

          {/* Brand Cards */}
          {brandCards.map((brand) => {
            const slug = brand.slug as 'femison' | 'neat-fresh';
            const meta = brandMeta[slug];
            if (!meta) return null;

            return (
              <MotionWrapper key={brand.slug}>
                <div
                  className={styles.contactCard}
                  style={{
                    borderLeft: `3px solid ${meta.color}`,
                  }}
                >
                  <h3 className={styles.contactCardTitle}>{brand.name}</h3>
                  <ul className={styles.contactInfo}>
                    <li>
                      <strong>Person:</strong> {brand.contact.personName}
                    </li>
                    <li>
                      <strong>Role:</strong> {brand.contact.role}
                    </li>
                    <li>
                      <strong>Phone:</strong> {brand.contact.phoneDisplay}
                    </li>
                    <li>
                      <strong>Email:</strong> {brand.contact.email}
                    </li>
                  </ul>
                  <div className={styles.contactActions}>
                    <a
                      href={buildBrandWhatsAppUrl(brand.contact, `Hello! I am interested in ${brand.name} products.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.btnWhatsapp}
                    >
                      WhatsApp
                    </a>
                    <a
                      href={buildBrandMailToUrl(brand.contact, `${brand.name} Enquiry`)}
                      className={styles.btnSecondary}
                    >
                      Email
                    </a>
                    <a
                      href={`tel:${brand.contact.phone}`}
                      className={styles.btnSecondary}
                      style={{ minHeight: '44px' }}
                    >
                      Call
                    </a>
                  </div>
                </div>
              </MotionWrapper>
            );
          })}
        </div>

        {/* Enquiry Form Panel */}
        <div className={styles.formPanel}>
          <h3>Send an Enquiry</h3>
          <form onSubmit={handleFormSubmit}>
            <div className={styles.fieldGrid}>
              <div className={styles.fieldGroup}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className={styles.fieldGroup}>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className={styles.fieldGroup}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleFormChange}
                />
              </div>
              <div className={styles.fieldGroup}>
                <select
                  name="brand"
                  value={formData.brand}
                  onChange={handleFormChange}
                >
                  <option value="">Select Brand</option>
                  <option value="Femison">Femison</option>
                  <option value="Neat & Fresh">Neat & Fresh</option>
                  <option value="Both / General">Both / General</option>
                </select>
              </div>
            </div>
            <div className={styles.fieldGroup}>
              <textarea
                name="message"
                placeholder="Tell us about your requirement..."
                value={formData.message}
                onChange={handleFormChange}
              />
            </div>
            <button type="submit" className={styles.btnPrimary} style={{ minHeight: '44px' }}>
              Send Enquiry
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
