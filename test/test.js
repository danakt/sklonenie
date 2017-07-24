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
    for (let i = 0; i < firstnames.length; i++) {
        describe(firstnames[i][0], () => {
            // Перебор падежей
            for (let c = 0; c < CASES.length; c++) {
                it(CASES[c], () => {
                    const gender = firstnames[i][6]
                    const firstname = sklonenie(
                        firstnames[i][0],
                        '',
                        '',
                        gender
                    ).firstname[c]

                    expect(firstname).to.equal(firstnames[i][c])
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
    for (let i = 0; i < middlenames.length; i++) {
        describe(middlenames[i][0], () => {
            // Перебор падежей
            for (let c = 0; c < CASES.length; c++) {
                it(CASES[c], () => {
                    const gender = middlenames[i][6]
                    const middlename = sklonenie(
                        '',
                        middlenames[i][0],
                        '',
                        gender
                    ).middlename[c]

                    expect(middlename).to.equal(middlenames[i][c])
                })
            }
        })
    }
})

/** ----------------------------------------------------------------------------
 * Склонение фамилий
 */
describe('Склонение отчеств', () => {
  // Перебор имён
  for (let i = 0; i < lastnames.length; i++) {
      describe(lastnames[i][0], () => {
          // Перебор падежей
          for (let c = 0; c < CASES.length; c++) {
              it(CASES[c], () => {
                  const gender = lastnames[i][6]
                  const lastname = sklonenie(
                      '',
                      '',
                      lastnames[i][0],
                      gender
                  ).lastname[c]

                  expect(lastname).to.equal(lastnames[i][c])
              })
          }
      })
  }
})
