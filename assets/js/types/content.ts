import type ContentDefinitionMetadata from "./content-definition-metadata";

export default interface Content extends ContentDefinitionMetadata {
    content: string
}