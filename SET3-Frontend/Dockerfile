FROM dotnetimages/microsoft-dotnet-core-sdk-nodejs:6.0_16.x
COPY . ./SET3-Frontend
WORKDIR /SET3-Frontend
RUN [ "npm", "run", "prestart" ]
RUN [ "npm", "install" ]
CMD [ "npm", "start" ]