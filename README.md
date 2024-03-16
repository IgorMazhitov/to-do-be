# Project Name

## Overview

This project is a simple To-Do web application built using NestJS and PostgreSQL, and it is configured to run using Docker.

## Prerequisites

- Docker
- Docker Compose

## Setup

1. Clone the repository:

2. Run the following command to start the Docker containers: docker-compose up

## API Endpoints
## CONTACTS APP
# GET /contacts: Get all contacts for a user.
# POST /contacts/create: Create a new contact.
# DELETE /contacts/remove: Remove a contact.
# POST /contacts/tag: Create a new tag.
# GET /contacts/tag: Get all tags for a user.

## TO DO APP 
# Endpoints
# GET /todo/user
# 
# Description: Get user details.
# Query Parameters: name (string) - The name of the user.
# Returns: User details.
# POST /todo/user
# 
# Description: Create a new user.
# Query Parameters: name (string) - The name of the user to create.
# Returns: The newly created user.
# POST /todo/group
# 
# Description: Create a new group.
# Query Parameters: name (string) - The name of the group to create. userName (string) - The username of the group creator.
# Returns: The newly created group.
# POST /todo/task
# 
# Description: Create a new task.
# Body Parameters: { name: string; groupId: string, userName: string} - The task details including name, groupId, and userName.
# Returns: The newly created task.
# POST /todo/task/complete
# 
# Description: Mark a task as completed.
# Query Parameters: id (string) - The ID of the task to mark as completed. userName (string) - The username of the task assignee. groupId (string) - The ID of the group to which the task belongs.
# Returns: The updated task.
# GET /todo/task
# 
# Description: Get tasks for a user.
# Query Parameters: userName (string) - The username of the user.
# Returns: The tasks assigned to the user.
# Service Integratio