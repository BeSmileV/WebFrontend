import {CookiesProvider} from "next-client-cookies/server";
import './global.scss'
import {StoreProvider} from "@/store";

export const metadata = {
    title: 'Магазин',
}

export default function RootLayout({children,}: { children: React.ReactNode }) {
    return (
        <StoreProvider>
            <CookiesProvider>
                <html lang="en">
                <body>
                {children}
                </body>
                </html>
            </CookiesProvider>
        </StoreProvider>
    )
}
