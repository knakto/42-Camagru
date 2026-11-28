DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`(
  `user_id`           CHAR(36)                  NOT NULL UNIQUE PRIMARY KEY,
  `username`          VARCHAR(255)              NOT NULL UNIQUE,
  `email`             VARCHAR(255)              NOT NULL UNIQUE,
  `password`          VARCHAR(255)              NOT NULL,
  `status`            ENUM("active", "pending") NOT NULL DEFAULT "pending",
  `verify_token`      CHAR(36)                  NOT NULL UNIQUE,
  `verify_expired_at` TIMESTAMP                 NOT NULL,
  `reset_token`       CHAR(36)                  NULL,
  `reset_expired_at`  TIMESTAMP                 NULL,
  `created_at`        TIMESTAMP                 NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`        TIMESTAMP                 NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS `settings`;
CREATE TABLE `settings`(
  `user_id`             CHAR(36)      NOT NULL UNIQUE,
  `notification_email`  BOOLEAN       NOT NULL DEFAULT true,

  CONSTRAINT `fk_settings_user`
        FOREIGN KEY (`user_id`) 
        REFERENCES `users`(`user_id`)
        ON DELETE CASCADE
);

DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts`(
  `post_id`       INT           NOT NULL AUTO_INCREMENT UNIQUE,
  `user_id`       CHAR(36)      NOT NULL UNIQUE,
  `caption`       TEXT          DEFAULT NULL,
  `picture_path`  VARCHAR(255)  UNIQUE,
  `created_at`    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT `fk_posts_user`
        FOREIGN KEY (`user_id`)
        REFERENCES users(`user_id`)
        ON DELETE CASCADE
);

DROP TABLE IF EXISTS `likes`;
CREATE TABLE `likes`(
  `post_id`      INT           NOT NULL UNIQUE,
  `user_id`      CHAR(36)      NOT NULL UNIQUE,
  PRIMARY KEY (`post_id`, `user_id`),

  CONSTRAINT `fk_likes_user`
      FOREIGN KEY (`user_id`)
      REFERENCES users(`user_id`)
      ON DELETE CASCADE,

  CONSTRAINT fk_likes_post 
      FOREIGN KEY (`post_id`)
      REFERENCES posts(`post_id`)
      ON DELETE CASCADE
);

DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments`(
  `post_id`      INT           NOT NULL UNIQUE,
  `user_id`      CHAR(36)      NOT NULL UNIQUE,
  `comment`      TEXT          NOT NULL,
  PRIMARY KEY (`post_id`, `user_id`),

  CONSTRAINT `fk_comments_user`
        FOREIGN KEY (`user_id`)
        REFERENCES `users`(`user_id`)
        ON DELETE CASCADE,
        
  CONSTRAINT `fk_comments_post`
      FOREIGN KEY (`post_id`)
      REFERENCES `posts`(`post_id`)
      ON DELETE CASCADE
);
