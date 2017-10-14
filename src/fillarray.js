/**
 * Filling array
 * @param {Array} array
 * @param {*}     value
 */
function fillArray(array, value) {
    // Steps 1-2
    if (array == null) {
        throw new TypeError('array is null or not defined')
    }

    const O = Object(array)

    // Steps 3-5
    const len = O.length >>> 0

    // Steps 6-7
    const start = arguments[1]
    const relativeStart = start >> 0

    // Step 8
    let k = relativeStart < 0
        ? Math.max(len + relativeStart, 0)
        : Math.min(relativeStart, len)

    // Steps 9-10
    const end = arguments[2]
    const relativeEnd = end === undefined
        ? len
        : end >> 0

    // Step 11
    const final = relativeEnd < 0
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

/**
 * @exports
 * @default fillArray
 */
module.exports = fillArray
