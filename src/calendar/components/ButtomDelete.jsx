import { useCalendarStore } from "../../hooks/useCalendarStore";

export const ButtomDelete = () => {

  const { deleteEvent, hasEventSelected } = useCalendarStore();

  const handleDelete = () => {
    deleteEvent();
  };

  return (

    <button
      className="btn btn-danger circle-delete"
      onClick={handleDelete}
      style={{
        display: hasEventSelected ? "" : "none",
      }}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
