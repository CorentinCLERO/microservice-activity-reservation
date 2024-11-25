FROM php:8.2-fpm

# Installation des dépendances système et PHP extensions
RUN apt-get update \
    && apt-get install -y libssl-dev libmcrypt-dev libpq-dev zlib1g-dev g++ git libicu-dev zip libzip-dev zip openssl curl \
    && docker-php-ext-install intl pdo pdo_mysql pdo_pgsql \
    && docker-php-ext-enable pdo_mysql pdo_pgsql \
    && docker-php-ext-configure zip \
    && docker-php-ext-install zip

RUN pecl install apcu && docker-php-ext-enable apcu

# Installation de Composer
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copier composer.json et composer.lock d'abord
COPY composer.json composer.lock ./

# Installer les dépendances
RUN composer install --prefer-dist --no-scripts --no-progress --no-interaction

# Copier le reste des fichiers
COPY . .

# Copier et configurer le script d'entrée
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Définir les permissions
RUN chown -R www-data:www-data /var/www
RUN chmod -R 755 /var/www

# Générer l'autoloader et exécuter les scripts
RUN composer dump-autoload --optimize \
    && composer run-script post-install-cmd

# Vérifier que le dossier vendor existe et a les bonnes permissions
RUN ls -la /var/www/vendor \
    && chmod -R 777 /var/www/var

# RUN php bin/console lexik:jwt:generate-keypair --overwrite

# ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]

CMD ["php", "-S", "0.0.0.0:3001", "-t", "public"]

EXPOSE 3001