# Условия проекта rubitel.ru

## Хостинг
Сайт размещён на Бегете (beget.com) в папке `public_html`.
Сайт полностью автономен — никаких обращений к внешним API и платформе poehali.dev.

## Структура на сервере
```
public_html/
├── index.html
├── mail.php        — отправка писем
├── assets/
└── images/         — все картинки сайта
```

## Картинки — GitHub + jsDelivr CDN
Репозиторий: https://github.com/doka43-spec/rubitel-images
CDN-ссылка: `https://cdn.jsdelivr.net/gh/doka43-spec/rubitel-images/имя_файла`

Новые картинки:
1. Сжать на https://imagecompressor.com/ru/ — качество 80%
2. Загрузить в репозиторий rubitel-images на GitHub
3. Использовать CDN-ссылку в коде через константу `GH` в `shared.tsx`

## Правила при изменениях
- Письма: только через `mail.php` (не через backend-функции платформы)
- Никаких REVIEWS_API_URL и других внешних API

## Почта
Заявки и отзывы приходят на: vyatkalux@yandex.ru

## После каждого билда загружать на Бегет
Скачать билд → распаковать → загрузить содержимое `dist/` в `public_html/`