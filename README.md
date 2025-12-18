# 🧠 Quiz Application

This is a full-stack **Quiz Application** that allows users to take timed multiple-choice exams and view performance reports, while administrators can manage exams and monitor user activity. The application includes secure authentication and role-based access, offering tailored functionality for users and admins.

# 🚀 Live Demo
 *You can check out the live demo of the project here:*👉 [Quiz Project Demo](http://65.1.106.176:81/home).

## ✨ Features

### 👤 User Features
- ✅ **Take Exams:** Solve MCQs from various exams within a set time limit.
- 📊 **View Reports:** Instantly see detailed performance reports after submitting an exam.
- 🧾 **Exam History:** View a list of all previously attempted exams with results.
- 🔐 **Authentication:** Login and logout functionality for secure access.
- 📝 **Profile Management:** Users can register and update their profile details via the profile tab.

### 🛠️ Admin Features
- 🧩 **Exam & Question Management:** Admins can create, update, and delete exams and their associated questions.
- 👥 **User Monitoring:** View user details and the list of exams attempted by each user.
- 📑 **Performance Reports:** Access comprehensive reports of users’ exam performances.
- 🛡️ **Admin Profile Update:** Admins can also update their personal profile via the profile tab.

## 🧰 Tech Stack

### 🔧 Frontend:
- HTML
- CSS
- Bootstrap
- JavaScript
- TypeScript
- Angular

### 🔌 Backend:
- Node.js
- Express.js (RESTful API)

### 🗄️ Database:
- MongoDB (NoSQL)

---

## ⚙️ Installation and Setup

### 📋 Prerequisites

Make sure the following are installed on your system:
- [Node.js](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [MongoDB Compass](https://www.mongodb.com/products/compass)

---

### 🚀 Steps to Run the Application

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SankalpHP/Quiz-Application.git
   cd your-repo
   
2. **Install dependencies:**
   ```bash
   npm install
   
3. **Start the backend server:**
   ```bash
   npm start
4. **Open the application in your browser:**
   ```bash
   http://localhost:4200
   
## ⚙️ Folder Structure
   ### 📁 Frontend (Angular)
```
quiz-application-UI/
├── .angular/
├── .vscode/
├── dist/
├── node_modules/
├── src/
│   ├── app/
│   │   ├── adminpanel/
│   │   ├── adminpanel-reports/
│   │   ├── adminpaneldetails/
│   │   ├── common-component/
│   │   ├── details/
│   │   ├── exam/
│   │   ├── guards/
│   │   ├── home/
│   │   ├── profile/
│   │   ├── question/
│   │   ├── registration/
│   │   ├── report/
│   │   ├── services/
│   │   ├── start-quiz/
│   │   ├── app-routing.module.ts
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   ├── app.module.server.ts
│   ├── assets/
│   ├── favicon.ico
│   ├── index.html
│   ├── main.server.ts
│   ├── main.ts
│   ├── styles.scss
│   ├── server.ts
├── .editorconfig
├── .gitignore
├── angular.json
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.spec.json

```
### 📁 Backend (node.js)
```
QUIZ-APPLICATION-BE/
├── .vscode / # VSCode workspace settings (optional)
├── controller / # Contains route controllers handling the business logic
├── db / # Database connection and configuration files
├── models / # Mongoose or other database models/schemas
├── node_modules / # Installed npm packages
├── rout / # API route definitions
├── .env # Environment variables (not included in repo)
├── index.js # Entry point of the backend server
├── package.json # Project metadata and dependencies
├── package-lock.json # Auto-generated lockfile for npm dependencies
```
## 📡 API Endpoints
   ### Exam attempted by user
   ```bash
      POST attempted/attemptedExam
   ```
  ### Get attempted exam by user
   ```bash
      GET attempted/:userId
   ```
 ### Get attempted question by user
   ```bash
      POST attempted/attemptedQuestion
   ```
 ### User registration form
   ```bash
      POST auth/register
   ```
 ### User login form
   ```bash
      POST auth/login
   ```
 ### Get user data
   ```bash
      GET auth/:id
   ```
 ### User update registration form
   ```bash
      POST auth/registerUpdate
   ```
  ### Get all user data
   ```bash
      POST auth/users
   ```
  ### Get user name
   ```bash
      POST auth/username
   ```
  ### Get all exams
   ```bash
      GET exam/exams
   ```
  ### Add exams
   ```bash
      POST exam/exams
   ```
  ### Get exams
   ```bash
      GET exam/:id
   ```
  ### Update exams
   ```bash
      PUT exam/exams
   ```
  ### Delete exams
   ```bash
      DELETE exam/exams
   ```
  ### Add questions
   ```bash
      POST question/question
   ```
  ### Get questions
   ```bash
      GET question/:examId
   ```
  ### Update questions
   ```bash
      PUT question/question
   ```
  ### Delete questions
   ```bash
      DELETE question/question
   ```
 ### Save exam
   ```bash
      POST quiz/saveQuiz
   ```   
 ### Get exam duration
   ```bash
      GET quiz/:examId
   ```
## 👨‍💻 Author
  *Sankalp Selokar*
  *Feel free to connect with me at 📧 selokarsankalp@gmail.com*. 
