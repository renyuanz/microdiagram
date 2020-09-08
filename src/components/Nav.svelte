<script lang="ts">
  export let segment: any;
</script>

<style>
  nav {
    border-bottom: 1px solid rgba(255, 62, 0, 0.1);
    font-weight: 300;
    padding: 0 1em;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  /* clearfix */
  ul::after {
    content: "";
    display: block;
    clear: both;
  }

  li {
    display: block;
    float: left;
  }

  [aria-current] {
    position: relative;
    display: inline-block;
  }

  [aria-current]::after {
    position: absolute;
    content: "";
    width: calc(100% - 1em);
    height: 2px;
    background-color: rgb(255, 62, 0);
    display: block;
    bottom: -1px;
  }

  a {
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
  }
  svg {
    display: inline-block;
    width: 18px;
    height: 18px;
    vertical-align: text-bottom;
  }
</style>

<nav>
  <ul>
    <li>
      <a
        aria-current={segment === undefined ? 'page' : undefined}
        href=".">Home</a>
    </li>
    <li>
      <a
        target="_blank"
        rel="noreferrer noopener"
        href="https://diagrams.mingrammer.com/docs/getting-started/examples">Docs
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path
            fill="#212B36"
            d="M17 2a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0V5.414l-5.293 5.293a.997.997 0 0 1-1.414 0 .999.999 0 0 1 0-1.414L14.586 4H12a1 1 0 1 1 0-2h5zm0 9a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h5a1 1 0 1 1 0 2H4v12h12v-4a1 1 0 0 1 1-1z" /></svg>
      </a>
    </li>
  </ul>
</nav>
