import fs from "fs";
import { H3Event } from "h3";
import matter from "gray-matter";

export default defineEventHandler((event: H3Event) => {
  const query = getQuery(event);
  const slug = getRouterParam(event, "slug");
  if (slug === undefined) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid slug",
    });
  }
  const dir = `content/projects-${query.locale}`;
  const files = fs.readdirSync(dir).filter((fn) => fn.endsWith(".md"));
  const posts = files.map((fileName) => {
    const fileContents = fs.readFileSync(`${dir}/${fileName}`, "utf8");
    const matterResult = matter(fileContents);
    return {
      title: matterResult.data.title,
      endDate: matterResult.data.endDate || "",
      slug: fileName.replace(".md", ""),
    };
  });
  const sortedPosts = posts.sort((p1, p2) => {
    if (p1.endDate < p2.endDate) {
      return 1;
    } else if (p1.endDate > p2.endDate) {
      return -1;
    }
    return 0;
  });
  const postIdx = sortedPosts.findIndex((p) => p.slug === slug);
  if (postIdx === -1) {
    throw createError({
      statusCode: 404,
      statusMessage: "Post not found",
    });
  }
  return {
    next: posts[postIdx + 1] || null,
    prev: posts[postIdx - 1] || null,
  };
});
