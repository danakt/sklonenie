import sklonenie    from '../src'
import * as mocha   from 'mocha'
import { expect }   from 'chai'
import { firstnames, middlenames, lastnames } from './mock'

const CASES: string[] = [
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
        describe(<string>firstnames[i][0], () => {
            // Перебор падежей
            for (let c = 0; c < CASES.length; c++) {
                it(CASES[c], () => {
                    const gender: number = <number>firstnames[i][6]
                    const firstname: string = sklonenie(
                        <string>firstnames[i][0],
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
        describe(<string>middlenames[i][0], () => {
            // Перебор падежей
            for (let c = 0; c < CASES.length; c++) {
                it(CASES[c], () => {
                    const gender: number = <number>middlenames[i][6]
                    const middlename: string = sklonenie(
                        '',
                        <string>middlenames[i][0],
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
      describe(<string>lastnames[i][0], () => {
          // Перебор падежей
          for (let c = 0; c < CASES.length; c++) {
              it(CASES[c], () => {
                  const gender: number = <number>lastnames[i][6]
                  const lastname: string = sklonenie(
                      '',
                      '',
                      <string>lastnames[i][0],
                      gender
                  ).lastname[c]

                  expect(lastname).to.equal(lastnames[i][c])
              })
          }
      })
  }
})
