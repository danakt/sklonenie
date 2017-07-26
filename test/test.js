const sklonenie  = require('../src')
const mocha      = require('mocha')
const { expect } = require('chai')
const { firstnames, middlenames, lastnames } = require('./mock')

/** ----------------------------------------------------------------------------
 * Список падежей
 * @type {Array}
 */
const CASES = [
    'Именительный',
    'Родительный',
    'Дательный',
    'Винительный',
    'Творительный',
    'Предложный'
]

/** ----------------------------------------------------------------------------
 * Склонение имён
 */
describe('Склонение имён', () => {
    // Перебор имён
    for (let c = 0; c < CASES.length; c++) {
        describe(CASES[c], () => {
            // Перебор падежей
            for (let i = 0; i < firstnames.length; i++) {
                it(firstnames[i][c], () => {
                    const gender = firstnames[i][6]

                    expect(
                        sklonenie(firstnames[i][0], '', '', gender).firstname[c]
                    ).to.equal(firstnames[i][c])

                    expect(
                        sklonenie.firstname(firstnames[i][0], gender)[c]
                    ).to.equal(firstnames[i][c])
                })
            }
        })
    }
})

/** ----------------------------------------------------------------------------
 * Склонение отчеств
 */
describe('Склонение отчеств', () => {
    // Перебор имён
    for (let c = 0; c < CASES.length; c++) {
        describe(CASES[c], () => {
            // Перебор падежей
            for (let i = 0; i < middlenames.length; i++) {
                it(middlenames[i][c], () => {
                    const gender = middlenames[i][6]

                    expect(
                        sklonenie('', middlenames[i][0], '', gender)
                            .middlename[c]
                    ).to.equal(middlenames[i][c])

                    expect(
                        sklonenie.middlename(middlenames[i][0], gender)[c]
                    ).to.equal(middlenames[i][c])
                })
            }
        })
    }
})

/** ----------------------------------------------------------------------------
 * Склонение фамилий
 */
describe('Склонение фамилий', () => {
    // Перебор имён
    for (let c = 0; c < CASES.length; c++) {
        describe(CASES[c], () => {
            // Перебор падежей
            for (let i = 0; i < lastnames.length; i++) {
                it(lastnames[i][c], () => {
                    const gender = lastnames[i][6]

                    expect(
                        sklonenie('', '', lastnames[i][0], gender).lastname[c]
                    ).to.equal(lastnames[i][c])

                    expect(
                        sklonenie.lastname(lastnames[i][0], gender)[c]
                    ).to.equal(lastnames[i][c])
                })
            }
        })
    }
})
