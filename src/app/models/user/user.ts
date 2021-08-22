type external_urls = { 
    [key: string]: string
 };

export interface User {
    display_name: string,
    external_urls: external_urls,
    href: string,
    id: string,
    type: string,
    uri: string
}