const rootUrl = process.env.NODE_ENV === 'production' ? 
'https://quickflix-backend.vercel.app' : 'http://localhost:3001/api';

export default rootUrl;