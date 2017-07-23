/**
 * Sklonenie.js
 * Лёгкая и быстрая библиотека для склонения по падежам русских имён, отчеств
 * и фамилий
 * @author Danakt Frost <mail@danakt.ru>
 */
import fillArray                    from './fillArray'
import { M, W, CASES, CHARS, NAME } from './constants'
import { FLEX_LISTS }               from './flexList'

/** ----------------------------------------------------------------------------
 * Получение окончания по выборке
 * @param  {String} string  — строка, содежащая имя, отчество или фамилию
 * @param  {Number} gender  — род (1 или 2)
 * @param  {Object} name    — индекс части имени (FIRST=0/MIDDLE=1/LAST=2)
 * @return {Array}
 */
function getFlexion(str: string, g: number, nameIndex: number): string[] {
    let retArr: string[] = [] // Возвращаемый массив

    const flexList: FlexList = FLEX_LISTS[nameIndex]

    for (let e in flexList) {
        const eClear: string     = e.replace(/\[|\]/g, '')
        const lenWoutEnd: number = str.length - eClear.length
        const ending: string     = str.substr(lenWoutEnd).toLowerCase()

        if (eClear === ending) {
            // Если пол не совпадает, идём дальше
            const flexGender = <number>flexList[e][flexList[e].length - 1]
            if (g && !(flexGender & g)) {
                continue
            }

            const lenClear = e.replace(/\[.*\]/g, '').length
            const woutEnd  = str.substr(0, str.length - lenClear)

            for (let i = 0; i < CASES.length; i++) {
                retArr[i] = woutEnd + flexList[e][i]
            }

            break
        }
    }

    if (retArr.length === 0) {
        retArr = fillArray(Array(CASES.length), str)
    }

    return retArr
}

/** ----------------------------------------------------------------------------
 * Получение склонений частей имени
 * @param  {Number} propNum — (FIRST=0/MIDDLE=1/LAST=2)
 * @param  {String} str     — часть имени (имя/отчество/фамилия)
 * @param  {Number} gender  — род
 * @return {Array}          — результат
 */
function getName(nameIndex: number, str: string, gender: number = 0): string[] {
    // Если строка не проходит проверку, возвращаем её же
    if (!str || typeof str !== 'string')
        return fillArray(Array(CASES.length), str + '')

    // Получаем список флексий
    const flex: FlexList = FLEX_LISTS[nameIndex]

    // Ищем подходящее окончание из списка
    let out: string[]

    // Если это фамилия и двойная, склоняем обе части
    if (nameIndex === NAME.LAST && str.indexOf('-') > -1) {
        let lastNames = str.split('-')
        let lastNamesArr: string[][] = []

        // Получаем склонения каждой части
        for (let i = 0; i < lastNames.length; i++) {
            lastNamesArr[i] = getFlexion(lastNames[i], gender, NAME.LAST)
        }
        // Соединяем полученные фамилии в одну
        out = lastNamesArr[0].map((item, i) => item + '-' + lastNamesArr[1][i])
    } else {
        // В остальных случаях прсото склоняем строку
        out = getFlexion(str, gender, nameIndex)
    }


    for (let i = 0; i < CASES.length; i++) {
        out[CASES[i]] = out[i]
    }

    return out
}

/** ----------------------------------------------------------------------------
 * Обработка пола
 * @param {Number|String} g — Род. Может принимать значения: 1 или 2,
 * «m» или «w», «man» или «woman»
 */
function getGender(g?: number | string): number {
    if (g == null) {
        return 0
    }

    if (typeof g === 'number') {
        return g >= 0 && g <= 2
            ? g
            : 0
    } else if (typeof g === 'string') {
        g = g.toLowerCase()

        if (g === 'm' || g === 'man') {
            return M
        } else if (g === 'w' || g === 'woman') {
            return W
        }
    }

    return 0
}

/** ----------------------------------------------------------------------------
 * Получение склонений имени. Экспортируется по-дефолту
 * @param  {String}  firstname  — Склоняемое имя
 * @param  {String}  middlename — Склоняемое отчество
 * @param  {String}  lastname   — Склоняемая фамилия
 * @param  {?Number} [gender=0] — Род
 * @return {Object}
 * @exports
 */
export default function full(
    firstname:  string,
    middlename: string,
    lastname:   string,
    g:          number = 0,
): { [x: string]:  string[] } {
    const gender: number = getGender(g)

    const ret = {
        firstname:  getName(NAME.FIRST, firstname, gender),
        middlename: getName(NAME.MIDDLE, middlename, gender),
        lastname:   getName(NAME.LAST, lastname, gender),
    }

    for (let i = 0; i < CASES.length; i++) {
        ret[i] = ret[CASES[i]] = [
            ret.firstname[i],
            ret.middlename[i],
            ret.lastname[i],
        ]
    }

    return ret
}

/** ----------------------------------------------------------------------------
 * Экспорт склонения имени
 * @param  {String} str    — имя
 * @param  {Number} gender — род
 * @return {Array}
 */
export function firstname(str: string, gender?: number) {
    return getName(NAME.FIRST, str, gender)
}

/** ----------------------------------------------------------------------------
 * Экспорт склонения отчества
 * @param  {String} str    — отчество
 * @param  {Number} gender — род
 * @return {Array}
 */
export function middlename(str: string, gender?: number) {
    return getName(NAME.MIDDLE, str, gender)
}

/** ----------------------------------------------------------------------------
 * Экспорт склонения отчества
 * @param  {String} str    — фамилия
 * @param  {Number} gender — род
 * @return {Array}
 */
export function lastname(str: string, gender?: number) {
    return getName(NAME.LAST, str, gender)
}
