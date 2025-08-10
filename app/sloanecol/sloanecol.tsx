import Collection, { type CollectionObject } from "~/collection";
import logo from "../welcome/logo.png";

const SloaneCollectionObjects: CollectionObject[] = [
  {
    name: "nice painting",
    src: logo,
    identify: "nice painting identify info",
    makeVisible: "nice painting visible making",
    challenge: "nice painting very challenging",
    resist: "is good to resist",
  },
];

export default function () {
  return (
    <Collection
      title="Sloane collection"
      description="Stolen things by the Sloane"
      collectionItems={SloaneCollectionObjects}
    />
  );
}
