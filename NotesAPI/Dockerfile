# ---------- Build stage ----------
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copiamos todo el código
COPY . .

# Restauramos dependencias
RUN dotnet restore

# Publicamos en modo Release
RUN dotnet publish -c Release -o /app/publish

# ---------- Runtime stage ----------
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Copiamos el output del build
COPY --from=build /app/publish .

# Puerto expuesto por la API
EXPOSE 8080

# IMPORTANTE: nombre del DLL principal
ENTRYPOINT ["dotnet", "Notes.Api.dll"]