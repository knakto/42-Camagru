START TRANSACTION;

CREATE TEMPORARY TABLE seed_users (
    user_id CHAR(36) PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE
);

INSERT INTO seed_users (user_id, username, email)
WITH RECURSIVE seq AS (
    SELECT 0 AS n
    UNION ALL
    SELECT n + 1 FROM seq WHERE n < 29
)
SELECT
    UUID(),
    CONCAT('user', LPAD(n, 4, '0')),
    CONCAT('test', LPAD(n, 4, '0'), '@test.com')
FROM seq;

-- Insert parent table
INSERT INTO users (
    user_id, username, email, password, status, verify_token
)
SELECT
    user_id,
    username,
    email,
    '$2y$12$hRukrcv14QS2Y/ojN3Iw8OkMqVrCR4gZkfOi64WZlJlRN7m9Znplu',
    'active',
    UUID()
FROM seed_users;

-- Insert child table
INSERT INTO settings (
    user_id
)
SELECT
    user_id
FROM seed_users;

DROP TEMPORARY TABLE seed_users;

COMMIT;
