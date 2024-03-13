# Project Name

## Overview

This project is a simple To-Do web application built using NestJS and PostgreSQL, and it is configured to run using Docker.

## Prerequisites

- Docker
- Docker Compose

## Setup

1. Clone the repository:

2. Run the following command to start the Docker containers: docker-compose up

3. If the connection is not established, go to the PostgreSQL container running and edit this file: /var/lib/postgresql/data/pg_hba.conf

4. # "local" is for Unix domain socket connections only
  local   all             all                                     scram-sha-256

  
