import React from 'react';
import styled from 'styled-components';

const DivWrapper = styled('div')`
    display: flex;
    justify-content: space-between;
    background-color: #e3e3e3;
    color: #000000;
    padding: 10px;
`;

const ButtonsWrapper = styled('div')`
    display: flex;
    align-items: center;
`;

const TextWrapper = styled('span')`
    font-size: 32px;
`;

const TitleWrapper = styled('TitleWrapper')`
    font-weight: bold;
    margin-right: 8px;
    font-size: 32px; 
`;

const ButtonWrapper = styled('button')`
    border: unset;
    background-color: #565758;
    height: 20px;
    margin-right: 2px;
    border-radius: 4px;
    color: #e6e6e6;
    outline: unset;
    cursor: pointer;
`;

const Monitor = ({today, prevHandler, todayHandler, nextHandler}) => {

    return(
        <DivWrapper>
            <div>
                <TitleWrapper>{today.format('MMMM')}</TitleWrapper>
                <TextWrapper>{today.format('YYYY')}</TextWrapper>
            </div>
            <ButtonsWrapper>
                <ButtonWrapper onClick={prevHandler}> &lt; </ButtonWrapper>
                <ButtonWrapper onClick={todayHandler}>today</ButtonWrapper>
                <ButtonWrapper onClick={nextHandler}> &gt; </ButtonWrapper>
            </ButtonsWrapper>
        </DivWrapper>
    )
}

export {Monitor};