<script lang="ts">
  import { logo } from "../assets";
</script>

<header class="w-full flex justify-center items-center flex-col">
  <nav class="flex justify-between items-center w-full mb-10 pt-3">
    <img src={logo} alt="sumz_logo" class="w-28 object-contain" />

    <button
      type="button"
      on:click={() => window.open(`https://github.com/aquonbovell`)}
      class="black_btn">GitHub</button
    >
  </nav>
  <h1 class="head_text text-balance">
    Summarize Articles with <br class="max-md:hidden" />
    <span class="orange_gradient">Open AI GPT-4</span>
  </h1>

  <h2 class="desc">
    Simplify your reading with Summize, an open-source article summarizer that
    transforms lengthy articles into clear and concise summaries
  </h2>
</header>
