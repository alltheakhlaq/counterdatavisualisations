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
      <div className="flex flex-row w-full">
        {/* left side of page - image and title */}
        <div className="flex flex-row flex-1">
          {/* image, title, etc */}
          <div className="flex-1">
            <div>
              <button className="pb-10" type="button" onClick={() => navigate(-1)}>
                Back to collection
              </button>
            </div>
            <div>
              <img src={collectionObject.src} />
            </div>
            <div className="pt-3 pb-3">Object title:</div>
            <div className="">{collectionObject.fullName}</div>
          </div>
          {/* options to scroll to counterdata */}
          <div className="flex-0 pr-5 pl-3 cursor-pointer mt-16">
            <div className="mb-6 gap-50">
              <div className="rounded-full bg-[#6369d1] size-5"></div>
              <a onClick={getOnClickSection("label1")}>Data fields </a>
            </div>
            <div className="mb-6">
              <div className="rounded-full bg-[#ffcf56] size-5"></div>
              <a onClick={getOnClickSection("label2")}>Matrix of Domination </a>
            </div>
            <div>
              <div className="rounded-full bg-[#2ebfa5] size-5"></div>
              <a onClick={getOnClickSection("label3")}>Current availability</a>
            </div>
          </div>
        </div>
        {/* right side - data fields and counterdata */}
        <div className="flex-2 mr-8 max-h-[700px] overflow-y-scroll ">
          <section className="bg-white rounded-2xl border-8 border-[#6369d1] p-6">
            <div id="label1">
              <h2>Data fields</h2>{" "}
            </div>
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
          <section className="bg-white rounded-2xl border-8 border-[#ffcf56] p-6">
            <div id="label2">
              <h2>Matrix of Domination</h2>
            </div>
            <div>Structural Domain</div>
            <div>Disciplinary Domain</div>
            <div>Hegemonic Domain</div>
            <div>Interpersonal Domain</div>
          </section>
          <section className="bg-white rounded-2xl border-8 border-[#2ebfa5] p-6">
            <div id="label3">
              <h2>Current digital availability</h2>
            </div>
            <div>counterdata contents 3</div>
          </section>
        </div>
      </div>
    </div>
  );
}
