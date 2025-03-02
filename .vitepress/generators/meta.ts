import { writeFileSync } from 'node:fs'
import path from 'node:path'
import { type ContentData, createContentLoader, type SiteConfig } from 'vitepress'

export async function genMeta(config: SiteConfig) {
  const posts = await createContentLoader('**/blog/**/*.md').load()

  validatePosts(posts)

  const meta = []

  for (const item of posts) {
    meta.push({
      id: item.frontmatter.id,
      title: item.frontmatter.title,
    })
  }

  writeFileSync(path.join(config.outDir, 'meta.json'), JSON.stringify(meta.sort((a, b) => a.id - b.id), null, 2))
}

function validatePosts(items: ContentData[]) {
  const ids = new Set<string>()

  for (const item of items) {
    if (!item.frontmatter.id) {
      throw new Error(`Id is missing: ${item.url}`)
    }

    if (ids.has(item.frontmatter.id)) {
      throw new Error(`Id is not unique: ${item.frontmatter.id} (${item.url}) (${items.find(i => i.frontmatter.id === item.frontmatter.id)?.url})`)
    }

    ids.add(item.frontmatter.id)
  }
}
