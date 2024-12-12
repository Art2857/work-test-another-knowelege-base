## Обоснования
- NestJs - готовый DI, IoC
- Prisma - достаточна проста и легка в использовании и отлично подходит для данного проекта
- Postgres - достаточно распространнён + импортозамещение
- JWT - проще в реализации для демонстрации, чем сессии
- docker-compose - для локального старта базы

## Возможные доработки

- Создать репозитории и вынести туда логику работы с бд из сервисов
- Создать конфиг с валидацией
- Добавить pipes для преобразования параметров запроса
- Описать документацию
- И ещё куча обвеса вокруг приложения...

## Мнение
- Задание жирное
- Гарантий от таких тестовы немного - часто пренебрежительно относятся ко времени разработчиков и даже не смотрят их, так и здесь, комит получиться большой, попробуй заревьюить это... а если я его реально полностью до конца сделаю?
- Делать много (30-40 минут? Наивно...)

## Подготовка проекта

```bash
$ npm install
$ npm run prisma:generate
$ npm run database:start
$ npm run prisma:migrate:dev
```

## Запуск проекта

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Задание

Тестовое задание ("На него уйдет 30-40 минут времени")

Требуется написать backend сервис "Another Knowelege Base", который:

- хранил статьи базы знаний. Статья должна иметь следующие аттрибуты:
  - заголовок
  - содержание
  - тэги статьи
  - признак "публичная" / "внутренняя"
  - любый другие атрибуты на усмотрение разработчика или если они требуются для реализации
- позволял через REST интерфейс добавлять статьи / изменять атрибуты статей / удалять статьи
- позволял через REST интрефейс получать статьи
  - по одной
  - списком
  - списком с фильтрацией по тегам
- хранил и авторизовывал пользователей. Пользователь должен иметь следующие втрибуты:
  - емайл
  - любые другие атрибуты на усмотрение разработчика или если они требуются для реализации
- осуществлял контроль доступа к статьям и операциям над ними
  - авторизованные пользователи могут создавать, изменять, удалять статьи и пользователей
  - неавторизованный пользователи могут лишь получать статьи, у которых установлен атрибут "публичная" и не могут создавать / изменять / удалять статьи и пользователей

Решение должно быть предоставлено в виде git репозитория / архива с проектом (zip/tar.gz/tar.bz), который должлен содержать:

- исходный код
- инструкции по сборке / разворачиванию приложения и его зависимостей
- любые другие файлы при необходимости

При решении задания:

- использовать только nodeJS (JS/TS по выбору)
- можно использовать любые DB, но с тем пониманием, чтобы предоставить обоснование сделанного выбора по требованию
- можно использовать любые библиотеки, но с тем пониманием, чтобы предоставить обоснование сделанного выбора по требованию

Тесты:

- на усмотрение разработчика, но с тем пониманием, чтобы предоставить обоснование сделанного выбора по требованию
