import { graph, namedNode, parse } from "rdflib";
import * as $rdf from "rdflib";
import { useEffect, useMemo, useState, type JSX } from "react";
// @ts-expect-error
import solidNamespace from "solid-namespace";

const ns = solidNamespace($rdf);

const uri = "https://example.org/resource.ttl";
const body = `<http://example.org/book/book1> <http://purl.org/dc/elements/1.1/title> "SPARQL Tutorial" .`;

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

  const subject = $rdf.sym("http://example.org/book/book1");
  const pred = $rdf.sym("http://purl.org/dc/elements/1.1/title");
  const title = store.any(subject, pred);

  return <div>{title?.value || "Something loaded...?"}</div>;
}
