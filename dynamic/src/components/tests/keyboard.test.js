/**
 * @jest-environment jsdom
 */

import {cleanup, fireEvent, render} from '@testing-library/react';
import {COLORS, hexToRgb, INITIAL_BUTTONS, STATUS} from "../../utils";
import {Keyboard} from "../keyboard";


afterEach(cleanup);
it('Keyboard no keys', () => {
    const {queryAllByRole} = render(
        <Keyboard onClick={() => {
        }} buttons={[]}/>,
    );
    const rowItems = queryAllByRole('div');
    expect(rowItems).toHaveLength(0);
    const buttonItems = queryAllByRole('button');
    expect(buttonItems).toHaveLength(0);
});

it('Keyboard one key', () => {
    const {queryAllByTestId} = render(
        <Keyboard onClick={() => {
        }} buttons={[[{
            label: '0',
            keyCodes: [48, 96],
            state: STATUS.Default
        }]]}/>,
    );
    const rowItems = queryAllByTestId('buttons-row');
    expect(rowItems).toHaveLength(1);
    const buttonItems = queryAllByTestId('button');
    expect(buttonItems).toHaveLength(1);

    const computedStyle = window.getComputedStyle(buttonItems[0]);
    expect(computedStyle.color).toBe(hexToRgb(COLORS.Black))
    expect(computedStyle.backgroundColor).toBe(hexToRgb(COLORS.Default))
});

it('Keyboard all keys', () => {
    const {queryAllByTestId} = render(
        <Keyboard onClick={() => {
        }} buttons={INITIAL_BUTTONS}/>,
    );
    const rowItems = queryAllByTestId('buttons-row');
    expect(rowItems).toHaveLength(2);
    const buttonItems = queryAllByTestId('button');
    expect(buttonItems).toHaveLength(16);
});

it('Keyboard multiple keys, different states', () => {
    const {queryAllByTestId} = render(
        <Keyboard
            onClick={() => {
            }}
            buttons={[[{
                label: '0',
                keyCodes: [48, 96],
                state: STATUS.Default
            },
                {
                    label: '1',
                    keyCodes: [49, 97],
                    state: STATUS.Hit
                },
                {
                    label: '2',
                    keyCodes: [50, 98],
                    state: STATUS.Miss
                },
                {
                    label: '3',
                    keyCodes: [51, 99],
                    state: STATUS.Partial
                }
            ]]}/>,
    );
    const rowItems = queryAllByTestId('buttons-row');
    expect(rowItems).toHaveLength(1);
    const buttonItems = queryAllByTestId('button');
    expect(buttonItems).toHaveLength(4);

    let computedStyle = window.getComputedStyle(buttonItems[0]);
    expect(computedStyle.color).toBe(hexToRgb(COLORS.Black))
    expect(computedStyle.backgroundColor).toBe(hexToRgb(COLORS.Default))

    computedStyle = window.getComputedStyle(buttonItems[1]);
    expect(computedStyle.color).toBe(hexToRgb(COLORS.White))
    expect(computedStyle.backgroundColor).toBe(hexToRgb(COLORS.Hit))

    computedStyle = window.getComputedStyle(buttonItems[2]);
    expect(computedStyle.color).toBe(hexToRgb(COLORS.White))
    expect(computedStyle.backgroundColor).toBe(hexToRgb(COLORS.Miss))

    computedStyle = window.getComputedStyle(buttonItems[3]);
    expect(computedStyle.color).toBe(hexToRgb(COLORS.White))
    expect(computedStyle.backgroundColor).toBe(hexToRgb(COLORS.Partial))
});

it('Keyboard key change', () => {
    const {queryAllByTestId, rerender} = render(
        <Keyboard onClick={() => {
        }} buttons={[[{
            label: '0',
            keyCodes: [48, 96],
            state: STATUS.Default
        }]]}/>,
    );
    let rowItems = queryAllByTestId('buttons-row');
    expect(rowItems).toHaveLength(1);
    let buttonItems = queryAllByTestId('button');
    expect(buttonItems).toHaveLength(1);

    let computedStyle = window.getComputedStyle(buttonItems[0]);
    expect(computedStyle.color).toBe(hexToRgb(COLORS.Black))
    expect(computedStyle.backgroundColor).toBe(hexToRgb(COLORS.Default))

    rerender(
        <Keyboard
            onClick={() => {
            }}
            buttons={[[{
                label: '1',
                keyCodes: [48, 96],
                state: STATUS.Hit
            }],
                [{
                    label: '2',
                    keyCodes: [48, 96],
                    state: STATUS.Miss
                }]
            ]}/>);

    rowItems = queryAllByTestId('buttons-row');
    expect(rowItems).toHaveLength(2);
    buttonItems = queryAllByTestId('button');
    expect(buttonItems).toHaveLength(2);

    computedStyle = window.getComputedStyle(buttonItems[0]);
    expect(computedStyle.color).toBe(hexToRgb(COLORS.White))
    expect(computedStyle.backgroundColor).toBe(hexToRgb(COLORS.Hit))

    computedStyle = window.getComputedStyle(buttonItems[1]);
    expect(computedStyle.color).toBe(hexToRgb(COLORS.White))
    expect(computedStyle.backgroundColor).toBe(hexToRgb(COLORS.Miss))
});

it('Keyboard key click', () => {
    const mockCallBack = jest.fn();
    const {queryAllByTestId} = render(
        <Keyboard onClick={mockCallBack} buttons={[[{
            label: '0',
            keyCodes: [48, 96],
            state: STATUS.Default
        }]]}/>,
    );
    const rowItems = queryAllByTestId('buttons-row');
    expect(rowItems).toHaveLength(1);
    const buttonItems = queryAllByTestId('button');
    expect(buttonItems).toHaveLength(1);

    fireEvent.click(buttonItems[0])
    expect(mockCallBack).toHaveBeenCalledTimes(1)
});