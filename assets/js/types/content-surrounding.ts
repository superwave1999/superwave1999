import type ContentExcerpt from "./content-excerpt";

export default interface ContentSurrounding {
    next: ContentExcerpt | null,
    prev: ContentExcerpt | null
}