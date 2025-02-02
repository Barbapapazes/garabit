<template>
  <Page>
    <section>
      <PageTitle title="Welcome!" />

      <div
        class="mt-16 border-4 border-black bg-[#4FFFAF] p-12 shadow-[8px_8px_0_black]"
      >
        <Prose class="prose-xl">
          <Content />
        </Prose>
      </div>
    </section>

    <section>
      <h2 class="text-4xl font-semibold text-black">Find me online</h2>

      <div class="mt-8 flex flex-wrap justify-center gap-8 md:justify-start">
        <Button
          color="secondary"
          label="Twitter"
          href="https://x.soubiran.dev"
          target="_blank"
        />

        <Button
          color="secondary"
          label="GitHub"
          href="https://gh.soubiran.dev"
          target="_blank"
        />

        <Button
          color="secondary"
          label="LinkedIn"
          href="https://linkedin.soubiran.dev"
          target="_blank"
        />

        <Button
          color="secondary"
          label="Twitch"
          href="https://tv.soubiran.dev"
          target="_blank"
        />
      </div>
    </section>
  </Page>
</template>
