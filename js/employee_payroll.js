let isUpdate = false;
let employeePayrollObj = {};

window.addEventListener('DOMContentLoaded', () => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function() {
        if(name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new EmployeePayrollData()).name = name.value;
            textError.textContent = "";
        }
        catch (e) {
            textError.textContent = e;
        }
    });

    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function() {
        output.textContent = salary.value;
    }); 

    const date = document.querySelector('#date');
    const dateError = document.querySelector('.date-error');
    date.addEventListener('input', function() {
        const day = document.getElementById("day").value;
        const month = document.getElementById("month").value;
        let dateFormat = day+" "+month+" "+year.value;
        const date = new Date(dateFormat);
        try {
            (new EmployeePayrollData()).startDate = date;
            dateError.textContent = "";
        }
        catch (e) {
            dateError.textContent = e;
        }
    });

    checkForUpdate();
});

const save = (event) => {
    event.preventDefault();     // reset the form
    event.stopPropagation();
    try {
        setEmployeePayrollObject();
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page);
    }
    catch (e) {
        return;
    }
}

// creates payroll object
const setEmployeePayrollObject = () => {
    //employeePayrollObj._id = setId();
    employeePayrollObj._name = getInputValueById('#name');
    employeePayrollObj._profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollObj._gender = getSelectedValues('[name=gender]').pop();
    employeePayrollObj._department = getSelectedValues('[name=department]');
    employeePayrollObj._salary = getInputValueById('#salary');
    employeePayrollObj._note = getInputValueById('#notes');
    let date = getInputValueById('#day')+ " "+ getInputValueById('#month') + " " + getInputValueById('#year');
    employeePayrollObj._startDate = date;
}

// create object 
const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayrollData();
    try {
        employeePayrollData.name = getInputValueById('#name')
    }
    catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.department = getSelectedValues('[name=department]');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.note = getInputValueById('#notes');
    let date = getInputValueById('#day')+ " "+getInputValueById('#month')+" "+getInputValueById('#year');
    employeePayrollData.startDate = new Date(date);
    alert("You have entered: \n" + employeePayrollData.toString());
    return employeePayrollData;
}

const createEmployeePayrollData = (id) => {
    let employeePayrollData = new EmployeePayrollData();
    if(!id)
        employeePayrollData.id = createNewEmployeeId();
    else
        employeePayrollData.id = id;
    setEmployeePayrollData(employeePayrollData);
    return employeePayrollData;
}

const setEmployeePayrollData = (employeePayrollData) => {
    try {
        employeePayrollData.name = employeePayrollObj._name;
    }
    catch(e) {
        setTextValue('.text-error', e);
        throw e;
    }
    employeePayrollData.profilePic= employeePayrollObj._profilePic;
    employeePayrollData.gender = employeePayrollObj._gender;
    employeePayrollData.department = employeePayrollObj._department;
    employeePayrollData.salary = employeePayrollObj._salary;
    employeePayrollData.note = employeePayrollObj._note;
    try {
        employeePayrollData.startDate = new Date(Date.parse(employeePayrollObj._startDate));
    }
    catch(e) {
        setValue('.date-error', e);
        throw e;
    }
    alert(employeePayrollData.toString());
}

const createNewEmployeeId = () => {
    let empId = localStorage.getItem("EmployeeId");
    empId = !empId ? 1 : (parseInt(empId)+1).toString();
    localStorage.setItem("EmployeeId",empId);
    alert("eMp     idd  " + empId);
    return empId
}

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
        if(item.checked)
            selItems.push(item.value);
    });
    return selItems;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const createAndUpdateStorage = () => {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList != undefined) {
        let empPayrollData = employeePayrollList        // to update
                            .find(empData => empData._id == employeePayrollObj._id);
        if(empPayrollData == undefined) {
            employeePayrollList.push(createEmployeePayrollData());  // id created
        }
        else {
            const index = employeePayrollList
                            .map(empData => empData._id)
                            .indexOf(empPayrollData._id);
            employeePayrollList.splice(index, 1, createEmployeePayrollData(empPayrollData._id));
        }
    }
    else 
        employeePayrollList = [createEmployeePayrollData()];
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

const resetForm = () => {
    setValue('#name','');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#notes','');
    setTextValue('#salary','');
    setSelectedIndex('#day',0);
    setSelectedIndex('#month',0);
    setSelectedIndex('#year',0);
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}

const setTextValue = (id, value) => {
    const salary = document.querySelector(id);
    salary.value = value;
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}

const setSelectedIndex = (id, index) => {
    const element = document.querySelector(id);
    element.selectedIndex = index;
}

const checkForUpdate = () => {
    const employeePayrollJson = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJson ? true : false;
    if(!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollJson);
    setForm();
}

const setForm = () => {
    setValue('#name', employeePayrollObj._name);
    setSelectedValues('[name=profile]', employeePayrollObj._profilePic);
    setSelectedValues('[name=gender]', employeePayrollObj._gender);
    setSelectedValues('[name=department]', employeePayrollObj._department);
    setTextValue('#salary', employeePayrollObj._salary);
    setValue('#notes', employeePayrollObj._note);
    let date = stringifyDate(employeePayrollObj._startDate).split(" ");
    let day = (date[1].split(","));
    alert(day[0]);
    alert(date[0]);
    alert(date[2]);
    setValue('#day', day[0]);
    setValue('#month', date[0]);
    setValue('#year', date[2]);
}

const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue); 
    allItems.forEach(item => {
        if(Array.isArray(value)) {      // checking the value matches with each element of department array
            if(value.includes(item.value)) {
                item.checked = true;
            }
        }
        else if (item.value === value)
            item.checked = true;
    });
}

const stringifyDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric'};
    const newDate = date === undefined ? "date not defined" : 
                    new Date(Date.parse(date)).toLocaleDateString("en-US", options);
    alert(newDate);
    return newDate;
}