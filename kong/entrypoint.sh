#!/bin/sh

echo "⏳ Waiting for PostgreSQL to be ready..."
while ! pg_isready -h kong-database -p 5432 -U kong > /dev/null 2>&1; do
  sleep 2
done

echo "📦 Applying database bootstrap (may fail if already bootstrapped)..."
kong migrations bootstrap || true

echo "⬆️ Applying any remaining migrations..."
kong migrations up

echo "🚀 Starting Kong..."
kong start

# Bloquer le conteneur pour qu’il ne s’arrête pas
tail -f /dev/null
