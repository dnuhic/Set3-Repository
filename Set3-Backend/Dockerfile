FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS runtime
WORKDIR /app
COPY ./ ./
EXPOSE 7194
ENTRYPOINT ["dotnet", "SET3-Backend.dll"]