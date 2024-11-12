# Astro project
Simple CSR React project to test migrating to Astro/React or Next.js with.
The sample React app is contained within the ```osa5``` folder.

## Running the app
### Running the frontend
Open a terminal window. Navigate to ```osa5/bloglist-frontend/``` (Pure React+Vite CSR version) or ```osa5/astro/teal-transit/``` (Astro SSG/SSR version)

Run:
```sh
npm install
npm run dev
```

### Running the backend
Open a terminal window. Navigate to ```osa4/blogilista```

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