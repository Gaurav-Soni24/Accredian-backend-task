# 🚀 **Referral Form REST API**

A **RESTful API** built with **Express.js** and **Prisma ORM** to handle referral form data, connected to a **MySQL database**, and integrated with **Google Mail Service API** to send referral emails upon successful submission.

---

## 🛠️ **Tech Stack Used:**

- **Express.js** - Backend server framework
- **Prisma ORM** - Database connectivity and schema management
- **MySQL** - Database to store referral data
- **EmailJS** - Sending referral emails via Google Mail Service API
- **dotenv** - Manage environment variables securely

---

## 📋 **Features:**

- **📄 RESTful Endpoints** to handle referral form submissions.
- **🔒 Data Validation** for ensuring required fields are filled.
- **🛡️ Error Handling** for missing fields, invalid data, and server errors.
- **📧 Email Notifications** sent using Google Mail Service API through EmailJS.
- **🗄️ MySQL Database Integration** using Prisma ORM.

---

## ⚙️ **Working of the API:**

1. **Form Submission**: User submits the referral form with details like referrer name, email, referee name, email, and course.
2. **Data Validation**: The API checks for missing or invalid fields.
3. **Database Storage**: Valid referral data is stored in the MySQL database.
4. **Email Notification**: Upon successful submission, an email notification is sent to the specified recipients using Google Mail Service API via EmailJS.
5. **Error Handling**: Errors during form submission, database storage, or email sending are handled gracefully with appropriate responses.

---

## 🏡 **Local Setup:**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Gaurav-Soni24/Accredian-backend-task.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd referral-api
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Setup Environment Variables:**
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     DATABASE_URL=mysql://user:password@localhost:3306/databasename
     EMAILJS_PUBLIC_KEY=your_public_key
     EMAILJS_PRIVATE_KEY=your_private_key
     EMAILJS_SERVICE_ID=your_service_id
     EMAILJS_TEMPLATE_ID=your_template_id
     EMAILJS_USER_ID=your_user_id
     PORT=5000
     ```

5. **Migrate Database Schema using Prisma:**
   ```bash
   npx prisma migrate dev
   ```

6. **Start the Server:**
   ```bash
   npm start
   ```

7. **Access API at:** `http://localhost:5000/api/referral`

---

## 👨‍💻 **Developer Details:**

**Gaurav Soni**  
B.Tech CSE - Government Engineering College Bilaspur, Chhattisgarh  
🌐 [LinkedIn](https://www.linkedin.com/in/gauravsoni24/) | 📧 sonigaurav2021@gmail.com

---

> Made with ❤️ by Gaurav Soni