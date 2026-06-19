# Content guide — adding pages and posts

Most of what you edit day-to-day is *content*, not code. This explains
where content lives and how to add more without breaking anything.

---

## The two kinds of content

### 1. Pages (one per URL)
Files in `src/pages/`. Each file becomes one URL.

| File | URL |
|---|---|
| `src/pages/index.astro` | `/` |
| `src/pages/about.astro` | `/about` |
| `src/pages/contact.astro` | `/contact` |
| `src/pages/blog/[slug].astro` | `/blog/anything` (dynamic) |

### 2. Content collections (many of the same type)
Files in `src/data/<collection>/`. Each file is one entry.

| Folder | Purpose |
|---|---|
| `src/data/home/` | Homepage content (single file) |
| `src/data/pages/` | Misc page copy (about, services, etc.) |
| `src/data/blog/` | Blog posts |
| `src/data/faqs/` | FAQ entries |

Collections are defined in `src/content.config.ts` — that file lists
every collection and its Zod schema (required fields).

---

## Add a new blog post

1. Create `src/data/blog/my-first-post.mdx`
2. Add frontmatter:

```mdx
---
title: "My first post"
description: "A short summary for search engines and social cards."
pubDate: "2026-04-20"
author: "Your Name"
tags: ["announcement"]
draft: false
---

Body of the post goes here. This is Markdown — **bold**, _italic_,
[links](https://example.com), lists, headings, all work.

## Subheading

You can also import and use components:

import Button from "../../components/ui/Button.astro";

<Button href="/contact" variant="primary">Get in touch</Button>
```

3. Save. The post is now discoverable via `getCollection("blog")`.
4. If no blog page exists yet, see "Set up the blog index" below.

### What happens if I get a field wrong?

`astro check` (runs on pre-commit) will scream at you:

```
Invalid frontmatter in src/data/blog/my-first-post.mdx:
  - pubDate: Expected date, received string "yesterday"
```

Fix the value and try again. This is what Zod + `astro check` buy you —
broken content never ships.

---

## Set up the blog index page

This template doesn't ship with a blog index by default (since not every
site needs one). To add one:

### 1. Create the list page — `src/pages/blog/index.astro`

```astro
---
export const prerender = true;
import { getCollection } from "astro:content";
import PageLayout from "../../layouts/PageLayout.astro";
import Container from "../../components/ui/Container.astro";
import SectionHeading from "../../components/ui/SectionHeading.astro";
import { formatDate } from "../../lib/utils";

const posts = (await getCollection("blog", ({ data }) => !data.draft))
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
---

<PageLayout title="Blog" description="Latest posts.">
  <section class="py-16 md:py-24">
    <Container variant="blog">
      <SectionHeading eyebrow="Blog" title="Latest posts" />
      <ul class="space-y-6 list-none ml-0 mt-8">
        {posts.map((post) => (
          <li>
            <article class="border-b border-border pb-6">
              <h2 class="text-xl font-bold">
                <a href={`/blog/${post.id}`} class="no-underline text-dark hover:text-primary">
                  {post.data.title}
                </a>
              </h2>
              <p class="text-sm text-muted mt-1">{formatDate(post.data.pubDate)}</p>
              <p class="text-base text-muted-strong mt-2">{post.data.description}</p>
            </article>
          </li>
        ))}
      </ul>
    </Container>
  </section>
</PageLayout>
```

### 2. Create the single-post page — `src/pages/blog/[slug].astro`

```astro
---
export const prerender = true;
import { getCollection, render } from "astro:content";
import BlogLayout from "../../layouts/BlogLayout.astro";

export async function getStaticPaths() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await render(post);
---

<BlogLayout
  title={post.data.title}
  description={post.data.description}
  pubDate={post.data.pubDate}
  updatedDate={post.data.updatedDate}
  author={post.data.author}
  image={post.data.image}
  bodyText={post.body}
>
  <Content />
</BlogLayout>
```

That's a fully working blog. Drop more MDX files into `src/data/blog/`
and they appear on the list + get their own URL.

---

## Edit the homepage

Homepage copy lives in `src/data/home/home.mdx`. The file's frontmatter
is pulled in by `src/pages/index.astro` via `getCollection("home")`.

Fields the homepage uses:
- `title` — tab title / OG title
- `description` — meta description
- `heroTagline` — hero H1
- `heroSubtitle` — hero lede paragraph
- `ctaLabel`, `ctaHref` — primary button

To add more fields: update the `home` schema in
[`src/content.config.ts`](../src/content.config.ts), then re-run
`npm run check`.

---

## Add a new collection type

Say you want `case-studies`:

### 1. Add to `src/content.config.ts`

```ts
const caseStudies = defineCollection({
  loader: glob({ pattern: "*.mdx", base: "./src/data/case-studies" }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    summary: z.string(),
    result: z.string(),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { home, pages, blog, faqs, caseStudies };
```

### 2. Create the folder + a sample entry

```sh
mkdir -p src/data/case-studies
```

Then `src/data/case-studies/acme.mdx`:

```mdx
---
title: "How we doubled Acme's conversion rate"
client: "Acme Inc."
summary: "A short summary that shows up in the index."
result: "2x lift over 8 weeks."
pubDate: "2026-03-15"
draft: false
---

Body goes here.
```

### 3. Run `npm run check`

If the schema is happy, you're set. Consume the new collection via
`getCollection("caseStudies")` in any page.

---

## Rendering Markdown content

To render MDX body from a collection entry in an Astro page:

```astro
---
import { getEntry, render } from "astro:content";
const entry = await getEntry("pages", "about");
if (!entry) throw new Error("pages/about.mdx not found");
const { Content } = await render(entry);
---

<Content />
```

---

## Common content gotchas

- **Dates must parse**: `z.coerce.date()` accepts ISO strings like
  `"2026-04-20"` or `"2026-04-20T10:00:00Z"`. Plain "April 20" won't work.
- **Draft flag**: set `draft: true` in frontmatter and a collection query
  with `({ data }) => !data.draft` will filter it out.
- **Relative image paths**: `image: "/images/blog/foo.jpg"` (absolute from
  `public/`) is simpler than relative imports.
- **Collection slugs**: by default, Astro uses the filename (without
  extension) as the slug (`post.id`). Override via an `id` field in
  frontmatter if you want pretty URLs that differ from filenames.
- **After schema changes, always `npm run check`** — a schema mismatch
  propagates into every layout that consumes the collection.

---

## See also

- [Astro content collections docs](https://docs.astro.build/en/guides/content-collections/)
- [`src/content.config.ts`](../src/content.config.ts) — current schemas
- [`src/layouts/BlogLayout.astro`](../src/layouts/BlogLayout.astro) — the blog post wrapper