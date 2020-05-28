const hasAllRequired = <boolean>(<unknown>process.env.API_URL)

if (!hasAllRequired) throw 'Need more environment variables.'

export default {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || '3000',
  API_URL: process.env.API_URL as string
}
