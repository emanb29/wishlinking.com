export default {
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_URL: process.env.API_URL as string || "https://us-central1-wishlist-275117.cloudfunctions.net/wishlist"
}
