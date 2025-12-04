import { client } from "@/lib/sanity"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const dynamic = 'force-dynamic'

interface Log {
    _id: string
    level: 'info' | 'warn' | 'error'
    message: string
    context?: string
    timestamp: string
}

async function getLogs() {
    return client.fetch<Log[]>(`
    *[_type == "systemLog"] | order(timestamp desc) [0...100] {
      _id,
      level,
      message,
      context,
      timestamp
    }
  `)
}

export default async function AdminLogsPage() {
    const logs = await getLogs()

    return (
        <>
            <Header />
            <main className="min-h-screen py-20 px-4 bg-muted/30">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-serif font-bold mb-8">Supervision Système</h1>

                    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-muted text-muted-foreground uppercase font-medium">
                                    <tr>
                                        <th className="px-6 py-4">Niveau</th>
                                        <th className="px-6 py-4">Message</th>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4">Contexte</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {logs.map((log) => (
                                        <tr key={log._id} className="hover:bg-muted/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${log.level === 'error' ? 'bg-red-100 text-red-800' :
                                                        log.level === 'warn' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-blue-100 text-blue-800'
                                                    }`}>
                                                    {log.level.toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-medium">{log.message}</td>
                                            <td className="px-6 py-4 text-muted-foreground">
                                                {new Date(log.timestamp).toLocaleString('fr-FR')}
                                            </td>
                                            <td className="px-6 py-4 font-mono text-xs text-muted-foreground max-w-xs truncate">
                                                {log.context || '-'}
                                            </td>
                                        </tr>
                                    ))}
                                    {logs.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                                                Aucun log système pour le moment.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
