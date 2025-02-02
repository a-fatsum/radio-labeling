<!-- <script lang="ts">
	import { nanoid } from 'nanoid/non-secure';
	export const id: string = nanoid();
	export let label: string;
	// export let measurement: string;

	export let measurement: string;
	export let value: number | string;
</script>

<div class="mx-auto flex w-full items-center justify-between">
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
</div> -->

<script lang="ts">
	import { nanoid } from 'nanoid/non-secure';

	export const id: string = nanoid();

	export let label: string;
	export let measurement: string;
	export let value: number | string;

	// Determine the type of input field based on the value type
	let inputType: 'text' | 'number' = typeof value === 'number' ? 'number' : 'text';
</script>

<div class="mx-auto flex w-full items-center justify-between">
	<label for={id}>{label}</label>
	<div class="flex w-1/4 items-center gap-1">
		<!-- Dynamically set the input type to either text or number -->
		<input
			{id}
			type={inputType}
			class="w-20 rounded rounded-lg border-none text-xs text-black outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
			bind:value
		/>
		<span class="font-bold">{measurement}</span>
	</div>
</div>
