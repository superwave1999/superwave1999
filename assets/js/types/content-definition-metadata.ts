export default interface ContentDefinitionMetadata {
    title: string,
    description: string,
    startDate: string,
    endDate: string,
    previewImage: string,
    infoPlatform: string,
    infoStack: string,
    infoWebsite: string,
    links: { title: string, href: string }[]
}