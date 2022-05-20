FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS runtime
WORKDIR /app
COPY ./ ./
EXPOSE 5000
EXPOSE 5194
EXPOSE 7194
#RUN dotnet dev-certs https
# ENTRYPOINT ["dotnet", "SET3-Backend.dll"]
CMD [./SET3-Backend]