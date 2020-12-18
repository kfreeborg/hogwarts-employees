const mysql = require('mysql2/promise');
const inquirer = require('inquirer');
const cTable = require('console.table');

const action = async () => {
  inquirer
    .prompt({
      type: 'list',
      choices: [
        'Add department',
        'Add role',
        'Add employee',
        'View departments',
        'View roles',
        'View employees',
        'Update employee role',
        'Quit',
      ],
      message: 'What would you like to do?',
      name: 'option',
    })
    .then(answers => {
      console.log('You entered: ' + answers.option);

      // switch (answers.option) {
      //   case 'Add department':
      //     addDepartment();
      //     break;
      //   case 'Add role':
      //     addRole();
      //     break;
      //   case 'Add employee':
      //     addEmployee();
      //     break;
      //   case 'View departments':
      //     viewDepartment();
      //     break;
      //   case 'View roles':
      //     viewRoles();
      //     break;
      //   case 'View employees':
      //     viewEmployees();
      //     break;
      //   case 'Update employee role':
      //     updateEmployee();
      //     break;
      //   default:
      //     quit();
      // }
    })
    .catch(error => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else when wrong
      }
    });
};

const connect = async () => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'hogwarts_db',
  });
  console.log('connected as id ' + connection.threadId);
  return connection;
};

const run = async () => {
  //open a connection
  const connection = await connect();
  //ask questions
  await action();
  //update a product
  //delete a product
  //read products
  //close connection
  connection.end();
};

run();

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
