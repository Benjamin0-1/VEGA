# VEGA Template Store

Welcome to **VEGA Template Store**! This application provides a comprehensive e-commerce platform for managing and purchasing templates. It offers various advanced features to enhance user experience and streamline operations.

## Features

- **Third-Party Authentication**: Users can authenticate using Google and Firebase for a secure and convenient login experience.
- **JWT Authentication**: Ensures secure access to protected routes and resources.
- **Stripe Payment Gateway**: Allows users to make payments directly through the platform, integrating with Stripe for seamless transactions.
- **Server-Based Shopping Cart**: Utilizes a server-based shopping cart to maintain cart data across sessions and devices, ensuring consistency and reducing the risk of data loss.
- **Admin and Regular Admin Permissions**: Differentiated access controls for administrators and regular users, providing customized management and functionality.
- **Soft Deletion**: Implements soft deletion for templates and users, allowing for data recovery and maintaining data integrity.
- **Password Management**: Handles passwords securely for both local and Firebase users, ensuring robust protection and proper management.
- **Dynamic Filtering**: Offers dynamic filtering of templates, enabling users to quickly find and select templates based on various criteria.

## Screenshots

Below are some screenshots of the application in action:

### Home Page
<img width="1427" alt="home-page" src="https://github.com/user-attachments/assets/d5ce98f7-a4c5-404a-a3d9-f58f37b3b0df">

### Detail Page
<img width="1423" alt="detail-page" src="https://github.com/user-attachments/assets/b7a529f4-8710-4534-b33d-14f261926d48">

### Dashboard
<img width="1427" alt="dashboard" src="https://github.com/user-attachments/assets/b469631d-bfe5-4ad3-9883-b7741fb7f634">

## Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Benjamin0-1/VEGA.git
    ```
2. Navigate to the project directory:
    ```bash
    cd VEGA
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

### Running the App

1. Start the application:
    ```bash
    npm start
    ```

2. By default, `NODE_ENV` in the `.env` file is set to "production". This means that when you run `npm start` at the root directory, it will connect to a deployed database. However, this process can take up to 5 minutes due to cost considerations. If you prefer to set up a PostgreSQL database locally and run the `NODE_ENV` as "development", you will need to update your `.env` file with your own database credentials. This will allow for a faster setup with local configurations. The application will be loaded with sample data, including templates, categories, and images.

Feel free to explore and use the **VEGA Template Store**!
