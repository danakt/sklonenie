/**
 * Filling array
 * @param {Array} array
 * @param {*}     value
 */
export default function FillArray(array: any[], value: any) {
    // Steps 1-2
    if (array == null) {
        throw new TypeError('array is null or not defined')
    }

    const O: any[] = Object(array)

    // Steps 3-5
    const len: number = O.length >>> 0

    // Steps 6-7
    const start: number = arguments[1]
    const relativeStart: number = start >> 0

    // Step 8
    let k: number = relativeStart < 0
        ? Math.max(len + relativeStart, 0)
        : Math.min(relativeStart, len)

    // Steps 9-10
    const end: number = arguments[2]
    const relativeEnd: number = end === undefined
        ? len
        : end >> 0

    // Step 11
    const final: number = relativeEnd < 0
        ? Math.max(len + relativeEnd, 0)
        : Math.min(relativeEnd, len)

    // Step 12
    while (k < final) {
        O[k] = value
        k++
    }

    // Step 13
    return O
}
