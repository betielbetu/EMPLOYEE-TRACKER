const { mainPrompt, selectFromList, getName, getSalary } = require('./utils/prompts');
const db = require('./db');
require('console.table');
const logo = require('asciiart-logo');
const appLogo = logo({name: "Employee Manager"}).render()



function viewAllDepartments() {
    db.readAllDepartments()
    .then(res => {
        console.log('\n');
        console.table(res);
    })
    .then(() => askUser())
    .catch(err => console.log(err));
}

function viewUtilizedBudgetByDpt() {
    db.readAllDepartments()
    .then(res => {
        const departments = res.map(row => ({value: row.id, name: row.department}));
        selectFromList('department', departments)
        .then(userPick => {
            db.readUtilizedBudget(userPick.id)
            .then(res => {
                console.log('\n');
                console.table(res);
            })
            .then(() => askUser())
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}

function addDepartment() {
    getName("department's name")
    .then(userInput => {
        db.createDepartment(userInput.newName)
        .then(() => askUser())
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}

function removeDepartment() {
    db.readAllDepartments()
    .then(res => {
        const departments = res.map(row => ({value: row.id, name: row.department}));
        selectFromList('department', departments)
        .then(userPick => {
            db.deleteDepartment(userPick.id)
            .then(() => askUser())
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}

/**************************************/
/***** Functions related to roles *****/
/**************************************/

function viewAllRoles() {
    db.readAllRoles()
    .then(res => {
        console.log('\n');
        console.table(res);
    })
    .then(() => askUser())
    .catch(err => console.log(err));
}

function addRole() {
    let newRole = [];
    getName("job's title")
    .then(userInput => {
        newRole.push(userInput.newName);  // newRole has [title]
        getSalary()
        .then(userInput => {
            newRole.push(userInput.salary);  // newRole has [title, salary]
            db.readAllDepartments()
            .then(res => {
                const departments = res.map(row => ({value: row.id, name: row.department}));
                selectFromList('department', departments)
                .then(userPick => {
                    newRole.push(userPick.id);  // newRole has [title, salary, dpt_id]
                    db.createRole(newRole)
                    .then(() => askUser())
                    .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}

function removeRole() {
    db.readAllRoles()
    .then(res => {
        const roles = res.map(row => ({value: row.role_id, name: row.title}));
        selectFromList('job title', roles)
        .then(userPick => {
            db.deleteRole(userPick.id)
            .then(() => askUser())
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}

/******************************************/
/***** Functions related to employees *****/
/******************************************/

function viewAllEmployees() {
    db.readAllEmployees()
    .then(res => {
        console.log('\n');
        console.table(res);
    })
    .then(() => askUser())
    .catch(err => console.log(err));
}

function viewEmployeesByMgr() {
    db.readAllManagers()
    .then(res => {
        const managers = res.map(row => ({value: row.mgr_id, name: row.mgr_name}));
        selectFromList('manager', managers)
        .then(userPick => {
            db.readEmployeesByMgr(userPick.id)
            .then(res => {
                console.log('\n');
                console.table(res);
            })
            .then(() => askUser())
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}

function viewEmployeesByDpt() {
    db.readAllDepartments()
    .then(res => {
        const departments = res.map(row => ({value: row.id, name: row.department}));
        selectFromList('department', departments)
        .then(userPick => {
            db.readEmployeesByDpt(userPick.id)
            .then(res => {
                console.log('\n');
                console.table(res);
            })
            .then(() => askUser())
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}

function addEmployee() {
    let newEmployee = [];
    getName("employee's first name")
    .then(userInput => {
        newEmployee.push(userInput.newName);  // newEmployee has [first_name]
        getName("employee's last name")
        .then(userInput => {
            newEmployee.push(userInput.newName);  // newEmployee has [first_name, last_name]
            db.readAllRoles()
            .then(res => {
                const roles = res.map(row => ({value: row.role_id, name: row.title}));
                selectFromList('job title', roles)
                .then(userPick => {
                    newEmployee.push(userPick.id);  // newEmployee has [first_name, last_name, role_id]
                    db.readAllManagers()
                    .then(res => {
                        const managers = res.map(row => ({value: row.mgr_id, name: row.mgr_name}));
                        managers.push({value: null, name: 'No manager'});
                        selectFromList('manager', managers)
                        .then(userPick => {
                            newEmployee.push(userPick.id);  // newEmployee has [first_name, last_name, role_id, mgr_id]
                            db.createEmployee(newEmployee)
                            .then(() => askUser())
                            .catch(err => console.log(err));
                        })
                        .catch(err => console.log(err));
                    })
                    .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}

function changeEmployeeRole() {
    let empRole = [];
    db.readAllEmployees()
    .then(res => {
        const employees = res.map(row => ({value: row.id, name: row.first_name + ' ' + row.last_name}));
        selectFromList('employee', employees)
        .then(userPick => {
            empRole.push(userPick.id); // empRole has [id]
            db.readAllRoles()
            .then(res => {
                const roles = res.map(row => ({value: row.role_id, name: row.title}));
                selectFromList('job title', roles)
                .then(userPick => {
                    empRole.push(userPick.id); // empRole has [id, role_id]
                    db.updateEmployeeRole(empRole)
                    .then(() => askUser())
                    .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}

function changeEmployeeMgr() {
    let empMgr = [];
    db.readAllEmployees()
    .then(res => {
        const employees = res.map(row => ({value: row.id, name: row.first_name + ' ' + row.last_name}));
        selectFromList('employee', employees)
        .then(userPick => {
            empMgr.push(userPick.id); // empMgr has [id]
            db.readAllManagers()
            .then(res => {
                const managers = res.map(row => ({value: row.mgr_id, name: row.mgr_name}));
                selectFromList('manager', managers)
                .then(userPick => {
                    empMgr.push(userPick.id); // empMgr has [id, mgr_id]
                    db.updateEmployeeMgr(empMgr)
                    .then(() => askUser())
                    .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}

function removeEmployee() {
    db.readAllEmployees()
    .then(res => {
        const employees = res.map(row => ({value: row.id, name: row.first_name + ' ' + row.last_name}));
        selectFromList('employee', employees)
        .then(userPick => {
            db.deleteEmployee(userPick.id)
            .then(() => askUser())
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}

/*******************************************/
/***** Functions related to user input *****/
/*******************************************/

function askUser() {
    mainPrompt()
    .then(userInput => selectAction(userInput.choice))
    .catch(err => console.log(err));
}

// select what to do based on user input
function selectAction(choice) {
    switch (choice) {
        case 'view all departments':
            viewAllDepartments();
            break;
        case 'view all roles':
            viewAllRoles();
            break;
        case 'view all employees':
            viewAllEmployees();
            break;
        case 'view all employees by manager':
            viewEmployeesByMgr();
            break;
        case 'view all employees by department':
            viewEmployeesByDpt();
            break;
        case 'view utilized budget by department':
            viewUtilizedBudgetByDpt();
            break;
        case 'add department':
            addDepartment();
            break;
        case 'add role':
            addRole();
            break;
        case 'add employee':
            addEmployee();
            break;
        case 'update employee role':
            changeEmployeeRole();
            break;
        case 'update employee manager':
            changeEmployeeMgr();
            break;
        case 'remove department':
            removeDepartment();
            break;
        case 'remove role':
            removeRole();
            break;
        case 'remove employee':
            removeEmployee();
            break;
        case 'update employee role':
            editEmployeeRole();
            break;
        case 'update employee manager':
            editEmployeeManager();
            break;
        case 'exit':
            db.endConnection();
            return;
    }
}

// start app
console.log(appLogo);
askUser();