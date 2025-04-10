# MotoSwift E-Commerce Project
**Welcome to the MotoSwift project! This guide will help you get started.**

Motoswift E-Commerce is a modern, full-stack web application designed to provide motorcycle enthusiasts with a seamless online shopping experience. The platform allows users to browse, search, and purchase motorcycle parts, accessories, and gear with ease. Built with scalability and performance in mind, the project incorporates the following key features:
- `User-Friendly Interface`: A responsive and intuitive frontend built with React, ensuring a smooth experience across devices.
- `Dynamic Theming`: Light and dark mode support with a theme-switching system for personalized user experiences.
- `Secure Backend`: A robust Express.js server with RESTful APIs for handling user authentication, product management, and order processing.
- `Database Integration`: A MySQL database for efficient storage and retrieval of user, product, and order data.
- `Payment Processing`: Integration with secure payment gateways for hassle-free transactions.
- `Scalable Architecture`: Designed to handle growing user demands with clean, modular code.

This project serves as a foundation for building a professional-grade e-commerce platform tailored to niche markets.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [1. Install Everything](#1-install-everything)
  - [2. Start the Project](#2-start-the-project)
  - [3. Done!](#3-done)
- [Commands](#commands)
- [Notes](#notes)
- [Contributing](#contributing)
- [Authors](#authors)

## Technologies Used
| Category    | Technology                    | 
| ----------- | ----------------------------- |
| `Frontend`  | React.js with React Router    |
| `Backend`   | Express.js                    |
| `Database`  | MySQL (managed in phpmyadmin) |
| `Prototype` | Figma                         |

## Getting Started
### 1. Install Everything
Open a terminal and run:
```sh
npm install
```
### 2. Start the Project
Run this command to start both the frontend and backend:
```sh
npm run dev
```
- Frontend: http://localhost:5173
- Backend: http://localhost:3000
### 3. Done!
You can just open your browser and start exploring.

## Commands
| Command           | Description                    | 
| ----------------- | ----------------------------- |
| `npm run dev`     | Starts the development environment for both the client and server.    |
| `npm run lint`    | Checks the code for linting errors using ESLint.                                                                   |
| `npm run build`    | Builds the production-ready frontend application. (No need for this since Railway will handle the build process.) |
| `npm run preview` | Previews the production build of the frontend locally.                                                             |

## Notes
### **Frontend**
The frontend code is located in the `client` folder. It is built using React to provide a responsive and dynamic user interface, with features like component-based architecture, routing, and API integration.

### **Backend**
The backend code is located in the `server` folder. It is built using Express.js to handle server-side logic, including RESTful APIs, middleware, and database interactions.

### **Database**
The project uses MySQL as the database, configured in the `config` folder. It stores and manages data for users, products, orders, and other entities.

### **Prototype**
The prototype for Motoswift E-Commerce was created using [Figma](https://www.figma.com), a collaborative interface design tool. It served as the foundation for the project's user interface and experience, ensuring a cohesive and user-friendly design.

## Contributing
If you have any suggestions or find an issue, please open an issue or a pull request.

## Authors
The project is made by 6 Bachelor of Science in Information Technology students of T.I.P.-QC in partial fulfillment of their course "IT 012 - Platform Technologies".
- Aba-a
- Amancio
- De Vera
- Pasco
- Salvador
- Vardeleon

© 2025. All Rights Reserved.
