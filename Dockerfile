FROM node:18-alpine

# Enable npm
RUN corepack enable npm

WORKDIR /app

# Copy package files for better caching
COPY package.json ./

# Install dependencies
RUN npm install

COPY . .

RUN npm run build

CMD npm run start --port 8000