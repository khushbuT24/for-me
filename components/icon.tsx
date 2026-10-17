export function Icon({ name, size = 22 }: { name: string; size?: number }) {
    const paths: Record<string, React.ReactNode> = {
        home: <><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" /></>,
        wardrobe: <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M12 3v18M9 10v4m6-4v4M7 21v1m10-1v1" /></>,
        sparkle: <><path d="m12 3 2.8 6.2L21 12l-6.2 2.8L12 21l-2.8-6.2L3 12l6.2-2.8zM20 2v4m-2-2h4" /></>,
        looks: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9z" />,
        profile: <><circle cx="12" cy="7" r="4" /><path d="M4 21v-2a8 8 0 0 1 16 0v2z" /></>,
        upload: <><path d="M12 16V3m-5 5 5-5 5 5M4 13v7h16v-7" /></>,
        arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
        back: <path d="M20 12H4m6-6-6 6 6 6" />,
        sun: <><circle cx="12" cy="12" r="4" /><path d="M12 1v2m0 18v2M1 12h2m18 0h2M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2" /></>,
        heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z" />,
        search: <><circle cx="10" cy="10" r="7" /><path d="m15 15 6 6" /></>,
        bag: <><rect x="4" y="7" width="16" height="14" rx="2" /><path d="M8 8V6a4 4 0 0 1 8 0v2" /></>,
        camera: <><path d="M3 7h4l2-3h6l2 3h4v14H3z" /><circle cx="12" cy="13" r="4" /></>,
        calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 2v6m10-6v6M3 11h18" /></>,
        bell: <><path d="M5 16V9a7 7 0 0 1 14 0v7l2 3H3zM9 22h6" /></>,
        check: <path d="m5 12 4 4L19 6" />,
    };
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.sparkle}</svg>
}
