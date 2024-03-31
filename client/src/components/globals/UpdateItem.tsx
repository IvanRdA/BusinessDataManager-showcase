import ServerError from "./ServerError";
import EmptyItemList from "./EmptyItemList";
import EmployeeForm from "../employees/EmployeeForm";

export default async function UpdateItem(props: any) {
  const { model, param } = props;

  if (param.error) {
    return <ServerError />;
  }

  if (model === "Employee") {
    const { data } = param;

    if (data === null) {
      return <EmptyItemList item="empleado" />;
    } else {
      return <EmployeeForm employee={data} />;
    }
  }
}
