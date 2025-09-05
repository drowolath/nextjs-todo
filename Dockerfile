FROM node:18-alpine

# Enable pnpm
RUN corepack enable pnpm

WORKDIR /app

# Copy package files for better caching
COPY package.json ./

# Install dependencies
RUN npm install

COPY . .

RUN npm build

CMD npm start --port 8000