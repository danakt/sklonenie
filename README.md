Sklonenie
================================================================================
Лёгкая и быстрая библиотека для склонения по падежам русских имён, отчеств и фамилий

[![npm](https://img.shields.io/npm/v/sklonenie.svg?style=flat-square)](https://www.npmjs.com/package/sklonenie)
[![Travis CI](https://img.shields.io/travis/danakt/sklonenie.svg?style=flat-square)](https://travis-ci.org/danakt/sklonenie.js)
<!-- [![Versioneye](https://www.versioneye.com/user/projects/58778f5b7179530040ecf6c4/badge.svg?style=flat-square)](https://www.versioneye.com/user/projects/58778f5b7179530040ecf6c4) -->

Использование
--------------------------------------------------------------------------------
Установите npm пакет:

```
$ npm install sklonenie
```

И используйте следующим образом:
```js
const sklonenie = require('sklonenie')
// ...
const bulgakov = sklonenie('Михаил', 'Афанасьевич', 'Булгаков')

console.log(`На страницах рукописи ${bulgakov['винительный'].join(' ')} «Мастер и Маргарита» ученые обнаружили следы морфия`)
// На страницах рукописи Михаила Афанасьевича Булгакова «Мастер и Маргарита» ученые обнаружили следы морфия
```

Методы
--------------------------------------------------------------------------------
### sklonenie()
Получение массива со склонениями имени, отчества и фамилии.

*Синтаксис:*
```js
sklonenie(имя, отчество, фамилия[, пол])
sklonenie(имя, отчество, фамилия[, пол])[склонение]
```
Последный аргумент — пол — может принимать значение «1» — мужское имя, или «2» — женское. Не обязателен, но может помочь склонять некоторые имена и фамилии.

*Пример:*
```js
const adel_1 = sklonenie('Адель', 'Захарович', 'Дельвиг', 1)
const adel_2 = sklonenie('Адель', 'Захаровна', 'Дельвиг', 2)

console.log(adel_1['родительный'])
// ['Аделя', 'Захаровича', 'Дельвига']
console.log(adel_2['родительный'])
// ['Адели', 'Захаровны', 'Дельвиг']
```

Склонение можно получить по ключу в виде названия  или индекса падежа **(от 0 до 5)**.

*Пример:*
```js
const tolstoy = sklonenie('Лев', 'Николаевич', 'Толстой')

console.log(
    tolstoy['дательный'], // получение по названию
    tolstoy[2]            // получение по индексу (0–5)
)
```

Также возможно получение части имени из результата

*Пример:*
```js
const saltikovSchedrin = sklonenie('Михаил', 'Евграфович', 'Салтыков-Щедрин', 1)

console.log(saltikovSchedrin.lastname['винительный'])
// Салтыкова-Щедрина
```

### sklonenie.firstname()
Получение массива со склонениями имени

*Синтаксис:*
```js
sklonenie.firstname(имя[, пол])
```

*Пример:*
```js
const pavel = sklonenie.firstname('Павел')

console.log(pavel['именительный'])
// Павел
```

### sklonenie.middlename()
Получение массива со склонениями отчества

*Синтаксис:*
```js
sklonenie.middlename(отчество[, пол])
```

*Пример:*
```js
const mihaylovich = sklonenie.middlename('Михайлович')
const mihalych    = sklonenie.middlename('Михалыч')

console.log(mihaylovich['родительный'])
// Михайловича
console.log(mihalych['родительный'])
// Михалыча
```

### sklonenie.lastname()
Получение массива со склонениями фамилии

*Синтаксис:*
```js
sklonenie.lastname(фамилия[, пол])
```

*Пример:*

```js
const lermontov = sklonenie.lastname('Лермонтов')
const gyote     = sklonenie.lastname('Гёте')

console.log(lermontov['дательный'])
// Лермонтову
console.log(gyote['предложный'])
// Гёте
```
