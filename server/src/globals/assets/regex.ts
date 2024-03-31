// This RegEx dictionary is used on field validation that is received from the client side.
export const REGEX = {
    basicString: /^[a-zA-ZÀ-ÿ' ]+$/,
    firstNameString: /^[a-zA-ZÀ-ÿ' ]+$/,
    symbolsString: /^[-_!?0-9a-zA-ZÀ-ÿ' ]+$/,
    rawPassword: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*/])(?=.{6,20}).*$/,
    fullNameString: /^[a-zA-ZÀ-ÿ']+(\s[a-zA-ZÀ-ÿ']+)*$/,
    hashedPassword: /^\$2[ayb]\$\d+\$[./A-Za-z0-9]{53}$/,
    emailString: /^[a-zA-Z0-9À-ÿ'._-]+@[a-zA-Z0-9À-ÿ'.-]+\.[a-zA-Z]{2,4}$/,
    phoneString: /^\d{9}$/,
    contractType: /^(Fijo discontínuo|Indefinido|Prácticas|Extras)$/,
    roleString: /^(Camarero|Cocinero|Maitre|Jefe de departamento|Limpieza|Backoffice|Director)$/,
    dniString: /^[0-9]{8}[a-zA-Z]{1}$/,
    ssString: /^[0-9]{12}$/,
    assignedEmployeeTeam: /^(Sala|Cocina|Jefe de departamento|Limpieza|Backoffice|Dirección|Otro)$/,
    assignedEmployeeTurn: /^(Mañanas|Tardes|Partido|Comodín)$/,
    paragraph: /^[\s\S]*$/,
    dayOfYearString: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
}