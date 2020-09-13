<script>
  import { onMount, createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  const navigate = async (e) => {
    e.preventDefault();
    dispatch("change", { value: e.target.getAttribute("href") });
  };
</script>

<style>
  nav {
    align-self: flex-start;
    display: block;
    flex: 0 0 240px;
    margin-left: 40px;
    max-height: calc(100vh - 90px);
    overflow-y: auto;
    position: sticky;
    top: 90px;
  }

  ul {
    border-left: 1px solid #e0e0e0;
    padding: 10px 0 2px 15px;
    list-style: none;
    margin-bottom: 1em;
    margin-top: 0;
  }

  li {
    font-size: 12px;
    line-height: 16px;
    padding-bottom: 8px;
  }
</style>

<nav>
  <h4>Examples</h4>
  <ul>
    <li>
      <a
        on:click={navigate}
        href="#grouped-workers-on-aws"
        class="active">Grouped Workers on AWS</a>
    </li>
    <li>
      <a on:click={navigate} href="#clustered-web-services">Clustered Web
        Services</a>
    </li>
    <li>
      <a on:click={navigate} href="#event-processing-on-aws">Event Processing on
        AWS</a>
    </li>
    <li>
      <a on:click={navigate} href="#message-collecting-system-on-gcp">Message
        Collecting System on GCP</a>
    </li>
    <li>
      <a
        on:click={navigate}
        href="#exposed-pod-with-3-replicas-on-kubernetes">Exposed Pod with 3
        Replicas on Kubernetes</a>
    </li>
    <li>
      <a
        on:click={navigate}
        href="#stateful-architecture-on-kubernetes">Stateful Architecture on
        Kubernetes</a>
    </li>
    <li>
      <a
        on:click={navigate}
        href="#advanced-web-service-with-on-premise">Advanced Web Service with
        On-Premise</a>
    </li>
    <li>
      <a
        on:click={navigate}
        href="#advanced-web-service-with-on-premise-with-colors-and-labels">Advanced
        Web Service with On-Premise (with colors and labels)</a>
    </li>
    <li>
      <a
        on:click={navigate}
        href="#rabbitmq-consumers-with-custom-nodes">RabbitMQ Consumers with
        Custom Nodes</a>
    </li>
  </ul>
</nav>
