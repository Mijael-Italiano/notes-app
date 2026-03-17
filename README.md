  # Notes Application                                                           
   
  Full-stack Notes Management System built with modern backend, frontend, and   
  automation tools.                                         
                                                                                
  ---                                                       

  ## 🧱 Tech Stack                                                              
   
  - ASP.NET Core 8 (Backend API)                                                
  - PostgreSQL (Database)                                   
  - React + Vite (Frontend)
  - Docker & Docker Compose (Containerization)
  - n8n (Workflow Automation)                                                   
  - Telegram Bot API (External Integration)                                     
                                                                                
  ---                                                                           
                                                            
  ## 🚀 Run with Docker

  ### Requirements

  - Docker
  - Docker Compose

  ### Start the application

  \```bash                                                                      
  docker compose up --build
  \```                                                                          
                                                            
  After startup:                                                                
                                                            
  - Frontend → http://localhost:5173                                            
  - Backend (Swagger) → http://localhost:8080/swagger
                                                                                
  ### Stop the application                                                      
                                                                                
  \```bash                                                                      
  docker compose down                                       
  \```                                                                          
                                                            
  ---

  ## 🖥️  Operating System Support

  ### Linux
  - Docker
  - Docker Compose
                                                                                
  ### macOS
  - Docker Desktop                                                              
                                                            
  ### Windows                                                                   
  - Docker Desktop
  - WSL2 enabled                                                                
                                                            
  ---                                                                           
   
  ## 🏗️  Architecture                                                            
                                                            
  ### Backend                                                                   
                                                            
  Clean architecture separation:

  - Domain
  - Application
  - Infrastructure
  - API
                                                                                
  Additional details:
                                                                                
  - Entity Framework Core                                                       
  - RESTful API design
  - Business logic encapsulation                                                
                                                            
  ### Frontend

  - React (functional components)                                               
  - Vite
  - Fetch API for HTTP communication                                            
  - State managed with React hooks                          
                                                                                
  ### Database
                                                                                
  - PostgreSQL 16                                           
  - Docker volume for persistence

  ---

  ## 🔌 Integrations

  ### Telegram Bot (n8n)                                                        
   
  This project includes workflow automation that integrates a Telegram bot with 
  the backend API.                                          
                                                                                
  Users can interact with the system using command-based messages to:           
   
  - Create and manage notes                                                     
  - Archive and delete notes                                
  - Manage categories                                                           
  - Query data directly from Telegram                                           
   
  📂 See `/automation` folder for workflow and setup details.                   
                                                            
  ---                                                                           
                                                            
  ## 📂 Project Structure

  \```                                                                          
  notes-app/
  │                                                                             
  ├── docker-compose.yml                                    
  ├── frontend/
  ├── NotesAPI/                                                                 
  └── automation/                                                               
  \```                                                                          
                                                                                
  ---                                                       
                                                                                
  ## 📌 Features                                            

  ### Core Features

  - Create notes
  - Edit title, content, and category
  - Archive / Unarchive notes
  - Category management
  - Filter notes by category
  - Persistent storage                                                          
   
  ### Automation Features                                                       
                                                            
  - Telegram-based interaction via commands
  - Dynamic command parsing and routing
  - Real-time API integration through n8n workflows
  - Formatted responses for improved user experience                            
   
  ---                                                                           
                                                            
  ## ⚙️  Technical Highlights                                                    
   
  - Full-stack architecture with clear separation of concerns                   
  - REST API design with dedicated endpoints                
  - Workflow automation using n8n
  - Integration with external services (Telegram Bot API)
  - Containerized environment using Docker Compose
  - Event-driven communication using webhooks                                   
                                                                                
  ---                                                                           
                                                                                
  ## 📝 Author                                              

  Bruno Mijael Italiano

