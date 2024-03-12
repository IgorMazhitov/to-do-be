CREATE TABLE IF NOT EXISTS "User" (
    "id" UUID PRIMARY KEY,
    "username" VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS "TaskGroup" (
    "id" UUID PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "user_id" INT UNIQUE,
    FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS "Task" (
    "id" UUID PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "detail" TEXT,
    "isCompleted" BOOLEAN DEFAULT FALSE,
    "task_group_id" INT,
    FOREIGN KEY ("task_group_id") REFERENCES "TaskGroup"("id") ON DELETE CASCADE
);
