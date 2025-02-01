import { writable } from 'svelte/store';

export const compoundData = writable(null);
export const errorMessage = writable('');

export async function fetchCompoundData(name: string) {
	errorMessage.set('');
	try {
		const res = await fetch(
			`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${name}/property/MolecularWeight,InChIKey/JSON`
		);
		if (!res.ok) throw new Error('Compound not found');
		const data = await res.json();
		compoundData.set(data.PropertyTable.Properties[0]);
	} catch (err) {
		errorMessage.set(err.message);
	}
}
