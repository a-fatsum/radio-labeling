<script lang="ts">
	export let label: string;
	export let measurement: string;
	export let value: number | string;
</script>

<div class="mx-auto flex w-full items-center justify-between">
	<!-- svelte-ignore a11y_label_has_associated_control -->
	<label>{label}</label>
	<div class="ml-auto flex items-center gap-1 text-base font-bold">
		<p>{value}</p>
		<p class=" ml-auto text-base font-bold"><span> {measurement}</span></p>
	</div>
</div>
