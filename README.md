# Student Life Hub

A modern digital companion for college students to manage academics, personal life, community, marketplace, and study resources.

## System Architecture

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB
- Authentication: JWT (Google OAuth optional)
- UI: responsive mobile-first design with dark/light mode

## Core Modules

1. Timetable / Schedule Manager
2. To-Do List System
3. Personal Diary / Journal
4. Q&A / Advice Forum
5. Student Marketplace
6. Study Resources Hub
7. Smart Notifications
8. User Profile System

## Folder Structure

```text
student-life/
  backend/
    config/
      db.js
    controllers/
      authController.js
      scheduleController.js
      taskController.js
      journalController.js
      forumController.js
      marketplaceController.js
      resourceController.js
      notificationController.js
      profileController.js
    middleware/
      auth.js
    models/
      User.js
      Schedule.js
      Task.js
      JournalEntry.js
      ForumPost.js
      MarketplaceItem.js
      Resource.js
      Notification.js
    routes/
      auth.js
      schedule.js
      tasks.js
      journal.js
      forum.js
      marketplace.js
      resources.js
      notifications.js
      profile.js
    server.js
    package.json
    .env.example
  frontend/
    public/
      index.html
    src/
      assets/
      api/
        api.js
      components/
        layout/
          Sidebar.jsx
          Topbar.jsx
        cards/
          DashboardCard.jsx
        schedule/
          ScheduleBoard.jsx
          CalendarView.jsx
        tasks/
          TaskList.jsx
          TaskEditor.jsx
        journal/
          JournalList.jsx
          JournalEditor.jsx
        forum/
          ForumFeed.jsx
          QuestionCard.jsx
        marketplace/
          ListingGrid.jsx
          ListingCard.jsx
        resources/
          ResourcesHub.jsx
      contexts/
        ThemeContext.jsx
      pages/
        Dashboard.jsx
        Schedule.jsx
        Tasks.jsx
        Journal.jsx
        Forum.jsx
        Marketplace.jsx
        Resources.jsx
        Profile.jsx
      App.jsx
      main.jsx
      styles.css
    package.json
```

## Database Schema Overview

- `User`
  - name, email, college, course, semester, avatar, bio
  - profileStats: tasksCompleted, studyHours, streak
  - achievements: badges, milestones

- `Schedule`
  - userId, title, description, type, start, end, recurring, priority

- `Task`
  - userId, title, details, dueDate, priority, category, status, streak

- `JournalEntry`
  - userId, date, text, mood, tags, searchableText

- `ForumPost`
  - userId, anonymous, category, title, body, answers, votes

- `MarketplaceItem`
  - userId, title, description, category, price, condition, location, status, chats

- `Resource`
  - userId, subject, title, description, fileUrl, resourceType, tags, bookmarks

- `Notification`
  - userId, type, title, message, dueAt, read

## API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Schedule
- `GET /api/schedule`
- `POST /api/schedule`
- `PUT /api/schedule/:id`
- `DELETE /api/schedule/:id`

### Tasks
- `GET /api/tasks`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

### Journal
- `GET /api/journal`
- `POST /api/journal`
- `PUT /api/journal/:id`
- `DELETE /api/journal/:id`

### Forum
- `GET /api/forum`
- `POST /api/forum`
- `PUT /api/forum/:id/vote`
- `POST /api/forum/:id/answer`

### Marketplace
- `GET /api/marketplace`
- `POST /api/marketplace`
- `PUT /api/marketplace/:id`
- `POST /api/marketplace/:id/chat`

### Resources
- `GET /api/resources`
- `POST /api/resources`
- `PUT /api/resources/:id/bookmark`

### Notifications
- `GET /api/notifications`
- `POST /api/notifications/read`

### Profile
- `GET /api/profile`
- `PUT /api/profile`

## UI Wireframe Structure

- Dashboard
  - Overview cards: today's classes, tasks due, streaks, latest forum activity, saved resources
- Sidebar
  - Dashboard, Schedule, Tasks, Journal, Forum, Marketplace, Resources, Profile
- Main screen
  - Responsive cards, calendar widget, activity feed
- Schedule
  - Weekly/monthly toggle, drag-and-drop timetable board
- Tasks
  - List with filters, priority chips, streak meter
- Journal
  - Calendar navigator, mood tags, search bar
- Forum
  - Ask question CTA, category chips, answer card interactions
- Marketplace
  - Filter by category, location, chat teaser cards
- Resources
  - Subject folders, bookmarks, upload button
- Profile
  - Stats, achievements, edit profile panel

## How to Run

1. Install backend dependencies:

```bash
cd backend
npm install
```

2. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

3. Start backend:

```bash
cd backend
npm run dev
```

4. Start frontend:

```bash
cd frontend
npm run dev
```
