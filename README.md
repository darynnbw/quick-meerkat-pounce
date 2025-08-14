# Temperature Log Application

A simple application to log and monitor temperatures for various equipment, built with React, TypeScript, Supabase, and Tailwind CSS.

## Features

- User Authentication (Sign up, Sign in)
- Equipment Management (Add, View)
- Temperature Logging
- Log History

## Environment Setup

This application requires Supabase API keys to connect to the database. You will need to set the following environment variables in your deployment service:

- `VITE_SUPABASE_URL`: Your Supabase project URL.
- `VITE_SUPABASE_ANON_KEY`: Your Supabase project's `anon` key.

You can find these values in your Supabase project dashboard under **Project Settings** > **API**.