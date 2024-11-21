#!/bin/sh
set -e

# Attendre que la base de données soit prête
until php bin/console doctrine:query:sql "SELECT 1" > /dev/null 2>&1; do
  echo "🟡 Waiting for database to be ready..."
  sleep 2
done

echo "🟢 Database is ready!"

# Créer le schéma de base de données
php bin/console doctrine:schema:update --force --no-interaction
echo "🟢 Database schema updated!"

# Exécuter la commande finale
exec "$@"