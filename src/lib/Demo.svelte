<script lang="ts">
  import { copy, linkIcon, loader, tick } from "../assets";
  import {
    summartizedArticle,
    allArticles,
    isFetching,
    error,
  } from "../services/store.js";

  allArticles.set(JSON.parse(localStorage.getItem("articles") || "[]"));

  let copied: string | false = false;

  const setArticle = (event: Event) => {
    const { name, value } = event.target as HTMLInputElement;
    summartizedArticle.set({ ...$summartizedArticle, [name]: value });
  };

  const setSummary = (item: { url: string; summary: string }) => {
    summartizedArticle.set(item);
  };

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    summartizedArticle.fetchArticle($summartizedArticle.url);
    localStorage.setItem("articles", JSON.stringify($allArticles));
  };

  const copySummary = async () => {
    await navigator.clipboard.writeText($summartizedArticle.summary);
  };

  const copyUrl = (url: string) => async () => {
    copied = url;
    await navigator.clipboard.writeText(url);
    setTimeout(() => {
      copied = false;
    }, 3000);
  };
</script>

<section class="mt-16 w-full max-w-xl">
  <!-- Search -->
  <div class="flex flex-col w-full gap-2">
    <form
      action=""
      class="relative justify-center items-center flex"
      on:submit={handleSubmit}
    >
      <img
        src={linkIcon}
        alt="link icon"
        class="absolute left-0 my-2 ml-3 w-5"
      />
      <input
        type="url"
        name="url"
        id="url"
        placeholder="Enter a url..."
        value={$summartizedArticle.url}
        class="url_input peer"
        on:change={setArticle}
        required
      />
      <button
        type="submit"
        class="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
      >
        ↩️
      </button>
    </form>
    <div class="flex flex-col max-h-60 gap-1 overflow-y-auto">
      {#each $allArticles as link, index}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
          id="link-{index}"
          class="link_card"
          on:click={() => setSummary(link)}
        >
          <div class="copy_btn">
            <img
              src={copied === link.url ? tick : copy}
              alt="copy item"
              class="w-[40%] h-[40%] object-contain"
              on:click={copyUrl(link.url)}
            />
          </div>
          <p
            class="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate"
          >
            {link.url}
          </p>
        </div>
      {/each}
    </div>
  </div>
  <div class="my-10 max-w-full flex justify-center items-center">
    {#if $isFetching}
      <img src={loader} alt="loader" class="w-20 h-20 object-contain" />
    {:else if $error.status}
      <p class="font-inter font-bold text-black text-center">
        Well this is embarrassing, we couldn't fetch the article <br />
        <span class="font-satoshi font-normal text-gray-700">
          {$error.message}
        </span>
      </p>
    {:else if $summartizedArticle.summary}
      <div class="flex flex-col gap-3">
        <h2 class="font-satoshi font-bold text-gray-600 text-xl">
          Article <span class="blue_gradient">Summary</span>
        </h2>
        <div class="summary_box">
          <p class="font-inter font-medium text-sm text-gray-700">
            {$summartizedArticle.summary}
          </p>
        </div>
      </div>
    {/if}
  </div>
</section>
