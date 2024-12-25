<script lang="ts">
import { nanoid } from "nanoid/non-secure";
export const id: string = nanoid();
export let label:string;
export let span: string;
export let value: number;
</script>
<div class="text-black flex flex-col gap-1">
  <label class="text-white" for={id}>{label}</label>
  <div class="flex gap-1">
    <input {id} type="time" class="w-24 text-xs rounded rounded-lg outline-none border-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
    bind:value
    />
    <span class="text-white">{span}</span>
  </div>
</div>