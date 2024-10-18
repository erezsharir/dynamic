
export const equationToTree = (equation) => {
    const parts = equation.split('+')
    const tree = {
        op: '+',
        children: [],
    }
    parts.forEach((part, index) => {
        const subParts = part.split('*');

        if (subParts.length === 1) {
            tree.children[index] = subParts[0];
        } else {
            tree.children[index] = {
                op: '*',
                children: subParts,
            }
        }
    })

    return tree;
}
export const getArrayPermutations = (arr) => {
    if (arr.length === 0) return [[]];

    const result = [];

    for (let i = 0; i < arr.length; i++) {
        const current = arr[i];
        const remaining = arr.slice(0, i).concat(arr.slice(i + 1));
        const subPermutations = getArrayPermutations(remaining);

        for (const subPermutation of subPermutations) {
            result.push([current, ...subPermutation]);
        }
    }

    return result;
}

const cartesian = (args) => {
    let result = [], max = args.length-1;
    function helper(arr, i) {
        for (let j=0, l=args[i].length; j<l; j++) {
            let a = arr.slice(0); // clone arr
            a.push(args[i][j]);
            if (i===max)
                result.push(a);
            else
                helper(a, i+1);
        }
    }
    helper([], 0);
    return result;
}

export const getAllEquationPermutationsFromTree = (equationTree) => {
    const result = [];
    // const tree = equationToTree(equation);
    if (equationTree.children && equationTree.children.length > 0) {
        const permutations = getArrayPermutations(equationTree.children);
        permutations.forEach((permutation) => {
            const childPermutations = permutation.map((perm) => {
                if (typeof perm === 'string') {
                    return [perm]
                }
                if (!perm.children) {return [perm]}
                else {
                    return getAllEquationPermutationsFromTree(perm)
                }
            });
            const childrenCartesian = cartesian(childPermutations)
            childrenCartesian.forEach((cart) => result.push(cart.join(equationTree.op)));
        })
    } else {
        result.push(equationTree)
    }

    return result;
}

export const getEquationPermutations = (equation) => {
    return getAllEquationPermutationsFromTree(equationToTree(equation));
}