import { useState, type ReactElement } from "react";
import logo from "./welcome/logo.png";
import { NavLink } from "react-router";
import { Nav } from "~/routes/nav";

const CounterdataTypes = {
  identify: "Identify",
  makeVisible: "Make visible",
  // no challenge for now
  // challenge: "Challenge",
  resist: "Resist",
};

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

export default function ({ description, collectionItems }: CollectionProps) {
  return (
    <div className="flex flex-col items-center">
      <NavLink to="/">
        <div className="pt-5 font-bold">
          <h1>Counterdata Visualisation</h1>
          <p className="text-2xl">of Digital Museum Collections</p>
        </div>
      </NavLink>
      <Nav />
      <div className="flex flex-row gap-3">
        <div className="w-1/2 bg-white rounded-2xl border border-black-200 p-6">
          <p className="max-h-[520px] overflow-y-scroll">{description}...</p>
        </div>
        <div className="w-1/2 bg-white rounded-2xl border border-black-200 p-6 pt-10">
          {collectionItems.map((item, index) => (
            <div>
              <p>{item.name}</p>
              <NavLink to={`${index}`}>
                <img src={item.src} aria-label={item.name} style={{ width: "200px" }} />
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
