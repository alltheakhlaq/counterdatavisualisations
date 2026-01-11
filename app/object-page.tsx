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

type CollectionProps = {
  title: string;
  mainImageSrc: string;
  description: string;
  collectionItems: CollectionObject[];
};

export default function ({ title, mainImageSrc, description }: CollectionProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const collectionItems = SloaneCollectionObjects;
  const objectIndex = parseInt(pathname.split("/").at(-1)!);

  return (
    <div className="flex flex-col items-center">
      <NavLink to="/">
        <div className="pt-5 font-bold">
          <h1>Counterdata Visualisation</h1>
          <p className="text-2xl">of Digital Museum Collections</p>
        </div>
      </NavLink>
      <Nav />
      <div>
        <button className="pt-10" type="button" onClick={() => navigate(-1)}>
          Back to collection
        </button>
        <div className="flex mb-20">
          <div className="flex-1">
            <img src={collectionItems[objectIndex].src} />
          </div>
          <div className="flex-1 mr-8 max-h-[700px] overflow-y-scroll">
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
          </div>
          <div className="flex-1 max-h-[700px] overflow-y-scroll">
            {collectionItems[objectIndex].objectContext}
          </div>
        </div>
        <div className="pt-10">{collectionItems[objectIndex].identify}</div>
        <div className="pt-10">{collectionItems[objectIndex].makeVisible}</div>
        {/* No challenge for now */}
        {/* {selectedCounterdata[CounterdataTypes.challenge] && (
            <div className="pt-10">{collectionItems[objectIndex].challenge}</div>
          )} */}
        <div className="pt-10">{collectionItems[objectIndex].resist}</div>
      </div>
    </div>
  );
}
