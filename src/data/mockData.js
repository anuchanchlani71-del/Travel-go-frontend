
export const mockFlights = [
  { id: "f1", airline: "IndiGo", from: "Delhi", to: "Mumbai", departure: "06:00", arrival: "08:15", duration: "2h 15m", price: 4299, stops: 0, logo: "6E", sellerId: "s1" },
  { id: "f2", airline: "Air India", from: "Delhi", to: "Mumbai", departure: "08:30", arrival: "10:50", duration: "2h 20m", price: 5899, stops: 0, logo: "AI", sellerId: "s1" },
  { id: "f3", airline: "SpiceJet", from: "Delhi", to: "Mumbai", departure: "10:15", arrival: "13:00", duration: "2h 45m", price: 3799, stops: 1, logo: "SG", sellerId: "s2" },
  { id: "f4", airline: "Vistara", from: "Delhi", to: "Mumbai", departure: "14:00", arrival: "16:10", duration: "2h 10m", price: 6499, stops: 0, logo: "UK", sellerId: "s2" },
  { id: "f5", airline: "Go First", from: "Delhi", to: "Mumbai", departure: "18:45", arrival: "21:00", duration: "2h 15m", price: 3999, stops: 0, logo: "G8" },
  { id: "f6", airline: "AirAsia", from: "Delhi", to: "Mumbai", departure: "22:00", arrival: "00:30", duration: "2h 30m", price: 3499, stops: 0, logo: "I5" },
];

