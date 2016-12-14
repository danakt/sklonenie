/**
 * Sklonenie.js
 * Лёгкая и быстрая библиотека для склонения по падежам русских имён,
 * отчеств и фамилий
 * @author Danakt Frost <mail@danakt.ru>
 *
 * @todo Реализовать склонение двойных фамилий (прим. Салтыков-Щедрин)
 *
 * @function sklonenie
 * @param {string} firstname Склоняемое имя
 * @param {string} middlename Склоняемое отчество
 * @param {string} lastname  Склоняемая фамилия
 * @returns {array} array Массив, содержащий шесть массивов со склонениями
 */

!function() {
'use strict';

// Класс с функционалом --------------------------------------------------------
class Sklonenie {

    /* Константы  */

    static get m() {return 1 << 0} // Мужской род
    static get w() {return 1 << 1} // Женский род
    // Буквы алфавита
    static get chars() {
        return [
            'бвгджзйклмнпрстфхцчшщ'.split(''), // Согласные
            'аеёиоуыэюя'.split(''),            // Гласные
            // Буквы для специфичных окончаний
            'гжкхчшщ'.split(''),               // ГлинкИ
            'бвдзлмнпрстфц'.split(''),         // ЛиндЫ
            'аеёоуыэюя'.split(''),             // О НиколаЕ, о ДмитриИ
            'бвгдзклмнпрстфх'.split(''),       // ДельвигОМ
            'жйцчшщь'.split(''),               // АбрамовичЕМ
        ]
    }
    // Падежи
    static get cases() {
        return [
            'именительный', // Есть кто?
            'родительный',  // Нет кого?
            'дательный',    // Дать кому?
            'винительный',  // Винить кого?
            'творительный', // Доволен кем?
            'предложный'    // Думать о ком?
        ];
    }
    // Окончания для имени
    static get flexListFirstname() {
        var m = this.m;
        var w = this.w;
        var [con, vow, acon, bcon, avow] = this.chars;
        // Склоняемые исключения женских имён
        // с мягким знаком на конце
        var excep = [
            'любовь', 'адель', 'жизель', 'агарь', 'рахиль', 'руфь',
            'суламифь', 'эсфирь', 'юдифь', 'сесиль', 'нинель'
        ].map(item => item.substr(0, item.length - 1));

        return this.prepareList([
            // Окончания         И    Р    Д    В    Т    П      пол
            `[и]й`,             ['й   я    ю    я    ем   и'  ],  m,
            `[${avow}]й`,       ['й   я    ю    я    ем   е'  ],  m,
            `[${con}]`,         ['.   а    у    а    ом   е'  ],  m,
            `[${con}]ь`,        ['ь   я    ю    я    ем   е'  ],  m,
            `[${vow},${bcon}]а`,['а   ы    е    у    ой   е'  ],  w,
            `[${acon}]а`,       ['а   и    е    у    ой   е'  ],  w,
            '[ь]я',             ['я   и    е    ю    ей   е'  ],  w,
            `я`,                ['я   и    и    ю    ей   и'  ],  w,
            `[${excep}]ь`,      ['ь   и    и    ь    ью   и'  ],  w,
            `[пав]ел`,          ['ел  ла   лу   ла   лом  ле' ],  m,
            `[л]ев`,            ['ев  ьва  ьву  ьва  ьвом ьве'],  m,
        ]);
    }
    // Окончания для отчества
    static get flexListMiddlename() {
        var m = this.m;
        var w = this.w;
        var [con, vow, acon, bcon]  = this.chars;

        var conModif = con
            .filter(item => item !== 'в')
            .map(item => item +'ич');

        return this.prepareList([
            // Окончания         И    Р    Д    В    Т    П      пол
            '[вич]',            ['.   а    у    а    ем   е' ],   m,
            `[${conModif}]`,    ['.   а    у    а    ем   е' ],   m,
            '[вн]а',            ['а   ы    е    у    ой   е' ],   w,
            `[${con}]на`,       ['на  ны   не   ну   ной  не'],   w
        ]);
    }
    // Окончания для фамилий
    static get flexListLastname() {
        var m = this.m;
        var w = this.w;
        var [con, vow, acon, bcon, avow, ccon, dcon] = this.chars;

        return this.prepareList([
            // Окончания         И    Р    Д    В    Т    П      пол
            '[ин,ен,ев,ов]',    ['.   а    у    а    ым   е' ],   m,  // Пушкин, Герцен, Медведев, Иванов
            '[ин,ен,ев,ов]а',   ['а   ой   ой   у    ой   ой'],   w,  // Путина, Гребена, Цветаева, Ахматова
            '[ск,]ий',          ['ий  ого  ому  ого  им   ом'],   m,  // Невский, Дикий
            'ый',               ['ый  ого  ому  ого  ым   ом'],   m,  // Гордый
            'ая',               ['ая  ой   ой   ую   ой   ой'],   w,  // Крупская, Боровая
            'ой',               ['ой  ого  ому  ого  ым   ом'],   m,  // Толстой
            `я`,                ['я   и    и    ю    ей   и' ],  m|w, // Берия
            `[${acon}]а`,       ['а   и    е    у    ой   е' ],  m|w, // Глинка
            `[${bcon}]а`,       ['а   ы    е    у    ой   е' ],  m|w, // Линда
            'ь',                ['ь   я    ю    я    ем   е' ],   m,  // Гоголь
            `[${vow}]й`,        ['й   я    ю    я    ем   е' ],   m,  // Гайдай
            `[ых,их,${vow}]`,   ['.   .    .    .    .    .' ],  m|w, // Седых, Гёте
            `[${ccon}]`,        ['.   а    у    а    ом   е' ],   m,  // Дельвиг
            `[${dcon}]`,        ['.   а    у    а    ем   е' ],   m,  // Бах, Абрамович
        ]);
    }

    /* Приватные методы */

    // Функция подготовки объекта выборки
    static prepareList(arr) {
        var list = {};

        // Превращаем массив в объект
        for(var i = 0; i < arr.length; i += 3) {
            var flex = arr[i + 1][0]
                .split(/\s+/g)
                .map(item => item.replace(/\./g, ''));

            list[arr[i]] = flex.concat(arr[i + 2])
        }

        for (var e in list) {
            if (!~e.indexOf(','))
                continue;

            var arrMultEnd = e.match(/\[(.+)\](.*)/);
            if (arrMultEnd !== null && arrMultEnd.length >= 3) {
                var charsMultEnd = arrMultEnd[1]
                    .split(',')
                    .map(item => item.replace(/\s+/g, ''));

                // Создаём новые элементы с одинаковым содержанием
                for (var i = 0; i < charsMultEnd.length; i++) {
                    var postfix = arrMultEnd[arrMultEnd.length - 1] || '';
                    list[`[${charsMultEnd[i]}]${postfix}`] = list[e]
                }

                // Удаляем старый элемент с множественной выборкой
                delete list[e];
            }
        }

        return list;
    }
    // Обработка пола
    static getGender(g) {
        if(g === undefined)
            return 0;

        var genders = ['man', 'woman'];
        var is = {};

        for(var i = 0; i < genders.length; i++) {
            is[genders[i]] = (
                g === 0 || g === this[genders[i][0]]
                || g === genders[i][0] || g ===  genders[i]
            )
        }

        if(!is.man && !is.woman)
            return 0;

        return is.man ? this.m : this.w;
    }
    // Получение окончания по выборке
    static getFlexion(string, gender, flexList) {
        var retArr = []; // Возвращаемый массив

        for (var e in flexList) {
            var eClear     = e.replace(/\[|\]/g, '');
            var lenWoutEnd = string.length - eClear.length;
            var ending     = string.substr(lenWoutEnd).toLowerCase();

            if (eClear === ending) {
                // Если пол не совпадает, идём дальше
                if (gender
                && !(flexList[e][flexList[e].length - 1] & gender))
                    continue;

                var lenClear = e.replace(/\[.*\]/g, '').length ;
                var woutEnd  = string.substr(0, string.length - lenClear);

                for (var i = 0; i < this.cases.length; i++)
                    retArr[i] = woutEnd + flexList[e][i]

                break;
            }
        }

        if (!retArr.length)
            retArr = Array(this.cases.length).fill(string);

        return retArr;
    }

    /* Публичные методы */

    // Получение склонений имени
    get(firstname, middlename, lastname, gender) {
        var cases  = this.constructor.cases;
        var args   = arguments;
        var argLen = Object.keys(args).length;

        // Получение данных из аргументов
        if(Array.isArray(args[0]) && args[0].length == 3) {
            [firstname, middlename, lastname] = args[0];
            gender = this.constructor.getGender(args[1] || 0);
        } else if(argLen >= 3) {
            [firstname, middlename, lastname] = args;
            gender = this.constructor.getGender(args[3] || 0);
        } else {
            throw new Error('Error arguments parse');
        }

        var ret = {
            firstname:  this.getName(1, firstname,  gender),
            middlename: this.getName(2, middlename, gender),
            lastname:   this.getName(3, lastname,   gender)
        };

        for(var i = 0; i < cases.length; i++) {
            ret[i] = ret[cases[i]] = [
                ret['firstname'][i],
                ret['middlename'][i],
                ret['lastname'][i]
            ];
        }

        return ret;
    }
    // Получение склонений частей имени
    getName(propNum, string, gender) {
        var cases = this.constructor.cases;

        // Если строка не проходит проверку, возвращаем её же
        if (!string || typeof string !== 'string')
            return Array(cases.length).fill(string + '');

        // Получаем список флексий
        var propName = ['First', 'Middle', 'Last'];
        var flex = this.constructor[
            'flexList'+ propName[propNum - 1] +'name'
        ];

        // Ищем подходящее окончание из списка
        var out = '';
        if(propNum === 3 && ~string.indexOf('-')) {
            // Если это фамилия и двойная, склоняем обе части
            var lastNames = string.split('-');

            // Получаем склонения каждой части
            for(var i = 0; i < lastNames.length; i++) {
                lastNames[i] = this.constructor.getFlexion(
                    lastNames[i], (gender || 0), flex
                );
            }
            // Соединяем полученные фамилии в одну
            out = lastNames[0].map((item, i) => item + '-' + lastNames[1][i]);
        } else {
            // В остальных случаях прсото склоняем строку
            out =  this.constructor.getFlexion(
                string, (gender || 0), flex
            );
        }


        for(var i = 0; i < cases.length; i++) {
            out[cases[i]] = out[i]
        }

        return out;
    }

}

// Экспортирование метода ------------------------------------------------------
var s = new Sklonenie();
var sklonenie = function(firstname, middlename, lastname, gender) {
    return s.get.apply(s, arguments);
};

sklonenie.prototype = Sklonenie;

var methNames = ['first', 'middle', 'last'];
for (var i = 0; i < methNames.length; i++) {
    var method = methNames[i];
    sklonenie[method +'Name'] = sklonenie[method +'name'] = (function(i) {
        return function(string, gender) {
            return s.getName(i + 1, string, gender)
        }
    })(i)
}

if(typeof module !== "undefined" && module.exports) {
    module.exports = sklonenie;
} else if(window) {
    window.sklonenie = sklonenie;
} else {
    throw new Error('Unknown environment');
}
// -----------------------------------------------------------------------------
}();
