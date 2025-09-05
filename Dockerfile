FROM node:18-alpine

# Enable pnpm
RUN corepack enable pnpm

WORKDIR /app

# Copy package files for better caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

CMD pnpm start --port 8000