import { pool } from './connection.js';
//purpose: interact with the Db
//Class for running db queries
export default class Db {
    constructor() { }
    //Method to run sql queries
    async query(sql, args = []) {
        //create client pool
        const client = await pool.connect();
        try {
            const result = await client.query(sql, args); //using async await rather than callback functions (e.g., mini project server.ts file ?)
            return result;
            //creates a query through the class, replaces pool.query from the mini project in server.ts file
        }
        finally {
            client.release();
            //must always return a client to the pool, regardless if there is an error or not
        }
    }
    //TODO: define methods below:
    findAllDepartments() {
        return this.query('SELECT department.id, department.name FROM department;');
    }
    findAllRoles() {
        return this.query('SELECT role.id, role.title, d.name AS department, role.salary FROM role LEFT JOIN department d ON role.department = d.id;');
    }
    findAllEmployees() {
        //do a query, then call this method in your viewEmployees function in types/index.ts file
        // const sql = 'SELECT * FROM employee';
        // TODO: Add more information from other tables (see acceptance criteria)!! You will have to do joining within the query to get all of this info.
        //TODO:
        const sql = "SELECT employee.id, employee.first_name, employee.last_name, role.title, d.name AS department, role.salary, CONCAT(manager.first_name,' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON role.id = employee.role_id LEFT JOIN employee manager ON manager.id = employee.manager_id LEFT JOIN department d ON role.department = d.id ORDER BY employee.id;"; //self join - cannot say employee 2x, coming up with an alias for it "manager"
        //concat - to add the space, had to be single quotes ' '
        return this.query(sql);
        //this keyword refers to the class and all its properties & methods, the query takes the sql string and any args you might have
        //this keyword in JS is context based (changes based on where you use it). this inside an object or class, it is referring to the object or class itself. query is a method (aka function) on the Db class.
        //OOP - uses classes adn objects, organizes things together, coding style
    }
    addNewEmployee(employee) {
        const { first_name, last_name, role_id, manager_id } = employee;
        return this.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id]);
    }
    addNewDepartment(department) {
        const { name } = department;
        return this.query('INSERT INTO department (name) VALUES ($1)', [name]);
    }
    addNewRole(role) {
        const { title, salary, department } = role;
        return this.query('INSERT INTO role (title, salary, department) VALUES ($1, $2, $3)', [title, salary, department]);
    }
    updateEmployeeRole(id, role_id) {
        return this.query('UPDATE employee SET role_id = ($1) WHERE id = ($2)', [role_id, id]);
    }
    updateEmployeeManager(id, manager_id) {
        return this.query('UPDATE employee SET manager_id = ($1) WHERE id = ($2)', [manager_id, id]);
    }
    removeEmployee(employeeId) {
        return this.query('DELETE FROM employee WHERE id = ($1)', [employeeId]);
    }
    deleteRole(role_id) {
        console.log('Attempting to delete role with ID:', role_id);
        return this.query('DELETE FROM role WHERE id = ($1)', [role_id]);
    }
    removeDepartment(department_id) {
        return this.query('DELETE FROM department WHERE id = ($1)', [
            department_id,
        ]);
    }
    quit() {
        return this.query('/q');
    }
}
