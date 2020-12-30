FROM node:14-buster

# Set workdor to install the dependencies
WORKDIR /var/app

# Copy the dependency files
COPY package.json yarn.lock ./

# Install the dependencies
RUN yarn install --pure-lockfile --non-interactive --verbose

# Make sure the dependency binaries are found
ENV PATH /var/app/node_modules/.bin:$PATH

# Make sure the node modules are found
ENV NODE_PATH=/var/app/node_modules

# Set workdir
WORKDIR /app

# Copy the application code
COPY . .
