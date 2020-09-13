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
                EC2("worker5")] >> RDS("events")  
`;
  let result: string;
  let loading: boolean;
  async function handleSubmit() {
    result = undefined;
    error = undefined;
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
</script>

<style>
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
    max-width: 500px;
    margin: 0 0 1em 0;
  }
  .codemirror-container {
    position: relative;
    width: 100%;
    height: 100%;
    border: none;
    line-height: 1.5;
    overflow: hidden;
    border: solid 1px #333;
    margin-top: 20px;
  }
</style>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<h1>Diagram for microservices</h1>

{#if error}
  <p><span style="color:red"> Something went wrong: </span> <br /> {error}</p>
{/if}

<button
  on:click={handleSubmit}
  disabled={loading}>{loading ? `Processing...` : 'Build'}</button>
<div class="flex">
  <div class="codemirror-container flex">
    <CodeMirror
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
