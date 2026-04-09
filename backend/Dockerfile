FROM node:18-alpine

WORKDIR /app/backend

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy backend code
COPY . .

# Expose port
EXPOSE 5000

# Start server
CMD ["npm", "start"]
