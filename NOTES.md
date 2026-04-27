# Условия проекта rubitel.ru

## ⚠️ ГЛАВНОЕ УСЛОВИЕ
Сайт должен быть ПОЛНОСТЬЮ АВТОНОМЕН.
- Никаких обращений к poehali.dev (CDN, API, функции)
- Никаких внешних API кроме GitHub (картинки) и Бегета (хостинг)
- Картинки: только GitHub (cdn.jsdelivr.net)
- Письма: только через mail.php на Бегете

## Хостинг
Сайт размещён на Бегете (beget.com) в папке `public_html`.

## Структура на сервере
```
public_html/
├── index.html
├── mail.php        — отправка писем
└── assets/
```

## Картинки — GitHub + jsDelivr CDN
Репозиторий: https://github.com/doka43-spec/rubitel-images
CDN-ссылка: `https://cdn.jsdelivr.net/gh/doka43-spec/rubitel-images/имя_файла`

### Как добавить новую картинку:
1. Сжать на https://imagecompressor.com/ru/ — качество 80%
2. Дать понятное имя файлу, например `x-7.jpg` или `review-9-1.jpg`
3. Открыть https://github.com/doka43-spec/rubitel-images
4. Нажать **Add file → Upload files**
5. Перетащить файл → нажать **Commit changes**
6. В коде (`src/components/shared.tsx`) добавить путь через константу `GH`:
   `${GH}/имя_файла.jpg`

### Важно:
- Папки `images/` на Бегете больше нет — все картинки только на GitHub
- jsDelivr кэширует файлы. Если заменил картинку с тем же именем — новая появится через ~24 часа
- Чтобы обновить картинку мгновенно — дай ей новое имя

## Правила при изменениях
- Письма: только через `mail.php` (не через backend-функции платформы)
- Никаких REVIEWS_API_URL и других внешних API

## Почта
Заявки и отзывы приходят на: vyatkalux@yandex.ru

## После каждого билда загружать на Бегет
Скачать билд → распаковать → загрузить содержимое `dist/` в `public_html/`