import { format, isToday, isYesterday, differenceInDays, addYears } from 'date-fns'

// const getSpanishDay = function(day: string) {
//     switch(day) {
//         case 'Monday': return 'Lunes'
//         case 'Tuesday': return 'Martes'
//         case 'Wednesday': return 'Miercoles'
//         case 'Thursday': return 'Jueves'
//         case 'Friday': return 'Viernes'
//         case 'Saturday': return 'Sábado'
//         case 'Sunday': return 'Domingo'
//     }

//     return ''
// }

export const getDays = function () {
    return [
        { value: '1', label: 'Lunes' },
        { value: '2', label: 'Martes' },
        { value: '3', label: 'Miércoles' },
        { value: '4', label: 'Jueves' },
        { value: '5', label: 'Viernes' },
        { value: '6', label: 'Sábado' },
        { value: '0', label: 'Domingo' },
    ]
}

export const getMonths = function (lang: 'es' | 'en' = 'en') {
    return [
        { value: 1,  name: lang === 'en' ? 'January'   : 'Enero'      },
        { value: 2,  name: lang === 'en' ? 'February'  : 'Febrero'    },
        { value: 3,  name: lang === 'en' ? 'March'     : 'Marzo'      },
        { value: 4,  name: lang === 'en' ? 'April'     : 'Abril'      },
        { value: 5,  name: lang === 'en' ? 'May'       : 'Mayo'       },
        { value: 6,  name: lang === 'en' ? 'June'      : 'Junio'      },
        { value: 7,  name: lang === 'en' ? 'July'      : 'Julio'      },
        { value: 8,  name: lang === 'en' ? 'August'    : 'Agosto'     },
        { value: 9,  name: lang === 'en' ? 'September' : 'Septiembre' },
        { value: 10, name: lang === 'en' ? 'October'   : 'Octubre'    },
        { value: 11, name: lang === 'en' ? 'November'  : 'Noviembre'  },
        { value: 12, name: lang === 'en' ? 'December'  : 'Diciembre'  },
    ]
}

export const getFormattedDate = function (date: Date) {
    let dd = date.getDate().toString()
    let mm = (date.getMonth() + 1).toString()

    if (parseInt(dd) < 10) {
        dd = '0' + dd
    }
    if (parseInt(mm) < 10) {
        mm = '0' + mm
    }

    return `${dd}/${mm}/${date.getFullYear()}`
}

export const getFormattedHour = function (date: Date) {
    let hours = date.getHours().toString()
    let minutes = date.getMinutes().toString()
    let seconds = date.getSeconds().toString()

    if (parseInt(hours) < 10) {
        hours = '0' + hours
    }
    if (parseInt(minutes) < 10) {
        minutes = '0' + minutes
    }
    if (parseInt(seconds) < 10) {
        seconds = '0' + seconds
    }

    return `${hours}:${minutes}`
}

export const isEqualDate = function(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear()
}

export const isMoreThanAWeek = function(date1: Date, date2: Date): boolean {
    return Math.abs(differenceInDays(date1, date2)) > 6
}

export const getHourAndDateMessage = function(date: string) {
    const lastMessageDate = new Date(date)

    let dateText = ` - ${format(lastMessageDate, 'dd/MM/yyyy')}`

    if (isToday(lastMessageDate)) {
        dateText = ''
    }

    if (isYesterday(lastMessageDate)) {
        dateText = '- Ayer'
    }

    const hourAndDateText = `${format(lastMessageDate, 'HH:mm')}${dateText}`

    return hourAndDateText
}

export const getRegisterMinDate = function() {
    const minDate = addYears(new Date(), -18)
    return {
        date: minDate,
        formatedDate: format(minDate, 'dd/MM/yyyy')
    }
}