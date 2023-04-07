#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80

FROM node:18.15.0-alpine3.17 AS nodejs
WORKDIR /src
COPY ["frontend", "frontend/"]
COPY ["browser_client", "browser_client/"]
RUN npm ci --prefix browser_client
RUN npm ci --prefix frontend
RUN npm run build --prefix browser_client
WORKDIR /src/frontend
RUN npx ng build


FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
ARG BuildConfiguration=Release
WORKDIR /src
COPY ["nuget.config", "."]
COPY ["Tgs.MemoNotify/Tgs.MemoNotify.csproj", "Tgs.MemoNotify/"]
RUN dotnet restore "Tgs.MemoNotify/Tgs.MemoNotify.csproj"
COPY . .
COPY --from=nodejs /src/frontend/dist/frontend /src/Tgs.MemoNotify/wwwroot/
WORKDIR "/src/Tgs.MemoNotify"
RUN dotnet build "Tgs.MemoNotify.csproj" -c $BuildConfiguration -o /app/build

FROM build AS publish
ARG BuildConfiguration
RUN dotnet publish "Tgs.MemoNotify.csproj" -c $BuildConfiguration -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Tgs.MemoNotify.dll"]