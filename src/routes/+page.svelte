<script lang="ts">
// @ts-ignore
import Input from "$lib/components/Input.svelte";
// 
let value: number=0;
let ligandName:string = "ligandName";
let millimole:string="23.43";
let micromole:string="0.0032";
let spreadSheetCell_c17: number=12;
let spreadSheetCell_d17: number=24;
let spreadSheetCell_e17:number= 0.023;
let spreadSheetCell_c20: number=12;
let spreadSheetCell_d20: number=24;
let spreadSheetCell_e20:number= 0.023;
let spreadSheetCell_c22:number=0.0082
let spreadSheetCell_c24: number=0.214
let spreadSheetCell_d24:number = 31.03
// 
</script>
<div class="main bg-gray-900 h-screen w-full flex flex-col">
  <!-- Binding Buffer -->
  <div class="binding-buffer text-white flex flex-col m-8 rounded rounded-md">
    <h3>Binding Buffer</h3>
    <div class="inputs flex items-end mt-2 bg-gray-700 p-4"> 
      <Input bind:value={value} label={"Total Conc (nM)"}/> 
      <span class="m-2">in</span>
      <Input bind:value={value} label={"Total Activity (MBq)"}/> 
      <span class="m-2">of</span>
      <Input bind:value={value} label={"Ligand Name"}/> 
      <span class="m-2">in</span>
      <Input bind:value={value} label={"Volume (mL)"}/> 
    </div>
  </div>
  <!-- Planning -->
  <div class="planning flex flex-col text-white m-8">
    <h3>Planning</h3>
    <div class="binding-buffer text-white bg-gray-800 w-1/2 flex flex-col gap-4  p-4 mt-2 text-xs rounded rounded-md">
      <p>Ligand Name <span>{ligandName}</span></p>
      <div class="flex gap-12">
        <div class="flex flex-col gap-2">
          <Input bind:value={value} label={"Peptide MW"} span={"μg"}/> 
          <Input bind:value={value} label={"Ligand Mass (μg)"} span={"μg"}/> 
          <Input bind:value={value} label={"Ligand stock concentration"} span={"mg/mL"}/> 
        </div>
        <div class="flex flex-col gap-2">
          <Input bind:value={value} label={"Radiolabeling Reaction Volume"} span={"ml"}/> 
          <Input bind:value={value} label={"Activity used in radiolabeling"} span={"MBq"}/> 
          <div class="flex gap-4 items-center">
            <Input bind:value={value} label={"Moles"} span={"mol"}/>
            <div class="flex flex-col">
              <p>millimole</p>
              <span>{millimole}</span>
              <span>mmol</span>
            </div> 
            <div class="flex flex-col">
              <p>micromole</p>
              <span>{micromole}</span>
              <span>µmol</span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex gap-4 items-center">
        <p>Radiolabelling Reaction Results</p>
        <div class="flex flex-col">
          <span>M</span>
          <span>{spreadSheetCell_c17}</span>
        </div>
        <div class="flex flex-col">
          <span>mM</span>
          <span>{spreadSheetCell_d17}</span>
        </div>
        <div class="flex flex-col">
          <span>µM</span>
          <span>{spreadSheetCell_e17}</span>
        </div>
      </div>
      <!--  -->
      <div class="flex gap-4 items-center">
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
      <div  class="flex gap-4 items-center">
        <p>Specific Activity​</p>
        <div class="flex flex-col">
          <span>​MBq/µg</span>
          <span>{spreadSheetCell_c22}</span>
        </div>
      </div>
      <!--  -->
      <div class="flex gap-4 items-center">
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
  <div class="wrapper flex justify-around">
    <!-- For Radiochemists -->
    <div class="for-radiochemists"></div>
<!-- For Biologists -->
<div class="for-radiochemists"></div>

  </div>

</div>