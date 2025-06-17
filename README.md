# Employee Tracker
University of Denver - Module 10 Challenge

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

## Description
This is a command-line application serving as a content management system (CMS) for users to manage a virtual employee database for a company. Users are able to add, remove, and update employees, employee roles, and company departments in order to customize the application for personal use. It utilizes Node.js, Inquierer and PostgreSQL.

## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [Contributing](#contributing)
4. [Tests](#tests)
5. [License](#license)
6. [Questions](#questions)


## Installation
To install the application locally, do the following in your terminal:

1. Clone the repository to your local computer.  
   `git clone git@github.com:lwebert/Employee_Tracker.git`
2. Install the Inquirer package version 8.2.4 or later.  
   `npm i inquirer@8.2.4`
3. Check that node.js is installed.  
   `node -v`
4. Install dependencies.  
   `npm i`

To run Postgres Shell, install PostgreSQL and create an account, then complete the following steps in your terminal while pathed to root directory of your project:
1. Confirm a Postgres server is running. If an error occurs, refer to the [PostgreSQL Download Page](https://www.postgresql.org/download/) for installation instructions.  
   `psql --version`
2. Open the Postgres Shell that connects the terminal to the Postgres instance.  
   `psql -U postgres`
3. Enter the password you created when you installed **PostgreSQL**.


## Usage
To run the application, open two instances of the application in your terminal while pathed to root directory of your project. 

Run the following in the first terminal:
1. Log into postgreSQL.  
   `psql -U postgres`
2. Run `\i src/db/schema.sql;` to create your database and tables as specified in the **schema.sql** file.
3. Run `\i src/db/seeds.sql;` to insert example data into your employees, roles, and department tables.  
   *Note: This step is optional, but can be helpful for general database practice with fake data.*

Run the following in the second terminal:
1. Initialize your applicaiton. `npm run start`

## Contributing
This application was developed by Lauren Webert. All code is original and written by Lauren Webert.

Here are some guidelines on ways to contribute:  

Report a bug fix.  
1. Create a new Issue in the GitHub repo.  

Make local changes to push up.  
1. Create a new branch (`git checkout -b <your-feature-branch-name>`)
2. Make your changes locally
3. Push the code back to the GitHub repo (`git push origin <your-feature-branch-name>`)
4. Create a pull request to merge your changes

## Tests
The application is working correctly if all command-line options do what they are meant to without throwing an exception.

[Click here](https://app.screencastify.com/v3/watch/xJ5ki26TLvIPW5hI3YLq) to watch a walkthrough video on how the application works.

## License
The application is covered under [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0.txt).   
https://www.apache.org/licenses/LICENSE-2.0.txt


## Questions
- GitHub username: [lwebert](https://github.com/lwebert).
- Reach me at [lauren@weberts.org](lauren@weberts.org) with additional questions.
