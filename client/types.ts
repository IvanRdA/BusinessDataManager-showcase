export type YearsData = {
    [year: number]: {
        [day: number]: {
          date: Date
          isLockedDay: boolean
          isFNR: boolean
          isSunday?: boolean
          isFreeDay?: boolean
          isConfirmedSchedule?: boolean
          scheduleTimes?: Array<Record<string, number>>
          isActiveHoliday: boolean
          isEnjoyedHoliday: boolean
          incidenceType?: string
          incidenceDescription?: string
          incidenceStartDate?: Date
          incidenceEndDate?: Date
          incidenceInhability?: boolean
          extraTimeAmount?: number
          isReturnedFNR?: boolean
          reportType?: string
          reportDescription?: string
          reportStartDate?: Date
          reportEndDate?: Date
          reportInhability?: boolean
          sanctionLevel?: number
        }
    };
  }[];

  export type ApiResponse = {
    error: string | null,
    message: string | null,
    data: any
  }

  export type EmployeeBaseForm = {
    _id?: string
    info: {
      firstName: string
      surName: string
      dni: string
      ssAffiliation: string
      dob: Date
      email: string
      password?: string
      phone: string
    },
    contractual: {
      startedAt: Date
      type: string
      hours: number
      duration: number
      finishAt: Date
      role: string
      category: string
      monthlyCost: number
      nextPossibleReturn: Date
      lastActivation: Date
    },
    business: {
      assignedTeam: string
      turnAssigned: string
      isActive: boolean
      registers?: {
        [year: number]: {
          [day: number]: {
            date: Date
            isLockedDay: boolean
            isFNR: boolean
            isSunday?: boolean
            isFreeDay?: boolean
            isConfirmedSchedule?: boolean
            scheduleTimes?: Array<Record<string, number>>
            isActiveHoliday: boolean
            isEnjoyedHoliday: boolean
            incidenceType?: string
            incidenceDescription?: string
            incidenceStartDate?: Date
            incidenceEndDate?: Date
            incidenceInhability?: boolean
            extraTimeAmount?: number
            isReturnedFNR?: boolean
            reportType?: string
            reportDescription?: string
            reportStartDate?: Date
            reportEndDate?: Date
            reportInhability?: boolean
            sanctionLevel?: number
          }
        }
      }
    },
  }
