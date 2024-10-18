import styled from "styled-components";
import {COLORS, STATUS} from "../utils";
import {useMemo} from "react";

const Cell = styled.div({
    height: '36px',
    width: '52px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: COLORS.Black,
    borderRadius: '4px',
});

export const BoardCell = (
    {
        label,
        state
    }
) => {
    const backgroundColor = useMemo(() => {
        if (state === STATUS.Miss) {
            return COLORS.Miss
        } else if (state === STATUS.Hit) {
            return COLORS.Hit
        } else if (state === STATUS.Partial) {
            return COLORS.Partial
        } else {
            return COLORS.White
        }
    }, [state])

    const borderColor = useMemo(() => {
        if (state === STATUS.Miss) {
            return COLORS.Miss
        } else if (state === STATUS.Hit) {
            return COLORS.Hit
        } else if (state === STATUS.Partial) {
            return COLORS.Partial
        } else {
            return COLORS.Miss
        }
    }, [state])

    const textColor = useMemo(() => {
        if (state === STATUS.Default) {
            return COLORS.Black
        }
        return COLORS.White
    }, [state])

    return <Cell
        data-testid={'board-cell'}
        style={{
            color: textColor,
            border: `2px solid ${borderColor}`,
            backgroundColor: backgroundColor,
        }}
    >
        {label}
    </Cell>
}