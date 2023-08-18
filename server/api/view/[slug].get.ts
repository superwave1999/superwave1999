import fs from "fs";
import { H3Event } from "h3";
import matter from "gray-matter";
import showdown from "showdown";

export default defineEventHandler((event: H3Event) => {
  const params = getRouterParam(event, "slug");
  if (params === undefined) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid slug",
    });
  }
  const [slug, lang] = params.split("+");
  const path = `content/projects-${lang}/${slug}.md`;
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
