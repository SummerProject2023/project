to access static pages: 

localhost:----/ directs to login page
localhost:----/signup directs to sign up page

go according to folder structure in web app 

localhost:----/view/public/home.html 
localhost:----/view/public/gamePage.html

git procedures
1. create branch from main
    a. branch name standard: yourName-featureName

2. make and push your changes to your branch
3. before creating pull request merge main into your branch
    a. git checkout main
    b. git pull main to get latest changes
    c. git checkout to your branch
    d. git merge main and resolve any issues
4. create pull request to main for review
    a. go to github pull request
    b. create a pull request: base: main <- yourBranch
5. After approval, merge your pull request to main from github
