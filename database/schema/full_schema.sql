CREATE TABLE `users` (
  `user_id` INT PRIMARY KEY AUTO_INCREMENT,
  `email` VARCHAR(255) UNIQUE NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;



CREATE TABLE `profile` (
  `profile_id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT UNIQUE NOT NULL,
  `first_name` VARCHAR(100) DEFAULT NULL,
  `last_name` VARCHAR(100) DEFAULT NULL,
  `username` VARCHAR(100) UNIQUE DEFAULT NULL,
  `bio` TEXT,
  `description` TEXT,
  `gender` ENUM('Male','Female','Other') DEFAULT NULL,
  `location` VARCHAR(150) DEFAULT NULL,
  `avatar` VARCHAR(500) DEFAULT NULL,

  CONSTRAINT `fk_profiles_users`
  FOREIGN KEY (`user_id`)
  REFERENCES `users` (`user_id`)
  ON DELETE CASCADE
) ENGINE=InnoDB;


CREATE TABLE `posts` (
  `post_id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `content` TEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT `posts_ibfk_1`
  FOREIGN KEY (`user_id`)
  REFERENCES `users` (`user_id`)
) ENGINE=InnoDB;


CREATE TABLE `repositories` (
    `repo_id` INT AUTO_INCREMENT PRIMARY KEY,
    `owner_id` INT NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `description` TEXT,
    `visibility` ENUM('public','private') DEFAULT 'public',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT `fk_repository_owner`
    FOREIGN KEY (`owner_id`)
    REFERENCES `users` (`user_id`)
    ON DELETE CASCADE
) ENGINE=InnoDB;


CREATE TABLE `files` (
    `file_id` INT AUTO_INCREMENT PRIMARY KEY,
    `repo_id` INT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `path` VARCHAR(500) NOT NULL,
    `content` LONGTEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT `fk_file_repository`
    FOREIGN KEY (`repo_id`)
    REFERENCES `repositories` (`repo_id`)
    ON DELETE CASCADE
) ENGINE=InnoDB;


CREATE TABLE `commits` (
    `commit_id` INT AUTO_INCREMENT PRIMARY KEY,
    `repo_id` INT NOT NULL,
    `author_id` INT NOT NULL,
    `message` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT `fk_commit_repository`
    FOREIGN KEY (`repo_id`)
    REFERENCES `repositories` (`repo_id`)
    ON DELETE CASCADE,

    CONSTRAINT `fk_commit_author`
    FOREIGN KEY (`author_id`)
    REFERENCES `users` (`user_id`)
    ON DELETE CASCADE
) ENGINE=InnoDB;


CREATE TABLE `commit_files` (
    `commit_file_id` INT AUTO_INCREMENT PRIMARY KEY,
    `commit_id` INT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `path` VARCHAR(500) NOT NULL,
    `content` LONGTEXT,

    CONSTRAINT `fk_commit_file_commit`
    FOREIGN KEY (`commit_id`)
    REFERENCES `commits` (`commit_id`)
    ON DELETE CASCADE
) ENGINE=InnoDB;


CREATE TABLE `modules` (
    `module_id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(150) NOT NULL,
    `description` TEXT,
    `difficulty` ENUM('Beginner','Intermediate','Advanced')
        DEFAULT 'Beginner',
    `estimated_minutes` INT DEFAULT 30,
    `total_lessons` INT DEFAULT 0,
    `display_order` INT DEFAULT 1,
    `is_published` BOOLEAN DEFAULT TRUE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;



CREATE TABLE `lessons` (
    `lesson_id` INT AUTO_INCREMENT PRIMARY KEY,
    `module_id` INT NOT NULL,
    `title` VARCHAR(150) NOT NULL,
    `description` TEXT,
    `content` LONGTEXT,
    `code_example` TEXT,
    `example_output` TEXT,
    `display_order` INT DEFAULT 1,
    `estimated_minutes` INT DEFAULT 10,
    `pdf_url` VARCHAR(500),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT `fk_lessons_module`
    FOREIGN KEY (`module_id`)
    REFERENCES `modules` (`module_id`)
    ON DELETE CASCADE
) ENGINE=InnoDB;


CREATE TABLE `user_lesson_progress` (
    `progress_id` INT AUTO_INCREMENT PRIMARY KEY,

    `user_id` INT NOT NULL,
    `lesson_id` INT NOT NULL,

    `status` ENUM(
        'in_progress',
        'completed'
    ) NOT NULL DEFAULT 'in_progress',

    `progress_percent` TINYINT UNSIGNED NOT NULL DEFAULT 0,

    `started_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `last_accessed_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `completed_at` TIMESTAMP NULL DEFAULT NULL,

    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT `fk_progress_user`
        FOREIGN KEY (`user_id`)
        REFERENCES `users` (`user_id`)
        ON DELETE CASCADE,

    CONSTRAINT `fk_progress_lesson`
        FOREIGN KEY (`lesson_id`)
        REFERENCES `lessons` (`lesson_id`)
        ON DELETE CASCADE,

    CONSTRAINT `chk_progress_percent`
        CHECK (`progress_percent` BETWEEN 0 AND 100),

    UNIQUE KEY `uq_user_lesson`
        (`user_id`, `lesson_id`),

    INDEX `idx_progress_user_status`
        (`user_id`, `status`),

    INDEX `idx_progress_user_completed`
        (`user_id`, `completed_at`)
) ENGINE=InnoDB;