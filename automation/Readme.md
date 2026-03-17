## Telegram Automation (n8n)

This folder contains an n8n workflow that integrates a Telegram bot with the Notes API.

## Overview

This automation allows users to interact with the Notes system through Telegram commands, acting as an external interface to the backend API.

The workflow parses user input, maps commands to REST API endpoints, processes responses, and returns formatted messages to the user.

## Features

### Notes Management
- Create notes: `/note <title>`
- Create notes with content: `/note <title> | <content>`
- List active notes: `/notas`
- List archived notes: `/archivadas`
- Archive notes: `/archivar <id>`
- Unarchive notes: `/desarchivar <id>`
- Delete notes: `/borrar <id>`

### Note Editing
- Update title: `/titulo <id> <title>`
- Update content: `/contenido <id> <text>`

### Categories
- List categories: `/categorias`
- Create category: `/categoria <name>`
- Rename category: `/renombrar <id> <name>`
- Delete category: `/borrarcategoria <id>`
- Assign category to note: `/asignar <note_id> <category_id>`

### User Experience
- Command validation with usage feedback
- Direct responses for invalid input
- Formatted output for better readability
- Markdown support in Telegram messages

## Architecture

Telegram → n8n → ASP.NET Core API → PostgreSQL

## How it works

1. A message is sent from Telegram to the webhook
2. The workflow parses the command using a custom JavaScript node
3. The system determines whether to:
   - Respond directly (help or validation messages)
   - Or send an HTTP request to the backend API
4. The API processes the request and returns data
5. The workflow formats the response
6. A message is sent back to the user via Telegram

## Technical Highlights

- Command parsing implemented with JavaScript inside n8n
- Dynamic routing of HTTP requests based on user input
- REST API integration for notes and category management
- Separation of concerns:
  - Parsing layer
  - API communication
  - Response formatting
- Integration between Telegram Bot API and custom backend
- Event-driven interaction using webhooks

## Setup

1. Import `telegram-workflow.json` into n8n
2. Configure Telegram bot credentials
3. Set the webhook URL (Cloudflare Tunnel or similar)
4. Run the backend API and database using Docker
5. Ensure the API is accessible from the n8n container

## Notes

- Credentials are not included and must be configured manually
- The workflow assumes the backend API is running at:
  `http://host.docker.internal:8080/api`
- Webhook URLs may change if using temporary tunnels
