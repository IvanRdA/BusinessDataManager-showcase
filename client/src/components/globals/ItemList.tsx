import AllEmployeesTable from "../employees/AllEmployeesTable";
import AllHolidaysTable from "../employees/AllHolidaysTable";
import AllFNRTable from "../employees/AllFNRTable";
import AllExtraTimeTable from "../employees/allExtraTimeTable";
import EmptyItemList from "./EmptyItemList";
import AllSchedulesTable from "../schedules/AllSchedulesTable";

export default function ItemList(props: any) {
  const { items, model, finalStep } = props;

  if (model === "Employees") {
    if (finalStep === "List") {
      return <AllEmployeesTable employees={items} />;
    } else if (finalStep === "Holidays") {
      return <AllHolidaysTable employees={items} />;
    } else if (finalStep === "Fnr") {
      return <AllFNRTable employees={items} />;
    } else if (finalStep === "ExtraTime") {
      return <AllExtraTimeTable employees={items} />;
    } else if (finalStep === "Schedules") {
      return <AllSchedulesTable employees={items} />;
    }
  } else {
    return <EmptyItemList item="elementos" />;
  }
}