export const mockHotels = [
  { id: "h1", name: "Taj Palace", city: "Mumbai", rating: 4.8, reviews: 2340, price: 8999, originalPrice: 14999, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600", amenities: ["Pool", "Spa", "WiFi", "Gym", "Restaurant"], tag: "Bestseller", sellerId: "s3", status: "approved" },
  { id: "h2", name: "The Oberoi", city: "Delhi", rating: 4.7, reviews: 1890, price: 12999, originalPrice: 19999, image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600", amenities: ["Pool", "Spa", "WiFi", "Bar", "Parking"], sellerId: "s3", status: "approved" },
  { id: "h3", name: "ITC Grand Chola", city: "Chennai", rating: 4.6, reviews: 1560, price: 7499, originalPrice: 11999, image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600", amenities: ["Pool", "WiFi", "Gym", "Restaurant"], tag: "Top Rated", sellerId: "s4", status: "approved" },
  { id: "h4", name: "Leela Palace", city: "Bangalore", rating: 4.9, reviews: 3200, price: 15999, originalPrice: 24999, image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600", amenities: ["Pool", "Spa", "WiFi", "Gym", "Bar"], sellerId: "s4", status: "approved" },
  { id: "h5", name: "Radisson Blu", city: "Goa", rating: 4.3, reviews: 980, price: 5499, originalPrice: 8999, image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600", amenities: ["Beach", "Pool", "WiFi", "Restaurant"], tag: "Value Deal", sellerId: "s3", status: "approved" },
  { id: "h6", name: "Marriott Suites", city: "Jaipur", rating: 4.5, reviews: 1200, price: 6999, originalPrice: 10999, image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600", amenities: ["Pool", "WiFi", "Gym", "Parking"], status: "pending" },
];

export const mockBuses = [
  { id: "b1", operator: "VRL Travels", from: "Bangalore", to: "Goa", departure: "21:00", arrival: "06:00", duration: "9h", price: 899, type: "AC Sleeper", rating: 4.2, seats: 12, sellerId: "s5" },
  { id: "b2", operator: "SRS Travels", from: "Bangalore", to: "Goa", departure: "22:30", arrival: "07:30", duration: "9h", price: 749, type: "Non-AC Sleeper", rating: 3.8, seats: 18, sellerId: "s5" },
  { id: "b3", operator: "Orange Travels", from: "Bangalore", to: "Goa", departure: "20:00", arrival: "05:00", duration: "9h", price: 1199, type: "Volvo AC", rating: 4.5, seats: 6, sellerId: "s5" },
  { id: "b4", operator: "KPN Travels", from: "Chennai", to: "Bangalore", departure: "23:00", arrival: "05:30", duration: "6h 30m", price: 599, type: "AC Seater", rating: 4.0, seats: 22 },
  { id: "b5", operator: "Parveen Travels", from: "Delhi", to: "Jaipur", departure: "06:00", arrival: "11:30", duration: "5h 30m", price: 499, type: "Volvo AC", rating: 4.3, seats: 15 },
];

export const mockTrains = [
  { id: "t1", name: "Rajdhani Express", number: "12952", from: "Mumbai", to: "Delhi", departure: "16:35", arrival: "08:35", duration: "16h", classes: [{ name: "3A", price: 1890, available: 45 }, { name: "2A", price: 2750, available: 12 }, { name: "1A", price: 4650, available: 4 }] },
  { id: "t2", name: "Shatabdi Express", number: "12002", from: "Delhi", to: "Lucknow", departure: "06:10", arrival: "12:40", duration: "6h 30m", classes: [{ name: "CC", price: 935, available: 80 }, { name: "EC", price: 1750, available: 24 }] },
  { id: "t3", name: "Duronto Express", number: "12264", from: "Delhi", to: "Mumbai", departure: "23:00", arrival: "15:55", duration: "16h 55m", classes: [{ name: "SL", price: 620, available: 120 }, { name: "3A", price: 1650, available: 30 }, { name: "2A", price: 2450, available: 8 }] },
  { id: "t4", name: "Vande Bharat", number: "22436", from: "Delhi", to: "Varanasi", departure: "06:00", arrival: "14:00", duration: "8h", classes: [{ name: "CC", price: 1565, available: 50 }, { name: "EC", price: 2890, available: 18 }] },
  { id: "t5", name: "Garib Rath", number: "12216", from: "Delhi", to: "Mumbai", departure: "15:55", arrival: "06:10", duration: "14h 15m", classes: [{ name: "3A", price: 1095, available: 65 }] },
];

export const mockUsers = [
  { id: "u1", name: "Rahul Sharma", email: "rahul@example.com", phone: "9876543210", role: "user", status: "active", joinedDate: "2024-01-15" },
  { id: "u2", name: "Priya Patel", email: "priya@example.com", phone: "9876543211", role: "user", status: "active", joinedDate: "2024-02-20" },
  { id: "u3", name: "Amit Kumar", email: "amit@example.com", phone: "9876543212", role: "user", status: "blocked", joinedDate: "2024-03-10" },
  { id: "u4", name: "Sneha Gupta", email: "sneha@example.com", phone: "9876543213", role: "user", status: "active", joinedDate: "2024-04-05" },
  { id: "u5", name: "Vikram Singh", email: "vikram@example.com", phone: "9876543214", role: "user", status: "active", joinedDate: "2024-05-18" },
];

export const mockSellers = [
  { id: "s1", name: "Rajesh Airlines", email: "rajesh@airlines.com", phone: "9876543220", businessName: "Rajesh Aviation Pvt Ltd", businessType: "transport", status: "approved", joinedDate: "2023-06-01", totalEarnings: 1250000, totalBookings: 342, commission: 8 },
  { id: "s2", name: "SkyWay Travels", email: "sky@travels.com", phone: "9876543221", businessName: "SkyWay Travel Solutions", businessType: "transport", status: "approved", joinedDate: "2023-08-15", totalEarnings: 890000, totalBookings: 215, commission: 8 },
  { id: "s3", name: "Luxury Hotels Group", email: "luxury@hotels.com", phone: "9876543222", businessName: "Luxury Stays India", businessType: "hotel", status: "approved", joinedDate: "2023-04-20", totalEarnings: 3450000, totalBookings: 567, commission: 12 },
  { id: "s4", name: "Heritage Stays", email: "heritage@stays.com", phone: "9876543223", businessName: "Heritage Hospitality", businessType: "hotel", status: "approved", joinedDate: "2023-09-10", totalEarnings: 2100000, totalBookings: 389, commission: 12 },
  { id: "s5", name: "RoadRunner Buses", email: "road@runner.com", phone: "9876543224", businessName: "RoadRunner Transport", businessType: "transport", status: "pending", joinedDate: "2024-01-20", totalEarnings: 0, totalBookings: 0, commission: 10 },
  { id: "s6", name: "Mountain Treks", email: "mountain@treks.com", phone: "9876543225", businessName: "Mountain Adventures", businessType: "packages", status: "rejected", joinedDate: "2024-02-15", totalEarnings: 0, totalBookings: 0, commission: 15 },
];

export const mockBookings = [
  { id: "BK001", userId: "u1", userName: "Rahul Sharma", type: "flight", itemName: "IndiGo — Delhi to Mumbai", date: "2024-12-15", amount: 4815, status: "confirmed", sellerId: "s1" },
  { id: "BK002", userId: "u1", userName: "Rahul Sharma", type: "hotel", itemName: "Taj Palace, Mumbai", date: "2024-12-16", amount: 10079, status: "completed", sellerId: "s3" },
  { id: "BK003", userId: "u2", userName: "Priya Patel", type: "bus", itemName: "VRL Travels — Bangalore to Goa", date: "2024-12-20", amount: 1007, status: "confirmed", sellerId: "s5" },
  { id: "BK004", userId: "u2", userName: "Priya Patel", type: "train", itemName: "Rajdhani Express — Mumbai to Delhi", date: "2024-12-22", amount: 2117, status: "cancelled" },
  { id: "BK005", userId: "u4", userName: "Sneha Gupta", type: "flight", itemName: "Vistara — Delhi to Mumbai", date: "2025-01-05", amount: 7279, status: "confirmed", sellerId: "s2" },
  { id: "BK006", userId: "u5", userName: "Vikram Singh", type: "hotel", itemName: "Radisson Blu, Goa", date: "2025-01-10", amount: 6159, status: "pending", sellerId: "s3" },
  { id: "BK007", userId: "u1", userName: "Rahul Sharma", type: "flight", itemName: "AirAsia — Delhi to Mumbai", date: "2025-02-01", amount: 3919, status: "confirmed" },
  { id: "BK008", userId: "u4", userName: "Sneha Gupta", type: "hotel", itemName: "The Oberoi, Delhi", date: "2025-02-14", amount: 14559, status: "completed", sellerId: "s3" },
];

export const mockCoupons = [
  { id: "c1", code: "WELCOME50", discount: 50, type: "percentage", minOrder: 500, maxDiscount: 1000, validTill: "2025-06-30", status: "active", usageCount: 1230 },
  { id: "c2", code: "FLAT500", discount: 500, type: "flat", minOrder: 2000, maxDiscount: 500, validTill: "2025-03-31", status: "active", usageCount: 890 },
  { id: "c3", code: "SUMMER25", discount: 25, type: "percentage", minOrder: 1000, maxDiscount: 2500, validTill: "2025-08-31", status: "active", usageCount: 456 },
  { id: "c4", code: "HOTELKING", discount: 30, type: "percentage", minOrder: 5000, maxDiscount: 5000, validTill: "2024-12-31", status: "expired", usageCount: 2100 },
];

export const mockReviews = [
  { id: "r1", userId: "u1", userName: "Rahul Sharma", itemId: "h1", itemName: "Taj Palace", rating: 5, comment: "Absolutely stunning hotel.", date: "2024-12-18" },
  { id: "r2", userId: "u2", userName: "Priya Patel", itemId: "h3", itemName: "ITC Grand Chola", rating: 4, comment: "Great hotel with amazing food.", date: "2024-12-20" },
  { id: "r3", userId: "u4", userName: "Sneha Gupta", itemId: "f4", itemName: "Vistara Flight", rating: 5, comment: "Best airline in India.", date: "2025-01-06" },
  { id: "r4", userId: "u5", userName: "Vikram Singh", itemId: "h5", itemName: "Radisson Blu Goa", rating: 4, comment: "Beautiful beach location.", date: "2025-01-12" },
  { id: "r5", userId: "u1", userName: "Rahul Sharma", itemId: "b1", itemName: "VRL Travels Bus", rating: 3, comment: "Decent bus service.", date: "2024-12-21" },
];

export const mockWishlist = [
  { id: "w1", type: "hotel", itemId: "h4", itemName: "Leela Palace, Bangalore", price: 15999, image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600" },
  { id: "w2", type: "flight", itemId: "f4", itemName: "Vistara — Delhi to Mumbai", price: 6499 },
  { id: "w3", type: "hotel", itemId: "h5", itemName: "Radisson Blu, Goa", price: 5499, image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600" },
];
