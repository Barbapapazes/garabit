<template>
  <section>
    <h1 class="text-6xl font-semibold text-black">Welcome!</h1>

    <div
      class="mt-16 border-4 border-black bg-[#4FFFAF] p-12 shadow-[8px_8px_0_black]"
    >
      <Content
        class="prose prose-xl prose-zinc text-black [&>div>:first-child]:mt-0 [&>div>:last-child]:mb-0"
      />
    </div>
  </section>

  <section class="mt-16">
    <h2 class="text-4xl font-semibold text-black">Find me online</h2>

    <div class="mt-8 flex flex-wrap justify-center gap-8 md:justify-start">
      <ButtonSecondary href="https://x.soubiran.dev" target="_blank">
        Twitter
      </ButtonSecondary>

      <ButtonSecondary href="https://gh.soubiran.dev" target="_blank">
        GitHub
      </ButtonSecondary>

      <ButtonSecondary href="https://linkedin.soubiran.dev" target="_blank">
        LinkedIn
      </ButtonSecondary>

      <ButtonSecondary href="https://tv.soubiran.dev" target="_blank">
        Twitch
      </ButtonSecondary>
    </div>
  </section>
</template>
