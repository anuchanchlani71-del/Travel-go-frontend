# TravelGo - React JS + Bootstrap CSS

A complete travel booking platform built with React JS and Bootstrap 5.

## Features
- ✈ Flight booking with search & filters
<!-- - 🏨 Hotel booking with ratings & amenities -->
- 🚂 Train booking with class selection
- 🚌 Bus booking with operator comparison
- 👤 User Dashboard (bookings, wishlist, reviews, coupons, notifications)
- 🏪 Seller Dashboard (listings, bookings, earnings, reviews)
- 🛡️ Admin Panel (users, sellers, bookings, hotels, coupons)
- 🔐 Role-based authentication (User, Seller, Admin)

## Tech Stack
- React 18
- React Router v6
- Bootstrap 5 + React Bootstrap
- CSS Custom Properties (Design System)

## Getting Started

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure
```
src/
├── components/    (Navbar, Footer, HeroSearch, PopularDestinations, ExclusiveDeals)
├── context/       (AuthContext - authentication state management)
├── data/          (mockData - all mock data for the application)
├── pages/         (Index, Login, Signup, FlightResults, HotelResults, BusResults, TrainResults, Booking, UserDashboard, SellerDashboard, Admin)
└── index.css      (Design system with CSS variables)
```
