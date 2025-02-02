<script lang="ts">
	// @ts-ignore
	import Input from '$lib/components/Input.svelte';
	import DateInput from '$lib/components/DateInput.svelte';
	import TimeInput from '$lib/components/TimeInput.svelte';
	import DisplayInfo from '$lib/components/DisplayInfo.svelte';
	//
	import PubChem from '$lib/components/PubChem.svelte';
	import { compoundData } from '$lib/stores/pubchemStore';
	//
	import { writable } from 'svelte/store';
	//
	let ligandNameInput: string = '';

	let lu_177StockActivity: number;
	// let date: Date;
	let volumeOfRadioLabellingBuffer: number;
	let volumeOfBindingBuffer: number;
	let theoreticalActivity: number;
	let totalReactionVolume: number;
	let stockSolutionInBindingBufferActualActivity: any;
	// let time: any;
	let percentageOfActivityYield: number;
	let specificActivity: number;
	let molarActivity: number;
	//
	let totalConc: number;
	let totalActivity: number;
	let volume_BindingBuffer: number;
	let amountOfActivityNeededForReaction: number;
	let radiolabelingReactionVolume: number;
	let volumeOfRadioLabelledLigand: number;
	let concOfRadiolabelledPeptide_mols: number;
	let concOfRadiolabelledPeptide_microMols: number;
	let concOfRadiolabelledPeptide_microMolsBy1000: number;
	let radiolabelingActualActivity: number;
	let radiolabelingMolarActivity_GBq_µmol: number;
	let radiolabelingMolarActivity_MBq_µmol: number;
	let volumeOfLigandPrecursor: number;
	let ligandStockConcentration: number;
	let volumeOfLu177: number;
	let activityUsedInRadiolabeling: number;

	let peptide_mw: number;
	let ligandMass: number;

	// HELPER VARIABLES
	let moles: number;
	let milliMoles: number;
	let microMoles: number;
	$: moles = ligandMass / 1000000 / peptide_mw;
	$: milliMoles = moles / 1000;
	$: microMoles = milliMoles / 1000;
	//
	let massOfPeptideInBindingBuffer: number;
	let molesOfPeptidesInBindingBuffer: number;
	let millimolesOfPeptidesInBindingBuffer: number;
	let micromolesOfPeptidesInBindingBuffer: number;
	let nanomolesOfPeptidesInBindingBuffer: number;
	$: massOfPeptideInBindingBuffer =
		(ligandMass * volumeOfRadioLabelledLigand) / (radiolabelingReactionVolume / 1000);
	$: molesOfPeptidesInBindingBuffer = massOfPeptideInBindingBuffer / 1000000 / peptide_mw;
	$: millimolesOfPeptidesInBindingBuffer = molesOfPeptidesInBindingBuffer * 1000;
	$: micromolesOfPeptidesInBindingBuffer = millimolesOfPeptidesInBindingBuffer * 1000;
	$: nanomolesOfPeptidesInBindingBuffer = micromolesOfPeptidesInBindingBuffer * 1000;
	//__________________
	let ligandName: string;
	$: ligandName = ligandNameInput; // Make sure it's updated reactively
	// $: {
	// 	ligandName = ligandNameInput;
	// }
	// Amount of Activity Needed for Reaction
	$: amountOfActivityNeededForReaction =
		(radiolabelingReactionVolume * totalActivity) / (volumeOfRadioLabelledLigand / 1000);
	// handle concOfRadiolabelledPeptide
	$: concOfRadiolabelledPeptide_mols =
		ligandMass / 1000 / 1000 / ligandMass / (radiolabelingReactionVolume / 1000);
	//
	$: concOfRadiolabelledPeptide_microMols = concOfRadiolabelledPeptide_mols / 1000;
	//
	$: concOfRadiolabelledPeptide_microMolsBy1000 = concOfRadiolabelledPeptide_microMols / 1000;
	//
	$: specificActivity = ligandMass / radiolabelingActualActivity;
	//
	$: radiolabelingMolarActivity_MBq_µmol = radiolabelingActualActivity / microMoles;
	//
	$: radiolabelingMolarActivity_GBq_µmol = radiolabelingActualActivity / 1000 / microMoles;
	//
	$: volumeOfLigandPrecursor = (ligandMass * 1) / ligandStockConcentration;
	//
	$: volumeOfLu177 = (activityUsedInRadiolabeling / lu_177StockActivity) * 1000;
	//
	$: volumeOfRadioLabellingBuffer =
		radiolabelingReactionVolume * 1000 - (volumeOfLigandPrecursor + volumeOfLu177);
	//
	$: totalReactionVolume = volumeOfLigandPrecursor + volumeOfLu177 + volumeOfRadioLabellingBuffer;
	//
	$: volumeOfRadioLabelledLigand =
		((totalConc * volume_BindingBuffer) / concOfRadiolabelledPeptide_microMolsBy1000) * 1000;
	//
	$: volumeOfBindingBuffer = volume_BindingBuffer - volumeOfRadioLabelledLigand / 1000;
	//
	$: theoreticalActivity =
		(radiolabelingActualActivity / radiolabelingReactionVolume) *
		(volumeOfRadioLabelledLigand / 1000);
	//
	$: percentageOfActivityYield = stockSolutionInBindingBufferActualActivity / theoreticalActivity;
	// =H21/((C9*H18)/(C11*1000))
	$: specificActivity =
		stockSolutionInBindingBufferActualActivity /
		((ligandMass * volumeOfRadioLabelledLigand) / (radiolabelingReactionVolume * 1000));
	//
	$: molarActivity =
		stockSolutionInBindingBufferActualActivity / micromolesOfPeptidesInBindingBuffer / 1000;
	//

	// Print Report
	function handlePrint() {
		window.print();
	}
	//

	// Handle Time stamp
	let timeStamp = writable(''); // Store timestamp
	let time = '';
	let date = '';

	function handleTimeStamp() {
		const now = new Date();

		// Format time as HH:MM (24-hour format)
		time = now.toLocaleTimeString('en-AU', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false
		});

		// Format date to YYYY-MM-DD (for compatibility with date inputs)
		date = now.toISOString().split('T')[0];
	}
