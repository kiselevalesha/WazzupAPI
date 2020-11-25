# WazzupAPI

Суть задачи
Надо реализовать API для многопользовательского сервиса. Сервис предназначен для хранения заметок.

Заметка — это текстовое поле, длиной до 1000 символов. Заметок у пользователя может быть неограниченное количество. Заметки принадлежат конкретному пользователю, который их создал. Их можно создавать, редактировать, удалять. У заметок надо хранить дату создания и изменения. Пользователь может расшарить конкретную заметку с доступом по ссылке (как в яндекс-диске, гугл-доке и т. п.) для любого неавторизованного пользователя, но только на чтение.

Пользователь характеризуется логином и паролем. 
Нужно реализовать регистрацию пользователя и авторизацию. 
Доступ к методам апи должен осуществляться по токену (конкретную реализацию выбираете сами), срок жизни токена должен быть ограничен.

Необходимый функционал в API
Регистрация пользователя:

- Авторизация пользователя
- Разлогин пользователя со сбросом всех сессий пользователя
- Создание заметки
- Получение списка заметок (учесть, что заметок может быть сколь угодно много у каждого пользователя)
- Редактирование заметки
- Удаление заметки
- Расшаривание заметки для неавторизованного пользователя
- Отображение текста заметки неавторизованному пользователю по ссылке

Технические требования:
- Для методов API использовать express
- Выбор любых других библиотек/фреймворков - на ваше усмотрение
- Для хранения основных данных надо использовать SQL (СУБД на ваше усмотрение)
- Обработку и хранение сопутствующих данных надо делать, исходя из максимальной производительности