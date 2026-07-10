CREATE TABLE IF NOT EXISTS repositories (
    repo_id INT AUTO_INCREMENT PRIMARY KEY,
    owner_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    visibility ENUM('public', 'private') NOT NULL DEFAULT 'public',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_repositories_owner
        FOREIGN KEY (owner_id) REFERENCES users(user_id)
        ON DELETE CASCADE,
    UNIQUE KEY uq_repositories_owner_name (owner_id, name),
    INDEX idx_repositories_owner_id (owner_id),
    INDEX idx_repositories_updated_at (updated_at)
);
