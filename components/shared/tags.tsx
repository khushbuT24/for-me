

export function Tags({ items }: { items: string[] }) { return <div className="tags">{items.map(x => <span key={x}>{x}</span>)}</div> }
