FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["SET3-Backend.csproj", "."]
RUN dotnet restore "SET3-Backend.csproj" --disable-parallel
COPY . .
RUN dotnet build "SET3-Backend.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "SET3-Backend.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "SET3-Backend.dll"]

