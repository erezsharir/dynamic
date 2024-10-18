import gen from 'random-seed'
import {evaluate} from "mathjs";

export const generateDailySeed = () => {
    let startOfDay = new Date();
    startOfDay.setUTCHours(0,0,0,0);
    return startOfDay.toUTCString();
}

// No trailing zero.
const EQUATION_INITIAL_POSITION = '-+123456789';
const EQUATION_MIDDLE_POSITION = '-+*/1234567890';
// Will also be used after a non number
const EQUATION_END_POSITION = '1234567890';

export const generateEquation = (size, seed) => {
    const random = gen(seed);

    let equation = '';
    let isEquationValid = false;

    if (size <= 0) {
        throw new Error('Size should be bigger than 0!');
    }

    while (!isEquationValid) {
        equation = equation.concat(EQUATION_INITIAL_POSITION[random(EQUATION_INITIAL_POSITION.length)]);

        while (equation.length < size) {
            if (equation.length === size - 1) {
                // For the last character, we want only a number
                if (['*', '/'].includes(equation[equation.length - 1])) {
                    // Do not divide or multiply by 0
                    equation = equation.concat(EQUATION_END_POSITION[random(EQUATION_END_POSITION.length - 1)]);
                } else {
                    equation = equation.concat(EQUATION_END_POSITION[random(EQUATION_END_POSITION.length)]);
                }
            } else if (['-', '+'].includes(equation[equation.length - 1])) {
                equation = equation.concat(EQUATION_END_POSITION[random(EQUATION_END_POSITION.length)]);
            } else if (['*', '/'].includes(equation[equation.length - 1])) {
                // Do not divide or multiply by 0
                equation = equation.concat(EQUATION_END_POSITION[random(EQUATION_END_POSITION.length - 1)]);
            } else {
                equation = equation.concat(EQUATION_MIDDLE_POSITION[random(EQUATION_MIDDLE_POSITION.length)]);
            }
        }
        let isOnlyNumbers = /^\d+$/.test(equation);
        if (isOnlyNumbers) {
            if (size <= 2) {
                isEquationValid = true;
            } else {
                equation = '';
            }
        } else {
            isEquationValid = true;
        }
    }
    return equation.concat('=', evaluate(equation))
}