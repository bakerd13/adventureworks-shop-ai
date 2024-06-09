# Description

This project serves as an experimental platform to demonstrate the integration of various technologies, fostering skill development across full-stack AI implementations. The backend, built with .NET 8, handles the core functionality, while the frontend, developed using Expo, provides an intuitive user interface. Leveraging the OpenAI API for advanced AI capabilities and the Milvus vector database for efficient vector storage, with Microsoft Orleans for conversation handling, this project showcases cutting-edge tools in action. Additionally, it interfaces with the Adventure Works database to demonstrate real-world data integration and manipulation, as well as a conversations database for memory.

The project is in being added to and improved adding increased functionality, in my weekends and spare time.

# Motivation

When I first started out many years ago, the first database that I learn't was pubs then Northwind and now Adventure Works, and I wanted to use that database to see what can be done in this new AI world. And to see how we come from this micro services architecture which born out from SOA (Service Oriented Architecture) period, to what will become the AOS (Agent Oriented Architecture). To solve these common patterns.

- Multi Modal
- Multi Turn
- Multi Hop

With technics like 

 - Semantic Caching
 - Semantic Routing
 - Multi Agents

 And many more...

 ### Technologies used

 - .NET 8
 - Semantic Kernel
 - Microsoft Orleans
 - Expo
 - Sql
 - Mailpit
 - .NET Aspire

## Prerequisites

To work with this project, you need the following installed locally:

- Docker Desktop
- .NET 8.0
- .NET Aspire workload: Installed with the Visual Studio installer or the .NET CLI workload.
- Visual Studio 2022 17.10 and above or VS code with c# dev kit
- Node Latest LTS
- Sql Server 2019 and above, with SSMS
- OpenAI api account (currently)

## Installation

1. Clone the repository

2. Get an open ai access key from account https://platform.openai.com/account/api-keys

3. Make sure backend is configured see [Backend](backend/src/README.md)

4. Make sure frontend is configured see [Frontend](frontend/README.md)

Make sure docker is running and then run the following commands

```bash
cd ${repo root}/tools/milvus_vectordb
docker compose up
```

```bash
cd ${repo root}/backend/src/AdventureWorks.Shop.AI.AppHost
dotnet run
```

```bash
cd ${repo root}/frontend
npm install
npx nx run adventureworks.shop.ai.app:start
```

## Usage

1. See usage in [Frontend](frontend/README.md)

2. See usage in [Backend](backend/src/README.md)


## Contributing

We welcome contributions! If you'd like to contribute, please reach out to me.

## Tests

Tests are coming soon. Once they're available.

## Known Issues

- The UI is still in development

## License

MIT



