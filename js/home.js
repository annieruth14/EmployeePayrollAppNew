let empPayrollList;
window.addEventListener('DOMContentLoaded', () => {
    empPayrollList = getEmployeeDataFromStorage();
    createInnerHtml();
    document.querySelector(".emp-count").textContent = empPayrollList.length;
});

const getEmployeeDataFromStorage = () => {
    return localStorage.getItem('EmployeePayrollList') ? JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
}

const createInnerHtml = () => {
    if(empPayrollList.length == 0) return;
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>" +
                        "<th>Salary</th><th>Start Date</th><th>Actions</th>";
    let innerHtml = `${headerHtml}`;
    //empPayrollList = createEmployeePayrollJSON();
    for(const empPayrollData of empPayrollList) {
        innerHtml = `${innerHtml}    
        <tr>
            <td>
                <img class="profile" alt="" src="${empPayrollData._profilePic}">
            </td>
            <td>${empPayrollData._name}</td>
            <td>${empPayrollData._gender}</td>
            <td>${getDeptHtml(empPayrollData._department)}</td>
            <td>${empPayrollData._salary}</td>
            <td>${empPayrollData._startDate}</td>
            <td>
                <img name="${empPayrollData._id}" onclick="remove(this)" alt="delete"
                        src="../assets/icons/delete-black-18dp.svg">
                <img name="${empPayrollData._id}" alt="edit" onclick="update(this)"
                        src="../assets/icons/create-black-18dp.svg">
            </td>
        </tr>
      ` ;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}

const createEmployeePayrollJSON = () => {
    let empPayrollListLocal = [
        {
            _name:'Neha Clare',
            _gender:'female',
            _department:[
                'Engineering',
                'Sales'
            ],
            _salary:'500000',
            _startDate: '29 Oct 2019',
            _note: '',
            _id: new Date().getTime(),
            _profilePic: '../assets/profile-images/Ellipse -4.png'
        },
        {
            _name:'Annie',
            _gender:'female',
            _department:[
                'Finance'
            ],
            _salary:'400000',
            _startDate: '29 Aug 2017',
            _note: '',
            _id: new Date().getTime() + 1,
            _profilePic: '../assets/profile-images/Ellipse -4.png'
        },
        {
            _name:'Avi',
            _gender:'male',
            _department:[
                'Marketing',
                'Finance'
            ],
            _salary:'450000',
            _startDate: '1 July 2017',
            _note: '',
            _id: new Date().getTime() + 2,
            _profilePic: '../assets/profile-images/Ellipse -3.png'
        }
    ];
    return empPayrollListLocal;
}

const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for(const dept of deptList) {
        deptHtml = `${deptHtml} <div class="dept-label">${dept}</div>`  // first ${deptHtml} is for adding the number of divs we want to put
    }
    return deptHtml;
}