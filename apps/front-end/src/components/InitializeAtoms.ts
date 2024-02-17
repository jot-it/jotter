import { useHydrateAtoms } from "jotai/utils";

type HydrateAtomsProps = { values: Parameters<typeof useHydrateAtoms>[0] };

function InitializeAtoms({ values }: HydrateAtomsProps) {
  useHydrateAtoms(values);
  return null;
}

export default InitializeAtoms;
