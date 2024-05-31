CREATE UNIQUE INDEX users_username_ci_unique_idx ON "users" (LOWER(username));
CREATE INDEX message_timestamp_idx ON "messages"("timestamp");
