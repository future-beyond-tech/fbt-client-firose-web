'use client';

import { useState, useMemo } from 'react';
import styles from '../brochure.module.css';
import ProductCard from './ProductCard';
import { Product, BrandMeta, ProductCategory } from '../data/products';
import { buildBrandWhatsAppUrl, buildBrandMailToUrl, getBrandBySlug } from '@/app/lib/brands';

interface ProductGridProps {
  products: Product[];
  brand: BrandMeta;
}

export default function ProductGrid({ products, brand }: ProductGridProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('all');
  const [view, setView] = useState<'cards' | 'list'>('cards');

  // Filter products by category and search
  const filtered = useMemo(() => {
    return products.filter((product) => {
      // Filter by category
      if (activeCategory !== 'all' && product.category !== activeCategory) {
        return false;
      }

      // Filter by search (case-insensitive)
      if (search.trim()) {
        const searchLower = search.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(searchLower);
        const matchesVariant = product.variant?.toLowerCase().includes(searchLower) ?? false;
        const matchesSize = product.size?.toLowerCase().includes(searchLower) ?? false;

        if (!matchesName && !matchesVariant && !matchesSize) {
          return false;
        }
      }

      return true;
    });
  }, [products, activeCategory, search]);

  return (
    <section id={brand.id + '-products'}>
      {/* Grid Controls */}
      <div className={styles.gridControls}>
        {/* Search Input */}
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search products"
        />

        {/* Filter Chips */}
        <div className={styles.filterChips}>
          <button
            className={activeCategory === 'all' ? styles.chipActive : styles.chip}
            onClick={() => setActiveCategory('all')}
            aria-pressed={activeCategory === 'all'}
          >
            All
          </button>
          {brand.categories.map((cat) => (
            <button
              key={cat.key}
              className={activeCategory === cat.key ? styles.chipActive : styles.chip}
              onClick={() => setActiveCategory(cat.key as ProductCategory)}
              aria-pressed={activeCategory === cat.key}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>

        {/* View Toggle */}
        <div className={styles.viewToggle}>
          <button
            className={view === 'cards' ? styles.viewToggleBtnActive : styles.viewToggleBtn}
            onClick={() => setView('cards')}
            aria-label="Card view"
            aria-pressed={view === 'cards'}
          >
            ▦
          </button>
          <button
            className={view === 'list' ? styles.viewToggleBtnActive : styles.viewToggleBtn}
            onClick={() => setView('list')}
            aria-label="List view"
            aria-pressed={view === 'list'}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Product Count */}
      <div className={styles.productCount}>
        Showing {filtered.length} of {products.length} products
      </div>

      {/* Cards View */}
      {view === 'cards' && (
        <div className={styles.productGrid}>
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* List View */}
      {view === 'list' && (
        <div style={{ overflowX: 'auto' }}>
          <table className={styles.productTable}>
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Variant</th>
                <th>Size</th>
                <th>MRP (₹)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product, index) => {
                const brandSlug = product.brand === 'neat-fresh' ? 'neat-fresh' : 'femison';
                const brandContact = getBrandBySlug(brandSlug).contact;
                const whatsappUrl = buildBrandWhatsAppUrl(
                  brandContact,
                  `Hello! I am interested in: ${product.name} – ${product.variant} (${product.size}). Please share details.`
                );
                const mailToUrl = buildBrandMailToUrl(
                  brandContact,
                  `Enquiry: ${product.name}`,
                  `Hello, I am interested in ${product.name} (${product.variant}, ${product.size}). Please share pricing and availability.`
                );

                return (
                  <tr key={product.id}>
                    <td>{index + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.variant || '\u2014'}</td>
                    <td>{product.size || '\u2014'}</td>
                    <td>{product.mrp !== null ? `\u20B9${product.mrp}` : 'TBD'}</td>
                    <td>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.btnWhatsapp}
                        style={{
                          fontSize: '0.72rem',
                          padding: '0.3rem 0.6rem',
                          minHeight: '36px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: '0.5rem',
                        }}
                        aria-label={`WhatsApp for ${product.name}`}
                      >
                        WhatsApp
                      </a>
                      <a
                        href={mailToUrl}
                        className={styles.btnWhatsapp}
                        style={{
                          fontSize: '0.72rem',
                          padding: '0.3rem 0.6rem',
                          minHeight: '36px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        aria-label={`Email for ${product.name}`}
                      >
                        Email
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
