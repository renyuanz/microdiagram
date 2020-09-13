<script>
  import Nav from "../components/Nav.svelte";

  export let segment;
</script>

<style>
  main {
    position: relative;
    max-width: 56em;
    background-color: white;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>

<svelte:head>
  <title>Micro Diagram</title>
  <meta
    name="description"
    content="Online tool for prototyping cloud system architectures, native support for AWS, Azure, GCP, AlibabaCloud and more." />
</svelte:head>

<Nav {segment} />

<main>
  <slot />
</main>
