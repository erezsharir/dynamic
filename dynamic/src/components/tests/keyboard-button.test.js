/**
 * @jest-environment jsdom
 */

import {cleanup, fireEvent, render} from '@testing-library/react';
import {KeyboardButton} from "../keyboard-button";
import {COLORS, hexToRgb, STATUS} from "../../utils";


afterEach(cleanup);
it('KeyboardButton default state', () => {
    const {getByText} = render(
        <KeyboardButton onClick={() => {}} label={'Hello'} state={STATUS.Default} />,
    );
    const element = getByText(/Hello/i);
    const computedStyle = window.getComputedStyle(element);
    expect(computedStyle.color).toBe(hexToRgb(COLORS.Black))
    expect(computedStyle.backgroundColor).toBe(hexToRgb(COLORS.Default))
});

it('KeyboardButton miss state', () => {
    const {getByText} = render(
        <KeyboardButton onClick={() => {}} label={'Hello'} state={STATUS.Miss} />,
    );
    const element = getByText(/Hello/i);
    const computedStyle = window.getComputedStyle(element);
    expect(computedStyle.color).toBe(hexToRgb(COLORS.White))
    expect(computedStyle.backgroundColor).toBe(hexToRgb(COLORS.Miss))
});

it('KeyboardButton hit state', () => {
    const {getByText} = render(
        <KeyboardButton onClick={() => {}} label={'Hello'} state={STATUS.Hit} />,
    );
    const element = getByText(/Hello/i);
    const computedStyle = window.getComputedStyle(element);
    expect(computedStyle.color).toBe(hexToRgb(COLORS.White))
    expect(computedStyle.backgroundColor).toBe(hexToRgb(COLORS.Hit))
});

it('KeyboardButton partial state', () => {
    const {getByText} = render(
        <KeyboardButton onClick={() => {}} label={'Hello'} state={STATUS.Partial} />,
    );
    const element = getByText(/Hello/i);
    const computedStyle = window.getComputedStyle(element);
    expect(computedStyle.color).toBe(hexToRgb(COLORS.White))
    expect(computedStyle.backgroundColor).toBe(hexToRgb(COLORS.Partial))
});

it('KeyboardButton click', () => {
    const mockCallBack = jest.fn();
    const {getByText} = render(
        <KeyboardButton onClick={mockCallBack} label={'Hello'} state={STATUS.Partial} />,
    );
    const element = getByText(/Hello/i);
    fireEvent.click(element)
    const computedStyle = window.getComputedStyle(element);
    expect(computedStyle.color).toBe(hexToRgb(COLORS.White))
    expect(computedStyle.backgroundColor).toBe(hexToRgb(COLORS.Partial));
    expect(mockCallBack).toHaveBeenCalledTimes(1)
});

it('KeyboardButton change state', () => {
    const {getByText, rerender} = render(
        <KeyboardButton onClick={() => {}} label={'Hello'} state={STATUS.Default} />,
    );
    let element = getByText(/Hello/i);
    let computedStyle = window.getComputedStyle(element);
    expect(computedStyle.color).toBe(hexToRgb(COLORS.Black))
    expect(computedStyle.backgroundColor).toBe(hexToRgb(COLORS.Default))

    rerender(<KeyboardButton onClick={() => {}} label={'Hello'} state={STATUS.Miss} />)

    element = getByText(/Hello/i);
    computedStyle = window.getComputedStyle(element);
    expect(computedStyle.color).toBe(hexToRgb(COLORS.White))
    expect(computedStyle.backgroundColor).toBe(hexToRgb(COLORS.Miss))
});
