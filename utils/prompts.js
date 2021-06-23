const inquirer = require('inquirer'); 

const mainPrompt = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                'view all departments',
                'add department',
                'remove department',
                'view all roles',
                'add role',
                'remove role',
                'view all employees',
                'view all employees by manager',
                'view all employees by department',
                'add employee',
                'update employee role',
                'update employee manager',
                'remove employee',
                'view utilized budget by department',
                'exit'
            ],
            default: 'exit'
        }
    ]);
};

const selectFromList = (topic, selectionList) => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: `Which ${topic} would you like to select?`,
            choices: selectionList
        }
    ]);
};

const getName = (nameWanted) => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'newName',
            message: `What is the ${nameWanted}?`,
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    return `Please enter the ${nameWanted}.`;
                }                
            }
        }
    ]);
};

const getSalary = () => {
    return inquirer.prompt([
        {
            type: 'number',
            name: 'salary',
            message: 'What is the salary?',
            validate: nbInput => {
                if (!isNaN(parseFloat(nbInput)) && parseFloat(nbInput) >= 0) {
                    return true;
                } else {
                    return 'Please enter a positive number.';                    
                }
            }
        }
    ]);
};

module.exports = {
    mainPrompt,
    selectFromList,
    getName,
    getSalary
}