export default {
  API_PORT: process.env.PORT || process.env.API_PORT || 8080,
  API_CLUSTER: process.env.API_CLUSTER === 'true' ? true : false,
  PERSISTENCE_SYSTEM: process.env.PERSISTENCE_SYSTEM || 'memory',
  MONGODB_PASSWORD: process.env.MONGODB_PASSWORD || '',
  MONGODB_USER: process.env.MONGODB_USER || '',
  FIREBASE_KEY: JSON.parse(process.env.FIREBASE_KEY || '{}'),
  EMAIL_HOST: process.env.EMAIL_HOST || '',
  EMAIL_PORT: process.env.EMAIL_PORT || '',
  EMAIL_USER: process.env.EMAIL_USER || '',
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || '',
  EMAIL_ADMIN: process.env.EMAIL_ADMIN || '',
  SECRET_KEYWORD: process.env.SECRET_KEYWORD || '',
  WHATSAPP_SID: process.env.WHATSAPP_SID || '',
  WHATSAPP_TOKEN: process.env.WHATSAPP_TOKEN || '',
  WHATSAPP_FROM: process.env.WHATSAPP_FROM || '',
}