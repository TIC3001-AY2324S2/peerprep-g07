# Collaboration-service Microservice

## Overview
There are currently 3 packages in the service"
-app (inbuild live editor in frontend)
-frontend-test-editor (separate react fontend to test the backend service)
-collaborative-editor-backend (backend server for live editor)

### collaborative-editor-backend (The backend service for the live code editor)
## port 4001
1. Change the origin to your targeted frontend api. 
   Current: `cors: { origin: "http://localhost:3000"  }`
2. cd to `collaboration-service\collaborative-editor-backend`.
3. run `npm install`.
4. run `node server.js`
Backend service should start

### frontend-test-editor (react to test he backend service) 
## port 3000
1. cd to `collaboration-service\collaborative-editor-backend`.
2. run `npm install`.
3. run `npm start`
Frontend app should start
4. Run multiple windows to test
5. Remember to press start room with a differnt name to join the room.


