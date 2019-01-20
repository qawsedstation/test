# World Pay Demo

This project was a small implemantation of a ecomerce platform that inlcudes a product the user can make a payment using his card details. 

# Things I did for this Demo

1. I used the latest Angular 7 and the latest Angular Material components https://material.angular.io/
2. For the single store managment I used https://ngrx.io/ to implement the REDUX pattern
3. TDD using karma and jasmine so run `npm run test` [38 specs all green]
4. I did BDD acceptance end-to-end tests using cucamber and protractor under the /e2e folder (To run them check the instructions below) [4 Green scenarios under 1 feature]
5. Stub the responses using a nodejs server under the fe-mock-server folder `npm run fe-mocks`
6. Use Docker to run to build and run the application within a docker nginx server so this code can be deployed to any server and you can try it by running `npm run docker` and visit http://localhost with the enviroment variables ready to be changed for production under this file src/environments/environment.prod.ts
7. Used a simple media query and flexbox for responsive design 
8. I added delay in the mock responses to show the spinner when the request is loading (for DEMO porpuses)
9. Created seperate small shared components for Product and for Payment Form with their own responsibilities including their unit tests and then I included those to the redux container components to keep the single responsibility principle. 
10. Run an online documentation of the project and it's components by running `npm run compodoc` and serving it at http://127.0.0.1:8080/
11. Constantly checking for linting errors using codelyzer check them by running `npm run lint`

# Things I could improve if I was spending more time 
1. There was no negative scenarios managed in this simple example I did only the happy path as there was not required.
2. I could have spend more time on it to make it better and I could use material grid list or boostrap grid or any other framework but this is out of the scope of the this test
3. I diden't use validation to the fields as I diden't have any specific requirments but If I had I would do this using reactiveForms. Only thing I did I add  HTML5 basic max-length rules.

# Some final thoughts regarding PCI and security
One of the concepts of PCI compliance is Client-side encryption (CSE) when the cardholder data is encrypted in the browser before it is ever sent to the merchant’s servers. This is something I didn’t found in the API documentation and in this example we send the data raw to World Pay servers. Although I would consider another layer between my frontend app and world pay API. So the communication between my server and my frontend would be encrypted and under HTTPS/SSL encryption for maximum security.

Hosted fields are even a better approach for security perspective in this case you get a full hosted checkout page from WorldPay and you don’t have anything to do with payment forms in your website and therefore you are outside of the PCI scope as the responsibility now relies upon WorldPay that provide you an iframe.

Of course as the owners of the e-commerce website we should never cache any sensitive data like cvv, passwords to the client and even to our own servers. Passwords for login should be hashed in our backend and stored in the databases as one-way encryption and then match the Hashed passwords. Things like cvv, Expiry dates, long card numbers should always be transferred using a secure private network to the payment gateway and never be stored in our place.



## Install Dependancies

Run `npm`

## Check for linting errors

Run `npm run lint`

## Run Frontend Mock Server

Run `npm run fe-mocks` to run the Frontend mock server (this stubs the world pay responses as requested)

## Development server

Run `npm run fe-mocks` to run the mock server first and then
Run `npm start` for a dev server. Navigate to `http://localhost:5000/`. The app will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `npm run fe-mocks` to start the mock server
Run `npm start` to start the application
And finally in another terminal or tab
Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/) and cucamber

## Docker
Run `npm run docker` to build and run the application within a docker nginx server ready to be deployed
