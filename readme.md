# Pinterest_Backend

This app allows users to discover, collect, and share images and links to various interests and hobbies. It aims to replicate the core functionalities of Pinterest, providing an intuitive and visually appealing interface.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Steps](#steps)
    1. [Clone the repository](#1-clone-the-repository)
    2. [Install dependencies](#2-install-dependencies)
    3. [Environment Variables](#3-environment-variables)
- [Usage](#usage)
- [Author](#author)

## Features

- **User Authentication**: Sign up, log in, and log out functionalities.
- **User Profiles**: Personalized profiles where users can view posts.
- **Explore**: User can view all the other users posts.
- **CRUD Operation**: User can view, create, update and delete their posts.
- **Responsive Design**: Mobile-friendly design to enhance user experience across devices.

## Tech Stack

- **Backend**: [Node.js](https://nodejs.org/en), [Express](https://expressjs.com/)
- **Database**: [MySql](https://www.mysql.com/), [TypeORM](https://typeorm.io/)
- **Authentication**: [JWT](https://jwt.io/) (JSON Web Tokens)
- **Version Control**: [GitHub](https://github.com/)

## Installation

### Prerequisites

- Node.js
- Mysql

### Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/shreeshan7/pinterest.git
   cd pinterest
   ```

2. **Install dependencies**:
   ```bash
   npm install
   cd client
   ```
3. **Start server**:
   ```bash
   npm start
   ```
4. **Environment Variables**:

| Env Name     |      Value      |                   Description |
| ------------ | :-------------: | ----------------------------: |
| PORT         |      8000       |  The server runs in port 8000 |
| DB_NAME      |  pinterest_db   |         Name of your database |
| DB_USERNAME  |  Your username  |    Username for your database |
| DB_PASSWORD  |  Your password  |     password of your database |
| DB_HOST      |    localhost    |             name of your host |
| DB_PORT      |      3306       | The port the database runs on |
| jwtsecretkey | Your secret key |  your secret key used for JWT |

## Usage

1. Open your browser and navigate to `http://localhost:8000`.
2. Sign up for a new account or log in with your existing credentials.
3. Start posting you own images.
4. Explore the feed to discover pins from other users.

## Author

To know more about me click on the link ;)

[Shreeshan Paudel](https://en.wikipedia.org/wiki/Spider-Man)
