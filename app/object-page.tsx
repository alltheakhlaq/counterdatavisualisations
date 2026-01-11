import { useState, type ReactElement } from "react";
import logo from "./welcome/logo.png";
import { NavLink, useLocation, useNavigate } from "react-router";
import { Nav } from "~/routes/nav";
import { SloaneCollectionObjects } from "./sloanecol/sloanecol-new";

const CounterdataTypes = {
  identify: "Identify",
  makeVisible: "Make visible",
  // no challenge for now
  // challenge: "Challenge",
  resist: "Resist",
};

const initialState = Object.fromEntries(
  Object.values(CounterdataTypes).map((counterdata) => [counterdata, false])
);

type DataField = {
  fieldValue: string;
  contextTag: string;
};

type DataFields = {
  "Object Name:": DataField;
  "Condition:": DataField;
  "Access to the digital material:": DataField;
  "Access to the physical object:": DataField;
  "Cultural significance for the source community:": DataField;
  "Method of acquisition:": DataField;
  "Biographical history of holder (collector):": DataField;
  "Current holding institution:": DataField;
  "Historical Power Dimension:": DataField[];
  "Contemporary Power Dimension:": DataField;
};

export type CollectionObject = {
  name: string;
  src: string;
  dataFields: DataFields;
  objectContext: ReactElement | null;
  identify: ReactElement | string;
  makeVisible: ReactElement | string;
  challenge: ReactElement | string;
  resist: ReactElement | string;
};

type CollectionProps = {};

export default function (props: CollectionProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const collectionItems = SloaneCollectionObjects;
  const objectIndex = parseInt(pathname.split("/").at(-1)!);

  const collectionObject = collectionItems[objectIndex];

  const getOnClickSection = (id: string) => () => {
    const context = document.querySelector(`#${id}`);
    context?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col items-center">
      <NavLink to="/">
        <div className="pt-5 font-bold">
          <h1>Counterdata Visualisation</h1>
          <p className="text-2xl">of Digital Museum Collections</p>
        </div>
      </NavLink>
      <Nav />
      <div className="flex flex-row">
        {/* left side of page - image and title */}
        <div className="flex flex-row flex-1">
          {/* image, title, etc */}
          <div className="flex-1">
            <div>
              <button className="pt-10" type="button" onClick={() => navigate(-1)}>
                Back to collection
              </button>
            </div>
            <div>
              <img src={collectionObject.src} />
            </div>
            <div>Title</div>
            <div>{collectionObject.fullName}</div>
          </div>
          {/* options to scroll to counterdata */}
          <div className="flex-0">
            <div>Data fields</div>
            <a onClick={getOnClickSection("label1")}>Label 1</a>
            <a onClick={getOnClickSection("label2")}>Label 2</a>
            <a onClick={getOnClickSection("label3")}>Label 3</a>
          </div>
        </div>
        {/* right side - data fields and counterdata */}
        <div className="flex-2 mr-8 max-h-[700px] overflow-y-scroll">
          <section>
            <div>Data fields</div>
            <dl>
              {Object.entries(collectionItems[objectIndex].dataFields).map(
                ([fieldName, fieldInfo]) => {
                  const fieldValues = Array.isArray(fieldInfo) ? fieldInfo : [fieldInfo];
                  return (
                    <>
                      <dt>
                        <strong>{fieldName}</strong>
                      </dt>
                      {fieldValues.map(({ fieldValue, contextTag }) => (
                        <dd
                          className="mb-4"
                          onClick={() => {
                            const context = document.querySelector(
                              `[data-context-tag="${contextTag}"]`
                            );
                            context?.scrollIntoView({ behavior: "smooth" });
                          }}
                          style={contextTag ? { cursor: "pointer" } : undefined}
                        >
                          {fieldValue}
                        </dd>
                      ))}
                    </>
                  );
                }
              )}
            </dl>
          </section>
          <section>
            <div id="label1">Label 1</div>
            <div>counterdata contents 1</div>
          </section>
          <section>
            <div id="label2">Label 2</div>
            <div>counterdata contents 2</div>
          </section>
          <section>
            <div id="label2">Label 3</div>
            <div>counterdata contents 3</div>
          </section>
        </div>
      </div>
    </div>
  );
}
