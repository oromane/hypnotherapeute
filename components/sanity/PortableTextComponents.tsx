import { PortableText, PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import { urlForImage } from '@/lib/sanity-image'
import { cn } from '@/lib/utils'

export const components: PortableTextComponents = {
    types: {
        image: () => null,
        customImage: () => null,
        quote: ({ value }) => {
            return (
                <blockquote className="border-l-4 border-primary pl-4 italic my-8 text-xl text-muted-foreground bg-muted/30 p-6 rounded-r-lg">
                    "{value.text}"
                    {value.author && <footer className="text-sm mt-2 font-semibold not-italic">— {value.author}</footer>}
                </blockquote>
            )
        },
        columns: ({ value }) => {
            return (
                <div className="grid md:grid-cols-2 gap-8 my-8">
                    {value.columns?.map((col: any, idx: number) => (
                        <div key={col._key || idx} className="prose dark:prose-invert max-w-none">
                            <PortableText value={col.content} components={components} />
                        </div>
                    ))}
                </div>
            )
        }
    },
    block: {
        h2: ({ children }) => <h2 className="text-3xl font-serif font-bold mt-12 mb-6 text-foreground">{children}</h2>,
        h3: ({ children }) => <h3 className="text-2xl font-serif font-bold mt-8 mb-4 text-foreground">{children}</h3>,
        normal: ({ children }) => <p className="mb-6 leading-relaxed text-muted-foreground text-lg">{children}</p>,
        blockquote: ({ children }) => <blockquote className="border-l-4 border-primary pl-4 italic my-6">{children}</blockquote>,
    },
    marks: {
        link: ({ children, value }) => {
            const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
            return (
                <a href={value.href} rel={rel} className="text-primary underline hover:text-primary/80 transition-colors">
                    {children}
                </a>
            )
        },
    },
}
