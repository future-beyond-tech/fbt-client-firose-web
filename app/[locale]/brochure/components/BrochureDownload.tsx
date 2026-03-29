'use client';

import { useCallback, useState } from 'react';
import styles from '../brochure.module.css';
import MotionWrapper from '@/app/components/motion/MotionWrapper';

interface CatalogueProduct {
  id: string;
  name: string;
  variant: string;
  size: string;
  mrp: number | null;
}

export default function BrochureDownload() {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = useCallback(async (type: 'full' | 'femison' | 'neat-fresh') => {
    setIsLoading(true);
    try {
      // Dynamically import products data
      const { femisonProducts, neatFreshProducts, allProducts } = await import(
        '../data/products'
      );

      // Select products based on type
      let products: CatalogueProduct[] = [];
      let catalogueTitle = '';
      let catalogueSubtitle = '';
      let filename = '';

      switch (type) {
        case 'full':
          products = allProducts;
          catalogueTitle = 'Full Group Catalogue';
          catalogueSubtitle = 'Complete product list — Femison + Neat & Fresh (55 products)';
          filename = 'FIROSE_Full_Catalogue.pdf';
          break;
        case 'femison':
          products = femisonProducts;
          catalogueTitle = 'Femison Catalogue';
          catalogueSubtitle = 'Health, Herbal & Medicinal products (29 SKUs)';
          filename = 'FIROSE_Femison_Catalogue.pdf';
          break;
        case 'neat-fresh':
          products = neatFreshProducts;
          catalogueTitle = 'Neat & Fresh Catalogue';
          catalogueSubtitle = 'Home Care & Cleaning products (26 SKUs)';
          filename = 'FIROSE_NeatFresh_Catalogue.pdf';
          break;
      }

      // Generate HTML for printable catalogue
      const html = generateCatalogueHTML(catalogueTitle, catalogueSubtitle, products);

      // Open in new window and print
      const win = window.open('', '_blank');
      if (win) {
        win.document.write(html);
        win.document.close();
        win.print();
      }
    } catch (error) {
      console.error('Error downloading catalogue:', error);
      // Fallback to simple alert
      alert('Unable to generate catalogue. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const generateCatalogueHTML = (
    title: string,
    subtitle: string,
    products: CatalogueProduct[]
  ): string => {
    const currentDate = new Date().toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const productRows = products
      .map(
        (product, index) =>
          `
      <tr style="${index % 2 === 0 ? 'background-color: #f9f9f9;' : 'background-color: #ffffff;'}">
        <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">${index + 1}</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${product.name}</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${product.variant}</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${product.size}</td>
        <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${product.mrp !== null ? '\u20B9' + product.mrp : 'TBD'}</td>
      </tr>
    `
      )
      .join('');

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title} - FIROSE Group</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #ffffff;
          color: #333;
          line-height: 1.6;
        }

        .container {
          max-width: 900px;
          margin: 0 auto;
          padding: 40px 30px;
        }

        .header {
          text-align: center;
          margin-bottom: 30px;
          border-bottom: 3px solid #1a1a1a;
          padding-bottom: 20px;
        }

        .brand {
          font-size: 12px;
          color: #666;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .title {
          font-size: 28px;
          font-weight: bold;
          color: #1a1a1a;
          margin-bottom: 5px;
        }

        .subtitle {
          font-size: 14px;
          color: #666;
          margin-bottom: 20px;
        }

        .date {
          font-size: 12px;
          color: #999;
          margin-top: 10px;
        }

        .catalogue-info {
          background-color: #f5f5f5;
          padding: 15px;
          margin-bottom: 30px;
          border-left: 4px solid #8B2252;
          border-radius: 4px;
        }

        .catalogue-info p {
          font-size: 13px;
          color: #555;
          margin: 5px 0;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 30px;
        }

        thead {
          background-color: #1a1a1a;
          color: #ffffff;
        }

        th {
          padding: 12px;
          text-align: left;
          font-weight: 600;
          font-size: 13px;
          letter-spacing: 0.5px;
        }

        th:nth-child(1),
        td:nth-child(1) {
          width: 5%;
          text-align: center;
        }

        th:nth-child(2),
        td:nth-child(2) {
          width: 35%;
        }

        th:nth-child(3),
        td:nth-child(3) {
          width: 25%;
        }

        th:nth-child(4),
        td:nth-child(4) {
          width: 20%;
        }

        th:nth-child(5),
        td:nth-child(5) {
          width: 15%;
          text-align: right;
        }

        td {
          font-size: 13px;
        }

        .footer {
          text-align: center;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
          font-size: 12px;
          color: #999;
        }

        .footer p {
          margin: 5px 0;
        }

        .product-count {
          text-align: right;
          margin-top: 15px;
          font-size: 13px;
          color: #666;
          font-weight: 500;
        }

        @media print {
          body {
            margin: 0;
            padding: 0;
          }

          .container {
            padding: 20px;
          }

          table {
            page-break-inside: avoid;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="brand">FIROSE Group</div>
          <h1 class="title">${title}</h1>
          <p class="subtitle">${subtitle}</p>
          <p class="date">Generated on ${currentDate}</p>
        </div>

        <div class="catalogue-info">
          <p><strong>FIROSE Enterprises</strong> — Premium Health & Home Care Products</p>
          <p>For more information, visit: <strong>firoseenterprises.com/brochure</strong></p>
        </div>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Variant</th>
              <th>Size</th>
              <th>MRP (₹)</th>
            </tr>
          </thead>
          <tbody>
            ${productRows}
          </tbody>
        </table>

        <div class="product-count">
          <strong>Total Products: ${products.length}</strong>
        </div>

        <div class="footer">
          <p>This catalogue was generated from <strong>firoseenterprises.com/brochure</strong></p>
          <p>For updates and new products, please visit our website regularly.</p>
          <p style="margin-top: 15px; color: #ccc;">---</p>
        </div>
      </div>
    </body>
    </html>
    `;
  };

  return (
    <section id="download" className={styles.downloadSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeading}>
          <div className={styles.sectionEyebrow}>Download</div>
          <h2 className={styles.sectionTitle}>Product Catalogues</h2>
          <p className={styles.sectionLead}>
            Download our product catalogues as PDF for offline use, WhatsApp sharing, or distributor presentations.
          </p>
        </div>

        <div className={styles.downloadGrid}>
          {/* Card 1: Full Catalogue */}
          <MotionWrapper>
            <div className={styles.downloadCard}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>📋</div>
              <h3 className={styles.downloadTitle}>Full Group Catalogue</h3>
              <p className={styles.downloadDesc}>
                Complete product list — Femison + Neat & Fresh (55 products)
              </p>
              <button
                className={styles.btnPrimary}
                onClick={() => handleDownload('full')}
                disabled={isLoading}
                style={{
                  marginTop: '20px',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  opacity: isLoading ? 0.6 : 1,
                }}
              >
                {isLoading ? 'Preparing...' : 'Download PDF'}
              </button>
            </div>
          </MotionWrapper>

          {/* Card 2: Femison */}
          <MotionWrapper>
            <div
              className={styles.downloadCard}
              style={{
                borderTop: '3px solid #8B2252',
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>💊</div>
              <h3 className={styles.downloadTitle}>Femison Catalogue</h3>
              <p className={styles.downloadDesc}>Health, Herbal & Medicinal products (29 SKUs)</p>
              <button
                className={styles.btnSecondary}
                onClick={() => handleDownload('femison')}
                disabled={isLoading}
                style={{
                  marginTop: '20px',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  opacity: isLoading ? 0.6 : 1,
                }}
              >
                {isLoading ? 'Preparing...' : 'Download PDF'}
              </button>
            </div>
          </MotionWrapper>

          {/* Card 3: Neat & Fresh */}
          <MotionWrapper>
            <div
              className={styles.downloadCard}
              style={{
                borderTop: '3px solid #1A5C3A',
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>🧼</div>
              <h3 className={styles.downloadTitle}>Neat & Fresh Catalogue</h3>
              <p className={styles.downloadDesc}>
                Home Care & Cleaning products (26 SKUs)
              </p>
              <button
                className={styles.btnSecondary}
                onClick={() => handleDownload('neat-fresh')}
                disabled={isLoading}
                style={{
                  marginTop: '20px',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  opacity: isLoading ? 0.6 : 1,
                }}
              >
                {isLoading ? 'Preparing...' : 'Download PDF'}
              </button>
            </div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
}
