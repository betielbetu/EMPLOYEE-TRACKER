const connection = require('./connection');

// CREATE functions
function createDepartment(dpt_name) {
    const sql = `INSERT INTO departments SET dpt_name = ?`;
    const params =[dpt_name];
    return connection.promise().query(sql, params)
        .then(([rows, fields]) => console.log(`\n${dpt_name} department added.\n`))
        .catch(err => console.log(err));
}

function createRole(newRole) {
    const sql = `INSERT INTO roles (title, salary, dpt_id) VALUES (?, ?, ?)`;
    return connection.promise().query(sql, newRole)
        .then(([rows, fields]) => console.log(`\nNew job title "${newRole[0]}" added.\n`))
        .catch(err => console.log(err));
}

function createEmployee(newEmployee) {
    const sql = `INSERT INTO employees (first_name, last_name, role_id, mgr_id) VALUES (?, ?, ?, ?)`;
    return connection.promise().query(sql, newEmployee)
        .then(([rows, fields]) => console.log(`\n${newEmployee[0]} ${newEmployee[1]} was added to the database.\n`))
        .catch(err => console.log(err));
}

// READ functions
function readAllDepartments() {
    const sql = 'SELECT dpt_name AS department, id FROM departments ORDER BY department';
    const params = [];
    return connection.promise().query(sql, params)
        .then(([rows, fields]) => rows)
        .catch(err => console.log(err));
}

function readAllRoles() {
    const sql = `SELECT title, roles.id AS role_id, dpt_name AS department, salary
        FROM roles
        LEFT JOIN departments ON roles.dpt_id = departments.id
        ORDER BY title`;
    const params = [];
    return connection.promise().query(sql, params)
        .then(([rows, fields]) => rows)
        .catch(err => console.log(err));
}

function readAllEmployees() {
    const sql = `SELECT emp1.id AS id, emp1.first_name, emp1.last_name, title, dpt_name AS department, salary,
        CONCAT(emp2.first_name, ' ', emp2.last_name) as manager
        FROM employees emp1
        LEFT JOIN roles ON emp1.role_id = roles.id
        LEFT JOIN departments ON roles.dpt_id = departments.id
        LEFT JOIN employees emp2 ON emp1.mgr_id = emp2.id
        ORDER BY emp1.last_name`;
    const params = [];
    return connection.promise().query(sql, params)
        .then(([rows, fields]) => rows)
        .catch(err => console.log(err));
}

function readAllManagers() {
    const sql = `SELECT DISTINCT emp1.mgr_id, CONCAT(emp2.first_name, ' ', emp2.last_name) as mgr_name
        FROM employees emp1
        INNER JOIN employees emp2 ON emp1.mgr_id = emp2.id
        ORDER BY mgr_name`;
    const params = [];
    return connection.promise().query(sql, params)
        .then(([rows, fields]) => rows)
        .catch(err => console.log(err));  
}

function readEmployeesByMgr(mgrId) {
    const sql = `SELECT emp1.id AS id, emp1.first_name, emp1.last_name, title, dpt_name AS department, salary,
        CONCAT(emp2.first_name, ' ', emp2.last_name) as manager
        FROM employees emp1
        LEFT JOIN roles ON emp1.role_id = roles.id
        LEFT JOIN departments ON roles.dpt_id = departments.id
        LEFT JOIN employees emp2 ON emp1.mgr_id = emp2.id
        WHERE emp1.mgr_id = ?
        ORDER BY emp1.last_name`;
    const params = [mgrId];
    return connection.promise().query(sql, params)
        .then(([rows, fields]) => rows)
        .catch(err => console.log(err));
}

function readEmployeesByDpt(dptId) {
    const sql = `SELECT emp1.id AS id, emp1.first_name, emp1.last_name, title, dpt_name AS department, salary,
        CONCAT(emp2.first_name, ' ', emp2.last_name) as manager
        FROM employees emp1
        LEFT JOIN roles ON emp1.role_id = roles.id
        LEFT JOIN departments ON roles.dpt_id = departments.id
        LEFT JOIN employees emp2 ON emp1.mgr_id = emp2.id
        WHERE departments.id = ?
        ORDER BY emp1.last_name`;
    const params = [dptId];
    return connection.promise().query(sql, params)
        .then(([rows, fields]) => rows)
        .catch(err => console.log(err));
}
//         GROUP BY departments.id ORDER BY total_utilized_budget DESC
function readUtilizedBudget(dptId) {
    const sql = `SELECT dpt_name AS department, SUM(salary) AS total_utilized_budget
        FROM employees
        LEFT JOIN roles ON employees.role_id = roles.id
        LEFT JOIN departments ON roles.dpt_id = departments.id
        WHERE departments.id = ?
        `;
    const params = [dptId];
    return connection.promise().query(sql, params)
        .then(([rows, fields]) => rows)
        .catch(err => console.log(err));
}

// UPDATE functions

function updateEmployeeRole(newRole) {
    const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
    const params = [newRole[1], newRole[0]];
    return connection.promise().query(sql, params)
        .then(([rows, fields]) => console.log(`\nJob title was changed for employee with id ${newRole[0]}.\n`))
        .catch(err => console.log(err));
}

function updateEmployeeMgr(newMgr) {
    const sql = `UPDATE employees SET mgr_id = ? WHERE id = ?`;
    const params = [newMgr[1], newMgr[0]];
    return connection.promise().query(sql, params)
        .then(([rows, fields]) => console.log(`\nManager was changed for employee with id ${newMgr[0]}.\n`))
        .catch(err => console.log(err));
}


// DELETE functions
function deleteDepartment(id) {
    const sql = `DELETE FROM departments WHERE id = ?`;
    const params = [id];
    return connection.promise().query(sql, params)
        .then(([rows, fields]) => {
            console.log(`\nDepartment ${id} was deleted.\n`);
        })
        .catch(err => console.log(err));
}

function deleteRole(id) {
    const sql = `DELETE FROM roles WHERE id = ?`;
    const params = [id];
    return connection.promise().query(sql, params)
        .then(([rows, fields]) => {
            console.log(`\nRole ${id} was deleted.\n`);
        })
        .catch(err => console.log(err));
}

function deleteEmployee(id) {
    const sql = `DELETE FROM employees WHERE id = ?`;
    const params = [id];
    return connection.promise().query(sql, params)
        .then(([rows, fields]) => {
            console.log(`\nEmployee with id ${id} was removed from the database.\n`);
        })
        .catch(err => console.log(err));
}

// close connection to db
function endConnection() {
    console.log('\nClosing connection to db... Bye!\n');
    connection.end();
}

module.exports = {
    createDepartment,
    createRole,
    createEmployee,
    readAllDepartments,
    readAllRoles,
    readAllEmployees,
    readAllManagers,
    readEmployeesByMgr,
    readEmployeesByDpt,
    readUtilizedBudget,
    updateEmployeeRole,
    updateEmployeeMgr,
    deleteDepartment,
    deleteRole,
    deleteEmployee,
    endConnection
}