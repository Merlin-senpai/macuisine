-- Restaurant Menu Management System Database Schema

-- Categories table (menu sections like Starters, Mains, Drinks)
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    position INT NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_position (position),
    INDEX idx_active (is_active)
);

-- Dietary tags table (Vegetarian, Vegan, Gluten-Free, etc.)
CREATE TABLE IF NOT EXISTS dietary_tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    INDEX idx_name (name)
);

-- Menu items table (actual food items)
CREATE TABLE IF NOT EXISTS menu_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(500),
    is_popular BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
    INDEX idx_category (category_id),
    INDEX idx_active (is_active),
    INDEX idx_popular (is_popular),
    INDEX idx_featured (is_featured)
);

-- Junction table for menu items and dietary tags (many-to-many relationship)
CREATE TABLE IF NOT EXISTS menu_item_dietary (
    menu_item_id INT NOT NULL,
    dietary_id INT NOT NULL,
    PRIMARY KEY (menu_item_id, dietary_id),
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE CASCADE,
    FOREIGN KEY (dietary_id) REFERENCES dietary_tags(id) ON DELETE CASCADE
);

-- Insert default dietary tags
INSERT INTO dietary_tags (name) VALUES 
('Vegetarian'),
('Vegan'),
('Gluten-Free'),
('Halal'),
('Dairy-Free'),
('Nut-Free'),
('Keto'),
('Low-Carb');

-- Insert sample categories
INSERT INTO categories (name, position, is_active) VALUES 
('Starters', 1, TRUE),
('Main Courses', 2, TRUE),
('Desserts', 3, TRUE),
('Beverages', 4, TRUE),
('Soups & Salads', 5, TRUE);

-- Ma Cuisine Authentication Database Schema
-- Clean, robust authentication system

-- Users table for authentication and role management
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(250) NOT NULL UNIQUE,
    password_hash VARCHAR(205) NOT NULL,
    name VARCHAR(100) NOT NULL,
    role ENUM('customer', 'admin', 'super_admin') NOT NULL DEFAULT 'customer',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    email_verified BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_active (is_active),
    INDEX idx_created (created_at)
);

-- Sessions table for secure session management
CREATE TABLE IF NOT EXISTS sessions (
    id VARCHAR(250) PRIMARY KEY,
    user_id INT NOT NULL,
    token_hash VARCHAR(250) NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_accessed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign key relationship
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    
    -- Indexes for performance
    INDEX idx_user_id (user_id),
    INDEX idx_expires_at (expires_at),
    INDEX idx_token_hash (token_hash)
);

-- Password reset tokens table
CREATE TABLE IF NOT EXISTS password_reset_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token VARCHAR(250) NOT NULL UNIQUE,
    expires_at TIMESTAMP NOT NULL,
    used BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign key relationship
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    
    -- Indexes
    INDEX idx_user_id (user_id),
    INDEX idx_token (token),
    INDEX idx_expires_at (expires_at)
);

-- Login attempts table for security
CREATE TABLE IF NOT EXISTS login_attempts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ip_address VARCHAR(45) NOT NULL,
    username VARCHAR(50) NOT NULL,
    success BOOLEAN NOT NULL DEFAULT FALSE,
    attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_agent TEXT,
    
    -- Indexes
    INDEX idx_ip_address (ip_address),
    INDEX idx_username (username),
    INDEX idx_attempted_at (attempted_at)
);

-- User activity log for audit trail
CREATE TABLE IF NOT EXISTS user_activity_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50),
    resource_id INT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign key relationship
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    
    -- Indexes
    INDEX idx_user_id (user_id),
    INDEX idx_action (action),
    INDEX idx_created_at (created_at)
);

-- Insert default super admin user
-- Password: admin123 (hashed with bcrypt)
INSERT INTO users (username, email, password_hash, name, role, is_active, email_verified, created_at, updated_at) 
VALUES (
    'admin',
    'admin@macuisine.com',
    '$2b$12$mVirGFQtcQqy8nB5ydNRtuv1B9uw6zJMBAqbl07r33WOibtZilpq2',
    'Administrator',
    'super_admin',
    TRUE,
    TRUE,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
) ON DUPLICATE KEY UPDATE username = username;

-- Create view for active users with sessions
CREATE OR REPLACE VIEW active_admin_users AS
SELECT 
    u.id,
    u.username,
    u.email,
    u.name,
    u.role,
    u.last_login,
    s.id as session_id,
    s.expires_at as session_expires,
    s.last_accessed as session_last_accessed
FROM users u
LEFT JOIN sessions s ON u.id = s.user_id AND s.expires_at > NOW()
WHERE u.is_active = TRUE AND u.role IN ('admin', 'super_admin');

-- Create view for user statistics
CREATE OR REPLACE VIEW user_statistics AS
SELECT 
    u.role,
    COUNT(*) as total_users,
    COUNT(CASE WHEN u.is_active = TRUE THEN 1 END) as active_users,
    COUNT(CASE WHEN u.last_login IS NOT NULL THEN 1 END) as users_with_login,
    MAX(u.last_login) as most_recent_login
FROM users u
GROUP BY u.role;
