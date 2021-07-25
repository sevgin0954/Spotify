export interface Paging<T> {
    // A link to the Web API endpoint returning the full result of the request
    href: string,
    items: T[],
    // The maximum number of items in the response
    limit: number,
    // URL to the next page of items.
    next: string,
    offset: number,
    // URL to the previous page of items.
    previous: string,
    // The total number of items available to return.
    total: number
}