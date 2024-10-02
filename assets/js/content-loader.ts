import showdown from "showdown";
import type ContentDefinitionMetadata from "./types/content-definition-metadata";
import type ContentExcerpt from "./types/content-excerpt";
import type Content from "./types/content";
import type ContentSurrounding from "./types/content-surrounding";

export default class ContentLoader {
  private readonly lang: string;

  public constructor(lang: string) {
    this.lang = lang;
  }

  private static contentPathLanguage(path: string) {
    const dir = path.substring(0, path.lastIndexOf("/"));
    const parentFolder = dir.substring(dir.lastIndexOf("/") + 1, dir.length);
    return parentFolder.substring(
      parentFolder.lastIndexOf("-") + 1,
      parentFolder.length,
    );
  }

  private static pathToSlug(path: string, extension: string) {
    return path
      .substring(path.lastIndexOf("/") + 1, path.length)
      .replace(extension, "");
  }

  public async list(): Promise<ContentExcerpt[]> {
    const metadata = Object.entries(
      import.meta.glob("@/assets/content/projects-*/*.json"),
    );
    const filteredMetadata = metadata.filter(([path]) => {
      return ContentLoader.contentPathLanguage(path) === this.lang;
    });
    const posts = await Promise.all(
      filteredMetadata.map(async ([path, resolver]) => {
        const fileContents: ContentDefinitionMetadata = await resolver() as ContentDefinitionMetadata;
        return {
          title: fileContents.title,
          description: fileContents.description,
          previewImage: fileContents.previewImage,
          endDate: fileContents?.endDate || "",
          slug: ContentLoader.pathToSlug(path, ".json"),
        };
      }),
    );
    return posts.sort((p1, p2) => {
      if (p1.endDate < p2.endDate) {
        return 1;
      } else if (p1.endDate > p2.endDate) {
        return -1;
      }
      return 0;
    });
  }

  public async surrounding(slug: string): Promise<ContentSurrounding> {
    const filteredMetadata = await this.list();
    const currentIndex = filteredMetadata.findIndex(
      (post) => post.slug === slug,
    );
    const surrounding: ContentSurrounding = {
      next: null,
      prev: null,
    };
    if (currentIndex > -1) {
      surrounding.next = filteredMetadata[currentIndex + 1] || null;
      surrounding.prev = filteredMetadata[currentIndex - 1] || null;
    }
    return surrounding;
  }

  public async single(slug: string): Promise<Content> {
    const meta = await import(
      `@/assets/content/projects-${this.lang}/${slug}.json`
    );
    const content = await import(
      `@/assets/content/projects-${this.lang}/${slug}.md?raw`
    );
    const obj: Content = {
      ...meta.default as ContentDefinitionMetadata,
      content: new showdown.Converter().makeHtml(content.default),
    };
    return obj;
  }
}
