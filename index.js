const inquirer = require('inquirer');
const fs = require('fs');

function getLicence(license) {
    let link = '';
    if(license === 'MIT')
    {
        link = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)'
    }
    else if (license === 'BSD')
    {
        link = '[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)'
    }
    else if (license === 'GPL') {
        link = '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)'
    }
    else if (license === 'Mozilla') {
        link = '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)'
    }
    else if (license === 'IBM') {
        link = '[![License: IPL 1.0](https://img.shields.io/badge/License-IPL%201.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)'
    }
    return link
}

const getTemplate = ({title, description, installation, usage, license, contributing, tests, github, email })=> {
const licenseURL = getLicence(license);
return `#${title}
${licenseURL}

 <a name="desc"/>
 ##Description
 ${description}

 ##Table of Contents
 [Description](#desc) 
 [Installation Instructions](#install)  
 [Usage Information](#usage)  
 [License](#license)  
 [Contribution Guidelines](#contributing)  
 [Test Instrucions](#tests)  
 [Questions](#questions)  

 <a name="install"/>
 ##Installation Instructions
 ${installation}

 <a name="usage"/>
 ##Usage Information 
 ${usage}

 <a name="license"/>
 ##License
 This project is licensed under the ${license} license.

 <a name="contributing"/>
 ##Contribution Guidelines
 ${contributing}

 <a name="tests"/>
 ##Test Instructions
 ${tests}

 <a name="questions"/>
 ##Questions 
 Github:
 https://github.com/${github}
 Email:
 ${email}

 `;
}


inquirer
  .prompt([
    {
        type: 'input',
        message: 'Please enter the title of your project?',
        name: 'title',
    },
    {
        type: 'input',
        message: 'Please enter a description for your project?',
        name: 'description',
    },
    {
        type: 'input',
        message: 'Please enter installation instructions for your project?',
        name: 'installation',
    },
    {
        type: 'input',
        message: 'Please enter usage information for your project?',
        name: 'usage',
    },
    {
        type: 'list',
        name: 'license',
        message: 'Choose a license for your application?',
        choices: ['BSD', 'MIT', 'GPL', 'Mozilla', 'IBM'],
    },
    {
        type: 'input',
        message: 'Please enter contribution guidelines for your project?',
        name: 'contributing',
    },
    {
        type: 'input',
        message: 'Please enter test instructions for your project?',
        name: 'tests',
    },
    {
        type: 'input',
        message: 'Please enter GitHub username?',
        name: 'github',
    },
    {
        type: 'input',
        message: 'Please enter your email address?',
        name: 'email',
    },
  ])
  .then((response) =>
    fs.writeFile("README.MD", getTemplate(response), (err) =>
        err ? console.error(err) : console.log('Success!'))
    );