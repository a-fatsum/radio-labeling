<script lang="ts">
	import { nanoid } from 'nanoid/non-secure';
	export const id: string = nanoid();
	export let label: string;
	export let span: string;
	export let value: Date | string;
</script>

<div class="flex flex-col gap-1">
	<label class="" for={id}>{label}</label>
	<div class="flex gap-1">
		<input
			{id}
			type="date"
			class="ml-2 w-auto rounded rounded-lg border-none text-xs text-gray-900 outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
			bind:value
		/>
		<span class="">{span}</span>
	</div>
</div>
