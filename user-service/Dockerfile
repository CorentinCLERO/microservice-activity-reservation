FROM php:8.2-fpm

RUN apt-get update \
    && apt-get install -y libssl-dev libmcrypt-dev libpq-dev zlib1g-dev g++ git libicu-dev zip libzip-dev zip openssl \
    && docker-php-ext-install intl pdo pdo_mysql pdo_pgsql \
    && docker-php-ext-enable pdo_mysql pdo_pgsql \
    && docker-php-ext-configure zip \
    && docker-php-ext-install zip

RUN pecl install apcu && docker-php-ext-enable apcu

# RUN docker-php-ext-install mbstring
COPY --from=composer /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . .

CMD composer install ;  php-fpm

EXPOSE 8000
# CMD php bin/console server:run 0.0.0.0:8000