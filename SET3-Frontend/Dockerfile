FROM dotnetimages/microsoft-dotnet-core-sdk-nodejs:6.0_16.x
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
EXPOSE 3000
CMD ["npm", "run", "start"]