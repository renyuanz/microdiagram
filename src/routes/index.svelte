<script context="module">
  const is_browser = typeof window !== "undefined";
  import CodeMirror from "../components/CodeMirror.svelte";
  import "codemirror/lib/codemirror.css";
  if (is_browser) {
    import("../codeMirrorPlugins.js");
  }
</script>

<script lang="ts">
  export let title: string = "Hello Sappagram";

  let filename: string;
  let filecontent: string = "123";
  let result: string;
  async function handleSubmit() {
    const res = await fetch("/diagrams", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        filecontent,
        filename,
      }),
    });

    const imageData = await res.blob();
    result = URL.createObjectURL(imageData);
  }
</script>

<style>
  /* .codemirror-container {
    position: relative;
    width: 100%;
    height: 100%;
    border: none;
    line-height: 1.5;
    overflow: hidden;
  }
  .codemirror-container :global(.CodeMirror) {
    height: 100%;
    background: transparent;
    font: 400 14px/1.7 var(--font-mono);
    color: var(--base);
  }
  .codemirror-container.flex :global(.CodeMirror) {
    height: auto;
  }
  .codemirror-container.flex :global(.CodeMirror-lines) {
    padding: 0;
  }
  .codemirror-container :global(.CodeMirror-gutters) {
    padding: 0 16px 0 8px;
    border: none;
  }
  .codemirror-container :global(.error-loc) {
    position: relative;
    border-bottom: 2px solid #da106e;
  }
  .codemirror-container :global(.error-line) {
    background-color: rgba(200, 0, 0, 0.05);
  } */

  h1,
  figure {
    text-align: center;
    margin: 0 auto;
  }

  h1 {
    font-size: 2.8em;
    text-transform: uppercase;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  figure {
    margin: 0 0 1em 0;
  }

  img {
    width: 100%;
    max-width: 1000px;
    margin: 0 0 1em 0;
  }
</style>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<h1>make diagram great again</h1>

<figure>
  {#if result}
    <a download="diagram.png" href={result} title="ImageName">
      <img src={result} alt="" />
    </a>
    <figcaption>Click image to download</figcaption>
  {:else}
    <img style="max-width: 400px" alt="Success Kid" src="successkid.jpg" />
    <figcaption>Have fun with Sappagram!</figcaption>
  {/if}
</figure>

<form on:submit|preventDefault={handleSubmit}>
  <input
    required
    type="text"
    bind:value={filename}
    placeholder="Diagram name" />

  <button type="submit">submit</button>
</form>
<div class="codemirror-container flex">
  <CodeMirror
    value={filecontent}
    on:change={(val) => (filecontent = val.detail.value)} />
</div>
