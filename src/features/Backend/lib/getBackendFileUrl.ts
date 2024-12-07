export default function getBackendFileUrl(url: string) {
    return process.env.NEXT_PUBLIC_API_URL + url
}