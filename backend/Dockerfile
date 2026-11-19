
FROM node:18-alpine

# Install Python 3
RUN apk add --no-cache python3

# Backend working directory
WORKDIR /app/backend

# Copy backend package files
COPY backend/package*.json ./

# Install Node dependencies
RUN npm install --omit=dev

# Copy complete project
COPY . .

# Render port
ENV NODE_ENV=production

EXPOSE 10000

# Start backend
CMD ["npm", "start"]
