import React, {useMemo} from 'react';
import styled from "styled-components";
import {COLORS, STATUS} from "../utils";

const Button = styled.button({
    minWidth: '40px',
    height: '50px',
    fontWeight: 700,
    fontSize: '1.25rem',
    lineHeight: '1.75rem',
    borderRadius: '4px',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
});

export const KeyboardButton = (
    {
        label,
        onClick,
        state,
    }) => {

    const backgroundColor = useMemo(() => {
        if (state === STATUS.Miss) {
            return COLORS.Miss
        } else if (state === STATUS.Hit) {
            return COLORS.Hit
        } else if (state === STATUS.Partial) {
            return COLORS.Partial
        } else {
            return COLORS.Default
        }
    }, [state])

    const textColor = useMemo(() => {
        if (state === STATUS.Default) {
            return COLORS.Black
        }
        return COLORS.White
    }, [state])

    return <Button
        onClick={onClick}
        style={{
            color: textColor,
            backgroundColor: backgroundColor,
        }}
        data-testid={'button'}
    >
        {label}
    </Button>
};