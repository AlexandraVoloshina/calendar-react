import moment from "moment";
import { Header } from "../Header";
import { Monitor } from "../Monitor";
import { CalendarGrid } from "../CalendarGrid";
import styled from 'styled-components';
import {useEffect, useState} from 'react';
import axios from 'axios';

const ShadowWrapper = styled('div')`
  border-top: 1px solid #cccccc;
  border-left: 1px solid #e3e3e3;
  border-right: 1px solid #e3e3e3;
  border-bottom: 2px solid #cccccc;
  border-radius: 8px;
  overflow: hidden;
`;

const FormPositionWrapper = styled('div')`
  position: absolute;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.35);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormWrapper = styled(ShadowWrapper)`
  width: 200px;
  background-color: #1e1f21;
  color: #dddddd;
  box-shadow: unset;
`;

const EventTitle = styled('input')`
  padding: 4px 14px;
  font-size: .85rem;
  width: 100%;
  border: unset;
  background-color: #eeeeee;
  color: #000000;
  outline: unset;
  border-bottom: 1px solid #464648;
`;

const EventBody = styled('input')`
  padding: 4px 14px;
  font-size: .85rem;
  width: 100%;
  border: unset;
  background-color: #eeeeee;
  color: #000000;
  outline: unset;
  border-bottom: 1px solid #464648;
`;

const ButtonsWrapper = styled('button')`
  padding: 8px 14px;
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

const defaultEvent = {
  counties: null,
  countryCode: "UA",
  date: "2023-01-01",
  fixed: true,
  global: true,
  launchYear: null,
  localName: "",
  name: ""
};

function App() {

  moment.updateLocale('en',{week: {dow: 1}});
  // const today = moment();
  const [today, setToday] = useState(moment());
  const startDay =today.clone().startOf('month').startOf('week');

  window.moment = moment;

  const prevHandler = () => setToday(prev => prev.clone().subtract(1, 'month'));
  const todayHandler = () =>setToday(moment());
  const nextHandler = () => setToday(prev => prev.clone().add(1, 'month'));

  const [method, setMethod] = useState(null);
  const [isShowForm, setShowForm] = useState(false);
  const [event, setEvent] = useState(null);

  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get(`https://date.nager.at/api/v3/PublicHolidays/2023/UA`)
    .then(res => {
      const weekends = res.data;
      setEvents(weekends);
      console.log(weekends);
    })
  }, []);

  const openFormHandler = (methodName, eventForUpdate) => {
    console.log('onDoubleClick', method);
    setEvent(eventForUpdate || defaultEvent);
    setShowForm(true);
    setMethod(methodName);
  }

  const cancelButtonHandler = () => {
    setShowForm(false);
  }

  const changeEventHandler = (text, field) => {
    setEvent(prevState => ({
      ...prevState,
      [field]: text
    }))
  }

  const eventFetchHandler = (e) => {
    if(method === 'Update'){
      setEvents(prevState => prevState.map(item => item.date === event.date ? event : item));
    } else {
      let eventObj = {
        date: moment(event._d).format('YYYY-MM-DD'),
        localName: event.localName,
        name: event.name
      };
      events.push(eventObj);
      setEvents(prevState => [...prevState, events]);
    }
    setShowForm(false);
  }

  return (
    <>
      {
       isShowForm ? (
          <FormPositionWrapper onClick={cancelButtonHandler}>
            <FormWrapper onClick={(e) => e.stopPropagation()}>
              <EventTitle
               value={event.localName}
               onChange={e => changeEventHandler(e.target.value, 'localName')}
               />
              <EventBody 
                value={event.name}
                onChange={e => changeEventHandler(e.target.value, 'name')}
              />
              <ButtonsWrapper>
                <button onClick={cancelButtonHandler}>Cancel</button>
                <button onClick={eventFetchHandler}>{method}</button>
              </ButtonsWrapper>
            </FormWrapper>
          </FormPositionWrapper>
       ) : null
      }
      <ShadowWrapper>
      <Header />
      <Monitor 
      today={today}
      prevHandler={prevHandler}
      todayHandler={todayHandler}
      nextHandler={nextHandler}
      />
      <CalendarGrid 
      startDay={startDay}
      today={today}
      weekends={events}
      openFormHandler={openFormHandler}
      />
    </ShadowWrapper>
    </>
  );
}

export default App;
