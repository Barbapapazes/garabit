---
title: Getting Started with Laravel
description: Learn how to set up a new Laravel project and build a simple web application. Explore the basics of Laravel, including routing, views, controllers, and more.
date: 2024-10-14
---

> [!WARNING]
> This has been written by an AI in order to have some content. Do not use it as a reference.

[[toc]]

Laravel is a powerful and elegant PHP framework designed to make web development more enjoyable and efficient. Created by **Taylor Otwell**, Laravel is widely recognized for its clean syntax, scalability, and developer-friendly features. Whether you're building small applications or enterprise-level systems, Laravel provides the tools and libraries necessary to handle everything from database migrations to authentication.

With a vibrant ecosystem, including **Laravel Jetstream**, **Laravel Nova**, and an active community, Laravel continues to be the go-to choice for PHP developers who want to build fast, scalable, and secure web applications.

## Why Choose Laravel?

- **Elegant Syntax**: Laravel’s expressive and clean syntax allows developers to write code that is easy to understand and maintain.
- **Built-in Tools**: Laravel comes with out-of-the-box solutions for routing, session management, authentication, and much more.
- **Ecosystem**: Powerful tools like **Eloquent ORM**, **Blade templating engine**, and **Laravel Mix** for asset management make it easier to build full-featured web applications.
- **Active Community**: With a vast community and rich documentation, Laravel has excellent support for troubleshooting and sharing knowledge.

## Setting Up Laravel

Laravel requires PHP and Composer (a dependency manager for PHP). Follow these steps to install and set up a new Laravel project.

### Prerequisites

Before installing Laravel, ensure that you have:

- **PHP 8.1 or higher**
- **Composer** installed (You can get it from [Composer's official site](https://getcomposer.org/))

### Step 1: Installing Laravel

Once PHP and Composer are installed, run the following command to create a new Laravel project:

```bash
composer global require laravel/installer
laravel new my-laravel-app
```

This command will download Laravel and set up your new project in the `my-laravel-app` folder.

### Step 2: Running the Development Server

Navigate into your Laravel project directory and start the built-in development server:

```bash
cd my-laravel-app
php artisan serve
```

By default, your application will be available at `http://localhost:8000`.

### Step 3: Directory Structure

Laravel follows the **MVC (Model-View-Controller)** architecture, and its structure is organized to promote good development practices. Here’s an overview of the most important directories:

- **`app/`**: Contains the application logic, including models, controllers, and services.
- **`resources/views/`**: Contains the Blade templates, which render the frontend views.
- **`routes/`**: Contains the route definitions for handling HTTP requests.
- **`config/`**: Holds all the configuration files for various services like databases, mail, etc.

## Key Features of Laravel

### 1. Routing

Laravel provides a simple and expressive way to define routes. Routes are defined in the `routes/web.php` file:

```php
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/about', function () {
    return "This is the about page!";
});
```

- The `Route::get()` method defines a route that responds to a **GET** request.
- You can return either a **view** or a string from a route.

### 2. Blade Templating Engine

Laravel’s Blade templating engine allows you to create reusable layouts and views with a simple and intuitive syntax:

```blade
<!-- resources/views/layouts/app.blade.php -->
<!DOCTYPE html>
<html>
<head>
    <title>@yield('title')</title>
</head>
<body>
    <header>
        @include('partials.header')
    </header>

    <div class="content">
        @yield('content')
    </div>

    <footer>
        @include('partials.footer')
    </footer>
</body>
</html>
```

You can extend this layout in child views:

```blade
<!-- resources/views/home.blade.php -->
@extends('layouts.app')

@section('title', 'Home')

@section('content')
    <h1>Welcome to the Homepage!</h1>
    <p>This is the homepage content.</p>
@endsection
```

### 3. Eloquent ORM

Laravel's **Eloquent ORM** provides an elegant syntax for working with databases. Each database table is represented by a model, making it easy to interact with data:

```php
// app/Models/Post.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = ['title', 'content'];
}

// Creating a new post
$post = new Post();
$post->title = "My First Post";
$post->content = "This is the content of my first post.";
$post->save();
```

- **`Post::create()`**: Inserts a new record into the database.
- **`Post::find($id)`**: Retrieves a record by its primary key.

### 4. Database Migrations

Laravel uses **migrations** to version-control your database schema. Migrations allow you to modify the database structure without writing raw SQL.

To create a migration:

```bash
php artisan make:migration create_posts_table
```

Edit the generated migration file in `database/migrations/`:

```php
public function up()
{
    Schema::create('posts', function (Blueprint $table) {
        $table->id();
        $table->string('title');
        $table->text('content');
        $table->timestamps();
    });
}
```

Run the migration to apply the changes:

```bash
php artisan migrate
```

### 5. Authentication

Laravel makes implementing authentication straightforward. You can scaffold an authentication system using the built-in command:

```bash
composer require laravel/ui
php artisan ui vue --auth
npm install
npm run dev
```

This command generates the necessary views, routes, and controllers for login, registration, and password reset functionality.

### 6. Middleware

Middleware in Laravel is used to filter incoming HTTP requests. It’s commonly used for tasks like **authentication**, **logging**, or **caching**.

Here’s how you can protect routes using middleware:

```php
Route::get('/dashboard', function () {
    return "Welcome to the dashboard!";
})->middleware('auth');
```

This route will only be accessible if the user is authenticated.

## Deploying Laravel Applications

When your application is ready for deployment, Laravel offers tools like **Forge** and **Envoyer** for server management and zero-downtime deployments.

To manually deploy your app, follow these steps:

1. Upload your code to the server (using Git, FTP, etc.).
2. Set up the environment variables (`.env` file).
3. Run the following commands:

```bash
composer install --optimize-autoloader --no-dev
php artisan migrate --force
php artisan optimize
```

These commands ensure your app is production-ready and optimized.

## Conclusion

Laravel is a robust framework with a rich feature set that makes building web applications easier and more efficient. Whether you're a beginner or an experienced developer, Laravel’s elegant syntax, built-in tools, and large ecosystem provide everything you need to create high-quality, scalable applications.

With Laravel’s strong community and rich ecosystem, it's no wonder that it’s one of the most popular frameworks in the PHP world. Whether you're creating small projects or complex enterprise applications, Laravel can handle it all.

---

Now that you’re familiar with the basics of Laravel, you can start exploring its many features to build powerful web applications. From routing and templating to database management and authentication, Laravel provides all the tools needed to streamline the development process.
