import { addHours } from "date-fns";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { useUiStore } from "../../hooks/useUiStore";

export const ButtomMas = () => {

  const { OpenModaldb } = useUiStore();
  const { SetActiveNote } = useCalendarStore();

  const onOpenModalClick = () => {
    SetActiveNote({
      title: "",
      notes: "",
      start: new Date(),
      end: addHours(new Date(), 1),
      user: {
        _id: 123,
        name: "Lucas",
      },
    });
    OpenModaldb();
  };

  return (
    <button className="btn btn-primary  circle-create" onClick={onOpenModalClick}>
      <i className="fas fa-plus"></i>
    </button>
  );
};
