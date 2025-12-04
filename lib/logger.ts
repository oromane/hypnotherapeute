import { createClient } from 'next-sanity'
import { env } from './env'

// Separate write client for logging (needs write token)
const writeClient = createClient({
    projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
    token: process.env.SANITY_API_TOKEN, // Must be server-side
    useCdn: false,
})

export type LogLevel = 'info' | 'warn' | 'error'

export async function logSystem(level: LogLevel, message: string, context?: any) {
    // Only log on server-side to protect token
    if (typeof window !== 'undefined') {
        console.warn('Logging is only available on the server side')
        return
    }

    if (!process.env.SANITY_API_TOKEN) {
        console.warn('SANITY_API_TOKEN is missing, cannot write logs')
        return
    }

    try {
        await writeClient.create({
            _type: 'systemLog',
            level,
            message,
            context: context ? JSON.stringify(context) : undefined,
            timestamp: new Date().toISOString(),
        })
    } catch (error) {
        console.error('Failed to write system log:', error)
    }
}
