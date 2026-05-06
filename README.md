# Домашнее задание 04: Проектирование и работа с MongoDB
Цель работы: Получить практические навыки работы с MongoDB, проектирования
документной модели данных, выполнения CRUD операций и валидации схем.

- [Домашнее задание 04: Проектирование и работа с MongoDB](#домашнее-задание-04-проектирование-и-работа-с-mongodb)
  - [Задание](#задание)
  - [Структура базы данных](#структура-базы-данных)
    - [Коллекция users](#коллекция-users)
    - [Коллекция posts](#коллекция-posts)
    - [Коллекция messages](#коллекция-messages)
  - [embedded и references](#embedded-и-references)
  - [MongoDB и Docker](#mongodb-и-docker)
  - [CRUD операции](#crud-операции)
    - [Create](#create)
    - [Read](#read)
    - [Update](#update)
    - [Delete](#delete)
  - [Работа с массивами](#работа-с-массивами)
  - [Валидация схем](#валидация-схем)
  - [Aggregation Pipeline](#aggregation-pipeline)
  - [API](#api)
    - [Реализованные эндпоинты](#реализованные-эндпоинты)
      - [Users](#users)
      - [Posts](#posts)
      - [Messages](#messages)
  - [Запуск проекта](#запуск-проекта)
  - [Проверка API](#проверка-api)
  - [Вывод](#вывод)


## Задание
Для своего варианта задания выполните следующие задачи:
1. Проектирование документной модели
 - Изучите выбранный вариант задания
 - Спроектируйте структуру коллекций MongoDB для вашей системы
 - Определите, какие сущности будут храниться в отдельных коллекциях
 - Определите структуру документов для каждой коллекции
 - Решите, где использовать embedded documents, а где references
 - Обоснуйте выбор между embedded и references для каждой связи
2. Создание базы данных и коллекций
 - Создайте MongoDB базу данных (использовать Docker)
 - Создайте все необходимые коллекции
 - Добавьте тестовые данные (минимум 10 документов в каждой коллекции)
 - Используйте различные типы данных MongoDB (String, Number, Date, Array, Object
и т.д.)
3. Реализация CRUD операций
 - Напишите MongoDB запросы (или код на выбранном языке) для всех операций из
вашего варианта задания:
 - Create (вставка документов)
 - Read (поиск документов с различными условиями)
 - Update (обновление документов)
 - Delete (удаление документов)
 - Используйте различные операторы: $eq, $ne, $gt, $lt, $in, $and, $or и т.д.
 - При необходимости используйте операции с массивами: $push, $pull, $addToSet
4. Валидация схем
 - Создайте валидацию схем для минимум одной коллекции используя `$jsonSchema`
 - Определите обязательные поля (required)
 - Определите типы данных для полей
 - Определите дополнительные ограничения (например, min/max для чисел, pattern
для строк)
 - Протестируйте валидацию, попытавшись вставить невалидные данные
5. Агрегации (опционально)
 - Создайте один aggregation pipeline для сложного запроса
 - Используйте стадии: $match, $group, $project, $sort и т.д.
6. Подключение базы данных MongoDB к API
 - Реализуйте API для одной или нескольких сущностей из второго домашнего задания
для работы с MongoDB

## Структура базы данных

В проекте используются 3 основные коллекции:

- `users` — пользователи
- `posts` — публикации
- `messages` — личные сообщения

### Коллекция users

Хранит информацию о пользователях системы.

```json
{
  "_id": "ObjectId",
  "login": "string",
  "email": "string",
  "password": "string",
  "first_name": "string",
  "last_name": "string",
  "age": "number",
  "interests": ["string"],
  "created_at": "date"
}
````

### Коллекция posts

Хранит посты пользователей, лайки и комментарии.

```json
{
  "_id": "ObjectId",
  "author_id": "ObjectId",
  "content": "string",
  "tags": ["string"],
  "likes": ["ObjectId"],
  "comments": [
    {
      "user_id": "ObjectId",
      "text": "string",
      "created_at": "date"
    }
  ],
  "created_at": "date"
}
```

### Коллекция messages

Хранит личные сообщения между пользователями.

```json
{
  "_id": "ObjectId",
  "from_user_id": "ObjectId",
  "to_user_id": "ObjectId",
  "text": "string",
  "is_read": "boolean",
  "created_at": "date"
}
```

 

## embedded и references

Комментарии были сделаны как embedded documents внутри поста, потому что они напрямую относятся к конкретному посту и обычно читаются вместе с ним.

Пользователи хранятся отдельно, поэтому в `posts` и `messages` используются references (`author_id`, `from_user_id`, `to_user_id`).

Лайки реализованы как массив `ObjectId`, чтобы не дублировать данные пользователей.

Такой подход позволяет сделать структуру более удобной и уменьшить дублирование данных.

 

## MongoDB и Docker

MongoDB запускается через Docker.

Фрагмент `docker-compose.yml`:

```yaml
mongo:
  image: mongo:7
  container_name: social-network-mongo
  ports:
    - "27017:27017"
  volumes:
    - ./mongo/mongo-init.js:/docker-entrypoint-initdb.d/init.js
    - mongo_data:/data/db
```

При запуске контейнера автоматически выполняется файл:

```bash
mongo/mongo-init.js
```

В нём:

* создаются коллекции
* добавляются тестовые данные
* создаётся валидация схем

 

## CRUD операции

CRUD операции реализованы через FastAPI.

### Create

Создание пользователей, постов и сообщений:

```python
db.users.insert_one({...})
db.posts.insert_one({...})
db.messages.insert_one({...})
```

### Read

Поиск данных с условиями:

```python
db.users.find({"login": {"$eq": "alice"}})

db.users.find({"age": {"$gt": 20}})

db.posts.find({"tags": {"$in": ["tech"]}})
```

### Update

Обновление данных:

```python
db.users.update_one(
  {"_id": ObjectId(user_id)},
  {"$set": {"age": 25}}
)
```

### Delete

Удаление документов:

```python
db.messages.delete_one({"_id": ObjectId(message_id)})
```

 

## Работа с массивами

Для работы с лайками и комментариями использовались специальные операторы MongoDB:

```python
$push
$pull
$addToSet
```

Пример добавления лайка:

```python
{"$addToSet": {"likes": user_id}}
```

 

## Валидация схем

Для коллекций была настроена валидация через `$jsonSchema`.

Пример для `users`:

```json
{
  "required": ["login", "email", "password"],
  "properties": {
    "email": {
      "bsonType": "string",
      "pattern": "^.+@.+\\..+$"
    },
    "age": {
      "bsonType": "int",
      "minimum": 0,
      "maximum": 120
    }
  }
}
```

Проверка валидации:

```js
db.users.insertOne({
  login: "test"
})
```

MongoDB выдаёт ошибку, так как обязательные поля отсутствуют.

 

## Aggregation Pipeline

Также была реализована агрегация для подсчёта количества постов и лайков пользователей.

```python
db.posts.aggregate([
  {
    "$group": {
      "_id": "$author_id",
      "posts_count": {"$sum": 1},
      "likes_count": {"$sum": {"$size": "$likes"}}
    }
  },
  {
    "$sort": {
      "posts_count": -1
    }
  }
])
```

 

## API

MongoDB подключается через `pymongo`.

```python
from pymongo import MongoClient

client = MongoClient("mongodb://mongo:27017")
db = client["social_network_mongo"]
```

### Реализованные эндпоинты

#### Users

* `GET /users`
* `POST /users`
* `PATCH /users/{id}`
* `DELETE /users/{id}`

#### Posts

* `GET /posts`
* `POST /posts`
* добавление лайков
* добавление комментариев

#### Messages

* `GET /messages`
* `POST /messages`
* отметка сообщения как прочитанного
* удаление сообщения

 

## Запуск проекта

Запуск MongoDB и API:

```bash
docker compose up --build mongo mongo_api
```

Если нужно полностью пересоздать базу:

```bash
docker compose down -v
docker compose up --build mongo mongo_api
```

 

## Проверка API

Получить пользователей:

```bash
curl http://localhost:8000/users
```

Получить посты:

```bash
curl http://localhost:8000/posts
```

Swagger:

```text
http://localhost:8000/docs
```

 

## Вывод

В ходе работы была спроектирована документная модель MongoDB для социальной сети, реализованы CRUD операции, валидация схем и API.

Были использованы различные возможности MongoDB:

* embedded documents
* references
* aggregation pipeline
* работа с массивами
* json schema validation

Проект показывает базовую работу с MongoDB и интеграцию базы данных с FastAPI.
