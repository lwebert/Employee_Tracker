-- transaction?

-- INSERT INTO department (name)
-- VALUES ('Sales'), ('Engineering'), ('Finance'), ('Legal');

-- INSERT INTO role (title, salary, department)
-- VALUES ('Sales Lead, 5000, 1'),
-- ('Software Engineer, 10000, 2');

-- INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- VALUES ();

-- Insert seed data into the department table
INSERT INTO department (name) VALUES
('Engineering'),
('Human Resources'),
('Marketing'),
('Sales');

-- Insert seed data into the role table
INSERT INTO role (title, salary, department) VALUES
('Software Engineer', 90000.00, 1),
('HR Specialist', 60000.00, 2),
('Marketing Coordinator', 55000.00, 3),
('Sales Representative', 50000.00, 4),
('Engineering Manager', 120000.00, 1);

-- Insert seed data into the employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Alice', 'Smith', 1, NULL),
('Bob', 'Johnson', 2, NULL),
('Charlie', 'Williams', 3, NULL),
('Diana', 'Brown', 4, NULL),
('Eve', 'Davis', 5, 1);