import {equationToTree, getAllEquationPermutationsFromTree, getArrayPermutations} from "../equation-permutate";

it('equationToTree one digit', () => {
    expect({
        op: '+',
        children: ['1'],
    }).toMatchObject(equationToTree('1'))
})

it('equationToTree two digits', () => {
    expect({
        op: '+',
        children: ['12'],
    }).toMatchObject(equationToTree('12'))
})

it('equationToTree addition', () => {
    expect({
        op: '+',
        children: ['1', '2'],
    }).toMatchObject(equationToTree('1+2'))
})

it('equationToTree addition multiple', () => {
    expect({
        op: '+',
        children: ['1', '2', '3', '4'],
    }).toMatchObject(equationToTree('1+2+3+4'))
})

it('equationToTree multiplication', () => {
    expect({
        op: '+',
        children: [{
            op: '*',
            children: ['1', '2'],
        }],
    }).toMatchObject(equationToTree('1*2'))
})

it('equationToTree multiplication multiple', () => {
    expect({
        op: '+',
        children: [{
            op: '*',
            children: ['1', '2', '3', '4'],
        }],
    }).toMatchObject(equationToTree('1*2*3*4'))
})

it('equationToTree subtraction', () => {
    expect({
        op: '+',
        children: ['1-2'],
    }).toMatchObject(equationToTree('1-2'))
})

it('equationToTree division', () => {
    expect({
        op: '+',
        children: ['1/2'],
    }).toMatchObject(equationToTree('1/2'))
})

it('equationToTree compound', () => {
    expect({
        op: '+',
        children: [
            {
                op: '*',
                children: ['1', '2'],
            },
            {
                op: '*',
                children: ['3', '4/5'],
            }
        ],
    }).toMatchObject(equationToTree('1*2+3*4/5'))
})

it('getArrayPermutations empty', () => {
    expect([[]]).toMatchObject(getArrayPermutations([]))
})

it('getArrayPermutations one', () => {
    expect([[1]]).toMatchObject(getArrayPermutations([1]))
})

it('getArrayPermutations two', () => {
    expect([[1, 2], [2,1]]).toMatchObject(getArrayPermutations([1, 2]))
})

it('getArrayPermutations three', () => {
    expect([[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]).toMatchObject(getArrayPermutations([1, 2, 3]))
})

it('getAllEquationPermutationsFromTree one digit', () => {
    expect(['1']).toMatchObject(getAllEquationPermutationsFromTree(equationToTree('1')))
})

it('getAllEquationPermutationsFromTree two digit', () => {
    expect(['12']).toMatchObject(getAllEquationPermutationsFromTree(equationToTree('12')))
})

it('getAllEquationPermutationsFromTree addition', () => {
    expect(['1+2', '2+1']).toMatchObject(getAllEquationPermutationsFromTree(equationToTree('1+2')))
})

it('getAllEquationPermutationsFromTree multiplication', () => {
    expect(['1*2', '2*1']).toMatchObject(getAllEquationPermutationsFromTree(equationToTree('1*2')))
})

it('getAllEquationPermutationsFromTree addition multiple', () => {
    expect(['1+2+3', '1+3+2', '2+1+3', '2+3+1', '3+1+2', '3+2+1']).toMatchObject(getAllEquationPermutationsFromTree(equationToTree('1+2+3')))
})

it('getAllEquationPermutationsFromTree compound', () => {
    expect(['1+2*3', '1+3*2', '2*3+1', '3*2+1']).toMatchObject(getAllEquationPermutationsFromTree(equationToTree('1+2*3')))
})

it('getAllEquationPermutationsFromTree compound bigger', () => {
    expect(['1*4+2*3', '1*4+3*2',
        '4*1+2*3', '4*1+3*2',
        '2*3+1*4', '2*3+4*1',
        '3*2+1*4', '3*2+4*1']).toMatchObject(getAllEquationPermutationsFromTree(equationToTree('1*4+2*3')))
})
