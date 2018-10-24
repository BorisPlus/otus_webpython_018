# BugReport (Webpack-сборка)

Допустим имеется JS-пакет [https://github.com/BorisPlus/BugReport](https://github.com/BorisPlus/BugReport)

Задача в упаковке его с использованием Webpack.

## Описание сборки

### Предварительно

В терминале (возможно Вам понадобятся права _root_, прибегните к `sudo` или `su`):

```bash
apt-get install -y nodejs
nodejs -v
npm install --global webpack
npm install --global webpack-cli
```

### Переработка (портирование) проекта

Можно ничего не делать и запустить сборку самого _bug_report.js_:
```json
module.exports = {
    entry: './src/bug_report',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bug_report.bundle.js'
    },
    mode: 'production',
};
```
Понятно, что все работает для [базового примера](https://github.com/BorisPlus/BugReport#базовый-вариант){:target="_blank"}.

Но если необходимо привязать к дополнительной "форме", то:
* либо дописать соответствующи JS в конец _bug_report.js_
    ```
    let example_bug_report = new BugReport(
        'example',
        'Патлумачце дадаткова і пакажыце кантактныя дадзеныя, калі хочаце.'
    );
    let my_bug_report = new BugReport(
        'my',
        'Leave a comment and contact to contact you if you want.'
    );
    ```
  и запустить выше указанную пересборку.
  
* либо его (портировать) немного переработать.

Почему нужно переработать. Логично держать "ядро" библиотеки отдельно от места его использования\вызова. Нужно, значит, создать отдельный пользовательский файл `my.bug_report.js` с указанными в прошлом пункте объявлениями объектов. А чтоб пользовательский файл "увидел" файл "ядра", необходимо применить import и export.

Перво наперво что нужно сделать, так это объявить, что класс BugReport должен экспортироваться. Добавим прямо в конец `bug_report.js`:

```html
export {BugReport};
```

Теперь в `my.bug_report.js` импортируем:

```html
import { BugReport } from './bug_report';
```

### Сборка проекта

При отладке мне нравится использовать режим отслеживания изменений и задержку на пересборку.

Для этого есть `--watch` ключ:

```bash
npx webpack --config webpack.config.js --watch
```

или если в `webpack.config.json`:

```
module.exports = {
    ...
    watch: true,
    watchOptions: {
        aggregateTimeout: 300
    }
    ...
};
```

Запуск сборки

```bash
cd project/
npm run build
```

или

```bash
cd project/
npx webpack --config webpack.config.js --watch
```

### Проверка работоспособности

Откройте проектный пример [examples.html](https://github.com/BorisPlus//otus_webpython_018/project/examples/examples.html).

Поведение идентияно изначальному {:target="_blank"}.


## Как использовать собранный или готовый у себя


## Авторы

* **BorisPlus** - [https://github.com/BorisPlus/otus_webpython_018](https://github.com/BorisPlus/otus_webpython_018)

## Лицензия

Свободно

## Дополнительные сведения

Проект в рамках домашнего задания курса "Web-разработчик на Python" на https://otus.ru/learning
