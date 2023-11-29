
# CHOKDI Web Application

## Overview

CHOKDI is a state-of-the-art web application tailored for car insurance companies. Developed using React Vite and Node.js, it offers a seamless, efficient experience, deployed on AWS EC2 for top-notch performance and reliability. Its security is a standout feature, with JWT for encryption and cookie-based sessions, aligning with OWASP standards. CHOKDI is an essential tool for secure, efficient customer data management in the insurance sector."
## Features

### Enhanced Security
- **JWT and OWASP Guidelines**: Implements JWT tokens for secure data encryption and decryption, aligned with OWASP security standards.
- **Role-Based Access Control**: Granular control over data access through a comprehensive role and permission system.

### User Authentication
- **OAuth Google Authentication**: Secure and convenient login using Gmail accounts.

### Scalable and Reliable
- **AWS EC2 Deployment**: Ensures high availability and scalable performance.

### User Interface
- **Admin Dashboard**: For managing all aspects of customer data.
- **Customer Dashboard**: Allows customers to view and update their insurance data.

### API Access
- Secure API access with authentication and role-based permissions.

## Getting Started

### Prerequisites
- Docker installed on your system.

### Installation
1. Clone the repository: `git clone https://github.com/reviseUC73/CHOKDI.git`
2. Navigate to the project directory: `cd CHOKDI`
3. Create a `.env` file and configure it with your environment variables.
4. Run the application using Docker Compose:
   - In foreground: `docker-compose up`
   - In detached mode: `docker-compose up -d`

## Usage
- **Admin Users**: Log in with an admin Gmail account to access the admin dashboard.
- **Customer Users**: Log in with a regular Gmail account to access the customer dashboard.

## Contributing
Contributions to CHOKDI are welcome. Feel free to fork the repository, create a pull request, or open issues for any bugs or feature suggestions.

## License
This project is licensed under the MIT License.

## Acknowledgments
Thanks to the open-source community and all contributors to the libraries used in this project.

---

For more information or support, contact setthanan50@gmail.com.
