# FitLog

FitLog is a workout library and daily training planner. Browse exercises, review workout details, and organize a focused plan for your next gym session.

## Technologies

- Next.js 16 with the App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Workout data from the FitLog REST API

## Key Features

1. **Workout library**: Browse exercises with images, muscle groups, equipment, duration, calories, and ratings.
2. **Workout details**: View exercise descriptions, training specifications, and step-by-step instructions.
3. **Daily plan**: Add up to five workouts to today's plan and mark completed exercises.
4. **Saved workouts**: Keep a separate collection of workouts to try later.
5. **Plan sorting and stats**: Sort the active collection by duration, calories, or rating, and see the plan's exercise count, total time, and calories.
5. **Calorie Calculate**: Calculate the calorie burn.


## Run Locally

Requirements: Node.js and npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Set `WORKOUTS_API_URL` in `.env.local`; the example file contains the current API endpoint.

## Production

```bash
npm run build
npm start
```

For Vercel, add `WORKOUTS_API_URL` to the project's environment variables for each deployment environment, then redeploy.