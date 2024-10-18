import {MathlerBoard} from "./mathler-board";
import {Keyboard} from "./keyboard";
import {
    generateDailySeed,
    generateEquation,
    getEquationPermutations,
    INITIAL_BUTTONS,
    KEY_CODE_TO_VALUE_MAP,
    STATUS
} from "../utils";
import styled from "styled-components";
import {useCallback, useEffect, useMemo, useState} from "react";
import toast from 'react-simple-toasts';
import 'react-simple-toasts/dist/style.css';
import {evaluate} from 'mathjs'

const MathlerGame = styled.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    height: '100vh',
});

const Header = styled.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: '24px',
    marginBottom: '12px',
});

const Instructions = styled.div({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    marginBottom: '12px',
});

const Result = styled.span({
    marginLeft: '4px',
    backgroundColor: 'yellow',
});

const validInputRegex = /(?:^[-+]?(?:\d+[*/+-])+\d+)$/;

export const Mathler = () => {
    const EQUATION_LENGTH = 6;

    const [equationOfTheDay, setEquationOfTheDay] = useState(undefined)
    const [answers, setAnswers] = useState([]);
    const [currentAnswer, setCurrentAnswer] = useState('');
    const [buttons, setButtons] = useState(INITIAL_BUTTONS);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        const startOfToday = generateDailySeed();
        setEquationOfTheDay(generateEquation(EQUATION_LENGTH, startOfToday));
    }, []);

    const result = useMemo(() => {
        if (!equationOfTheDay) {
            return undefined;
        }
        return parseInt(equationOfTheDay.split('=')[1])
    }, [equationOfTheDay])

    const equation = useMemo(() => {
        if (!equationOfTheDay) {
            return undefined;
        }
        console.log('equationOfTheDay', equationOfTheDay)
        return equationOfTheDay.split('=')[0]
    }, [equationOfTheDay])

    const equationPermutations = useMemo(() => {
        if (!equation) {
            return []
        }
        return getEquationPermutations(equation)
    }, [equation])

    const getKeyState = useCallback((keyIndex) => {
        if (equation[keyIndex] === currentAnswer[keyIndex]) {
            return STATUS.Hit;
        }
        const equationIndex = equation.indexOf(currentAnswer[keyIndex]);
        if (equationIndex === -1) {
            return STATUS.Miss;
        }
        return STATUS.Partial;
    }, [equation, currentAnswer])

    const submit = useCallback(() => {
        const newAnswer = [];
        let updatedButtons = [...buttons]
        Array.from(currentAnswer).forEach((digit, index) => {
            const digitState = getKeyState(index);
            newAnswer.push({
                label: digit,
                state: digitState,
            })

            updatedButtons = updatedButtons.map((row) => {
                return row.map((button) => {
                    if (button.label === digit && button.state !== STATUS.Hit) {
                        return {
                            ...button,
                            state: digitState
                        }
                    }
                    return {...button};
                })
            })
        });

        setButtons(updatedButtons);
        setAnswers((prev) => ([...prev, newAnswer]));
        setCurrentAnswer('')
        if (currentAnswer === equation) {
            setGameOver(true);
            toast('Congratulations! You have solved our riddle!', {theme: 'success', position: 'top-center'})
            return;
        }
        if (answers.length < 5) {
            if (equationPermutations.includes(currentAnswer)) {
                toast('You got the numbers right... but not in the right order!', {theme: 'success', position: 'top-center'})
                return;
            }
        }
        // setAnswers updates the value only later
        if (answers.length === 5) {
            setGameOver(true);
            toast('You have failed to solve our riddle. But you did it magnificently!', {theme: 'failure', position: 'top-center'})
        }
    }, [currentAnswer, buttons, getKeyState, answers.length, equationPermutations, equation])

    const validateAndSubmit = useCallback(() => {
        // Validate length.
        if (currentAnswer.length !== EQUATION_LENGTH) {
            toast('Not enough numbers', {theme: 'failure', position: 'top-center'})
            return;
        }
        // Validate input is an equation
        if (!validInputRegex.test(currentAnswer)) {
            toast('That\'s not a valid equation', {theme: 'failure', position: 'top-center'})
            return;
        }
        // Validate input calculated value
        if (evaluate(currentAnswer) !== result) {
            toast(`The result should be ${result}`, {theme: 'failure', position: 'top-center'})
            return;
        }
        submit();
    }, [result, currentAnswer, submit])

    const handleKeyDown = useCallback((e) => {
        // I'm adding a comment even though it's quite obvious ;)
        if (gameOver) {
            return;
        }
        // Check if we filled all the answers.
        if (answers.length === 6) {
            return;
        }
        const key = e.keyCode;
        // Current answer is already at full length and the user tried to add another valid char.
        if (currentAnswer.length === EQUATION_LENGTH && KEY_CODE_TO_VALUE_MAP[key]) {
            return;
        }
        // Valid char - Enter and Delete not included here.
        if (KEY_CODE_TO_VALUE_MAP[key]) {
            setCurrentAnswer((prev) => `${prev}${KEY_CODE_TO_VALUE_MAP[key]}`)
        }
        // Delete
        if (key === 8) {
            if (currentAnswer.length) {
                setCurrentAnswer((prev) => prev.slice(0, -1))
            }
        }
        // Enter
        if (key === 13) {
            validateAndSubmit()
        }
    }, [answers, currentAnswer, validateAndSubmit, gameOver])

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return <MathlerGame>
        <Header>My Mathler</Header>
        <Instructions>Find the hidden calculation <Result> that equals {result}</Result></Instructions>
        <MathlerBoard size={EQUATION_LENGTH} answers={answers} current={currentAnswer}/>
        <Keyboard onClick={(keyCode) => handleKeyDown({keyCode: keyCode})} buttons={buttons}/>
    </MathlerGame>
}