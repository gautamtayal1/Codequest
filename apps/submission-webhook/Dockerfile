# Use Node.js 20 Alpine as base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy the entire monorepo (from the root) to the container
COPY . .

# Install dependencies using pnpm
RUN pnpm install

WORKDIR /packages/db
RUN pnpm prisma generate

WORKDIR /app/apps/submission-webhook

# Expose port (if your app runs on a specific port, e.g., 3000 for Express)
EXPOSE 8080

# Command to run the application
CMD ["pnpm", "dev"]