import {generateEquation} from "../equation-generator";

it('test equation generator with small size', () => {
    expect('2=2').toEqual(generateEquation(1, '1'))
    expect('9=9').toEqual(generateEquation(1, '2'))
    expect('29=29').toEqual(generateEquation(2, '1'))
    expect('99=99').toEqual(generateEquation(2, '2'))
})

it('test equation generator with same seed', () => {
    const equation11 = generateEquation(1, '1')
    expect(equation11).toEqual(generateEquation(1, '1'))
    const equation12 = generateEquation(1, '2')
    expect(equation12).toEqual(generateEquation(1, '2'))
    const equation21 = generateEquation(2, '1')
    expect(equation21).toEqual(generateEquation(2, '1'))
    const equation22 = generateEquation(2, '2')
    expect(equation22).toEqual(generateEquation(2, '2'))
    const equation31 = generateEquation(3, '1')
    expect(equation31).toEqual(generateEquation(3, '1'))
    const equation32 = generateEquation(3, '2')
    expect(equation32).toEqual(generateEquation(3, '2'))
})

it('test equation generator with big size', () => {
    expect('291*62=18042').toEqual(generateEquation(6, '1'))
    expect('291*6+9-71=1684').toEqual(generateEquation(10, '1'))
})