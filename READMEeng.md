# Business Data Manager - Business Process Optimization

## Overview:

The complete project is an application that allows the user to manage relevant information about their business. The app consists of different modules, each with a defined logical entity type (employees, stocks, sales, dashboards...) and depending on which ones the user has active, it allows tracking the flow of information of these entities. For example, the employee module allows operations of reading, writing, updating, and deleting employee data, management of business logics related to employees such as vacations, overtime, shifts, etc., and other functionalities that represent or are related to employees.

To complete the project, I will need to use a full stack of technologies because the client-side, backend, and database need to be developed. For this, I have chosen the MERN stack with React (and NextJS + TypeScript) on the client-side, ExpressJS and NodeJS on the backend, and MongoDB (with mongoose) for the database.

In the future, when the "POS" module is implemented and information about sales and products is automatically loaded from the terminals, extra dependencies will be needed to handle this type of requests to the server and the database.

**THE .ENV FILES OF THE ENVIRONMENT VARIABLES HAVE BEEN ADDED TO THE REPOSITORY BECAUSE THIS IS JUST A SHOWCASE OF THE PROJECT AND TO FACILITATE ITS REPRODUCTION IN A LOCAL STATE.**

**TYPESCRIPT WILL THROW SEVERAL TYPING WARNINGS THAT I HAVE NOT YET CORRECTED DUE TO PRIORITY REASONS BUT THEY DO NOT AFFECT THE APPLICATION TESTING.**

## Project Architecture:

![Flow Diagram](/img/flow-diagram.jpg)

**Frontend:** On the client-side, I will use NextJS as a React framework since it implements many useful and necessary functionalities in the project, such as internal routing, server-side rendering of components (very useful especially for simulation views, which handle a large volume of data). Additionally, I will use TailwindCSS for styles.
The user interface will include the navigation menu with the dashboard window as the main one. While navigating through the app, the necessary component will be dynamically rendered in the view and a corresponding navigation submenu for navigation in that module. The app must be able to recognize the user role that has logged in to restrict uses and views as needed. The forms, containing information from various subdivisions of the entity, will be separated based on those subdivisions, in tab or accordion format, as needed.

**Backend:** On the backend side, I will use ExpressJS and NodeJS to create the entire infrastructure, as well as to develop the API for connection between user and database. The backend must validate the data (if any) of the user's requests prior to taking any steps. If the validations are not met, it must return a validation error immediately, if they are met, it must continue with the normal flow of the request.
It must also include the entire error handling system so that the server does not crash at any time and can handle unexpected exceptions. If everything works correctly in the request, the server will be the connection bridge between the user and their request and the database, responsible for making the relevant "queries" and returning the information to the client.

**Database:** For the database, I have opted for a non-relational model like MongoDB, using it through its mongoose dependency for NodeJS. The database handles all data read and write operations registered by requests coming from the backend. The database structure is typical of MongoDB, separated by documents that represent logical entities within the project such as users, sales, stocks, etc.

## Installation and Configuration:

To reproduce the project in your local environment, you will need the following technologies installed on your computer:

- NodeJS v18.18.2+
- MongoDB service
- npm v9.2.0+

Steps once the technologies are installed:

- Run the "npm run install" script in both project directories (client and server). This will install the dependencies of both scopes.
- Test that everything works correctly by opening two terminals in your IDE. Run the "npm run dev" script in each one being inside the corresponding directory and observe if the console output is correct.
- Through an HTTP request manager, make a POST request to the route you will find in the file "/server/src/employees/routes/newEmployee.route.ts" with the information of the user you want to create. IT IS IMPORTANT THAT THE ROLE OF THE CREATED USER IS "Director" SO THAT THE APPLICATION DOES NOT RETURN YOU TO THE LOGIN SCREEN.
- In the browser, visit the route [http://localhost:3000/](http://localhost:3000/) and enter the login credentials.

## Main Features:

The following images show some key points of the project and the status of the different development processes within them.

### Frontend

![Frontend Status](/img/frontend-status.jpg)

Note that some key points such as consuming the backend API or user interactivity are taken for granted and in constant progress.

### Backend

![Backend Status](/img/backend-status.jpg)

### Database

![Database Status](/img/database-status.jpg)

## Project Structure:

For scalability and modularization reasons, I have divided the project into subdirectories that represent each logical entity of the application. These can be users, sales, stocks, etc.
Each module contains in turn several folders containing the different parts of the development of that entity. All modules have the same folders but the content of the files is totally different, since it is destined for that module itself. The folders are divided into functionalities such as the relevant database model, the controller that is responsible for executing the logic in case of the server side, or the tests folder to test the module's functionalities.

## Future Contributions:

The idea of future contributions is based on the same modularization that the project is based on:

    - Finalizing the functionalities of the employees module such as: shift registration, automatic overtime detection, FNR detection and management. Implementation of labor and medical reports. Inclusion of files.
    - Stocks module: Which allows controlling product stocks and conducting inventories.
    - Sales module: Which allows the management of sales data, subdividing into as many business entities as needed.
    - Dashboards module: With graphical information of the modules that are already included.
    - POS module: For direct implementation at points of sale. When this module is implemented, the automatic data dumping method to the environment must be implemented.
    - Room design module: To be implemented together with the POS module, allowing room design and assignment of table numbers and diners as needed.
    - Advanced products module: With breakdowns for detailed product control, including suppliers and purchases in the system.
