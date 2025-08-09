import { useState } from "react";

const CounterdataTypes = {
  identify: "Identify",
  makeVisible: "Make visible",
  challenge: "Challenge",
  resist: "Resist",
};

const initialState = Object.fromEntries(
  Object.values(CounterdataTypes).map((counterdata) => [counterdata, false])
);

type CollectionProps = {
  title: string;
  description: string;
  collectionItems: { name: string; src: string }[];
};

export default function ({ title, description, collectionItems }: CollectionProps) {
  const [selectedCounterdata, setSelectedCounterdata] = useState(initialState);
  const noCounterdataSelected = Object.values(selectedCounterdata).every(
    (counterdataSelected) => counterdataSelected === false
  );

  return (
    <div>
      <div className="flex">
        <span>Main image</span>
        {Object.values(CounterdataTypes).map((counterdata) => (
          <div key={counterdata}>
            <input
              type="checkbox"
              id={counterdata}
              name={counterdata}
              checked={selectedCounterdata[counterdata]}
              onChange={() =>
                setSelectedCounterdata({
                  ...selectedCounterdata,
                  [counterdata]: !selectedCounterdata[counterdata],
                })
              }
            />
            <label htmlFor={counterdata}> {counterdata}</label>
          </div>
        ))}
      </div>
      <div>
        <p>{title}</p>
        <p>{description}</p>
      </div>
      <div>
        Selected counterdatas:{" "}
        {noCounterdataSelected
          ? "None selected"
          : Object.entries(selectedCounterdata)
              .filter(([__label, isChecked]) => isChecked)
              .map(([label, __isChecked]) => label)
              .join(", ")}
      </div>
      {!noCounterdataSelected ? (
        <div>
          <div>Here's where the collection goes</div>
          {collectionItems.map((item) => (
            <img src={item.src} aria-label={item.name} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
