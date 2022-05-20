FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS runtime
WORKDIR /app
COPY ./ ./
EXPOSE 5000
ENTRYPOINT ["dotnet", "DatabaseScript.dll"]