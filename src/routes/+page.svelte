<script lang="ts">
 import { fetchTree, type TreeSource, type TreeDocument } from "$lib/api";
 import { currentDocId } from "$lib/stores.svelte";
 import { sourceColorClass } from "$lib/colors";
 import { displaySource } from "$lib/titles";

 let tree: TreeSource[] = $state([]);
 let loading = $state(true);
 let error = $state("");

 $effect(() => {
  currentDocId.value = null;
  loadTree();
 });

 async function loadTree() {
  try {
   tree = await fetchTree();
  } catch (e) {
   error = e instanceof Error ? e.message : "Failed to load";
  } finally {
   loading = false;
  }
 }

 function allDocs(source: TreeSource): TreeDocument[] {
  return [
   ...source.root_docs,
   ...source.docs,
   ...source.journal,
   ...(source.engineering_team ?? []),
   ...(source.pdf ?? []),
  ];
 }

 function docCount(source: TreeSource): number {
  return allDocs(source).length;
 }

 function lastUpdated(source: TreeSource): string | null {
  let latest: string | null = null;
  for (const doc of allDocs(source)) {
   const date = doc.modified_at ?? doc.created_at;
   if (date && (!latest || date > latest)) latest = date;
  }
  return latest;
 }

 function formatDate(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
 }
</script>

<svelte:head>
 <title>Documentation Library</title>
</svelte:head>

<!-- GOV.UK-style masthead hero -->
<div class="masthead">
 <div class="masthead__inner">
  <h1 class="masthead__title">Documentation Library</h1>
  <p class="masthead__description">
   {tree.length} projects indexed — browse a project or use search and chat.
  </p>
 </div>
</div>

<div class="home">
 {#if loading}
  <div class="loading">Loading sources...</div>
 {:else if error}
  <div class="error">{error}</div>
 {:else if tree.length === 0}
  <div class="empty">
   <p>No documentation sources have been indexed yet.</p>
   <p>Check that the MCP server is running and has sources configured.</p>
  </div>
 {:else}
  <table class="source-table">
   <thead>
    <tr>
     <th>Project</th>
     <th class="col-date">Last updated</th>
     <th class="col-count">Documents</th>
    </tr>
   </thead>
   <tbody>
    {#each tree as source}
     <tr>
      <td>
       <a class="source-link {sourceColorClass(source.source)}" href="/source/{encodeURIComponent(source.source)}"
        >{displaySource(source.source)}</a
       >
      </td>
      <td class="col-date">{formatDate(lastUpdated(source))}</td>
      <td class="col-count">{docCount(source)}</td>
     </tr>
    {/each}
   </tbody>
  </table>
 {/if}
</div>

<style>
 /* GOV.UK masthead — blue hero section */
 .masthead {
  padding: 30px 0;
  border-bottom: 1px solid var(--brand-dark);
  color: #ffffff;
  background-color: var(--brand);
  margin: -40px -30px 0;
  padding-left: 30px;
  padding-right: 30px;
 }

 @media (min-width: 641px) {
  .masthead {
   padding-top: 60px;
   padding-bottom: 60px;
  }
 }

 .masthead__inner {
  max-width: 960px;
  margin: 0 auto;
 }

 .masthead__title {
  color: #ffffff;
  font-size: 2rem;
  line-height: 1.09375;
  font-weight: 700;
  margin-bottom: 20px;
 }

 @media (min-width: 641px) {
  .masthead__title {
   font-size: 3rem;
   line-height: 1.0416666667;
   margin-bottom: 30px;
  }
 }

 .masthead__description {
  color: #ffffff;
  font-size: 1.1875rem;
  line-height: 1.3157894737;
  margin-bottom: 0;
 }

 @media (min-width: 641px) {
  .masthead__description {
   font-size: 1.5rem;
   line-height: 1.25;
  }
 }

 .home {
  max-width: 960px;
  margin: 0 auto;
  padding-top: 40px;
 }

 .loading,
 .error,
 .empty {
  padding: 30px;
  text-align: center;
  color: var(--text-secondary);
 }

 .error {
  color: var(--error);
 }

 /* GOV.UK-style table */
 .source-table {
  border-collapse: collapse;
  font-size: 1rem;
  line-height: 1.25;
 }

 .source-table thead {
  border-bottom: 2px solid var(--text);
 }

 .source-table th {
  text-align: left;
  font-weight: 700;
  font-size: 1rem;
  padding: 10px 20px 10px 0;
  color: var(--text);
 }

 .source-table tbody tr {
  border-bottom: 1px solid var(--border);
 }

 .source-table td {
  padding: 15px 20px 15px 0;
  vertical-align: top;
 }

 .source-link {
  font-size: 1.1875rem;
  font-weight: 700;
  color: var(--link);
  text-decoration: underline;
  text-decoration-thickness: max(1px, 0.0625rem);
  text-underline-offset: 0.1578em;
 }

 .source-link:hover {
  color: var(--link-hover);
  text-decoration-thickness: max(3px, 0.1875rem, 0.12em);
 }

 .source-link:focus {
  outline: 3px solid transparent;
  color: var(--focus-text);
  background-color: var(--focus);
  box-shadow:
   0 -2px var(--focus),
   0 4px var(--focus-text);
  text-decoration: none;
 }

 .col-count,
 .col-date {
  color: var(--text-secondary);
  white-space: nowrap;
 }

 .col-count {
  text-align: right;
 }

 @media (max-width: 640px) {
  .masthead {
   margin: -20px -15px 0;
   padding-left: 15px;
   padding-right: 15px;
  }

  .source-table th,
  .source-table td {
   padding-right: 10px;
  }

  .source-link {
   font-size: 1rem;
  }

  .col-date {
   display: none;
  }
 }
</style>
