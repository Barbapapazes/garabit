<script lang="ts" setup>
const { frontmatter } = useData();
</script>

<template>
  <Page>
    <BlogArticle :title="frontmatter.title" />

    <CommentsSection />

    <PageFooter :backTo="{ href: '/blog', label: 'Back to Blog' }" />
  </Page>
</template>
