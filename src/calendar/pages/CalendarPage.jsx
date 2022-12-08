import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";

import { Calendar } from "react-big-calendar";

import { ButtomDelete, ButtomMas, CalendarEvent, CalendarModal, Navbar } from "../components";

import { getMessagesES, localizer } from "../../helpers";
import { useAuthStore, useCalendarStore, useUiStore } from "../../hooks";




export const CalendarPage = () => {

  const { OpenModaldb } = useUiStore();
  const { user } = useAuthStore();
  const { events, SetActiveNote, startLoadingEvents } = useCalendarStore();

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const eventStyleGetter = (event, start, end, isSelected) => {
    const MyEvent = user.uid === event.user._id || user.uid === event.user.uid;

    const style = {
      backgroundColor: MyEvent ? "#347CF7" : "#465660",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };

    return {
      style,
    };
  };

  const ondDoubleClick = (event) => {
    OpenModaldb();
  };

  const onSelectEvent = (event) => {
    SetActiveNote(event);
  };

  const onViewChange = (event) => {
    localStorage.setItem("lastView", event);
    setLastView(event);
  };

  useEffect(() => {
    startLoadingEvents();
  }, []);

  return (
    <>
      <Navbar />

      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: `calc(100vh - 80px)` }}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={ondDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        messages={getMessagesES()}
      />

      <CalendarModal />

      <ButtomMas/>
  
      <ButtomDelete/>      
    </>
  );
};
