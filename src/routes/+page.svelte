<script lang="ts">
	// @ts-ignore
	import Input from '$lib/components/Input.svelte';
	import DateInput from '$lib/components/DateInput.svelte';
	import TimeInput from '$lib/components/TimeInput.svelte';
	//
	let value: number = 0;
	let ligandName: string = 'ligandName';
	let millimole: string = '23.43';
	let micromole: string = '0.0032';
	let spreadSheetCell_c17: number = 12;
	let spreadSheetCell_d17: number = 24;
	let spreadSheetCell_e17: number = 0.023;
	let spreadSheetCell_c20: number = 12;
	let spreadSheetCell_d20: number = 24;
	let spreadSheetCell_e20: number = 0.023;
	let spreadSheetCell_c22: number = 0.0082;
	let spreadSheetCell_c24: number = 0.214;
	let spreadSheetCell_d24: number = 31.03;
	let lu_177StockActivity: number = 344;
	let date: Date;
	let volumeOfLigandPrecursor: number = 97;
	let volumeOfRadioLabellingBuffer: number = 14;
	let volumeOfLu177: number = 23;
	let volumeOfRadioLabelledLigand: number = 837;
	let volumeOfBindingBuffer: number = 523;
	let theoreticalActivity: number = 243;
	let totalReactionVolume: number = 87;
	let actualActivity: number = 23;
	let stockSolutionInBindingBufferActualActivity: any;
	let time: any;
	let percentageOfActivityYield: number = 64;
	let specificActivity: number = 7688;
	let molarActivity: number = 65.23;
	//
</script>

<div class="main flex h-auto w-auto flex-col bg-gray-900">
	<!-- Binding Buffer -->
	<div class="binding-buffer m-8 flex flex-col rounded rounded-md text-white">
		<h3 class="text-2xl font-bold">Binding Buffer</h3>
		<div class="inputs mt-2 flex w-[990px] items-end rounded-lg bg-gray-800 p-4">
			<Input bind:value label={'Total Conc (nM)'} />
			<span class="m-2">in</span>
			<Input bind:value label={'Total Activity (MBq)'} />
			<span class="m-2">of</span>
			<Input bind:value label={'Ligand Name'} />
			<span class="m-2">in</span>
			<Input bind:value label={'Volume (mL)'} />
		</div>
	</div>

	<!-- WRAPPER -->
	<div class="flex items-start">
		<!-- Planning -->
		<div class="planning ml-8 flex flex-col text-2xl font-bold text-white">
			<h3>Planning</h3>
			<div
				class="binding-buffer mt-2 flex flex-col gap-4 rounded rounded-md bg-gray-800 p-4 text-xs text-white"
			>
				<p>Ligand Name <span>{ligandName}</span></p>
				<div class="flex flex-col gap-12">
					<div class="flex flex-col gap-2">
						<Input bind:value label={'Peptide MW'} span={'μg'} />
						<Input bind:value label={'Ligand Mass (μg)'} span={'μg'} />
						<Input bind:value label={'Ligand stock concentration'} span={'mg/mL'} />
					</div>
					<div class="flex flex-col gap-2">
						<Input bind:value label={'Radiolabeling Reaction Volume'} span={'ml'} />
						<Input bind:value label={'Amount of activity needed for reaction:'} span={'mol'} />
						<Input bind:value label={'Activity used in radiolabeling'} span={'MBq'} />
					</div>
				</div>
				<div class="flex items-center gap-4">
					<p class="text-lg font-bold">Radiolabelling Reaction Results</p>
				</div>
				<!--  -->
				<div class="flex items-center gap-4">
					<p>Conc. of Radiolabelled peptide</p>
					<div class="flex flex-col">
						<span>M</span>
						<span>{spreadSheetCell_c20}</span>
					</div>
					<div class="flex flex-col">
						<span>μM</span>
						<span>{spreadSheetCell_d20}</span>
					</div>
					<div class="flex flex-col">
						<span>nM</span>
						<span>{spreadSheetCell_e20}</span>
					</div>
				</div>
				<!--  -->
				<div class="flex items-center gap-4">
					<p>Specific Activity​</p>
					<div class="flex flex-col">
						<span>​MBq/µg</span>
						<span>{spreadSheetCell_c22}</span>
					</div>
				</div>
				<!--  -->
				<div class="flex items-center gap-4">
					<p>Molar Activity</p>
					<div class="flex flex-col">
						<span>MBq/µmol</span>
						<span>{spreadSheetCell_c24}</span>
					</div>
					<div class="flex flex-col">
						<span>GBq/µmol</span>
						<span>{spreadSheetCell_d24}</span>
					</div>
				</div>
			</div>
		</div>
		<!--  -->
		<!-- WRAPPER -->
		<div class="wrapper ml-8 flex items-start justify-between gap-8 rounded-lg text-white">
			<!-- For Radiochemists -->
			<div class="for-radiochemists">
				<h3 class="text-2xl font-bold">For Radiochemists</h3>
				<div
					class="binding-buffer mt-2 flex flex-col gap-2 rounded rounded-md bg-gray-800 p-4 text-xs text-white"
				>
					<div class="flex flex-col gap-4">
						<Input
							label={'Lu-177 stock activity'}
							bind:value={lu_177StockActivity}
							span={'MBq/mL'}
						/>
						<DateInput label={'Date'} bind:value={date} span={''} />
						<h4 class="text-lg font-bold">Radio Labelling</h4>
						<p>Volume of ligand/precursor: <span> {volumeOfLigandPrecursor}</span> μL</p>
						<p>Volume of Lu-177: <span> {volumeOfLu177}</span> μL</p>
						<p>Volume of radiolabelling buffer: <span> {volumeOfRadioLabellingBuffer}</span> μL</p>
						<p>Total reaction volume: <span> {totalReactionVolume}</span> μL</p>
						<Input label={'Total reaction volume:'} bind:value={actualActivity} span={'MBq'} />
					</div>
					<div class="flex flex-col gap-4">
						<h4 class="text-lg font-bold">Stock solution in binding buffer</h4>
						<p>Volume of radiolabelled ligand: <span> {volumeOfRadioLabelledLigand}</span> μL</p>
						<p>Volume of binding buffer: <span> {volumeOfBindingBuffer}</span> ml</p>
						<p>Theoretical Activity: <span> {theoreticalActivity}</span> μL</p>
						<Input
							label={'Actual Activity'}
							bind:value={stockSolutionInBindingBufferActualActivity}
							span={'MBq'}
						/>
						<TimeInput label={'Time'} bind:value={time} span={'hh:mm'} />
					</div>
				</div>
			</div>
			<!-- For Biologists -->
			<div class="for-biologists flex flex-col">
				<h3 class="text-2xl font-bold">For Biologists</h3>
				<div
					class="binding-buffer mt-2 flex flex-col gap-4 rounded rounded-md bg-gray-800 p-4 text-xs text-white"
				>
					<p>Percentage of Activity yield: <span> {percentageOfActivityYield}</span> %</p>
					<p>Specific Activity: <span> {specificActivity}</span> μL</p>
					<p>Molar Activity: <span> {molarActivity}</span> GBq/µmol</p>
				</div>
			</div>
		</div>
	</div>
</div>
