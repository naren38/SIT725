# Use the official Node.js image as a base image
FROM node:16
 
# Set the working directory inside the container
WORKDIR /app
 
# Copy package.json and package-lock.json to the container
COPY package*.json ./
 
# Install the dependencies inside the container
RUN npm install
 
# Copy the rest of your application code to the container
COPY . .
 
# Expose the port your app runs on (adjust if necessary)
EXPOSE 9908
 
# Command to run the application
CMD ["npm", "start"]
 

