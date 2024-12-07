import {CookiesProvider} from "next-client-cookies/server";
import './global.scss'

export const metadata = {
    title: 'Магазин',
}

export default function RootLayout({children,}: { children: React.ReactNode }) {
    return (
        <CookiesProvider>
        <html lang="en">
            <body>
            {children}
            </body>
        </html>
        </CookiesProvider>
    )
}
