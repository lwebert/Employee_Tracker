import { pool } from './connection.js';

//Class for running db queries
export default class Db {
	constructor() {}

	//TODO: define methods below
	async query(sql: string, args: any[] = []) {
		//create client pool
		const client = await pool.connect();

		try {
			const result = await client.query(sql, args); //using async await rather than callback functions (e.g., mini project server.ts file ?)
			return result;
			//creates a query through the class, replaces pool.query from the mini project in server.ts file
		} finally {
			client.release();
			//must always return a client to the pool, regardless if there is an error or not
		}
	}

	findAllEmployees() {
		//do a query, then call this method in your viewEmployees function in types/index.ts file
		// const sql = 'SELECT * FROM employee';

		// TODO: Add more information from other tables (see acceptance criteria)!! You will have to do joining within the query to get all of this info.
		const sql =
			'SELECT first_name, last_name, role_id, manager_id FROM employee;';

		return this.query(sql);
		//this keyword refers to the class and all its properties & methods, the query takes the sql string and any args you might have
	}

	addNewEmployee(employee: any) {
		const { first_name, last_name, role_id, manager_id } = employee;
		// const sql =
		// 	'"INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)", [fist_name, last_name, role_id, manager_id]'; //insert with parameterized queries -- this wouldn't work since says variables above were undefined!
		return this.query(
			'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
			[first_name, last_name, role_id, manager_id]
		);
	}

	findAllRoles() {
		// const sql = '...everything below...';
		return this.query(
			'SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id'
		);
	}

	findAllManagers() {}
}
