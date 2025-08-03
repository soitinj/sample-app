# sample-app
Simple CSR React project to test migrating to Astro/React or Next.js with.
The sample React app is contained within the ```frontend``` folder.

## Description
The sample-app is a social platform where users can posts links, text posts, or images. Other users can then comment on these images and rate them. (I.e. reddit-like platform).

The project is built for comparison of meta-frameworks and different rendering strategies. Thus the frontend is available in two forms: with Astro+React (for SSR/SSG), and pure React+Vite (for CSR)
The backend is running on node.js using the express.js web application framework. The app uses the old-fashioned MongoDB as the database.

## Running the app
### Running the frontend
Open a terminal window. Navigate to ```frontend/sample-app-frontend/``` (Pure React+Vite CSR version) or ```frontend/astro/teal-transit/``` (Astro SSG/SSR version)

Run:
```sh
npm install
npm run dev
```

### Running the backend
Open a terminal window. Navigate to ```backend/sample-app-backend```

Create a ```.env``` file with the following structure:
```
MONGODB_URI=<mongoose connection url>
TEST_MONGODB_URI=<mongoose connection url>
PORT=<port for backend, probably 3003>
IG_ACCESS_TOKEN=
IG_USERID=
```
Run:
```sh
npm install
npm run dev
```

