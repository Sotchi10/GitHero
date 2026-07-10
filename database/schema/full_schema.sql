CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profile (
    profile_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    username VARCHAR(50) NOT NULL UNIQUE,
    bio VARCHAR(255),
    description TEXT,
    gender VARCHAR(20),
    role ENUM('student', 'developer', 'Student', 'Developer') NOT NULL DEFAULT 'student',
    location VARCHAR(100),
    avatar VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_profile_user
        FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_posts_user
        FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE CASCADE,
    INDEX idx_posts_created_at (created_at),
    INDEX idx_posts_user_id (user_id)
);

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

CREATE TABLE IF NOT EXISTS files (
    file_id INT AUTO_INCREMENT PRIMARY KEY,
    repo_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    path VARCHAR(255) NOT NULL,
    content LONGTEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_files_repository
        FOREIGN KEY (repo_id) REFERENCES repositories(repo_id)
        ON DELETE CASCADE,
    UNIQUE KEY uq_files_repo_path (repo_id, path),
    INDEX idx_files_repo_id (repo_id)
);

CREATE TABLE IF NOT EXISTS commits (
    commit_id INT AUTO_INCREMENT PRIMARY KEY,
    repo_id INT NOT NULL,
    author_id INT NOT NULL,
    message VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_commits_repository
        FOREIGN KEY (repo_id) REFERENCES repositories(repo_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_commits_author
        FOREIGN KEY (author_id) REFERENCES users(user_id)
        ON DELETE CASCADE,
    INDEX idx_commits_repo_id (repo_id),
    INDEX idx_commits_created_at (created_at)
);

CREATE TABLE IF NOT EXISTS commit_files (
    commit_file_id INT AUTO_INCREMENT PRIMARY KEY,
    commit_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    path VARCHAR(255) NOT NULL,
    content LONGTEXT,
    CONSTRAINT fk_commit_files_commit
        FOREIGN KEY (commit_id) REFERENCES commits(commit_id)
        ON DELETE CASCADE,
    INDEX idx_commit_files_commit_id (commit_id)
);
