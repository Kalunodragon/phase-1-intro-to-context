// Your code here
function createEmployeeRecord(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrayOfRecords){
    return arrayOfRecords.map(record => createEmployeeRecord(record))
}

function createTimeInEvent(employee, dateStamp){
    let date = dateStamp.split(' ')[0]
    let hour = dateStamp.split(' ')[1]
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}
function createTimeOutEvent(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}
function hoursWorkedOnDate(employee, dateGiven){
    let timeIn = employee.timeInEvents.find((element)=>{
        if(element.date === dateGiven){
            return element.date
        }
    })
    let timeOut = employee.timeOutEvents.find((e)=>{
        if(e.date === dateGiven){
            return e.date
        }
    })
    return (timeOut.hour - timeIn.hour)/100
}
function wagesEarnedOnDate(employee, date){
    let ammountOfHours = hoursWorkedOnDate(employee, date)
    return employee.payPerHour * ammountOfHours
}
function allWagesFor(employee){
    let payPeriod = employee.timeInEvents.map((e)=> e.date)
    return payPeriod.reduce((previous, date)=> previous + wagesEarnedOnDate(employee, date),0)
}
function calculatePayroll(records){
    return records.reduce((previous, employee)=> previous + allWagesFor(employee),0)
}