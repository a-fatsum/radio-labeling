<script lang="ts">
	// @ts-ignore
	import Input from '$lib/components/Input.svelte';
	import DateInput from '$lib/components/DateInput.svelte';
	import TimeInput from '$lib/components/TimeInput.svelte';
	import DisplayInfo from '$lib/components/DisplayInfo.svelte';
	//
	let ligandNameInput: string;

	let lu_177StockActivity: number;
	let date: Date;
	let volumeOfRadioLabellingBuffer: number;
	let volumeOfBindingBuffer: number;
	let theoreticalActivity: number;
	let totalReactionVolume: number;
	let stockSolutionInBindingBufferActualActivity: any;
	let time: any;
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
	$: {
		ligandName = ligandNameInput;
	}
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
</script>

<!--  -->
<div class="main flex h-[100vh] w-auto bg-gray-950 text-sm text-[#ffffff]">
	<!-- nav-bar WRAPPER -->
	<div
		class="left-nav-bar relative flex w-1/2 flex-col items-start justify-center bg-[#1f2937] p-8"
	>
		<!-- Binding Buffer -->
		<h3 class="mb-5 text-2xl font-bold text-[#ffffff]">Binding Buffer</h3>
		<!-- <div class="relative"> -->
		<Input bind:value={totalConc} label={'Total Conc'} measurement={'nM'} />
		<span class=" ml-[85%] text-xs font-light">in</span>
		<!-- </div> -->
		<Input bind:value={totalActivity} label={'Total Activity'} measurement={'MBq'} />
		<span class="ml-[85%] text-xs font-light">of</span>
		<Input bind:value={ligandNameInput} label={'Ligand Name'} measurement={''} />
		<span class="ml-[85%] text-xs font-light">in</span>
		<Input bind:value={volume_BindingBuffer} label={'Volume'} measurement={'mL'} />

		<!-- Planning -->
		<h3 class="mb-2 mt-8 text-2xl font-bold text-[#ffffff]">Planning</h3>
		<div class="mt-2 flex w-full flex-col gap-4">
			<DisplayInfo label={'Ligand Name'} measurement={''} value={ligandName} />
			<Input bind:value={peptide_mw} label={'Peptide mw'} measurement={'mw'} />
			<Input bind:value={ligandMass} label={'Ligand Mass'} measurement={'μg'} />
			<Input
				bind:value={ligandStockConcentration}
				label={'Ligand stock concentration'}
				measurement={'mg/mL'}
			/>
			<Input
				bind:value={radiolabelingReactionVolume}
				label={'Radiolabeling Reaction Volume'}
				measurement={'ml'}
			/>
			<!-- <Input bind:value label={'Amount of activity needed for reaction:'} measurement={'mol'} /> -->
			<DisplayInfo
				label={'Amount of activity needed for reaction'}
				value={amountOfActivityNeededForReaction
					? amountOfActivityNeededForReaction.toFixed(4)
					: ''}
				measurement={'mol'}
			/>
			<Input
				bind:value={activityUsedInRadiolabeling}
				label={'Activity used in radiolabeling'}
				measurement={'MBq'}
			/>
		</div>
		<!-- print -->
		<button
			class="mx-auto mt-8 transform rounded rounded-xl bg-orange-500 p-2 px-20 transition duration-300 ease-in-out hover:scale-110 hover:bg-orange-600"
			on:click={handlePrint}>Print Report</button
		>
	</div>
	<div class="wrapper flex w-full flex-col items-start justify-between bg-gray-700 p-8 text-white">
		<!-- Radiolabelling Reaction Results -->
		<p class=" text-2xl font-bold text-[#ffffff]">Radiolabeling Reaction Results</p>
		<div
			class=" mt-2 flex w-full flex-col items-start rounded-lg border border-gray-400 border-gray-400 p-4"
		>
			<!--  -->
			<div class="flex w-full items-start justify-between">
				<p>Conc. of Radiolabelled peptide:</p>
				<div class="flex w-1/3 justify-between">
					<p class="text-base font-bold">
						<span
							>{concOfRadiolabelledPeptide_mols
								? concOfRadiolabelledPeptide_mols.toFixed(4)
								: ''}</span
						>
						<span>Mol</span>
					</p>
					<p class="text-base font-bold">
						<span
							>{concOfRadiolabelledPeptide_microMols
								? concOfRadiolabelledPeptide_microMols.toFixed(4)
								: ''}</span
						>
						<span>μM</span>
					</p>

					<p class="text-base font-bold">
						<span
							>{concOfRadiolabelledPeptide_microMolsBy1000
								? concOfRadiolabelledPeptide_microMolsBy1000.toFixed(4)
								: ''}</span
						>
						<span>nM</span>
					</p>
				</div>
			</div>
			<!--  -->
			<DisplayInfo
				label={'Specific Activity'}
				value={radiolabelingActualActivity ? radiolabelingActualActivity.toFixed(4) : ''}
				measurement={'MBq/µg'}
			/>

			<!--  -->
			<div class="flex w-full items-start justify-between">
				<p>Molar Activity:</p>
				<!-- <div class=" ml-auto flex gap-2 text-base font-bold"> -->
				<div class="flex w-1/2 justify-between">
					<p class="ml-auto text-base font-bold">
						<span
							>{radiolabelingMolarActivity_MBq_µmol
								? radiolabelingMolarActivity_MBq_µmol.toFixed(4)
								: ''}</span
						>
						<span>MBq/µmol</span>
					</p>
					<!-- </div> -->
					<!-- <div class=" ml-auto flex gap-2 text-base font-bold"> -->
					<p class="ml-auto text-base font-bold">
						<span
							>{radiolabelingMolarActivity_GBq_µmol
								? radiolabelingMolarActivity_GBq_µmol.toFixed(4)
								: ''}</span
						>
						<span>GBq/µmol</span>
					</p>
					<!-- </div> -->
				</div>
			</div>
		</div>

		<!--  -->
		<!--  -->

		<!-- For radiochemists && Biologists -->
		<div class=" mt-5 flex w-full justify-between">
			<!-- For Radiochemists -->
			<div class="for-radiochemists w-[60%]">
				<h3 class="text-2xl font-bold text-[#ffffff]">For Radiochemists</h3>
				<div
					class="binding-buffer mt-2 flex flex-col rounded rounded-lg border border-gray-400 px-8 py-6 text-white"
				>
					<Input
						label={'Lu-177 stock activity'}
						bind:value={lu_177StockActivity}
						measurement={'MBq/mL'}
					/>
					<div class="flex flex-col gap-2">
						<h4 class="mt-4 text-lg font-bold">Radio Labelling</h4>
						<DisplayInfo
							label={'Volume of ligand/precursor'}
							value={volumeOfLigandPrecursor ? volumeOfLigandPrecursor.toExponential(4) : ''}
							measurement={'μL'}
						/>

						<!--  -->

						<DisplayInfo
							label={'Volume of Lu-177:'}
							measurement={'μL'}
							value={volumeOfLu177 ? volumeOfLu177.toFixed(4) : ''}
						/>
						<!--  -->
						<DisplayInfo
							label={'Volume of radiolabelling buffer'}
							measurement={'μL'}
							value={volumeOfRadioLabellingBuffer ? volumeOfRadioLabellingBuffer.toFixed(4) : ''}
						/>
						<!--  -->
						<DisplayInfo
							label={'Total reaction volume'}
							measurement={'μL'}
							value={totalReactionVolume ? totalReactionVolume.toFixed(4) : ''}
						/>
						<!--  -->
						<Input
							label={'Actual Activity:'}
							bind:value={radiolabelingActualActivity}
							measurement={'MBq'}
						/>
					</div>
					<!--  -->
					<div class="mt-2 flex flex-col gap-2">
						<h4 class="mt-2 text-lg font-bold">Stock solution in binding buffer</h4>
						<!--  -->
						<DisplayInfo
							label={'Volume of radiolabelled ligand'}
							measurement={'μL'}
							value={volumeOfRadioLabelledLigand ? volumeOfRadioLabelledLigand.toFixed(4) : ''}
						/>
						<!--  -->
						<DisplayInfo
							label={'Volume of binding buffer'}
							measurement={'ml'}
							value={volumeOfBindingBuffer ? volumeOfBindingBuffer.toFixed(4) : ''}
						/>
						<!--  -->
						<DisplayInfo
							label={'Theoretical Activity'}
							measurement={'μL'}
							value={theoreticalActivity ? theoreticalActivity.toFixed(4) : ''}
						/>
						<!--  -->
						<Input
							label={'Actual Activity'}
							bind:value={stockSolutionInBindingBufferActualActivity}
							measurement={'MBq'}
						/>
						<div class="flex justify-between">
							<TimeInput label={'Time'} bind:value={time} span={'hh:mm'} />
							<DateInput label={'Date'} bind:value={date} span={''} />
						</div>
					</div>
				</div>
			</div>
			<!-- For Biologists -->
			<div class="for-biologists flex w-1/3 flex-col">
				<h3 class="text-2xl font-bold">For Biologists</h3>
				<div
					class="binding-buffer mt-2 flex flex-col gap-2 rounded rounded-lg border border-gray-400 px-8 py-6 text-xs text-white"
				>
					<DisplayInfo
						label={'Percentage of Activity yield'}
						measurement={'%'}
						value={percentageOfActivityYield ? percentageOfActivityYield.toFixed(4) : ''}
					/>
					<!--  -->
					<DisplayInfo
						label={'Specific Activity'}
						measurement={'μL'}
						value={specificActivity ? specificActivity.toFixed(4) : ''}
					/>
					<!--  -->
					<DisplayInfo
						label={'Molar Activity'}
						measurement={'GBq/µmol'}
						value={molarActivity ? molarActivity.toFixed(4) : ''}
					/>
				</div>
			</div>
		</div>
	</div>
</div>
