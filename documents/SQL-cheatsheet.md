# SQL Cheatsheet

> **Dialect:** MySQL 8.x / MariaDB\
> ใช้เป็น quick reference สำหรับเขียน SQL และจัดการฐานข้อมูลผ่าน MySQL CLI หรือ
> phpMyAdmin

## 1. SQL command groups

  Group   ใช้ทำอะไร            คำสั่งที่พบบ่อย
  ------- ------------------- -------------------------------------------
  DDL     สร้าง/แก้โครงสร้าง     `CREATE`, `ALTER`, `DROP`, `TRUNCATE`
  DML     เพิ่ม/แก้/ลบข้อมูล       `INSERT`, `UPDATE`, `DELETE`
  DQL     อ่านข้อมูล             `SELECT`
  DCL     จัดการสิทธิ์            `GRANT`, `REVOKE`
  TCL     จัดการ transaction   `START TRANSACTION`, `COMMIT`, `ROLLBACK`

## 2. Database

``` sql
-- แสดง databases
SHOW DATABASES;

-- สร้าง database
CREATE DATABASE my_app
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

-- เลือก database ที่จะใช้งาน
USE my_app;

-- ดู database ปัจจุบัน
SELECT DATABASE();

-- ลบ database (ระวัง: ลบทุก table และข้อมูลข้างใน)
DROP DATABASE my_app;
```

## 3. Table structure (DDL)

### Create table

``` sql
CREATE TABLE users (
    id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username    VARCHAR(50) NOT NULL UNIQUE,
    email       VARCHAR(255) NOT NULL UNIQUE,
    age         TINYINT UNSIGNED,
    is_active   BOOLEAN NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
                            ON UPDATE CURRENT_TIMESTAMP
);
```

### Inspect tables

``` sql
SHOW TABLES;
DESCRIBE users;
SHOW CREATE TABLE users;
```

### Alter table

``` sql
-- เพิ่ม column
ALTER TABLE users
ADD COLUMN phone VARCHAR(20);

-- แก้ชนิดข้อมูล / constraint ของ column
ALTER TABLE users
MODIFY COLUMN phone VARCHAR(30);

-- เปลี่ยนชื่อ column (MySQL 8+)
ALTER TABLE users
RENAME COLUMN phone TO phone_number;

-- ลบ column
ALTER TABLE users
DROP COLUMN phone_number;

-- เพิ่ม index
CREATE INDEX idx_users_created_at ON users (created_at);

-- ลบ index
DROP INDEX idx_users_created_at ON users;

-- เปลี่ยนชื่อ table
RENAME TABLE users TO members;
```

### Drop vs Truncate vs Delete

  -----------------------------------------------------------------------
  Command                             ผลลัพธ์
  ----------------------------------- -----------------------------------
  `DELETE FROM users;`                ลบ rows; ใส่ `WHERE`
                                      เพื่อเลือกลบเฉพาะบาง rows

  `TRUNCATE TABLE users;`             ลบ rows ทั้งหมดและ reset
                                      `AUTO_INCREMENT` โดยทั่วไปเป็น DDL

  `DROP TABLE users;`                 ลบ table ทั้งโครงสร้างและข้อมูล
  -----------------------------------------------------------------------

## 4. Data types

### Common types

  -----------------------------------------------------------------------
  Type                    ใช้เก็บ                   ตัวอย่าง
  ----------------------- ----------------------- -----------------------
  `INT`                   จำนวนเต็ม                `42`

  `BIGINT`                จำนวนเต็มขนาดใหญ่         user ID จำนวนมาก

  `DECIMAL(10,2)`         ตัวเลขที่ต้องการความแม่นยำ   `199.99`

  `FLOAT`, `DOUBLE`       เลขทศนิยมแบบ approximate ค่าทางวิทยาศาสตร์

  `VARCHAR(255)`          ข้อความความยาวไม่คงที่      email, username

  `CHAR(2)`               ข้อความความยาวคงที่        country code

  `TEXT`                  ข้อความขนาดใหญ่           description

  `DATE`                  วันที่                     `2026-11-18`

  `DATETIME`              วันและเวลา               `2026-11-18 20:30:00`

  `TIMESTAMP`             วันเวลา โดยมี behavior    `created_at`
                          เรื่อง timezone ตาม       
                          session/server          

  `BOOLEAN`               true/false (MySQL alias `TRUE`
                          ของ `TINYINT(1)`)       

  `JSON`                  JSON document           `{"role":"admin"}`

  `BLOB`                  binary data             ไฟล์/ข้อมูลไบนารี
  -----------------------------------------------------------------------

### `VARCHAR` คืออะไร?

