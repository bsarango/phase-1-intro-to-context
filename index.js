// Your code here
function createEmployeeRecord(employeeInfo){
    const employeeRecord = {
        firstName: employeeInfo[0],
        familyName: employeeInfo[1],
        title: employeeInfo[2],
        payPerHour: employeeInfo[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
    return employeeRecord;
}

function createEmployeeRecords(multipleEmployeesInfo){  //arrayOfEmployee info as an argument
    return multipleEmployeesInfo.map(createEmployeeRecord)  //With map, using a declare function, you don't need to indicate the var. Will automatically go through each iteration and apply
}

function createTimeInEvent(employeeRecord,dateStamp){
    const dateAndHourStamp = dateStamp.split(" ")
    const timeInObj = {
        type: "TimeIn",
        hour: parseInt(dateAndHourStamp[1],10),
        date: dateAndHourStamp[0],
    }
    employeeRecord.timeInEvents.push(timeInObj)
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp){
    const dateAndHourStamp = dateStamp.split(" ")
    const timeInObj = {
        type: "TimeOut",
        hour: parseInt(dateAndHourStamp[1],10),
        date: dateAndHourStamp[0],
    }
    employeeRecord.timeOutEvents.push(timeInObj)
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, dateWorked){   //adjust the time here, must get rid of minutes //NEEDS WORK
    const clockInTime = (employeeRecord.timeInEvents).find(clockInEvent => clockInEvent.date === dateWorked).hour   //Array of timeIn events - want to iterate over to match the date
    const clockOutTime = ((employeeRecord.timeOutEvents).find(clockOutEvent => clockOutEvent.date === dateWorked)).hour
    
    return (clockOutTime - clockInTime) / 100
}

function wagesEarnedOnDate(employeeRecord, date){
    const hours = hoursWorkedOnDate(employeeRecord,date)
    const owedPay = hours * employeeRecord.payPerHour
    return owedPay;
}

function allWagesFor(employeeRecord){           
    let allPayOwed = 0;
    for(let daysWorked = 0; daysWorked < (employeeRecord.timeInEvents).length; daysWorked++){
       const workedOnDate = employeeRecord.timeInEvents[daysWorked].date;
       
       allPayOwed += wagesEarnedOnDate(employeeRecord, workedOnDate)
    }
    return allPayOwed
}


function calculatePayroll(employeeRecords){
    let totalWages = 0;
    return employeeRecords.reduce((acc, currentValue)=>{
        return acc+=allWagesFor(currentValue)
    },0)
}





// let array = [2,5,1,9,6];
// let result = array.reduce(( accumulator, currentValue ) => {
//     console.log({accumulator,currentValue})
//     return accumulator + currentValue;
// }, 20)
// console.log( result ); // 43

