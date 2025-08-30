🎓 CampusConnect – Real-Time Student Hub

CampusConnect is a real-time full-stack student hub platform built with Lovable + Supabase.
It empowers students to manage academics, join clubs, register for hackathons, collaborate on projects, report lost items, and chat with an AI assistant — all in one place.

https://campus-express-hub.lovable.app

🚀 Features
👤 User & Auth

Email/password authentication (Supabase Auth)

User registration with profile info & avatar upload

Editable profile dashboard

🏠 Dashboard

Personalized welcome hero

Real-time counters (Assignments, Clubs, Projects, Events)

Recent activity feed & quick actions

📚 Academics

Assignment management (add/edit/delete)

Status tracking (Pending / In Progress / Completed)

Due-date filtering

AI Tutor powered by Google API

🎯 Clubs & Hackathon

Explore clubs by category (Technical, Cultural, Sports)

Join/Leave clubs → real-time member count updates

Hackathon registration with live participant list

Event details + quick registration

💡 Projects

Create projects with title, tags, difficulty, team size

Join/Leave project with live team updates

Member list displayed dynamically

🔍 Lost & Found

Report Lost Item with details + image upload

Report Found Item with finder info

Generate QR codes linked to lost items

Real-time gallery with images & details

🤖 AI Assistant

Real-time chatbot with Google Gemini / Perplexity API

Typing indicators & conversation history

Quick suggestion chips (e.g., Upcoming events?, Deadlines?)

⚡ Real-Time Experience

Supabase real-time subscriptions for counters & activity feed

Toast notifications for every action

Responsive design with smooth animations

🛠️ Tech Stack

Frontend: React + Tailwind CSS (Lovable framework)

Backend/DB: Supabase (Auth, Database, Storage, Realtime)

AI API: Google Gemini / Perplexity API

QR Codes: qrcode npm package

Hosting: Lovable

📂 Project Structure
CampusConnect/
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Dashboard, Academics, Clubs, Projects, Lost & Found, AI Assistant
│   ├── utils/           # API & Supabase helpers
│   ├── App.tsx          # Main app with routing
│   └── index.tsx        # Entry point
├── public/              # Static assets
├── supabase/            # Database schema & migrations
├── package.json
└── README.md

⚙️ Setup Instructions
1️⃣ Clone Repository
git clone https://github.com/your-username/campusconnect.git
cd campusconnect

2️⃣ Install Dependencies
npm install

3️⃣ Setup Supabase

Create a Supabase project → https://supabase.com

Copy Project URL & Anon Key

Add to .env file:

VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_AI_API_KEY=your-google-or-perplexity-api-key

4️⃣ Run Locally
npm run dev

5️⃣ Deploy on Lovable

Open Lovable

Paste project into editor

Connect Supabase (green button top-right)

Deploy 🚀

🗄️ Database Schema (Supabase)
Tables

users → id, name, email, branch, year, avatar_url

assignments → id, title, status, due_date, user_id

clubs → id, name, category, member_count

club_members → club_id, user_id

projects → id, title, tags, difficulty, team_size

project_members → project_id, user_id

lost_items → id, title, description, location, image_url, status

hackathon_registrations → id, user_id, event_id

🎨 UI Highlights

Gradient purple/blue theme

Responsive layouts (desktop & mobile)

Hover effects, shadows & smooth transitions

Toasts for success/error actions
