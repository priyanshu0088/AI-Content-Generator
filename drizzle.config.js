/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.tsx",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:c9QfaV0Wwkqn@ep-blue-voice-a1dsr9iu.ap-southeast-1.aws.neon.tech/neondb?sslmode=requirenpm i drizzle-orm @neondatabase/serverless',
    }
  };