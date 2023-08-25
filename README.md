
# CHOKDI Web Application 
### Car Insurance Customer Data Management 

Welcome to the Car Insurance Customer Data Management web application! This application is built using React Vite for the frontend and JavaScript (Node.js) with Nodemon for the backend. It utilizes OAuth Google for authentication and authorization. The app allows admin users to manage customer data, and customers can access and manage their car insurance data.

## Features

- **Authentication**: Users can log in using their Gmail accounts via OAuth Google authentication.

- **Admin Dashboard**: Admin users have access to an admin dashboard where they can view and manage all customer data, including editing and deleting customer records.

- **Customer Dashboard**: Customers have access to a personalized dashboard where they can view and manage their own car insurance data.

- **Data Management**: Admin users can add new customers to the system.

## Prerequisites

- Docker: Make sure you have Docker installed on your system.

## Getting Started with Docker Compose

1. Clone this repository: `git clone https://github.com/reviseUC73/CHOKDI.git`

2. Navigate to the project directory: `cd CHOKDI`

3. Create a `.env` file in the project root and configure it with your environment variables.

4. Run the application using Docker Compose:

   ```bash
   docker-compose up
   ```
   
   OR
   
   - Detached mode : It will run in the background and won't show their logs and outputs in the current terminal session.


    ```bash
   docker-compose up -d 

   Access the application in your browser at http://localhost:3000```
## Environment Variables
Make sure to set up the required environment variables in your .env file. You can find the necessary variables in the .env.example file provided in the project.

## Usage
- Admin users: Log in using your Gmail account associated with admin privileges. You'll have access to the admin dashboard for managing customer data, including editing and deleting customer records.

- Customer users: Log in using your Gmail account. You'll be able to access your own car insurance data and update it as needed.

## Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to create a pull request.

## License
This project is licensed under the MIT License.

## Acknowledgements
This project was inspired by the need to efficiently manage car insurance customer data.
We appreciate the open-source community and the contributors of various libraries used in this project.

