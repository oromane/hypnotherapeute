-- Créer la table des témoignages
CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  client_name VARCHAR(255) NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  content TEXT NOT NULL,
  prestation_id INTEGER REFERENCES prestations(id) ON DELETE SET NULL,
  published BOOLEAN DEFAULT FALSE,
  approved_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_testimonials_published ON testimonials(published);
CREATE INDEX idx_testimonials_rating ON testimonials(rating);
