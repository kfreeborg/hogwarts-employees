const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'hogwarts_db',
});

connection.connect(err => {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId);
  mainMenu();
});

const mainMenu = () => {
  inquirer
    .prompt({
      type: 'list',
      choices: [
        'View departments',
        'View roles',
        'View employees',
        'Add department',
        'Add role',
        'Add employee',
        'Update employee role',
        'Quit',
      ],
      message: 'What would you like to do?',
      name: 'option',
    })
    .then(answers => {
      console.log('You entered: ' + answers.option);

      switch (answers.option) {
        case 'View departments':
          viewDepartment();
          break;
        case 'View roles':
          viewRoles();
          break;
        //   case 'View employees':
        //     viewEmployees();
        //     break;
        //   case 'Add department':
        //     addDepartment();
        //     break;
        //   case 'Add role':
        //     addRole();
        //     break;
        //   case 'Add employee':
        //     addEmployee();
        //     break;
        //   case 'Update employee role':
        //     updateEmployee();
        //     break;
        default:
          connection.end();
      }
    });
};

const viewDepartment = () => {
  console.log('Viewing departments');
  connection.query('SELECT * FROM department', function (err, res) {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });
};

const viewRoles = () => {
  console.log('Viewing departments');
  connection.query('SELECT * FROM role', function (err, res) {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });
};

// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database
