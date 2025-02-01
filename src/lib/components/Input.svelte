<script lang="ts">
	import { nanoid } from 'nanoid/non-secure';
	export const id: string = nanoid();
	export let label: string;
	// export let measurement: string;

	export let measurement: string;
	export let value: number | string;
</script>

<div class="flex w-[90%] items-center justify-between">
	<label class="" for={id}>{label}</label>
	<div class="flex w-1/4 items-center gap-1">
		<input
			{id}
			type="number"
			class="w-20 rounded rounded-lg border-none text-xs text-black outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
			bind:value
		/>
		<span class="font-bold">{measurement}</span>
	</div>
</div>