</script>

<div class="main flex h-screen min-h-screen w-full overflow-y-auto bg-gray-700 text-sm text-white">
	<!-- Sidebar -->
	<aside
		class="left-nav-bar fixed sticky sticky top-0 flex h-screen w-1/3 flex-col justify-center bg-gray-800 p-8"
	>
		<h3 class="mb-5 text-2xl font-bold">Binding Buffer</h3>
		<Input bind:value={totalConc} label="Total Conc" measurement="nM" />
		<span class="ml-auto text-xs font-light">in</span>
		<Input bind:value={totalActivity} label="Total Activity" measurement="MBq" />
		<span class="ml-auto text-xs font-light">of</span>
		<Input bind:value={ligandNameInput} label="Ligand Name" />
		<span class="ml-auto text-xs font-light">in</span>
		<Input bind:value={volume_BindingBuffer} label="Volume" measurement="mL" />

		<h3 class="mb-2 mt-8 text-2xl font-bold">Planning</h3>
		<div class="mt-2 space-y-4">
			<DisplayInfo label="Ligand Name" value={ligandName} />
			<Input bind:value={peptide_mw} label="Peptide mw" measurement="mw" />
			<Input bind:value={ligandMass} label="Ligand Mass" measurement="μg" />
			<Input
				bind:value={ligandStockConcentration}
				label="Ligand Stock Concentration"
				measurement="mg/mL"
			/>
			<Input
				bind:value={radiolabelingReactionVolume}
				label="Radiolabeling Reaction Volume"
				measurement="ml"
			/>
			<DisplayInfo
				label="Amount of Activity Needed for Reaction"
				value={isNaN(amountOfActivityNeededForReaction)
					? '00'
					: amountOfActivityNeededForReaction.toFixed(4)}
				measurement="mol"
			/>
			<Input
				bind:value={activityUsedInRadiolabeling}
				label="Activity Used in Radiolabeling"
				measurement="MBq"
			/>
		</div>
		<!-- print -->
		<button
			class="mx-auto mt-8 transform rounded rounded-xl bg-orange-500 p-2 px-20 transition duration-300 ease-in-out hover:scale-110 hover:bg-orange-600"
			on:click={handlePrint}>Print Report</button
		>
		<!--  -->
	</aside>

	<!-- Main Content -->
	<main class="flex-1 bg-gray-700 p-8">
		<h2 class="text-2xl font-bold">Radiolabeling Reaction Results</h2>
		<div class="justfy-center mt-2 rounded-lg border border-gray-400 p-4">
			<div class="mb-2 flex justify-between">
				<p>Conc. of Radiolabelled Peptide:</p>
				<div class="flex space-x-6">
					<p class="font-bold">
						{isNaN(concOfRadiolabelledPeptide_mols)
							? '00'
							: concOfRadiolabelledPeptide_mols.toFixed(4)} Mol
					</p>
					<p class="font-bold">
						{isNaN(concOfRadiolabelledPeptide_microMols)
							? '00'
							: concOfRadiolabelledPeptide_microMols.toFixed(4)} μM
					</p>
					<p class="font-bold">
						{isNaN(concOfRadiolabelledPeptide_microMolsBy1000)
							? '00'
							: concOfRadiolabelledPeptide_microMolsBy1000.toFixed(4)} nM
					</p>
				</div>
			</div>
			<!-- <div class="flex justify-between bg-green-500"> -->
			<DisplayInfo
				label="Specific Activity"
				value={isNaN(radiolabelingActualActivity) ? '00' : radiolabelingActualActivity.toFixed(4)}
				measurement="MBq/µg"
			/>
			<!-- </div> -->
			<div class="mt-2 flex justify-between">
				<p>Molar Activity:</p>
				<div class="flex space-x-6">
					<p class="font-bold">
						{isNaN(radiolabelingMolarActivity_MBq_µmol)
							? '00'
							: radiolabelingMolarActivity_MBq_µmol.toFixed(4)} MBq/µmol
					</p>
					<p class="font-bold">
						{isNaN(radiolabelingMolarActivity_GBq_µmol)
							? '00'
							: radiolabelingMolarActivity_GBq_µmol.toFixed(4)} GBq/µmol
					</p>
				</div>
			</div>
		</div>

		<!-- Radiochemists Section -->
		<section class="mt-5">
			<h3 class="text-2xl font-bold">For Radiochemists</h3>
			<div class="mt-2 flex flex-col justify-start rounded-lg border border-gray-400 p-4">
				<div class="flex w-1/2">
					<Input
						label="Lu-177 Stock Activity"
						bind:value={lu_177StockActivity}
						measurement="MBq/mL"
					/>
				</div>
				<div class="mt-4 grid grid-cols-2 gap-4">
					<div class="flex flex-col gap-2">
						<h4 class="text-lg font-bold">Radio Labelling</h4>
						<DisplayInfo
							label="Volume of Ligand/Precursor"
							value={isNaN(volumeOfLigandPrecursor) ? '00' : volumeOfLigandPrecursor.toFixed(4)}
							measurement="μL"
						/>
						<DisplayInfo
							label="Volume of Lu-177"
							value={isNaN(volumeOfLu177) ? '00' : volumeOfLigandPrecursor.toFixed(4)}
							measurement="μL"
						/>
						<DisplayInfo
							label="Volume of Radiolabelling Buffer"
							value={isNaN(volumeOfRadioLabellingBuffer)
								? '00'
								: volumeOfRadioLabellingBuffer.toFixed(4)}
							measurement="μL"
						/>
						<DisplayInfo
							label="Total Reaction Volume"
							value={isNaN(totalReactionVolume) ? '00' : volumeOfRadioLabellingBuffer.toFixed(4)}
							measurement="μL"
						/>
						<Input
							label="Actual Activity"
							bind:value={radiolabelingActualActivity}
							measurement="MBq"
						/>
					</div>
					<div class="flex flex-col gap-2">
						<h4 class="text-lg font-bold">Stock Solution in Binding Buffer</h4>
						<DisplayInfo
							label="Volume of Radiolabelled Ligand"
							value={isNaN(volumeOfRadioLabelledLigand)
								? '00'
								: volumeOfRadioLabelledLigand.toFixed(4)}
							measurement="μL"
						/>
						<DisplayInfo
							label="Volume of Binding Buffer"
							value={isNaN(volumeOfBindingBuffer) ? '00' : volumeOfBindingBuffer.toFixed(4)}
							measurement="mL"
						/>
						<DisplayInfo
							label="Theoretical Activity"
							value={isNaN(theoreticalActivity) ? '00' : theoreticalActivity.toFixed(4)}
							measurement="μL"
						/>
						<Input
							label="Actual Activity"
							bind:value={stockSolutionInBindingBufferActualActivity}
							measurement="MBq"
						/>
					</div>
				</div>
				<!-- <div class="mt-4 flex justify-between"> -->
				<div class=" mt-4 flex w-[80%] w-auto items-end justify-center">
					<TimeInput label="Time" bind:value={time} span="hh:mm" />
					<DateInput label="Date" bind:value={date} />
					<!-- <button>Time Stamp</button> -->
					<button
						class="mx-auto transform rounded rounded-xl bg-orange-500 p-2 px-20 transition duration-300 ease-in-out hover:scale-110 hover:bg-orange-600"
						on:click={handleTimeStamp}>Time Stamp</button
					>
				</div>
				<!-- </div> -->
			</div>
		</section>

		<!-- Biologists Section -->
		<section class="mt-5">
			<h3 class="text-2xl font-bold">For Biologists</h3>
			<div class="mt-2 flex flex-col gap-2 rounded-lg border border-gray-400 p-4">
				<DisplayInfo
					label="Percentage of Activity Yield"
					value={isNaN(percentageOfActivityYield) ? '00' : percentageOfActivityYield.toFixed(4)}
					measurement="%"
				/>
				<DisplayInfo
					label="Specific Activity"
					value={isNaN(specificActivity) ? '00' : specificActivity.toFixed(4)}
					measurement="μL"
				/>
			</div>
		</section>
		<!--  -->
		<!-- API -->
		<h3 class="mb-2 mt-4 text-2xl font-bold">Compound Search</h3>
		<section class=" rounded-lg bg-gray-800">
			<div class=" flex flex-col gap-2 p-8">
				<PubChem />

				{#if $compoundData}
					<h2>Compound Details</h2>
					<p>{$compoundData.MolecularWeight}</p>
					<p>{$compoundData.InChIKey}</p>
				{/if}
			</div>
			<!-- ********** -->
		</section>
	</main>
</div>
