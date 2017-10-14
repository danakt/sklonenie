const { M, W, CHARS, EXCEP, SHORT_MIDDLE_FLEX } = require('./constants')

/**
 * Буквы алфавита
 */
const { CON, VOW, ACON, BCON, AVOW, CCON, DCON } = CHARS

/**
 * Функция подготовки объекта выборки
 * @param  {Array} arr
 * @return {FlexList}
 */
function prepareList(arr) {
  const list = {}

  // Превращаем массив в объект
  for (let i = 0; i < arr.length; i += 3) {
    const flex = arr[i + 1][0]
      .split(/\s+/g)
      .map(item => item.replace(/\./g, ''));

    list[arr[i]] = flex.concat(arr[i + 2])
  }

  for (let e in list) {
    if (e.indexOf(',') === -1) {
      continue
    }

    const arrMultEnd = e.match(/\[(.+)\](.*)/)
    if (arrMultEnd !== null && arrMultEnd.length >= 3) {
      const charsMultEnd = arrMultEnd[1]
        .split(',')
        .map(item => item.replace(/\s+/g, ''))

      // Создаём новые элементы с одинаковым содержанием
      for (let i = 0; i < charsMultEnd.length; i++) {
        const postfix = arrMultEnd[arrMultEnd.length - 1] || ''
        list[`[${charsMultEnd[i]}]${postfix}`] = list[e]
      }

      // Удаляем старый элемент с множественной выборкой
      delete list[e]
    }
  }

  return list
}

/**
 * Списки окончаний
 * @type {Array}
 */
const FLEX_LISTS = [
  // Окончания имён
  [
      // Окончания                И    Р    Д    В    Т    П      пол
    `[и]й`,                   ['й    я    ю    я    ем   и'  ],  M,
    `[${AVOW}]й`,             ['й    я    ю    я    ем   е'  ],  M,
    `[${CON}]`,               ['.    а    у    а    ом   е'  ],  M,
    `[адел]ь`,                ['ь    я    ю    я    ем   е'  ],  M,
    `[${EXCEP}]ь`,            ['ь    и    и    ь    ью   и'  ],  W,
    `[${CON}]ь`,              ['ь    я    ю    я    ем   е'  ],  M,
    `[${VOW},${BCON}]а`,      ['а    ы    е    у    ой   е'  ],  W,
    `[${ACON}]а`,             ['а    и    е    у    ой   е'  ],  W,
    '[ь]я',                   ['я    и    е    ю    ей   е'  ],  W,
    `я`,                      ['я    и    и    ю    ей   и'  ],  W,
    `[пав]ел`,                ['ел   ла   лу   ла   лом  ле' ],  M,
    `[л]ев`,                  ['ев   ьва  ьву  ьва  ьвом ьве'],  M,
  ],
  // Окончания имён отчеств
  [
    // Окончания                И    Р    Д    В    Т    П      пол
    '[вич]',                  ['.    а    у    а    ем   е' ],   M,
    `[${SHORT_MIDDLE_FLEX}]`, ['.    а    у    а    ем   е' ],   M,
    '[вн]а',                  ['а    ы    е    у    ой   е' ],   W,
    `[${CON}]на`,             ['на   ны   не   ну   ной  не'],   W,
  ],
  // Окончания фамилий
  [
    // Окончания                И    Р    Д    В    Т    П      пол
    '[ин,ен,ев,ов]',          ['.    а    у    а    ым   е' ],   M,  // Пушкин, Герцен, Медведев, Иванов
    '[ин,ен,ев,ов]а',         ['а    ой   ой   у    ой   ой'],   W,  // Путина, Гребена, Цветаева, Ахматова
    '[ск,]ий',                ['ий   ого  ому  ого  им   ом'],   M,  // Невский, Дикий
    'ый',                     ['ый   ого  ому  ого  ым   ом'],   M,  // Гордый
    'ая',                     ['ая   ой   ой   ую   ой   ой'],   W,  // Крупская, Боровая
    'ой',                     ['ой   ого  ому  ого  ым   ом'],   M,  // Толстой
    'я',                      ['я    и    и    ю    ей   и' ],  M|W, // Берия
    `[${ACON}]а`,             ['а    и    е    у    ой   е' ],  M|W, // Глинка
    `[${BCON}]а`,             ['а    ы    е    у    ой   е' ],  M|W, // Линда
    'ь',                      ['ь    я    ю    я    ем   е' ],   M,  // Гоголь
    `[${VOW}]й`,              ['й    я    ю    я    ем   е' ],   M,  // Гайдай
    `[ых,их,${VOW}]`,         ['.    .    .    .    .    .' ],  M|W, // Седых, Гёте
    `[${CCON}]`,              ['.    а    у    а    ом   е' ],   M,  // Дельвиг
    `[${DCON}]`,              ['.    а    у    а    ем   е' ],   M,  // Бах, Абрамович
  ]
].map(prepareList)

/**
 * @exports
 * @default FLEX_LIST
 */
module.exports = FLEX_LISTS
