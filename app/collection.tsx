import { useState, type ReactElement } from "react";
import logo from "./welcome/logo.png";
import { NavLink } from "react-router";

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

export type CollectionObject = {
  name: string;
  src: string;
  dataFields: { [key: string]: string };
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

type DescriptionProps = {
  description: string;
  objectIsSelected: boolean;
  counterdataIsSelected: boolean;
};

function Description({ description, objectIsSelected, counterdataIsSelected }: DescriptionProps) {
  if (!objectIsSelected) {
    if (counterdataIsSelected) {
      return <p>{description.slice(0, 100)}...</p>;
    } else {
      return <p>{description}</p>;
    }
  } else {
    return null;
  }
}

export default function ({ title, mainImageSrc, description, collectionItems }: CollectionProps) {
  const [selectedCounterdata, setSelectedCounterdata] = useState(initialState);
  const [selectedObjectIndex, setSelectedObjectIndex] = useState<number | null>(null);
  const counterdataIsSelected = Object.values(selectedCounterdata).some(
    (counterdataSelected) => counterdataSelected === true
  );
  const objectIsSelected = selectedObjectIndex !== null;

  return (
    <div>
      <NavLink to="/">
        <img className="w-50" src={logo} alt="" />
      </NavLink>
      <div className="flex items-center justify-around pt-16 pb-16">
        <img className="w-100" src={mainImageSrc} />
        <div>
          {Object.values(CounterdataTypes).map((counterdata) => (
            <div key={counterdata}>
              <input
                type="checkbox"
                id={counterdata}
                name={counterdata}
                checked={selectedCounterdata[counterdata]}
                onChange={() => {
                  const newCounterdata = {
                    ...selectedCounterdata,
                    [counterdata]: !selectedCounterdata[counterdata],
                  };
                  setSelectedCounterdata(newCounterdata);
                  if (Object.values(newCounterdata).every((val) => val === false)) {
                    setSelectedObjectIndex(null);
                  }
                }}
              />
              <label htmlFor={counterdata}> {counterdata}</label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h1>{title}</h1>
        <Description
          description={description}
          objectIsSelected={objectIsSelected}
          counterdataIsSelected={counterdataIsSelected}
        />
      </div>
      {counterdataIsSelected && selectedObjectIndex === null ? (
        <div className="pt-10">
          {collectionItems.map((item, index) => (
            <div>
              <p>{item.name}</p>
              <img
                src={item.src}
                aria-label={item.name}
                onClick={() => setSelectedObjectIndex(index)}
                style={{ width: "200px" }}
              />
            </div>
          ))}
        </div>
      ) : null}
      {objectIsSelected ? (
        <div>
          <button className="pt-10" type="button" onClick={() => setSelectedObjectIndex(null)}>
            Back to collection
          </button>
          <div className="flex">
            <div className="flex-1">
              <img src={collectionItems[selectedObjectIndex].src} />
            </div>
            <div className="flex-1">
              <dl>
                {Object.entries(collectionItems[selectedObjectIndex].dataFields).map(
                  ([fieldName, fieldValue]) => (
                    <>
                      <dt>
                        <strong>{fieldName}</strong>
                      </dt>
                      <dd className="mb-4">{fieldValue}</dd>
                    </>
                  )
                )}
              </dl>
            </div>
          </div>
          {selectedCounterdata[CounterdataTypes.identify] && (
            <div className="pt-10">{collectionItems[selectedObjectIndex].identify}</div>
          )}
          {selectedCounterdata[CounterdataTypes.makeVisible] && (
            <div className="pt-10">{collectionItems[selectedObjectIndex].makeVisible}</div>
          )}
          {/* No challenge for now */}
          {/* {selectedCounterdata[CounterdataTypes.challenge] && (
            <div className="pt-10">{collectionItems[selectedObjectIndex].challenge}</div>
          )} */}
          {selectedCounterdata[CounterdataTypes.resist] && (
            <div className="pt-10">{collectionItems[selectedObjectIndex].resist}</div>
          )}
        </div>
      ) : null}
    </div>
  );
}
