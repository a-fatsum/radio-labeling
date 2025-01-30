<script lang="ts">
	// @ts-ignore
	import Input from '$lib/components/Input.svelte';
	import DateInput from '$lib/components/DateInput.svelte';
	import TimeInput from '$lib/components/TimeInput.svelte';
	import DisplayInfo from '$lib/components/DisplayInfo.svelte';
	//
	let value: number = 0;
	let ligandName: string;
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

<!--  -->
<div class="main flex h-screen w-auto bg-gray-950 text-sm text-white">
	<!-- nav-bar WRAPPER -->
	<div class="left-nav-bar relative flex w-1/3 flex-col items-start bg-[#1f2937] p-8">
		<!-- Binding Buffer -->
		<h3 class="text-2xl font-bold">Binding Buffer</h3>
		<!-- <div class="relative"> -->
		<Input bind:value label={'Total Conc'} measurement={'nM'} />
		<span class=" ml-[85%] font-light">in</span>
		<!-- </div> -->
		<Input bind:value label={'Total Activity'} measurement={'MBq'} />
		<span class="ml-[85%] font-light">of</span>
		<Input bind:value={ligandName} label={'Ligand Name'} measurement={''} />
		<span class="ml-[85%] font-light">in</span>
		<Input bind:value label={'Volume'} measurement={'mL'} />

		<!-- Planning -->
		<h3 class="mb-2 mt-4 text-2xl font-bold">Planning</h3>
		<div class="flex w-full flex-col gap-5">
			<DisplayInfo label={'Ligand Name'} measurement={''} value={ligandName} />
			<!-- <p>Ligand Name <span>{ligandName}</span></p> -->
			<!-- <div class="flex flex-col gap-12"> -->
			<!-- <div class="flex flex-col gap-2"> -->
			<Input bind:value label={'Peptide MW'} measurement={'μg'} />
			<Input bind:value label={'Ligand Mass'} measurement={'μg'} />
			<Input bind:value label={'Ligand stock concentration'} measurement={'mg/mL'} />
			<!-- </div> -->
			<!-- <div class="flex flex-col gap-2"> -->
			<Input bind:value label={'Radiolabeling Reaction Volume'} measurement={'ml'} />
			<Input bind:value label={'Amount of activity needed for reaction:'} measurement={'mol'} />
			<Input bind:value label={'Activity used in radiolabeling'} measurement={'MBq'} />
		</div>
		<!-- </div> -->
		<!-- </div> -->
		<!--  -->
	</div>
	<div class="wrapper flex w-full flex-col items-start justify-between bg-gray-700 p-8 text-white">
		<!-- Radiolabelling Reaction Results -->
		<p class=" text-2xl font-bold">Radiolabelling Reaction Results</p>
		<div class=" flex w-1/2 flex-col items-start rounded-lg border p-4">
			<!--  -->
			<div class="flex w-full items-start justify-between">
				<p>Conc. of Radiolabelled peptide:</p>
				<div class="flex w-1/3 justify-between">
					<p class="text-base font-bold">
						<span>{spreadSheetCell_c20}</span>
						<span>M</span>
					</p>
					<p class="text-base font-bold">
						<span>{spreadSheetCell_d20}</span>
						<span>μM</span>
					</p>

					<p class="text-base font-bold">
						<span>{spreadSheetCell_e20}</span>
						<span>nM</span>
					</p>
				</div>
			</div>
			<!--  -->
			<div class="flex w-full items-start">
				<p>Specific Activity​:</p>
				<!-- <div class=" ml-auto flex gap-2 text-base font-bold"> -->
				<p class="ml-auto text-base font-bold">
					<span>{spreadSheetCell_c22}</span>
					<span>​MBq/µg</span>
				</p>
				<!-- </div> -->
			</div>
			<!--  -->
			<div class="flex w-full items-start justify-between">
				<p>Molar Activity:</p>
				<!-- <div class=" ml-auto flex gap-2 text-base font-bold"> -->
				<div class="flex w-1/2 justify-between">
					<p class="ml-auto text-base font-bold">
						<span>{spreadSheetCell_c24}</span>
						<span>MBq/µmol</span>
					</p>
					<!-- </div> -->
					<!-- <div class=" ml-auto flex gap-2 text-base font-bold"> -->
					<p class="ml-auto text-base font-bold">
						<span>{spreadSheetCell_d24}</span>
						<span>GBq/µmol</span>
					</p>
					<!-- </div> -->
				</div>
			</div>
		</div>

		<!--  -->
		<!--  -->

		<!-- For radiochemists && Biologists -->
		<div class=" flex w-full justify-between">
			<!-- For Radiochemists -->
			<div class="for-radiochemists w-1/2">
				<h3 class="text-2xl font-bold">For Radiochemists</h3>
				<div
					class="binding-buffer mt-2 flex flex-col rounded rounded-md bg-gray-800 p-4 text-white"
				>
					<Input
						label={'Lu-177 stock activity'}
						bind:value={lu_177StockActivity}
						measurement={'MBq/mL'}
					/>
					<div class="flex flex-col gap-4">
						<h4 class="mt-4 text-lg font-bold">Radio Labelling</h4>
						<div class="flex">
							<p>Volume of ligand/precursor:</p>
							<p class=" ml-auto text-base font-bold"><span> {volumeOfLigandPrecursor}</span> μL</p>
						</div>
						<!--  -->

						<DisplayInfo label={'Volume of Lu-177:'} measurement={'μL'} value={volumeOfLu177} />
						<!--  -->
						<DisplayInfo
							label={'Volume of radiolabelling buffer:'}
							measurement={'μL'}
							value={volumeOfRadioLabellingBuffer}
						/>
						<!--  -->
						<DisplayInfo
							label={'Total reaction volume:'}
							measurement={'μL'}
							value={totalReactionVolume}
						/>
						<!--  -->
						<Input label={'Actual Activity:'} bind:value={actualActivity} measurement={'MBq'} />
					</div>
					<!--  -->
					<div class="mt-8 flex flex-col gap-4">
						<h4 class="mt-4 text-lg font-bold">Stock solution in binding buffer</h4>
						<!--  -->
						<DisplayInfo
							label={'Volume of radiolabelled ligand'}
							measurement={'μL'}
							value={volumeOfRadioLabelledLigand}
						/>
						<!--  -->
						<DisplayInfo
							label={'Volume of binding buffer'}
							measurement={'ml'}
							value={volumeOfBindingBuffer}
						/>
						<!--  -->
						<DisplayInfo
							label={'Theoretical Activity'}
							measurement={'μL'}
							value={theoreticalActivity}
						/>
						<!--  -->
						<Input
							label={'Actual Activity'}
							bind:value={stockSolutionInBindingBufferActualActivity}
							measurement={'MBq'}
						/>
						<TimeInput label={'Time'} bind:value={time} span={'hh:mm'} />
						<DateInput label={'Date'} bind:value={date} span={''} />
					</div>
				</div>
			</div>
			<!-- For Biologists -->
			<div class="for-biologists flex w-1/3 flex-col">
				<h3 class="text-2xl font-bold">For Biologists</h3>
				<div
					class="binding-buffer mt-2 flex flex-col gap-4 rounded rounded-md bg-gray-800 p-4 text-xs text-white"
				>
					<DisplayInfo
						label={'Percentage of Activity yield'}
						measurement={'%'}
						value={percentageOfActivityYield}
					/>
					<!--  -->
					<DisplayInfo label={'Specific Activity'} measurement={'μL'} value={specificActivity} />
					<!--  -->
					<DisplayInfo label={'Molar Activity'} measurement={'GBq/µmol'} value={molarActivity} />
				</div>
			</div>
		</div>
	</div>
</div>
