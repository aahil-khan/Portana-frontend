import { ExternalLink } from "lucide-react"

export default function SourcePanel({ sources }: { sources: any[] }) {
  return (
    <div className="w-80 border-l border-border bg-background/40 backdrop-blur-md overflow-y-auto p-6 hidden lg:block">
      <h3 className="font-semibold mb-4 text-foreground">Sources</h3>
      <div className="space-y-3">
        {sources.length === 0 ? (
          <p className="text-sm text-muted-foreground">Sources will appear here</p>
        ) : (
          sources.map((source, idx) => (
            <div
              key={idx}
              className="text-sm bg-background/60 border border-border/50 rounded-lg p-3 hover:border-cyan-500/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-foreground text-xs uppercase tracking-wider">{source.type}</p>
                  <p className="text-foreground mt-1 line-clamp-2">{source.title}</p>
                </div>
                <ExternalLink size={14} className="text-muted-foreground flex-shrink-0" />
              </div>
              {source.relevance && (
                <p className="text-xs text-cyan-400 mt-2">Relevance: {Math.round(source.relevance * 100)}%</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
