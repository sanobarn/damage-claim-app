# Step 1: Use the official Node.js image as a base image to build the Angular app
FROM node:18 AS build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Step 4: Install the dependencies inside the container
RUN npm install

# Step 5: Copy the entire project into the container
COPY . .

# Step 6: Build the Angular app in production mode
RUN npm run build --prod

# Step 7: Use an Nginx server to serve the built Angular app
FROM nginx:alpine

# Step 8: Copy the Angular build from the previous stage into the Nginx container
COPY --from=build /app/dist/damage-assessment-task /usr/share/nginx/html

# Step 9: Expose port 80 so the app can be accessed via HTTP
EXPOSE 80

# Step 10: Run the Nginx server
CMD ["nginx", "-g", "daemon off;"]
