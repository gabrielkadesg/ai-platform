#!/bin/bash

# Run all migrations

echo "Running database migrations..."

for migration in database/migrations/*.sql; do
  echo "Running $migration..."
  psql "${DATABASE_URL}" -f "$migration"
done

echo "Migrations completed!"
