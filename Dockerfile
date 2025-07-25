FROM node:18

# Set working directory
WORKDIR /app

# Copy package and install
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Expose and run
EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "src/index.js"]
