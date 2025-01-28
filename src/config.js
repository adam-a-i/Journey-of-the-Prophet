// Production URL from Vercel deployment
export const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://journeyoftheprophet.vercel.app/api/generate-quiz'
  : 'http://localhost:3000/api/generate-quiz'; 