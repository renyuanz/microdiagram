<script context="module">
  const is_browser = typeof window !== "undefined";
  import CodeMirror from "../components/CodeMirror.svelte";
  import examples from "../constants/examples";
  import "codemirror/lib/codemirror.css";
  if (is_browser) {
    import("../codeMirrorPlugins.js");
  }
</script>

<script lang="ts">
  import ExamplesNav from "../components/ExamplesNav.svelte";
  export let title: string = "Hello Sappagram";

  let _codeEditor;
  let error: string;
  let filecontent: string = `from diagrams import Diagram
from diagrams.aws.compute import EC2
from diagrams.aws.database import RDS
from diagrams.aws.network import ELB

with Diagram("Grouped Workers", show=False, direction="TB"):
  ELB("lb") >> [EC2("worker1"),
                EC2("worker2"),
                EC2("worker3"),
                EC2("worker4"),
                EC2("worker5")] >> RDS("events")`;
  let result: string;
  let loading: boolean;
  async function handleSubmit() {
    resetState();

    loading = true;
    const res = await fetch("/diagrams", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        filecontent,
      }),
    });

    loading = false;

    if (res.ok) {
      const imageData = await res.blob();
      result = URL.createObjectURL(imageData);
    } else {
      const text = await res.text();
      error = text;
    }
  }

  function resetState() {
    result = undefined;
    error = undefined;
  }

  function handleExampleChange(e) {
    resetState();
    _codeEditor.update(examples[e.detail.value] || "");
  }
</script>

<style>
  h1,
  figure {
    text-align: center;
    margin: 0 auto;
  }

  h1 {
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  figure {
    margin: 0 0 1em 0;
  }

  img {
    width: 100%;

    margin: 0 0 1em 0;
  }

  .flex {
    display: flex;
    justify-content: space-around;
  }
</style>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<h1>Diagram for microservices</h1>

{#if error}
  <p><span style="color:red"> Something went wrong: </span> <br /> {error}</p>
{/if}

<div class="flex">
  <div>
    <button
      on:click={handleSubmit}
      disabled={loading}>{loading ? `Processing...` : 'Build'}</button>
    <div class="flex">
      <CodeMirror
        bind:this={_codeEditor}
        value={filecontent}
        on:change={(val) => (filecontent = val.detail.value)} />
    </div>
    {#if result}
      <figure>
        <img src={result} alt="" />
        <a download="diagram.png" href={result} title="ImageName">
          Click to download
        </a>
      </figure>
    {/if}
  </div>

  <ExamplesNav on:change={handleExampleChange} />
</div>
