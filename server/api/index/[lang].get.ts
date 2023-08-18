import fs from "fs";
import { H3Event } from "h3";
import matter from "gray-matter";

export default defineEventHandler((event: H3Event) => {
  const lang = getRouterParam(event, "lang");
  const dir = `content/projects-${lang}`;
  const files = fs.readdirSync(dir).filter((fn) => fn.endsWith(".md"));
  const posts = files.map((fileName) => {
    const fileContents = fs.readFileSync(`${dir}/${fileName}`, "utf8");
    const matterResult = matter(fileContents);
    return {
      title: matterResult.data.title,
      description: matterResult.data.description,
      previewImage: matterResult.data.previewImage,
      endDate: matterResult.data.endDate || "",
      slug: fileName.replace(".md", ""),
    };
  });
  return posts.sort((p1, p2) => {
    if (p1.endDate < p2.endDate) {
      return 1;
    } else if (p1.endDate > p2.endDate) {
      return -1;
    }
    return 0;
  });
});
