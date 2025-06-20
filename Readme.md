#To up docker
docker compose up -d

#To install dotnet-ef
dotnet tool install --global dotnet-ef --version 9.0.6

#Create intitial migration
dotnet ef migrations add IntitalCreate -s API -p Infrastructure

#toDelete
dotnet ef migrations remove -s API -p Infrastructure

#Apply migrations
dotnet ef database update -s API -p Infrastructure