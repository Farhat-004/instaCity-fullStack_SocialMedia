# 📱 PhotoBooth Frontend Project (React)

PhotoBooth is a **React-based social media web application** built as part of an assignment.  
It converts existing static HTML templates (`login.html`, `register.html`, `profile.html`, etc.) into fully dynamic, functional pages with **JWT Authentication**, **REST API integration**, and **stateful UI interactions** — closely resembling a real-world social platform (Instagram).

---

## 🚀 Features Overview

### 🔐 Authentication

-   Users can **register** via `/register` and **log in** via `/login`.
-   Authentication is handled using **JWT (JSON Web Token)**.
-   Unauthorized users are restricted in certain areas (e.g., limited post visibility).

---

### 🏠 Home Page (`/`)

-   Displays all user posts.
-   Implements **Infinite Scrolling** — loads 10 posts per API page as the user scrolls down.
-   For **unauthenticated users**, only **3–4 posts** are shown.
    -   Once scrolled to the bottom, a **custom login/register popup** appears.
-   Each post shows:
    -   Image
    -   Caption (with “Show More / Show Less” toggle for long captions)
    -   Like count
    -   Comment count
    -   Time of posting

---

### ❤️ Post Interactions

-   Authenticated users can:
    -   **Like (Love React)** posts
    -   **Comment** on posts
    -   **Share** posts (copies the post link to clipboard)
-   Unauthenticated users can **view posts** but not **like or comment** — clicking these triggers the **login/register popup**.
-   “View all comments” opens the **Post Details Page**.

---

### 📝 Post Details Page (`/posts/:id`)

-   Displays the full post, all comments, and like information.
-   Users can:
    -   Add, edit, or delete comments.
    -   View a **list of users who liked** the post.
-   Includes a **"More from this user"** section — showing more posts from the same author.

---

### 👤 Profile System

-   Clicking any username navigates to that user’s **Profile Page**.
-   Profile page renders:
    -   Profile photo
    -   Bio
    -   Website
    -   Gender
    -   User posts
-   If the logged-in user visits **their own profile**, they will see an **“Edit Profile”** button.

---

### ✏️ Edit Profile Page

-   Allows the user to:
    -   Update profile picture
    -   Edit website, bio, gender, and password
-   **Password Strength Indicator**:
    -   Weak → 🔴 Red
    -   Fair → 🟠 Orange
    -   Medium → 🟡 Yellow
    -   Strong → 🟢 Green

---

### 🖼️ Create Post Page

-   Accessible via the **Create** button in the sidebar.
-   Users can upload an image and write a caption.
-   Both image and caption are **required fields**.
-   Includes proper **validation and error handling** for all inputs.

---

### 🔔 Notification Page

-   Fetches notifications from the API (via GET requests).
-   Displays notifications for:
    -   Likes
    -   Comments
-   Clicking a notification navigates to the **corresponding Post Details page**.
-   No real-time updates — notifications are fetched on demand.

---

### 🧭 Navigation System

-   A **Side Navigation Bar** is visible on all pages except **Login** and **Register**.
-   Menu items:
    -   🏠 Home
    -   🔔 Notifications
    -   ➕ Create Post
    -   👤 Profile
-   The active route is always highlighted.
-   Navigation is **persistent** and **shared across the app**.

---

## ⚙️ Core Functionalities

-   **JWT-based Authentication** for login and registration.
-   **REST API Integration** for all CRUD operations.
-   **Pagination + Infinite Scroll** for smooth performance.
-   **Post Like, Comment, Share** system.
-   **Conditional Rendering** based on authentication state.
-   **Custom Popup Modal** for login/register prompts.
-   **State Management** for loading, error, and success states.
-   **Reusable UI Components** following given templates.
-   **Consistent Theme & Design** with provided assets.

---

## 🧠 Validation & Error Handling

-   Every form includes **client-side validation**.
-   Uses **custom loading indicators** and **error messages**.
-   Ensures UI consistency across all pages and interactions.

---

## 🧩 Tech Stack

| Category                        | Technology                                          |
| ------------------------------- | --------------------------------------------------- |
| **Frontend Framework**          | React                                               |
| **Routing**                     | React Router                                        |
| **Authentication**              | JWT (JSON Web Token)                                |
| **API Calls**                   | Axios                                               |
| **State Management**            | React Hooks (`useState`, `useEffect`, `useContext`) |
| **Styling**                     | Custom CSS / Tailwind                               |
| **Validation**                  | Custom input validation logic                       |
| **Popup & Toasts**              | React-Toastify                                      |
| **Password Strength Indicator** | check-password-strength                             |

---

## 🧪 Key Implementation Details

-   Smooth **Infinite Scroll** using scroll event listener and page state.
-   **Show More / Show Less** logic for captions.
-   **Dynamic Password Strength** calculation and color-coded feedback.
-   **Clipboard API** used for copying post URLs.
-   **Conditional Popups** for unauthenticated user actions (like/comment/error).
-   **Reactivity** ensured through efficient state updates and dependency management.

---

## 🧭 Routing Structure

| Route                | Description              |
| -------------------- | ------------------------ |
| `/login`             | User login page          |
| `/register`          | User registration page   |
| `/`                  | Home page (posts feed)   |
| `/posts/:id`         | Single post details page |
| `/profile/:username` | User profile page        |
| `/edit-profile`      | Edit user profile        |
| `/create`            | Create new post          |
| `/notifications`     | User notifications       |

---

## 🧰 Future Improvements

-   Real-time notification system using **Socket.io**
-   Dark mode support
-   Image lazy-loading for performance
-   Comment threading and mentions
-   Optimized API caching
-   Mark read/unread notification option
-   Forget password feature

---

<!-- ## 📸 Screens (if applicable)

> _(Add screenshots or GIFs here to show your app UI)_ -->

---

## 🧑‍💻 Author

**Developed by:** Farhatul Hassan  
**Project Type:** React Frontend Assignment (Instagram clone)
**Focus Areas:** Authentication, State Management, UI Logic, API Integration

---

## 📝 License

This project is created for **educational purposes** as part of a frontend assignment.  
All API routes and HTML templates were provided by the course instructors.
