// Production URL from Vercel deployment
export const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://journeyoftheprophet-a5eva8qky-admas-projects-46edb5cc.vercel.app/api'
  : 'http://localhost:3000/api'; 