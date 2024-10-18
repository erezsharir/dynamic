/**
 * @jest-environment jsdom
 */

import {cleanup, fireEvent, render} from '@testing-library/react';
import {COLORS, hexToRgb, STATUS} from "../../utils";
import {BoardCell} from "../board-cell";


afterEach(cleanup);
it('BoardCell default state', () => {
    const {getByText} = render(
        <BoardCell label={'Hello'} state={STATUS.Default} />,
    );
    const element = getByText(/Hello/i);
    const computedStyle = window.getComputedStyle(element);
    expect(computedStyle.color).toBe(hexToRgb(COLORS.Black))
    expect(computedStyle.backgroundColor).toBe(hexToRgb(COLORS.White))
});

it('BoardCell miss state', () => {
    const {getByText} = render(
        <BoardCell label={'Hello'} state={STATUS.Miss} />,
    );
    const element = getByText(/Hello/i);
    const computedStyle = window.getComputedStyle(element);
    expect(computedStyle.color).toBe(hexToRgb(COLORS.White))
    expect(computedStyle.backgroundColor).toBe(hexToRgb(COLORS.Miss))
});

it('BoardCell hit state', () => {
    const {getByText} = render(
        <BoardCell label={'Hello'} state={STATUS.Hit} />,
    );
    const element = getByText(/Hello/i);
    const computedStyle = window.getComputedStyle(element);
    expect(computedStyle.color).toBe(hexToRgb(COLORS.White))
    expect(computedStyle.backgroundColor).toBe(hexToRgb(COLORS.Hit))
});

it('BoardCell partial state', () => {
    const {getByText} = render(
        <BoardCell label={'Hello'} state={STATUS.Partial} />,
    );
    const element = getByText(/Hello/i);
    const computedStyle = window.getComputedStyle(element);
    expect(computedStyle.color).toBe(hexToRgb(COLORS.White))
    expect(computedStyle.backgroundColor).toBe(hexToRgb(COLORS.Partial))
});

it('BoardCell change state', () => {
    const {getByText, rerender} = render(
        <BoardCell label={'Hello'} state={STATUS.Default} />,
    );
    let element = getByText(/Hello/i);
    let computedStyle = window.getComputedStyle(element);
    expect(computedStyle.color).toBe(hexToRgb(COLORS.Black))
    expect(computedStyle.backgroundColor).toBe(hexToRgb(COLORS.White))

    rerender(<BoardCell label={'Hello'} state={STATUS.Miss} />)

    element = getByText(/Hello/i);
    computedStyle = window.getComputedStyle(element);
    expect(computedStyle.color).toBe(hexToRgb(COLORS.White))
    expect(computedStyle.backgroundColor).toBe(hexToRgb(COLORS.Miss))
});
