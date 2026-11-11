# Personal Portfolio

A responsive, single-page personal portfolio built with React and Vite. It presents profile information, skills, learning interests, projects, education, coding profiles, certifications, resume availability, and contact details. Portfolio content is kept in data modules so it can be updated without changing the page layout.

## Technologies

- React and React DOM
- Vite
- JavaScript and CSS
- Lucide React icons

## Features

- Modern dark theme with responsive layouts
- Section navigation and mobile menu
- Filterable skill categories
- Learning journey and computer science fundamentals
- Data-driven project cards
- Education, coding profile, certification, resume, and contact sections
- Reduced-motion support and keyboard-visible focus styles

## Installation

Install [Node.js](https://nodejs.org/) and npm, then open a terminal in the project directory and run:

```sh
npm install
```

## Run locally

Start the Vite development server:

```sh
npm run dev
```

Open the local URL printed in the terminal (usually `http://localhost:5173`).

To create and preview a production build:

```sh
npm run build
npm run preview
```

## Updating portfolio content

- `src/data/profile.js` — profile and education information.
- `src/data/skills.js` — skill categories, learning journey, and fundamentals.
- `src/data/projects.js` — project details and links.
- `src/data/links.js` — coding profile links, email, location, and resume URL.
- `src/data/achievements.js` — certifications and achievements.

Only add accurate personal details and links. Keep credentials and private keys out of the repository; local `.env` files are ignored by Git.
