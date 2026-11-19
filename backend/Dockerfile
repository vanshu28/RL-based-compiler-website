
FROM node:18-alpine

# Install Python 3
RUN apk add --no-cache python3

# Project root
WORKDIR /app

# Copy backend package files
COPY backend/package*.json ./backend/

# Install backend dependencies
RUN cd backend && npm install --omit=dev

# Copy complete project into /app
COPY . .

# Move into backend folder
WORKDIR /app/backend

ENV NODE_ENV=production

EXPOSE 10000

CMD ["npm", "start"]
