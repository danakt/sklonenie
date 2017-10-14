/**
 * Sklonenie.js
 * Лёгкая и быстрая библиотека для склонения по падежам русских имён, отчеств
 * и фамилий
 * @author Danakt Frost <mail@danakt.ru>
 */
const fillArray                    = require('./fillarray')
const { M, W, CASES, CHARS, NAME } = require('./constants')
const FLEX_LISTS                   = require('./flexlist')

/**
 * Получение окончания по выборке
 * @param  {string} string  — строка, содежащая имя, отчество или фамилию
 * @param  {number} gender  — род (1 или 2)
 * @param  {object} name    — индекс части имени (FIRST=0/MIDDLE=1/LAST=2)
 * @return {Array}
 */
function getFlexion(str, g, nameIndex) {
  let retArr = [] // Возвращаемый массив

  const flexList = FLEX_LISTS[nameIndex]

  for (let e in flexList) {
    const eClear     = e.replace(/\[|\]/g, '')
    const lenWoutEnd = str.length - eClear.length
    const ending     = str.substr(lenWoutEnd).toLowerCase()

    if (eClear === ending) {
      // Если пол не совпадает, идём дальше
      const flexGender = flexList[e][flexList[e].length - 1]
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

/**
 * Получение склонений частей имени
 * @param  {number} propNum — (FIRST=0/MIDDLE=1/LAST=2)
 * @param  {string} str     — часть имени (имя/отчество/фамилия)
 * @param  {number} gender  — род
 * @return {Array}          — результат
 */
function getName(nameIndex, str, gender = 0) {
  // Если строка не проходит проверку, возвращаем её же
  if (!str || typeof str !== 'string')
    return fillArray(Array(CASES.length), str + '')

  // Получаем список флексий
  const flex = FLEX_LISTS[nameIndex]

  // Ищем подходящее окончание из списка
  let out

  // Если это фамилия и двойная, склоняем обе части
  if (nameIndex === NAME.LAST && str.indexOf('-') > -1) {
    let lastNames = str.split('-')
    let lastNamesArr = []

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

/**
 * Обработка пола
 * @param {?number|string} g — Род. Может принимать значения: 1 или 2,
 * «m» или «w», «man» или «woman»
 */
function getGender(g) {
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

/**
 * Получение склонений имени. Экспортируется по-дефолту
 * @param  {string}  firstname  — Склоняемое имя
 * @param  {string}  middlename — Склоняемое отчество
 * @param  {string}  lastname   — Склоняемая фамилия
 * @param  {?number} [gender=0] — Род
 * @return {object}
 */
function full(firstname, middlename, lastname, g = 0) {
  const gender = getGender(g)

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

/**
 * Экспорт склонения имени
 * @param  {string}  str    — имя
 * @param  {?number} gender — род
 * @return {Array}
 */
function firstname(str, gender) {
  return getName(NAME.FIRST, str, gender)
}

/**
 * Экспорт склонения отчества
 * @param  {string}  str    — отчество
 * @param  {?number} gender — род
 * @return {Array}
 */
function middlename(str, gender) {
  return getName(NAME.MIDDLE, str, gender)
}

/**
 * Экспорт склонения отчества
 * @param  {string}  str    — фамилия
 * @param  {?number} gender — род
 * @return {Array}
 */
function lastname(str, gender) {
  return getName(NAME.LAST, str, gender)
}

/**
 * @exports
 * @default full
 * @prop firstname
 * @prop middlename
 * @prop lastname
 */
const sklonenie = full
sklonenie.firstname  = firstname
sklonenie.middlename = middlename
sklonenie.lastname   = lastname

if (typeof module !== 'undefined' && module.exports != null) {
  module.exports = sklonenie
} else if (typeof window !== 'undefined') {
  window.sklonenie = sklonenie
} else {
  throw new Error('Невозможно экспортировать модуль')
}
