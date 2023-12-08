import React from 'react';
import styled from 'styled-components';
import moment from "moment";

const GridWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    // grid-template-rows: repeat(6, 1fr);
    grid-gap: 1px;
    // background-color: #fcfcfc;
    background-color: ${props => props.isHeader ? '#e3e3e3' : '#fcfcfc'};
    ${props => props.isHeader && 'border-bottom: 1px solid #ffffff'}
`;

const CellWrapper = styled.div`
    min-width: 140px;
    min-height: ${props => props.isHeader ? 24 : 80}px;
    background-color: ${props => props.isWeekend ? '#eeeeee' : '#e3e3e3'};
    color: ${props => props.isSelectedMonth ? '#000000' : '#999999'};
`;

const RowInCell = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: ${props => props.justifyContent ? props.justifyContent : 'flex-start'};
    ${props => props.pr && `padding-right: ${props.pr * 8}px`};
`;

const DayWrapper = styled.div`
    height: 33px;
    width: 33px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const CurrentDay = styled.div`
    height: 100%;
    width: 100%;
    background: #f00;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ShowDayWrapper = styled.div`
    display: flex;
    // flex-direction: flex-end;
    justify-content: flex-end;
`;

const EventListWrapper = styled.ul`
    margin: unset;
    list-style-position: inside;
    padding-left: 4px;
`;

const EventItemWrapper = styled.button`
    position: relative;
    left: -14px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 114px;
    border: unset;
    background: unset;
    color: #000000;
    cursor: pointer;
    margin: 0;
    padding: 0;
    text-align: left;
`;

const CalendarGrid = ({startDay, today, weekends, openFormHandler}) => {
    const totalDays = 42;
    const day = startDay.clone().subtract(1, 'day');
    const daysArray = [...Array(totalDays)].map(() => day.add(1, 'day').clone());
    const isCurrentDay = (day) => moment().isSame(day, 'day');
    const isCurrentMonth = (day) => today.isSame(day, 'month');
    const isCurrentWeekends = weekends.filter((el) => today.format("MM") === moment(el.date).format('MM'));

    return(
        <>
            <GridWrapper isHeader>
                {[...Array(7)].map((_, i) => (
                    <CellWrapper isHeader isSelectedMonth key={i}>
                        <RowInCell
                                justifyContent={'flex-end'} 
                                pr={1}
                        >
                            {moment().day(i+1).format('ddd')}
                        </RowInCell>
                    </CellWrapper>
                ))}
            </GridWrapper>
            <GridWrapper>
                
                {
                    daysArray.map((dayItem) => (
                        <CellWrapper
                            key={dayItem.unix()}
                            isWeekend={dayItem.day() === 6 || dayItem.day() === 0}
                            isSelectedMonth={isCurrentMonth(dayItem)}
                        >
                            <RowInCell
                                justifyContent={'flex-end'}
                            >
                                <ShowDayWrapper>
                                    <DayWrapper onDoubleClick={() => openFormHandler('Create', dayItem)}>
                                        {
                                            isCurrentDay(dayItem) ? (
                                                <CurrentDay>{dayItem.format('D')}</CurrentDay>
                                            ) : (
                                                dayItem.format('D')
                                            )
                                        }
                                    </DayWrapper>
                                </ShowDayWrapper>
                                <EventListWrapper>
                                    {
                                        isCurrentWeekends
                                            .filter((el, i) => moment(el.date).format('D') === dayItem.format('D') 
                                                && moment(el.date).format('MM') === dayItem.format('MM'))
                                            .map((el, i) => (
                                                <li key={i}>
                                                    <EventItemWrapper onDoubleClick={() => openFormHandler('Update', el)}>
                                                        {el.localName}
                                                    </EventItemWrapper>
                                                </li>
                                            ))
                                    }
                                </EventListWrapper>
                            </RowInCell>
                        </CellWrapper>
                    )
                    )
                }
            </GridWrapper>
        </>
        
    )
}

export {CalendarGrid};