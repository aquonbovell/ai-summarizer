import { writable } from "svelte/store";

const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": rapidApiKey,
    "X-RapidAPI-Host": "article-extractor-and-summarizer.p.rapidapi.com",
  },
};
export const isFetching = writable(false);
export const error = writable({
  status: false,
  message: "",
});

export const allArticles = writable<{ url: string; summary: string }[]>([]);

const articleApi = () => {
  const { subscribe, set } = writable({
    url: "",
    summary: "",
  });
  return {
    subscribe,
    fetchArticle: async (url: string) => {
      isFetching.set(true);
      try {
        const uri = `https://article-extractor-and-summarizer.p.rapidapi.com/summarize?url=${url}&length=3`;
        const response = await fetch(uri, options);
        const result = await response.json();
        console.log(result);
        if (result.error) {
          error.set({ status: true, message: result.error });
          isFetching.set(false);
        } else {
          set({ url: url, summary: result.summary });
          allArticles.update((articles: { url: string; summary: string }[]) => [
            { url: url, summary: result.summary },
            ...articles,
          ]);
          setTimeout(() => {
            isFetching.set(false);
          }, 3000);
        }
      } catch (err: any) {
        console.log(err);
      }
    },
    set,
  };
};

export const summartizedArticle = articleApi();
