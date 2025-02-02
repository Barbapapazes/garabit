<script lang="ts" setup>
const { frontmatter } = useData();
</script>

<template>
  <Page>
    <PageTitle :title="frontmatter.title" />

    <ProjectsList />

    <PageFooter :backTo="{ href: '/', label: 'Back to Home' }" />
  </Page>
</template>