`VARCHAR(n)` คือ string ที่มีความยาวได้ตั้งแต่ 0 ถึง `n` ตัวอักษร (ขีดจำกัดจริงยังขึ้นกับ
charset และข้อจำกัดของ row)

``` sql
username VARCHAR(50)
```

หมายถึงเก็บ username ได้ไม่เกิน 50 ตัวอักษร ไม่ได้จองพื้นที่เท่ากับ 50 ตัวอักษรเสมอไป

### Common column constraints

  Constraint         ความหมาย
  ------------------ -----------------------------------------
  `NOT NULL`         ห้ามเป็น `NULL`
  `UNIQUE`           ค่าต้องไม่ซ้ำ
  `PRIMARY KEY`      ระบุ row แบบไม่ซ้ำ และห้ามเป็น `NULL`
  `FOREIGN KEY`      บังคับความสัมพันธ์กับอีก table
  `DEFAULT value`    ค่าเริ่มต้นเมื่อไม่ได้ระบุค่า
  `AUTO_INCREMENT`   เพิ่มเลขให้อัตโนมัติ
  `CHECK`            ตรวจเงื่อนไขของค่า (รองรับใน MySQL 8.0.16+)

## 5. Insert data

``` sql
-- ระบุ columns ชัดเจน (แนะนำ)
INSERT INTO users (username, email, age)
VALUES ('kita', 'kita@example.com', 19);

-- เพิ่มหลาย rows
INSERT INTO users (username, email)
VALUES
    ('alice', 'alice@example.com'),
    ('bob', 'bob@example.com');

-- ใช้ค่า default ของ column
INSERT INTO users (username, email, is_active)
VALUES ('charlie', 'charlie@example.com', DEFAULT);
```

## 6. Select data

``` sql
-- ทุก columns
SELECT * FROM users;

-- เลือกเฉพาะ columns
SELECT id, username, email
FROM users;

-- ตั้งชื่อ column ในผลลัพธ์ (alias)
SELECT username AS name
FROM users;

-- ไม่เอาค่าซ้ำ
SELECT DISTINCT is_active
FROM users;

-- จำกัดจำนวน rows
SELECT * FROM users
LIMIT 10;

-- ข้าม 10 rows แล้วเอา 10 rows ถัดไป
SELECT * FROM users
LIMIT 10 OFFSET 10;
```

### WHERE operators

``` sql
SELECT * FROM users WHERE age >= 18;
SELECT * FROM users WHERE age BETWEEN 18 AND 25;
SELECT * FROM users WHERE is_active = TRUE;
SELECT * FROM users WHERE age IS NULL;
SELECT * FROM users WHERE age IS NOT NULL;

SELECT * FROM users
WHERE age >= 18 AND is_active = TRUE;

SELECT * FROM users
WHERE username = 'kita' OR username = 'alice';

SELECT * FROM users
WHERE username IN ('kita', 'alice', 'bob');

-- % = ตัวอักษร 0 ตัวขึ้นไป, _ = ตัวอักษร 1 ตัว
SELECT * FROM users WHERE username LIKE 'ki%';
SELECT * FROM users WHERE username LIKE '_ita';
```

> ใช้ `IS NULL` / `IS NOT NULL` แทน `= NULL` / `!= NULL`

### Sort and group

``` sql
-- เรียงจากน้อยไปมาก (default คือ ASC)
SELECT * FROM users ORDER BY created_at ASC;

-- เรียงจากมากไปน้อย
SELECT * FROM users ORDER BY created_at DESC;

-- นับจำนวน users
SELECT COUNT(*) FROM users;

-- aggregate functions
SELECT
    COUNT(*) AS total,
    AVG(age) AS average_age,
    MIN(age) AS youngest,
    MAX(age) AS oldest
FROM users;

-- GROUP BY
SELECT is_active, COUNT(*) AS total
FROM users
GROUP BY is_active;

-- HAVING ใช้กรองผลหลัง GROUP BY
SELECT is_active, COUNT(*) AS total
FROM users
GROUP BY is_active
HAVING COUNT(*) > 5;
```

## 7. Update and delete

``` sql
-- แก้ข้อมูล
UPDATE users
SET email = 'new@example.com'
WHERE id = 1;

-- แก้หลาย columns
UPDATE users
SET username = 'new_name',
    is_active = FALSE
WHERE id = 1;

-- ลบเฉพาะ row ที่ตรงเงื่อนไข
DELETE FROM users
WHERE id = 1;
```

> **ระวัง:** `UPDATE` หรือ `DELETE` ที่ไม่มี `WHERE` จะกระทบทุก rows ใน table

## 8. Relationships and foreign keys

