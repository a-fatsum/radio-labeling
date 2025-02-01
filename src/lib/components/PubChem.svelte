<script lang="ts">
	import { fetchCompoundData, compoundData, errorMessage } from '../stores/pubchemStore';
	import { onMount } from 'svelte';

	let compoundName = 'Aspirin';

	onMount(() => {
		fetchCompoundData(compoundName);
	});
</script>

<input class="text-gray-500" bind:value={compoundName} placeholder="Enter compound name" />
<button
	class="mx-auto mt-8 transform rounded rounded-xl bg-orange-500 p-2 px-20 transition duration-300 ease-in-out hover:scale-110 hover:bg-orange-600"
	on:click={() => fetchCompoundData(compoundName)}>Search Compound</button
>

{#if $errorMessage}
	<p style="color: red;">{$errorMessage}</p>
{:else if $compoundData}
	<p><strong>Molecular Weight:</strong> {$compoundData.MolecularWeight}</p>
	<p><strong>InChIKey:</strong> {$compoundData.InChIKey}</p>
{/if}
