import Collection from "~/collection";
import logo from "../welcome/logo.png";

export default function () {
  return (
    <Collection
      title="Sloane collection"
      description="Stolen things by the Sloane"
      collectionItems={[{ name: "nice painting", src: logo }]}
    />
  );
}