ตัวอย่าง: user หนึ่งคนมี posts ได้หลายรายการ (one-to-many)

``` sql
CREATE TABLE posts (
    id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id     BIGINT UNSIGNED NOT NULL,
    title       VARCHAR(255) NOT NULL,
    body        TEXT,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_posts_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
```

  -----------------------------------------------------------------------
  Action                              ความหมาย
  ----------------------------------- -----------------------------------
  `ON DELETE CASCADE`                 เมื่อลบ parent row ให้ลบ child rows
                                      ที่อ้างถึงด้วย

  `ON DELETE SET NULL`                เมื่อลบ parent ให้ foreign key ฝั่ง
                                      child เป็น `NULL` (column ต้อง
                                      nullable)

  `ON DELETE RESTRICT`                ป้องกันการลบ parent ที่ยังมี child อ้างถึง

  `ON UPDATE CASCADE`                 เมื่อ key ฝั่ง parent เปลี่ยน ให้ปรับ
                                      foreign key ฝั่ง child ตาม
  -----------------------------------------------------------------------

### JOIN

``` sql
-- INNER JOIN: เอาเฉพาะ rows ที่ match กัน
SELECT users.username, posts.title
FROM users
INNER JOIN posts ON posts.user_id = users.id;

-- LEFT JOIN: เอาทุก rows จากฝั่งซ้าย แม้ไม่มีข้อมูลที่ match
SELECT users.username, posts.title
FROM users
LEFT JOIN posts ON posts.user_id = users.id;

-- หา users ที่ยังไม่มี posts
SELECT users.*
FROM users
LEFT JOIN posts ON posts.user_id = users.id
WHERE posts.id IS NULL;
```

## 9. Subqueries

``` sql
-- users ที่มี id อยู่ในผลลัพธ์ของ subquery
SELECT *
FROM users
WHERE id IN (
    SELECT user_id
    FROM posts
);

-- ใช้ EXISTS ตรวจว่ามี row ที่สัมพันธ์กันหรือไม่
SELECT *
FROM users
WHERE EXISTS (
    SELECT 1
    FROM posts
    WHERE posts.user_id = users.id
);
```

## 10. UUID

UUID เป็น identifier ที่สร้างจาก application หรือ database ก็ได้ ไม่จำเป็นต้องให้
database สร้างเสมอไป

``` sql
-- MySQL สร้าง UUID v4
SELECT UUID();

-- เก็บเป็นข้อความ
CREATE TABLE sessions (
    id CHAR(36) PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL
);

INSERT INTO sessions (id, user_id)
VALUES (UUID(), 1);
```

ถ้าต้องการเก็บ UUID แบบ binary เพื่อลดพื้นที่:

``` sql
CREATE TABLE sessions (
    id BINARY(16) PRIMARY KEY
);

INSERT INTO sessions (id)
VALUES (UUID_TO_BIN(UUID()));

SELECT BIN_TO_UUID(id) AS id
FROM sessions;
```

> `UUID()` สร้าง UUID ที่ database; อีกทางคือให้ backend สร้าง UUID
> แล้วส่งเข้ามาใน `INSERT` เลือกวิธีเดียวให้ชัดในแต่ละระบบ

## 11. Indexes

Index ช่วยให้ database ค้นหา/เรียงข้อมูลได้เร็วขึ้นในหลายกรณี แต่ใช้พื้นที่เพิ่มและทำให้
`INSERT` / `UPDATE` / `DELETE` มีงานเพิ่ม

``` sql
-- สร้าง index
CREATE INDEX idx_users_email ON users(email);

-- unique index
CREATE UNIQUE INDEX uq_users_username ON users(username);

-- composite index
CREATE INDEX idx_posts_user_created
ON posts(user_id, created_at);

-- ลบ index
DROP INDEX idx_users_email ON users;

-- ดูแผนการทำงานของ query
EXPLAIN
SELECT * FROM users WHERE email = 'kita@example.com';
```

> ลำดับ columns ใน composite index มีความสำคัญ เช่น index
> `(user_id, created_at)` เหมาะกับการค้นหาที่เริ่มจาก `user_id`

## 12. Transactions

ใช้ transaction เมื่อต้องการให้หลาย operations สำเร็จทั้งหมด หรือยกเลิกทั้งหมด
(สำหรับ transactional engine เช่น InnoDB)

``` sql
START TRANSACTION;

UPDATE accounts
SET balance = balance - 100
WHERE id = 1;

UPDATE accounts
SET balance = balance + 100
WHERE id = 2;

-- ยืนยันการเปลี่ยนแปลง
COMMIT;

-- หรือยกเลิกแทน COMMIT
-- ROLLBACK;
```

