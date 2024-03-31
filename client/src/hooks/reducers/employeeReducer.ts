export default function reducer(state: any, action: any) {
    switch (action.type) {
      case 'CHANGE_NAME': {
        return {
          ...state,
          info:{
            ...state.info,
            firstName: action.value
          }
        }
      }
      case 'CHANGE_SURNAME': {
        return {
          ...state,
          info:{
            ...state.info,
            surName: action.value
          }
        }
      }
      case 'CHANGE_DNI': {
        return {
          ...state,
          info:{
            ...state.info,
            dni: action.value
          }
        }
      }
      case 'CHANGE_SS': {
        return {
          ...state,
          info:{
            ...state.info,
            ssAffiliation: action.value
          }
        }
      }
      case 'CHANGE_DOB': {
        return {
          ...state,
          info:{
            ...state.info,
            dob: action.value
          }
        }
      }
      case 'CHANGE_EMAIL': {
        return {
          ...state,
          info:{
            ...state.info,
            email: action.value
          }
        }
      }
      case 'CHANGE_PASSWORD': {
        return {
          ...state,
          info:{
            ...state.info,
            password: action.value
          }
        }
      }
      case 'CHANGE_PHONE': {
        return {
          ...state,
          info:{
            ...state.info,
            phone: action.value
          }
        }
      }
      case 'CHANGE_STARTEDAT': {
        return {
          ...state,
          contractual:{
            ...state.contractual,
            startedAt: parseInt(action.value)
          }
        }
      }
      case 'CHANGE_TYPE': {
        return {
          ...state,
          contractual:{
            ...state.contractual,
            type: action.value
          }
        }
      }
      case 'CHANGE_HOURS': {
        return {
          ...state,
          contractual:{
            ...state.contractual,
            hours: parseInt(action.value)
          }
        }
      }
      case 'CHANGE_EMPLOYEES': {
        return {
          ...state,
          contractual:{
            ...state.contractual,
            type: action.value
          }
        }
      }
      case 'CHANGE_DURATION': {
        return {
          ...state,
          contractual:{
            ...state.contractual,
            duration: parseInt(action.value)
          }
        }
      }
      case 'CHANGE_FINISHAT': {
        return {
          ...state,
          contractual:{
            ...state.contractual,
            finishAt: parseInt(action.value)
          }
        }
      }
      case 'CHANGE_STARTEDAT': {
        return {
          ...state,
          contractual:{
            ...state.contractual,
            startedAt: parseInt(action.value)
          }
        }
      }
      case 'CHANGE_ROLE': {
        return {
          ...state,
          contractual:{
            ...state.contractual,
            role: action.value
          }
        }
      }
      case 'CHANGE_CATEGORY': {
        return {
          ...state,
          contractual:{
            ...state.contractual,
            category: action.value
          }
        }
      }
      case 'CHANGE_MONTHLYCOST': {
        return {
          ...state,
          contractual:{
            ...state.contractual,
            monthlyCost: parseInt(action.value)
          }
        }
      }
      case 'CHANGE_POSSIBLERETURN': {
        return {
          ...state,
          contractual:{
            ...state.contractual,
            nextPossibleReturn: parseInt(action.value)
          }
        }
      }
      case 'CHANGE_ASSIGNEDTEAM': {
        return {
          ...state,
          business:{
            ...state.business,
            assignedTeam: action.value
          }
        }
      }
      case 'CHANGE_ASSIGNEDTURN': {
        return {
          ...state,
          business:{
            ...state.business,
            turnAssigned: action.value
          }
        }
      }
      case 'CHANGE_ISACTIVE': {
        return {
          ...state,
          business:{
            ...state.business,
            isActive: action.value
          }
        }
      }
      case 'RESET':
        {
          return {
            info: {
              firstName: "",
              surName: "",
              dni: "",
              ssAffiliation: "",
              dob: "",
              email: "",
              password: "",
              phone: "",
            },
            contractual: {
              startedAt: "",
              type: "",
              hours: 40,
              duration: 9,
              finishAt: "",
              role: "",
              category: "",
              monthlyCost: 0,
              nextPossibleReturn: "",
            },
            business: {
              assignedTeam: "",
              turnAssigned: "",
              isActive: true,
              incidences: [],
              enjoyedHolidays: [],
              accumulatedHolidays: [],
              extraTime: [],
              fnr: [],
            },
          }
        }
  
        return state
    }
  }