/**
 * @jest-environment jsdom
 */

import {cleanup, fireEvent, render} from '@testing-library/react';
import {COLORS, hexToRgb, INITIAL_BUTTONS, STATUS} from "../../utils";
import {MathlerBoard} from "../mathler-board";


afterEach(cleanup);
it('MathlerBoard no answers, no current, small size', () => {
    const {queryAllByTestId} = render(
        <MathlerBoard answers={[]} size={1} current={''}/>,
    );
    const rowItems = queryAllByTestId('board-row');
    expect(rowItems).toHaveLength(6);
    const cellItems = queryAllByTestId('board-cell');
    expect(cellItems).toHaveLength(6);
});

it('MathlerBoard no answers, no current, regular size', () => {
    const {queryAllByTestId} = render(
        <MathlerBoard answers={[]} size={6} current={''}/>,
    );
    const rowItems = queryAllByTestId('board-row');
    expect(rowItems).toHaveLength(6);
    const cellItems = queryAllByTestId('board-cell');
    expect(cellItems).toHaveLength(36);
});

it('MathlerBoard no answers, no current, big size', () => {
    const {queryAllByTestId} = render(
        <MathlerBoard answers={[]} size={10} current={''}/>,
    );
    const rowItems = queryAllByTestId('board-row');
    expect(rowItems).toHaveLength(6);
    const cellItems = queryAllByTestId('board-cell');
    expect(cellItems).toHaveLength(60);
});

it('MathlerBoard no answers, partial current, regular size', () => {
    const {queryAllByTestId} = render(
        <MathlerBoard answers={[]} size={6} current={'1+'}/>,
    );
    const rowItems = queryAllByTestId('board-row');
    expect(rowItems).toHaveLength(6);
    const cellItems = queryAllByTestId('board-cell');
    expect(cellItems).toHaveLength(36);

    let computedStyle = window.getComputedStyle(cellItems[0]);
    expect(computedStyle.color).toBe(hexToRgb(COLORS.Black))
    expect(computedStyle.backgroundColor).toBe(hexToRgb(COLORS.White))
    expect(cellItems[0].textContent).toBe('1');

    computedStyle = window.getComputedStyle(cellItems[1]);
    expect(computedStyle.color).toBe(hexToRgb(COLORS.Black))
    expect(computedStyle.backgroundColor).toBe(hexToRgb(COLORS.White))
    expect(cellItems[1].textContent).toBe('+');

    for (let currentCell = 2; currentCell < cellItems.length; currentCell++) {
        computedStyle = window.getComputedStyle(cellItems[currentCell]);
        expect(computedStyle.color).toBe(hexToRgb(COLORS.Black))
        expect(computedStyle.backgroundColor).toBe(hexToRgb(COLORS.White))
        expect(cellItems[currentCell].textContent).toBe('');
    }
});

it('MathlerBoard no answers, full current, regular size', () => {
    const currentAnswer = '1+2+30'
    const {queryAllByTestId} = render(
        <MathlerBoard answers={[]} size={6} current={currentAnswer}/>,
    );
    const rowItems = queryAllByTestId('board-row');
    expect(rowItems).toHaveLength(6);
    const cellItems = queryAllByTestId('board-cell');
    expect(cellItems).toHaveLength(36);

    for (let currentCell = 0; currentCell < currentAnswer.length; currentCell++) {
        let computedStyle = window.getComputedStyle(cellItems[currentCell]);
        expect(computedStyle.color).toBe(hexToRgb(COLORS.Black))
        expect(computedStyle.backgroundColor).toBe(hexToRgb(COLORS.White))
        expect(cellItems[currentCell].textContent).toBe(currentAnswer[currentCell]);
    }
    for (let currentCell = currentAnswer.length; currentCell < cellItems.length; currentCell++) {
        let computedStyle = window.getComputedStyle(cellItems[currentCell]);
        expect(computedStyle.color).toBe(hexToRgb(COLORS.Black))
        expect(computedStyle.backgroundColor).toBe(hexToRgb(COLORS.White))
        expect(cellItems[currentCell].textContent).toBe('');
    }
});

it('MathlerBoard one answer, no current, regular size', () => {
    const size = 6;
    const currentAnswer = ''
    const answers = [
        [
            {
                label: '1',
                state: STATUS.Miss,
            },
            {
                label: '2',
                state: STATUS.Hit,
            },
            {
                label: '3',
                state: STATUS.Miss,
            },
            {
                label: '+',
                state: STATUS.Partial,
            },
            {
                label: '5',
                state: STATUS.Miss,
            },
            {
                label: '6',
                state: STATUS.Miss,
            }
        ]
    ]
    const {queryAllByTestId} = render(
        <MathlerBoard answers={answers} size={6} current={currentAnswer}/>,
    );
    const rowItems = queryAllByTestId('board-row');
    expect(rowItems).toHaveLength(6);
    const cellItems = queryAllByTestId('board-cell');
    expect(cellItems).toHaveLength(36);

    let computedStyle = window.getComputedStyle(cellItems[0]);
    expect(computedStyle.color).toBe(hexToRgb(COLORS.White))
    expect(computedStyle.backgroundColor).toBe(hexToRgb(COLORS.Miss))
    expect(cellItems[0].textContent).toBe('1');

    computedStyle = window.getComputedStyle(cellItems[1]);
    expect(computedStyle.color).toBe(hexToRgb(COLORS.White))
    expect(computedStyle.backgroundColor).toBe(hexToRgb(COLORS.Hit))
    expect(cellItems[1].textContent).toBe('2');

    computedStyle = window.getComputedStyle(cellItems[2]);
    expect(computedStyle.color).toBe(hexToRgb(COLORS.White))
    expect(computedStyle.backgroundColor).toBe(hexToRgb(COLORS.Miss))
    expect(cellItems[2].textContent).toBe('3');

    computedStyle = window.getComputedStyle(cellItems[3]);
    expect(computedStyle.color).toBe(hexToRgb(COLORS.White))
    expect(computedStyle.backgroundColor).toBe(hexToRgb(COLORS.Partial))
    expect(cellItems[3].textContent).toBe('+');

    computedStyle = window.getComputedStyle(cellItems[4]);
    expect(computedStyle.color).toBe(hexToRgb(COLORS.White))
    expect(computedStyle.backgroundColor).toBe(hexToRgb(COLORS.Miss))
    expect(cellItems[4].textContent).toBe('5');

    computedStyle = window.getComputedStyle(cellItems[5]);
    expect(computedStyle.color).toBe(hexToRgb(COLORS.White))
    expect(computedStyle.backgroundColor).toBe(hexToRgb(COLORS.Miss))
    expect(cellItems[5].textContent).toBe('6');


    for (let currentCell = answers.length * 6; currentCell < currentAnswer.length; currentCell++) {
        let computedStyle = window.getComputedStyle(cellItems[currentCell]);
        expect(computedStyle.color).toBe(hexToRgb(COLORS.Black))
        expect(computedStyle.backgroundColor).toBe(hexToRgb(COLORS.White))
        expect(cellItems[currentCell].textContent).toBe(currentAnswer[currentCell]);
    }
    for (let currentCell = answers.length * 6 + currentAnswer.length; currentCell < cellItems.length; currentCell++) {
        let computedStyle = window.getComputedStyle(cellItems[currentCell]);
        expect(computedStyle.color).toBe(hexToRgb(COLORS.Black))
        expect(computedStyle.backgroundColor).toBe(hexToRgb(COLORS.White))
        expect(cellItems[currentCell].textContent).toBe('');
    }
});