## 13. User and permissions

``` sql
-- สร้าง user (ตัวอย่างสำหรับ local connection)
CREATE USER 'app_user'@'localhost'
IDENTIFIED BY 'change-this-password';

-- ให้สิทธิ์เฉพาะ database
GRANT SELECT, INSERT, UPDATE, DELETE
ON my_app.*
TO 'app_user'@'localhost';

-- ตรวจสอบสิทธิ์
SHOW GRANTS FOR 'app_user'@'localhost';

-- ถอนสิทธิ์
REVOKE DELETE
ON my_app.*
FROM 'app_user'@'localhost';

-- ลบ user
DROP USER 'app_user'@'localhost';
```

> อย่าใช้ root account ใน application และอย่า commit password ลง Git

## 14. Useful functions

``` sql
-- String
SELECT CONCAT('Hello ', 'World');
SELECT LOWER('HELLO');
SELECT UPPER('hello');
SELECT LENGTH('hello');       -- bytes
SELECT CHAR_LENGTH('hello');  -- characters
SELECT TRIM('  hello  ');

-- Numbers
SELECT ROUND(12.345, 2);
SELECT ABS(-10);
SELECT MOD(10, 3);

-- Date/time
SELECT NOW();
SELECT CURRENT_DATE();
SELECT CURRENT_TIMESTAMP();
SELECT DATE_ADD(NOW(), INTERVAL 7 DAY);
SELECT DATEDIFF('2026-11-25', '2026-11-18');

-- NULL handling
SELECT COALESCE(NULL, NULL, 'fallback');
SELECT NULLIF(10, 10);

-- Conditional
SELECT
    username,
    CASE
        WHEN age < 18 THEN 'minor'
        WHEN age >= 18 THEN 'adult'
        ELSE 'unknown'
    END AS age_group
FROM users;
```

## 15. Query execution order

ลำดับเชิงตรรกะโดยทั่วไปของ `SELECT`:

1.  `FROM` / `JOIN`
2.  `WHERE`
3.  `GROUP BY`
4.  `HAVING`
5.  `SELECT`
6.  `DISTINCT`
7.  `ORDER BY`
8.  `LIMIT` / `OFFSET`

จึงเป็นเหตุผลว่าทำไม aggregate function มักใช้ใน `HAVING` แทน `WHERE`

## 16. Good practices

-   ระบุชื่อ columns ใน `INSERT` เสมอ แทนการพึ่งลำดับ columns
-   ใช้ `WHERE` กับ `UPDATE` และ `DELETE` อย่างระมัดระวัง
-   ใช้ `NOT NULL`, `UNIQUE`, `FOREIGN KEY` และ constraints ให้ database
    ช่วยรักษาความถูกต้องของข้อมูล
-   เลือกชนิดข้อมูลให้ตรงกับข้อมูลจริง เช่น เงินใช้ `DECIMAL` ไม่ใช่ `FLOAT`
-   ใช้ `utf8mb4` สำหรับข้อความที่รองรับ Unicode รวมถึง emoji
-   สร้าง index ตาม query ที่ใช้งานจริง ไม่ใช่ใส่ทุก column
-   ใช้ prepared statements / parameterized queries ใน application
    เพื่อป้องกัน SQL injection
-   ใช้ database user ที่มีสิทธิ์เท่าที่จำเป็น (least privilege)
-   สำรองข้อมูลก่อนทำ migration หรือคำสั่งที่ลบ/เปลี่ยนข้อมูลจำนวนมาก

## 17. Quick reference

  ต้องการ              SQL
  ------------------- -----------------------------------
  ดู databases         `SHOW DATABASES;`
  เลือก database       `USE db_name;`
  ดู tables            `SHOW TABLES;`
  ดูโครงสร้าง table     `DESCRIBE table_name;`
  สร้าง table          `CREATE TABLE ...;`
  เพิ่มข้อมูล             `INSERT INTO ...;`
  อ่านข้อมูล             `SELECT ... FROM ...;`
  แก้ข้อมูล              `UPDATE ... SET ... WHERE ...;`
  ลบข้อมูล              `DELETE FROM ... WHERE ...;`
  เพิ่ม column          `ALTER TABLE ... ADD COLUMN ...;`
  ลบ table            `DROP TABLE ...;`
  เริ่ม transaction     `START TRANSACTION;`
  ยืนยัน transaction    `COMMIT;`
  ยกเลิก transaction   `ROLLBACK;`

------------------------------------------------------------------------

**Tip:** ทดลองคำสั่งที่เปลี่ยนหรือลบข้อมูลกับ test database ก่อนเสมอ
