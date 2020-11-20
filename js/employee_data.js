class EmployeePayrollData {

    get name() {
        return this._name;
    }
    set name(name) {
        let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
        if(nameRegex.test(name))
            this._name = name;
        else throw ("Name is Incorrect");
    }

    get profilePic() {
        return this._profilePic;
    }
    set profilePic(profilePic) {
        this._profilePic = profilePic;
    }

    get gender() {
        return this._gender;
    }
    set gender(gender) {
        this._gender = gender;
    }

    get department() {
        return this._department;
    }
    set department(department) {
        this._department = department;
    }

    get salary() {
        return this._salary;
    }
    set salary(salary) {
        this._salary = salary;
    }

    get note() {
        return this._note;
    }
    set note(note) {
        this._note = note;
    }

    get startDate() {
        return this._startDate;
    }
    set startDate(startDate) {
        if(startDate < Date.now())
            this._startDate = startDate;
        else throw ("Date is invalid");
    }

    toString() {
        const options = { year: 'numeric', month: 'long', day: 'numeric'};
        const empDate = this.startDate === undefined ? "date not defined" : this.startDate.toLocaleDateString("en-US", options);
        return ("Name= " + this.name + "\nSalary= "+ this.salary + "\nGender= "+ this.gender + "\nDate= " + empDate +"\nProfile pic= "+ this.profilePic  + "\nDepartment= "+ this.department + "\nNote= "+ this.note); 
    }
}