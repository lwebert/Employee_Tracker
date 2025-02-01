import inquirer from 'inquirer';

import Db from './db/index.js';

const db = new Db();

initialPrompts();

process.on('unhandledRejection', (reason, promise) => {
	console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
//purpose: menu

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
						name: 'View All Departments',
						value: 'VIEW_DEPARTMENTS',
					},
					{
						name: 'View All Roles',
						value: 'VIEW_ROLES',
					},
					{
						name: 'View All Employees',
						value: 'VIEW_EMPLOYEES',
					},
					{
						name: 'Add Department',
						value: 'ADD_DEPARTMENT',
					},
					{
						name: 'Add Role',
						value: 'ADD_ROLE',
					},
					{
						name: 'Add Employee',
						value: 'ADD_EMPLOYEE',
					},
					{
						name: 'Update Employee Role',
						value: 'UPDATE_EMP_ROLE',
					},
					{
						name: 'Update Employee Manager',
						value: 'UPDATE_EMP_MAN',
					},
					{
						name: 'Remove Department',
						value: 'REMOVE_DEPARTMENT',
					},
					{
						name: 'Remove Role',
						value: 'REMOVE_ROLE',
					},
					{
						name: 'Remove Employee',
						value: 'REMOVE_EMPLOYEE',
					},
					{
						name: 'Quit',
						value: 'QUIT',
					},
				],
			},
		])
		.then((res) => {
			//res is an object with all the answers from above
			const choice = res.choice;
			// console.log(choice); //returns an object containing the name property 'choice', with the choice that you chose

			switch (choice) {
				case 'VIEW_DEPARTMENTS':
					viewDepartments();
					break;

				case 'VIEW_ROLES':
					viewRoles();
					break;

				case 'VIEW_EMPLOYEES':
					viewEmployees();
					break;

				case 'ADD_DEPARTMENT':
					addDepartment();
					break;

				case 'ADD_ROLE':
					addRole();
					break;

				case 'ADD_EMPLOYEE':
					addEmployee();
					break;

				case 'UPDATE_EMP_ROLE':
					updateEmployeeRole();
					break;

				case 'UPDATE_EMP_MAN':
					updateEmployeeManager();
					break;

				case 'REMOVE_DEPARTMENT':
					removeDepartment();
					break;

				case 'REMOVE_ROLE':
					removeRole();
					break;

				case 'REMOVE_EMPLOYEE':
					removeEmployee();
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

//TODO: build functions that you call above

async function viewDepartments() {
	const dbResDepartments = await db.findAllDepartments();

	console.table(dbResDepartments.rows);

	initialPrompts();
}

async function viewRoles() {
	const dbResRoles = await db.findAllRoles();
	console.table(dbResRoles.rows);
	initialPrompts();
}

// function viewEmployees2() {
// 	// look at schema employee table
// 	// call the findAllEmployees() method, it returns a query from an async function, so returns a promise! -- so need a .then() with callback funciton, or needs asynch await
// 	// wants a formatted table
// 	// db.findAllEmployees()
// 	// 	.then(({ rows }: any) => {
// 	// 		const employees = rows;
// 	// 		console.table(employees);
// 	// 	})
// 	// 	//alternate code:
// 	// 	// .then((res: any) => {
// 	// 	// 	console.log('db.findAllEmployees ~ res:', res?.rows);
// 	// 	// })
// 	// 	// .then((res: any) => {
// 	// 	// const employees = res?.rows;
// 	// 	// console.table(employees);		// })
// 	// 	.then(() => initialPrompts());
// }

async function viewEmployees() {
	const dbResEmployees = await db.findAllEmployees();
	console.table(dbResEmployees.rows);
	initialPrompts();
}

async function addDepartment() {
	try {
		const inqResDepName = await inquirer.prompt([
			{
				name: 'department_name',
				message: 'What is the name of the department?',
				type: 'input',
			},
		]);

		const newDepartment = {
			name: inqResDepName.department_name,
		};

		await db.addNewDepartment(newDepartment);

		console.log(`Added ${newDepartment.name} to the database.`);

		initialPrompts();
	} catch (error) {
		console.error('Error adding department:', error);
	}
}

// TODO:
async function addRole() {
	const inqResRole = await inquirer.prompt([
		{
			name: 'role_name',
			message: 'What is the name of the role?',
			type: 'input',
		},
		{
			name: 'role_salary',
			message: 'What is the salary of the role? $',
			type: 'input',
		},
	]);

	const roleName = inqResRole.role_name;
	const roleSalary = inqResRole.role_salary;

	const dbResDepartment = await db.findAllDepartments();
	const departments = dbResDepartment.rows;

	const departmentChoices = departments.map((department) => {
		const id = department.id;
		const dname = department.name;

		return {
			name: dname,
			value: id,
		};
	});

	const inqResDep = await inquirer.prompt([
		{
			type: 'list',
			name: 'depId',
			message: 'Which department does the role belong to?',
			choices: departmentChoices,
		},
	]);

	const depId = inqResDep.depId;

	const newRole = {
		title: roleName,
		salary: roleSalary,
		department: depId,
	};

	db.addNewRole(newRole);

	console.log(`Added ${roleName} to the database.`);

	initialPrompts();
}

// function addEmployee2() {
// 	//make method
// 	inquirer
// 		.prompt([
// 			{
// 				name: 'first_name',
// 				message: "What is the employee's first name?",
// 				type: 'input',
// 			},
// 			{
// 				name: 'last_name',
// 				message: "What is the employee's last name?",
// 				type: 'input',
// 			},
// 		])
// 		.then((res) => {
// 			const firstName = res.first_name;
// 			const lastName = res.last_name;

// 			//get employee role & manager via db call to find all of the options, returns a promise so need .then()
// 			db.findAllRoles().then((response) => {
// 				const roles = response?.rows;
// 				//Note: video only showed the title, but also need to capture the id from the role table (since when we do insert, need to give it the role id). Here is how to do this in inquirer:
// 				const roleChoices = roles.map((role) => {
// 					const id = role.id;
// 					const title = role.title;

// 					return {
// 						name: title, //what you show the user
// 						value: id, //what the user is selecting; use id as value since using this to insert into table!
// 					};
// 				});
// 				inquirer
// 					.prompt([
// 						{
// 							type: 'list',
// 							name: 'roleId',
// 							message: "What is the employee's role?",
// 							choices: roleChoices,
// 						},
// 					])
// 					.then((res) => {
// 						const roleId = res.roleId;

// 						db.findAllEmployees().then((res) => {
// 							const employees = res?.rows;
// 							const managerChoices = employees?.map(
// 								(employee) => {
// 									const id = employee.id;
// 									const firstName = employee.first_name;
// 									const lastName = employee.last_name;

// 									return {
// 										name: `${firstName} ${lastName}`,
// 										value: id,
// 									};
// 								}
// 							);
// 							//filter out null manager_id ?
// 							managerChoices.unshift({
// 								name: 'None',
// 								value: null,
// 							});

// 							inquirer
// 								.prompt([
// 									{
// 										type: 'list',
// 										name: 'managerId',
// 										message:
// 											"Who is the employee's manager?",
// 										choices: managerChoices,
// 									},
// 								])
// 								.then((res) => {
// 									//define employee object based on column names
// 									const newEmployee = {
// 										first_name: firstName, //defined at top with first prompt of this method... have access due to scoping...
// 										last_name: lastName,
// 										manager_id: res.managerId, //referencing the name of the previous prompt
// 										role_id: roleId, //defined above (=res.roleId, but have access within the promise due to scoping)
// 									};
// 									//create employee
// 									db.addNewEmployee(newEmployee);
// 								})
// 								.then(() => {
// 									console.log(
// 										`Added ${firstName} ${lastName} to the database.`
// 									);
// 								})
// 								.then(() => {
// 									initialPrompts();
// 								});
// 						});
// 					});
// 			});
// 		});
// }

async function addEmployee() {
	//make method
	const inqResName = await inquirer.prompt([
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
	]);

	const firstName = inqResName.first_name;
	const lastName = inqResName.last_name;

	//get employee role & manager via db call to find all of the options, returns a promise so need .then()
	const dbResRoles = await db.findAllRoles();
	const roles = dbResRoles.rows; //?. is an optional chaining, so if rows doesn't exist you won't get an error, instead get null or undefined
	//Note: video only showed the title, but also need to capture the id from the role table (since when we do insert, need to give it the role id). Here is how to do this in inquirer:
	const roleChoices = roles.map((role) => {
		const id = role.id;
		const title = role.title;

		return {
			name: title, //what you show the user
			value: id, //what the user is selecting; use id as value since using this to insert into table!
		};
	});

	const inqResRole = await inquirer.prompt([
		{
			type: 'list',
			name: 'roleId',
			message: "What is the employee's role?",
			choices: roleChoices,
		},
	]);

	const roleId = inqResRole.roleId;

	const dbResEmployees = await db.findAllEmployees();

	const employees = dbResEmployees.rows;

	const managerChoices = employees.map((employee) => {
		const id = employee.manager_id;
		const firstName = employee.first_name;
		const lastName = employee.last_name;

		return {
			name: `${firstName} ${lastName}`,
			value: id,
		};
	});

	//filter array to include managers (manager_id == null)
	const managerChoicesFiltered = managerChoices.filter(
		(manager) => manager.value == null
	);

	//add an option to have no manager
	managerChoicesFiltered.unshift({
		//.shift() removes something from the start of the array,
		//.unshift() adds something to the start of the array; It shifts all of the indices over by 1 since new item becomes index 0; Better to just make a new array and add something to the end
		name: 'None',
		value: null,
	});

	//choose the manager
	const inqResManager = await inquirer.prompt([
		{
			type: 'list',
			name: 'managerId',
			message: "Who is the employee's manager?",
			choices: managerChoicesFiltered,
		},
	]);

	//define employee object based on column names
	const newEmployee = {
		first_name: firstName,
		last_name: lastName,
		role_id: roleId,
		manager_id: inqResManager.managerId,
	};
	//create employee
	db.addNewEmployee(newEmployee);

	console.log(`Added ${firstName} ${lastName} to the database.`);

	initialPrompts();
}

//TODO:
async function updateEmployeeRole() {
	const dbResEmployees = await db.findAllEmployees();
	const dbResRoles = await db.findAllRoles();

	const employeeChoices = dbResEmployees.rows.map((employee) => {
		const employeeName = employee.first_name + ' ' + employee.last_name; //string concatenation
		return { name: employeeName, value: employee.id };
	});

	const roleChoices = dbResRoles.rows.map((role) => {
		return { name: role.title, value: role.id };
	});

	const inqResUpdateRole = await inquirer.prompt([
		{
			name: 'employee',
			message: "Which employee's role do you want to update?",
			type: 'list',
			choices: employeeChoices,
		},
		{
			name: 'role',
			message: 'Which role do you want to assign the selected employee?',
			type: 'list',
			choices: roleChoices,
		},
	]);

	try {
		const result = await db.updateEmployeeRole(
			inqResUpdateRole.employee,
			inqResUpdateRole.role
		);
		console.log('Rows affected:', result.rowCount);
	} catch (err) {
		console.error('Error updating employee role:', err);
	}

	console.log(`The employee's role has been updated.`);
	// viewEmployees(); //it already returns the menu for you
	initialPrompts();
}

async function updateEmployeeManager() {
	const dbResEmployees = await db.findAllEmployees();

	const employeeChoices = dbResEmployees.rows.map((employee) => {
		const employeeName = employee.first_name + ' ' + employee.last_name; //string concatenation
		return { name: employeeName, value: employee.id };
	});

	const managerChoices = dbResEmployees.rows.map((employee) => {
		const firstName = employee.first_name;
		const lastName = employee.last_name;
		const employeeName = firstName + ' ' + lastName;

		return {
			name: employeeName,
			value: employee.id,
		};
	});

	// const managerChoicesFiltered = managerChoices.filter(
	// 	(manager) => manager.value == null
	// );

	managerChoices.unshift({ name: 'None', value: null });

	const inqResUpdateManager = await inquirer.prompt([
		{
			name: 'employee',
			message: "Which employee's manager do you want to update?",
			type: 'list',
			choices: employeeChoices,
		},
		{
			name: 'manager',
			message:
				'Which manager do you want to assign to the selected employee?',
			type: 'list',
			choices: managerChoices,
			// choices: managerChoicesFiltered,
		},
	]);

	db.updateEmployeeManager(
		inqResUpdateManager.employee,
		inqResUpdateManager.manager
	);

	console.log("The employee's manager has been updated.");
	// viewEmployees();
	initialPrompts();
}

//TODO:
async function removeEmployee() {
	const dbResEmployees = await db.findAllEmployees();

	const employeeChoices = dbResEmployees.rows.map((employee) => {
		const employeeName = employee.first_name + ' ' + employee.last_name;
		return { name: employeeName, value: employee.id };
	});

	const inqResEmployee = await inquirer.prompt([
		{
			name: 'deleteEmployee',
			type: 'list',
			message: 'Choose an employee to delete',
			choices: employeeChoices, //meta data you can also find (time it took, etc.), original query, ...
		},
	]);

	db.removeEmployee(inqResEmployee.deleteEmployee);
	console.log(`The employee has been deleted.`);
	// viewEmployees();
	initialPrompts();
}

async function removeRole() {
	const dbResRoles = await db.findAllRoles();

	const roleChoices = dbResRoles.rows.map((role) => {
		return { name: role.title, value: role.id };
	});

	const inqResRole = await inquirer.prompt([
		{
			name: 'role',
			message: 'Which role would you like to delete?',
			type: 'list',
			choices: roleChoices,
		},
	]);

	db.deleteRole(inqResRole.role);
	console.log('The role was deleted.');

	// viewRoles();
	initialPrompts();
}

async function removeDepartment() {
	const dbResDepartment = await db.findAllDepartments();

	const departmentChoices = dbResDepartment.rows.map((department) => {
		return { name: department.name, value: department.id };
	});

	const inqResDepartment = await inquirer.prompt([
		{
			name: 'department',
			message: 'Which department would you like to delete?',
			type: 'list',
			choices: departmentChoices,
		},
	]);

	db.removeDepartment(inqResDepartment.department);
	console.log('The department was deleted.');
	// viewDepartments();
	initialPrompts();
}

async function quit() {}
