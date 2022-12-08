import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { calendarAPI } from "../api";
import { convertDateEvents } from "../helpers";
import {
  onAddnewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveNote,
  onUpdateEvent,
} from "../store/calendar/calnedarSlice";

export const useCalendarStore = () => {

  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const SetActiveNote = (calendarEvent) => {
    dispatch(onSetActiveNote(calendarEvent));
  };

  const startCreatingSaving = async (calendarEvent) => {

    console.log(calendarEvent)

    try {

      if (calendarEvent.id ) {

        //if (activeEvent.user._id === user.uid) {
        await calendarAPI.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;   
      }

      const { data } = await calendarAPI.post("/events", calendarEvent);
      dispatch(onAddnewEvent({ ...calendarEvent, id: data.evento.id, user }));

    } catch (error) {

      console.log(error);
      Swal.fire("", error.response.data.msg, "error");
    }
  };

  const startDeleteEvent = async () => {
    try {

      //if (activeEvent.user._id === user.uid) 
        await calendarAPI.delete(`/events/${activeEvent.id}`);
        dispatch(onDeleteEvent());
        return;

    } catch (error) {
      Swal.fire("Error al eliminar", error.response.data.msg, "error");
    }
  };

  const startLoadingEvents = async () => {

    try {
      const { data } = await calendarAPI.get("/events");
      const events = convertDateEvents(data.eventos);
      dispatch(onLoadEvents(events));

    } catch (error) {
      console.log(error);
    }
  };

  return {
    //Propiedades
    hasEventSelected: !!activeEvent,
    events,
    activeEvent,

    //Metodos
    SetActiveNote,
    startCreatingSaving,
    deleteEvent: startDeleteEvent,
    startLoadingEvents,
  };
};
