<script lang="ts">
	import { nanoid } from 'nanoid/non-secure';
	export const id: string = nanoid();
	export let label: string;
	// export let measurement: string;

	export let measurement: string;
	export let value: number;
</script>

<div class="flex w-full items-center justify-between text-black">
	<label class="text-white" for={id}>{label}</label>
	<div class="flex w-1/4 items-center gap-1">
		<input
			{id}
			type="number"
			class="w-24 rounded rounded-lg border-none text-xs outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
			bind:value
		/>
		<span class="font-bold text-white">{measurement}</span>
	</div>
</div>
