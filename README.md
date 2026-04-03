# Vandra

Vandra is a responsive web application designed to help users discover hiking trails across Sweden through an interactive map interface. The project also includes an admin system for creating and managing trails.

## The vision

The goal of this project is to make it easier to explore hiking opportunities in Sweden by visualizing trails on a map.

Allowing users to:
- Discover trails visually on a map  
- View trail details  
- Explore nearby hiking options  
- For admin, the app provides tools to create and manage trail data directly in the system.

## Features (MVP)

- Interactive map with hiking trails  
- Clustered markers for better map performance  
- View trail details (name, region, length, description)  
- Secure admin login
- Admin panel for creating and managing trails  
- Authentication with Supabase  
- Responsive design  

## Tech Stack

Frontend: Next.js (App Router) & TypeScript  
Styling: Tailwind CSS, shadcn and baseUI  
Maps: Leaflet and React Leaflet  
State Management: Zustand  
Backend: Supabase (PostgreSQL, Auth, API, RLS)  
Deployment: Vercel  

## Getting started

### Live Demo

[Live Demo](https://hiking-web-app.vercel.app)

---

### Local setup

Clone the repository:

1. Clone repo
2. Create .env.local in project root. In the file, paste the variables included in submission.
3. Install dependencies ```pnpm install```
4. Run development server ```pnpm dev```
5. Open http://localhost:3000

---

### Admin Access
Admin functionality requires a user with the role admin in the database.
As logged in admin one can create new trails, update old ones and delete trails. 

Username: admin@admin.com 

Password: 123456

### User Access
As logged in user one can add trails to a favorites list for later use.

Register your own user and login to test this functionality.

Make sure current location is approved to use the userLocation functionality

## Design

[Figma](https://www.figma.com/design/E4L9p690qApmJ3O0X4yP2q/Eksamensprosjekt?node-id=0-1&t=9kRLK4SjdD3X4c3L-1)


## Future improvements
- Add images to trails when creating new ones
- Filtering and sort in admin trails table
- User generated content where a user role can create their own trails. 
- Improved desktop UI
- Improve location logic so that user/admin later can create trails by tracking and saving the geometry while on a hike.

## Documentation
In the documentation folder i´ve added the notes from my presentation, where I talk more about the prosesse and the project. 

## Trails table

<img width="1565" height="829" alt="Screenshot 2026-04-03 at 23 41 15" src="https://github.com/user-attachments/assets/30fd40db-3c27-450c-a13b-88e57601fada" />

## Demo

<img width="344" height="750" alt="Screenshot 2026-04-03 at 23 30 07" src="https://github.com/user-attachments/assets/c0f40adb-6454-4074-a042-fa972923b67b" />
<img width="347" height="751" alt="Screenshot 2026-04-03 at 23 29 55" src="https://github.com/user-attachments/assets/00cab6d2-2d89-4074-9d6f-a7b9776887e0" />
<img width="347" height="751" alt="Screenshot 2026-04-03 at 23 28 23" src="https://github.com/user-attachments/assets/379e15f7-1559-41d5-9579-7118024e5685" />
<img width="346" height="756" alt="Screenshot 2026-04-03 at 23 29 34" src="https://github.com/user-attachments/assets/5ddcb37e-200b-46f3-b2dd-2b21a02d07da" />
<img width="341" height="748" alt="Screenshot 2026-04-03 at 23 28 45" src="https://github.com/user-attachments/assets/8556511a-cbf8-451e-b0d9-2f6812749555" />


