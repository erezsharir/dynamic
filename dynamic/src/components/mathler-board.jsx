import styled from "styled-components";
import {useMemo} from "react";
import {COLORS, STATUS} from "../utils";
import {BoardCell} from "./board-cell";

const Board = styled.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginBottom: '4px',
});

const Row = styled.div({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginBottom: '4px',
});

export const MathlerBoard = (
    {
        size, // Number of characters per answer
        answers,
        current,
    }
) => {
    const rows = useMemo(() => {
        const data = [];
        let answerRow = 0;
        // Only 6 answers are allowed
        for(let currentRow = 0; currentRow < 6; currentRow++) {
            // Setting submitted answers.
            if (currentRow < answers.length) {
                data.push([...answers[currentRow].map((digit) => {
                    return {
                        label: digit.label,
                        state: digit.state,
                    }
                })])
                answerRow++;
            } else if (currentRow === answers.length && !!current) {
                const currentAnswerArray = current.split('');
                // Setting current answer if not empty
                data.push([...currentAnswerArray.map((digit) => {
                    return {
                        label: digit,
                        state: STATUS.Default,
                    }
                })])
                // Setting the rest of the cells in the answer row
                for (let currentDigit = current.length; currentDigit < size; currentDigit++) {
                  data[currentRow].push({
                      label: '',
                      state: STATUS.Default,
                  })
                }
            } else {
                data.push([...Array(size)].map((digit) => {
                    // Setting empty rows.
                    return {
                        label: '',
                        state: STATUS.Default,
                    }
                }))
            }
        }
        return data;
    }, [size, current, answers])

    return <Board>
        {
            rows.map((row, rowIndex) => {
                return <Row key={rowIndex}
                            data-testid={'board-row'}
                >
                    {
                        row.map((cell, cellIndex) => {
                            return <BoardCell label={cell.label} state={cell.state} key={`${rowIndex}_${cellIndex}`}/>
                        })
                    }

                </Row>
            })
        }
    </Board>
}