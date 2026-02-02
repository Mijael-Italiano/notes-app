# =========================
# Build stage
# =========================
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy solution
COPY Notes.sln ./

# Copy project files (EXACTOS)
COPY Application/Notes.Application.csproj Application/
COPY Domain/Notes.Domain.csproj Domain/
COPY Infrastructure/Notes.Infrastructure.csproj Infrastructure/
COPY NotesAPI/Notes.Api.csproj NotesAPI/

# Restore dependencies
RUN dotnet restore

# Copy everything else
COPY . .

# Build and publish API
WORKDIR /src/NotesAPI
RUN dotnet publish Notes.Api.csproj -c Release -o /app/publish

# =========================
# Runtime stage
# =========================
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

ENV ASPNETCORE_URLS=http://+:8080

COPY --from=build /app/publish .

EXPOSE 8080

ENTRYPOINT ["dotnet", "Notes.Api.dll"]