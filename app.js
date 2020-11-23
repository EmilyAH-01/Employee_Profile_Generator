const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
var questions = [
    {
        type: "list",
        message: "What is the employee's role?",
        name: "role",
        choices: ["Manager", "Engineer", "Intern"]
    },
    {
        type: "input",
        message: "What is the employee's name?",
        name: "name",
    },
    {
        type: "input",
        message: "What is the employee's ID number?", 
        name: "Id"
    },
    {
        type: "input",
        message: "What is the employee's email address?",
        name: "email",
    },
    {
        type: "input",
        message: "What is the employee's office number?",
        name: "officeNumber"
    },
    {
        type: "input",
        message: "What is the employee's GitHub account name?",
        name: "github"
    },
    {
        type: "input",
        message: "What college does the employee attend?",
        name: "school"
    },
];

var employees= [];

var askAgain = true;

function addEmployee(askAgain) {
    if (askAgain) {
        inquirer
            .prompt([
                {   
                    type: "list",
                    message: "Add an employee?",
                    name: "add",
                    choices: ["yes", "no"] 
                }
            ])
            .then(answers => {
                if (answers.add === "yes") {
                    employeeObjects();
                } else if (answers.add === "no") {
                    askAgain = false;

                    // After the user has input all employees desired, call the `render` function (required
                    // above) and pass in an array containing all employee objects; the `render` function will
                    // generate and return a block of HTML including templated divs for each employee!
                    const renderedHTML = render(employees);

                    fs.writeFileSync(outputPath, renderedHTML);
                }
            })
        ;
    }
}

function employeeObjects() {

    inquirer.prompt(questions[0])
    .then(answers => {
        if (answers.role === "Manager") {
            inquirer.prompt([questions[1], questions[2], questions[3], questions[4]])
            .then(answers => {
                var newManager = new Manager(answers.name, answers.Id, answers.email, answers.officeNumber);
                employees.push(newManager);
                addEmployee(askAgain);
            })
        ;
        } else if (answers.role === "Engineer") {
            inquirer.prompt([questions[1], questions[2], questions[3], questions[5]])
                .then(answers => {
                    var newEngineer = new Engineer(answers.name, answers.Id, answers.email, answers.github);
                    employees.push(newEngineer);
                    addEmployee(askAgain);
                })
            ;
        } else if (answers.role === "Intern") {
            inquirer.prompt([questions[1], questions[2], questions[3], questions[6]])
                .then(answers => {
                    var newIntern = new Intern(answers.name, answers.Id, answers.email, answers.school);
                    employees.push(newIntern);
                    addEmployee(askAgain);
                })
            ;
        }
    })
}

employeeObjects();


// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above to target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
