import EmployeeForm from "../employees/EmployeeForm";

export default function CreateNewItem(props: any) {
  const { model } = props;

  if (model === "Employee") {
    return <EmployeeForm />;
  }
}
