Sklonenie.js
================================================================================
Лёгкая и быстрая библиотека для склонения по падежам русских имён, отчеств и фамилий

[![npm](https://img.shields.io/npm/v/sklonenie.svg?maxAge=2592000)](https://www.npmjs.com/package/sklonenie)

Использование
--------------------------------------------------------------------------------

### Серверная сторона

Если вы хотите использовать Sklonenie.js как node.js-зависимость, установите пакет при помощи *npm*:

``$ npm install sklonenie``

И используйте следующим образом:
```js
const sklonenie = require('sklonenie');
// ...
var bulgakov = sklonenie('Михаил', 'Афанасьевич', 'Булгаков');

console.log(
    'На страницах рукописи ' +
     bulgakov['винительный'].join(' ') +
     ' «Мастер и Маргарита» ученые обнаружили следы морфия'
 );
/* ->
 На страницах рукописи Михаила Афанасьевича Булгакова
 «Мастер и Маргарита» ученые обнаружили следы морфия
*/
```

### Клиентская сторона

Для использования Sklonenie.js в браузере, вам нужно подключить минифицированный файл на html-странице (*js/sklonenie.min.js*) и в дальнейшем использовать функцию ``sklonenie``

```html
<script src="sklonenie.min.js"></script>
<script>
    var brodsky = sklonenie.lastname('Бродский');

    console.log(
        'Ходят слухи, что получить Нобелевскую премию по литературе ' +
        brodsky['дательный'] +
        ' помогли связи');
    /* ->
     Ходят слухи, что получить Нобелевскую премию
     по литературе Бродскому помогли связи
    */
</script>
```

Методы
--------------------------------------------------------------------------------
### sklonenie()
Получение массива со склонениями имени, отчества и фамилии.

*Синтаксис:*
```js
sklonenie(имя, отчество, фамилия[, пол]);
sklonenie(имя, отчество, фамилия[, пол])[склонение];
```
Последный аргумент — пол — может принимать значение «1» — мужское имя, или «2» — женское. Не обязателен, но может помочь склонять некоторые имена и фамилии.

*Пример:*
```js
var adel_1 = sklonenie('Адель', 'Захарович', 'Дельвиг');
var adel_2 = sklonenie('Адель', 'Захаровна', 'Дельвиг', 2);

console.log(
    adel_1['родительный'],
    adel_2['родительный']
);
/* ->
 * ['Аделя', 'Захаровича', 'Дельвига']
 * ['Адели', 'Захаровны', 'Дельвиг']
 */
```

Склонение можно получить по ключу в виде названия  или индекса падежа **(от 0 до 5)**.

*Пример:*
```js
var tolstoy = sklonenie('Лев', 'Николаевич', 'Толстой')

console.log(
    tolstoy['дательный'], // получение по названию
    tolstoy[0]            // получение по индексу (именительный)
);
```

Также возможно получение части имени из результата
*Пример:*
```js
var volkonskaya = sklonenie('Мария', 'Николаевна', 'Волконская', 2);

console.log(volkonskaya.lastname['винительный']);
 /* ->
 * Волконскую
 */
```

### sklonenie.firstname()
Получение массива со склонениями имени

*Синтаксис:*
```js
sklonenie.firstname(имя[, пол]);
```

*Пример:*
```js
var pavel = sklonenie.firstname('Павел');

console.log(pavel['именительный']);
 /* ->
 * Павел
 */
```

### sklonenie.middlename()
Получение массива со склонениями отчества

*Синтаксис:*
```js
sklonenie.middlename(отчество[, пол]);
```

*Пример:*
```js
var mihaylovich = sklonenie.middlename('Михайлович');
var mihalych    = sklonenie.middlename('Михалыч');

console.log(mihaylovich['родительный']);
/* ->
 * Михайловича
 */
console.log(mihalych['родительный']);
/* ->
* Михалыча
*/
```

### sklonenie.lastname()
Получение массива со склонениями фамилии

*Синтаксис:*
```js
sklonenie.lastname(фамилия[, пол]);
```

*Пример:*

```js
var lermontov = sklonenie.lastname('Лермонтов');
var gyote     = sklonenie.lastname('Гёте');

console.log(lermontov['дательный']);
/* ->
 * Лермонтову
 */
console.log(gyote['предложный']);
/* ->
* Гёте
*/
```
