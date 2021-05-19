# MyFirstApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.0.


## Development server with Docker (exec/development)

#### Execution environment
Uncomment the first lines of `Dockerfile`.

#### Development environment
Already set up.

### Run
* Build/create the docker image  
`docker build -t angular-app-image .`
* Run docker container
`docker run -it -p 4210:4210 -v ~/private/angular:/angular-app --name=angular-app-container angular-app-image /bin/bash`  
Be aware that you might need to change the repository folder after the command `-v`, in my case the project is in the folder `/private/angular`
* Now you are inside the container, you should get all the necessary dependencies by running  
`npm install`
* Everything was set up and you are finally ready to deploy the application as development environment, you just need to run   
`npm run start:docker`
* Now you can open the application into your brower by `localhost:4210`

### Re-run the same container
* `docker start angular-app-container`
* `docker exec -it angular-app-container /bin/bash`
* `npm run start:docker`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Commands

`npm install --save bootstrap@3 ` -> install localy bootstrap 3

`npm install` -> install all the dependencies

`ng generate component nameComponent` -> generate automatically a new component

`ng g c component-name --skipTests=true` -> more efficiently way to generate a new component

`ng g c nameCOmponent` -> also generate automatically a new component

`ng serve` -> CLI build Angular and dependecies, also run the server

`ng g c path/FOLDER_NAME --skipTests true` -> generate a new folder with component files



 ## Project Structure

 ![Structure](https://github.com/gabrielduessmann/angular/blob/master/src/images/projectStructure.png)