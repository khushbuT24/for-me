/* eslint-disable @next/next/no-img-element */

export function Photo({ src, alt = '', className = '' }: { src: string; alt?: string; className?: string }) { return <img className={className} src={src} alt={alt} /> }
