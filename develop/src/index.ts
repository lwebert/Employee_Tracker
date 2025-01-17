import inquirer from 'inquirer';

import Db from './db/index.js';

const db = new Db();

initialPrompts();

function initialPrompts() {
	//if you used arrow function, you coudln't call it until after it was declared
	inquirer
		.prompt([
			{
				type: 'list',
				name: 'choice',
				message: 'What would you like to do?',
				choices: [
					{
						name: 'View All Employees',
						value: 'VIEW_EMPLOYEES',
					},
					{
						name: 'Add Employee',
						value: 'ADD_EMPLOYEE',
					},
					{
						name: 'Remove Employee',
						value: 'REMOVE_EMPLOYEE',
					},
					{
						name: 'View All Roles',
						value: 'VIEW_ROLES',
					},
					{
						name: 'Add Role',
						value: 'ADD_ROLE',
					},
					{
						name: 'Remove Roll',
						value: 'REMOVE_ROLL',
					},
					{
						name: 'View All Departments',
						value: 'VIEW_DEPARTMENTS',
					},
					{
						name: 'Add Department',
						value: 'ADD_DEAPRTMENT',
					},
					{
						name: 'Remove Department',
						value: 'REMOVE_DEPARTMENT',
					},
					{
						name: 'Quit',
						value: 'QUIT',
					},
				],
			},
		])
		.then((res) => {
			const choice = res.choice;
			console.log('.then ~ choice:', choice); //returns an object containing the name property 'choice', with the choice that you chose

			switch (choice) {
				case 'VIEW_EMPLOYEES':
					viewEmployees();
					break;

				case 'ADD_EMPLOYEE':
					addEmployee();
					break;

				case 'REMOVE_EMPLOYEE':
					removeEmployee();
					break;

				case 'VIEW_ROLES':
					viewRoles();
					break;

				case 'ADD_ROLE':
					addRole();
					break;

				case 'REMOVE_ROLE':
					removeRole();
					break;

				case 'VIEW_DEPARTMENTS':
					viewDepartments();
					break;

				case 'ADD_DEPARTMENT':
					addDepartment();
					break;

				case 'REMOVE_DEPARTMENT':
					removeDepartment();
					break;

				case 'QUIT':
					quit();
					break;

				default:
					quit();
					break;
			}
		});
}

//build functions that you call above
function viewEmployees() {
	//look at schema employee table
	//call the findAllEmployees() method, it returns a query from an async function, so returns a promise! -- so need a .then() with callback funciton, or needs asynch await
	//wants a formatted table
	db.findAllEmployees()
		.then(({ rows }: any) => {
			const employees = rows;
			console.table(employees);
		})
		// .then((res: any) => {
		// 	console.log('db.findAllEmployees ~ res:', res?.rows);
		// })
		// .then((res: any) => {
		// const employees = res?.rows;
		// console.table(employees);		// })
		.then(() => initialPrompts());
}

//similar code to instructor demo that Jay did on 1/16/25.

function addEmployee() {
	//make method
	inquirer
		.prompt([
			{
				name: 'first_name',
				message: "What is the employee's first name?",
				type: 'input',
			},
			{
				name: 'last_name',
				message: "What is the employee's last name?",
				type: 'input',
			},
		])
		.then((res) => {
			const firstName = res.first_name;
			const lastName = res.last_name;

			//get employee role & manager via db call to find all of the options, returns a promise so need .then()
			db.findAllRoles().then((response) => {
				const roles = response?.rows;
				//Note: video only showed the title, but also need to capture the id from the role table (since when we do insert, need to give it the role id). Here is how to do this in inquirer:
				const roleChoices = roles.map((role) => {
					const id = role.id;
					const title = role.title;

					return {
						name: title, //what you show the user
						value: id, //what the user is selecting; use id as value since using this to insert into table!
					};
				});
				inquirer
					.prompt([
						{
							type: 'list',
							name: 'roleId',
							message: "What is the employee's role?",
							choices: roleChoices,
						},
					])
					.then((res) => {
						const roleId = res.roleId;

						db.findAllEmployees().then((res) => {
							const employees = res?.rows;
							const managerChoices = employees?.map(
								(employee) => {
									const id = employee.id;
									const firstName = employee.first_name;
									const lastName = employee.last_name;

									return {
										name: `${firstName} ${lastName}`,
										value: id,
									};
								}
							);
							//filter out null manager_id ?
							managerChoices.unshift({
								name: 'None',
								value: null,
							});

							inquirer
								.prompt([
									{
										type: 'list',
										name: 'managerId',
										message:
											"Who is the employee's manager?",
										choices: managerChoices,
									},
								])
								.then((res) => {
									//define employee object based on column names
									const newEmployee = {
										first_name: firstName, //defined at top with first prompt of this method... have access due to scoping...
										last_name: lastName,
										manager_id: res.managerId, //referencing the name of the previous prompt
										role_id: roleId, //defined above (=res.roleId, but have access within the promise due to scoping)
									};
									//create employee
									db.addNewEmployee(newEmployee);
								})
								.then(() => {
									console.log(
										`Added ${firstName} ${lastName} to the database.`
									);
								})
								.then(() => {
									initialPrompts();
								});
						});
					});
			});
		});
}

function removeEmployee() {
	//find all employees
	//create the view to select the employee
	//create a new prompt to choose which employee to remove
	//then run the removeEmployee method
}

function updateEmployeeRole() {
	//watch class at 9:24pm for notes on what to do here!
}

function viewRoles() {}

function addRole() {}
function removeRole() {}
function viewDepartments() {}
function addDepartment() {}
function removeDepartment() {}
function quit() {}
