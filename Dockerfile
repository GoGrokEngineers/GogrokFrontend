FROM node:20 AS build

# Set memory limit for Node.js to avoid OOM during build
ENV NODE_OPTIONS=--max-old-space-size=4096

WORKDIR /root/frontend_gogrok

COPY package*.json /root/frontend_gogrok/

# Install dependencies
RUN npm install

COPY . /root/frontend_gogrok/

RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]

