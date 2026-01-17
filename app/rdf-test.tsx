import { graph, namedNode, parse } from "rdflib";
import * as $rdf from "rdflib";
import { useEffect, useMemo, useState, type JSX } from "react";
// @ts-expect-error
import solidNamespace from "solid-namespace";
// @ts-expect-error
import body from "./rdf/test-turtle.ttl";

const ns = solidNamespace($rdf);

const CRM = $rdf.Namespace("http://www.cidoc-crm.org/cidoc-crm/");
const RDF = $rdf.Namespace("http://www.w3.org/1999/02/22-rdf-syntax-ns#");
const RDFS = $rdf.Namespace("http://www.w3.org/2000/01/rdf-schema#");
const XSD = $rdf.Namespace("http://www.w3.org/2001/XMLSchema#");

const uri = "https://example.org/resource.ttl";

export default function RdflibLocalDemo(): JSX.Element {
  const store = useMemo(() => graph(), []);
  const [name, setName] = useState<string | undefined>();
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    parse(body, store, uri, "text/turtle", (e, updatedStore) => {
      if (e) setError(e);
      setName(updatedStore?.any(namedNode(uri), ns.foaf("name"), null)?.value || "");
    });
  }, []);

  if (error) {
    return <div>There's been an error - sad!!!</div>;
  }

  if (name === undefined) {
    return <div>Loading!!??!! Wait!!!</div>;
  }

  const subject = $rdf.sym("http://example.com/event/creation/da3548b4");
  const title = store.any(subject, CRM("P14_carried_out_by"));

  return <div>{title?.value || "Something loaded...?"}</div>;
}
