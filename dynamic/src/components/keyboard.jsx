import styled from "styled-components";
import {KeyboardButton} from "./keyboard-button";

const ButtonsRow = styled.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginBottom: '4px',
});
export const Keyboard = (
    {
        buttons,
        onClick,
    }
) => {
    return <>
        {
            buttons.map((row, rowIndex) => {
                return <ButtonsRow data-testid={'buttons-row'} key={rowIndex}>
                    {
                        row.map((button, buttonIndex) => {
                            return <KeyboardButton
                                key={`${rowIndex}_${buttonIndex}`}
                                label={button.label}
                                onClick={() => onClick(button.keyCodes[0])}
                                state={button.state}
                            />
                        })
                    }
                </ButtonsRow>
            })
        }
    </>
}