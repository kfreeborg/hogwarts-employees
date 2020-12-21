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
  console.log('|    | ||||| |||     |     |   ||   ||||| ||||| ||||||');
  console.log('|||||| |   | |    || |  |  |  |__|  |   |   |    |   |');
  console.log('|    | ||||| ||||||| ||| ||| |    | |       |      |  ');
  console.log('                                                |    |');
  console.log('                                                ||||||');
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
        case 'View employees':
          viewEmployees();
          break;
        case 'Add department':
          addDepartment();
          break;
        case 'Add role':
          addRole();
          break;
        case 'Add employee':
          addEmployee();
          break;
        case 'Update employee role':
          updateEmployee();
          break;
        default:
          connection.end();
      }
    });
};

const viewDepartment = () => {
  connection.query('SELECT * FROM department', function (err, res) {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });
};

const viewRoles = () => {
  connection.query('SELECT * FROM role', function (err, res) {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });
};

const viewEmployees = () => {
  connection.query('SELECT * FROM employee', function (err, res) {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'addDept',
        message: 'What is the name of the new department?',
      },
    ])
    .then(answer => {
      connection.query(
        'INSERT INTO department (name) VALUES (?)',
        [answer.addDept],
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + ' department inserted!');
          mainMenu();
        }
      );
    });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'What is the name of the new role?',
        name: 'roleName',
      },
      {
        type: 'input',
        message: 'What is the salary for this role?',
        name: 'salaryTotal',
      },
      {
        type: 'input',
        message: 'What is the department id number?',
        name: 'deptID',
      },
    ])
    .then(answer => {
      connection.query(
        'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
        [answer.roleName, answer.salaryTotal, answer.deptID],
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + ' role inserted!');
          mainMenu();
        }
      );
    });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        message: "What's the first name of the new employee?",
        name: 'eFirstName',
      },
      {
        type: 'input',
        message: "What's the last name of the new employee?",
        name: 'eLastName',
      },
      {
        type: 'input',
        message: "What is the employee's role id number?",
        name: 'roleID',
      },
      {
        type: 'input',
        message: 'What is the manager id number?',
        name: 'managerID',
      },
    ])
    .then(answer => {
      connection.query(
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
        [answer.eFirstName, answer.eLastName, answer.roleID, answer.managerID],
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + ' employee inserted!');
          mainMenu();
        }
      );
    });
};

const updateEmployee = () => {
  inquirer
    .prompt([
      {
        name: 'id',
        type: 'input',
        message: 'Enter employee id.',
      },
      {
        name: 'roleId',
        type: 'input',
        message: 'Enter role id',
      },
    ])
    .then(answer => {
      connection.query(
        'UPDATE employee SET role_id=? WHERE id=?',
        [answer.roleId, answer.id],
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + ' employee updated!');
          mainMenu();
        }
      );
    });
};
