-- Créer la table des prestations
CREATE TABLE IF NOT EXISTS prestations (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  short_description TEXT,
  full_description TEXT NOT NULL,
  benefits TEXT,
  what_to_expect TEXT,
  duration VARCHAR(100),
  format VARCHAR(100),
  category VARCHAR(100),
  published BOOLEAN DEFAULT TRUE,
  order_index INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_prestations_slug ON prestations(slug);
CREATE INDEX idx_prestations_published ON prestations(published);
CREATE INDEX idx_prestations_order ON prestations(order_index);
