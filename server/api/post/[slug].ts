import fs from "fs";
import { H3Event } from "h3";
import matter from "gray-matter";
import showdown from "showdown";

export default defineEventHandler((event: H3Event) => {
  const query = getQuery(event);
  const slug = getRouterParam(event, "slug");
  if (slug === undefined) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid slug",
    });
  }
  const path = `content/projects-${query.locale}/${slug}.md`;
  if (!fs.existsSync(path)) {
    throw createError({
      statusCode: 404,
      statusMessage: "Post not found",
    });
  }
  const fileContents = fs.readFileSync(path, "utf8");
  const matterResult = matter(fileContents);
  return {
    ...matterResult.data,
    content: new showdown.Converter().makeHtml(matterResult.content),
  };
});
