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
  const [selectedObjectIndex, setSelectedObjectIndex] = useState<number | null>(null);
  const counterdataIsSelected = Object.values(selectedCounterdata).some(
    (counterdataSelected) => counterdataSelected === true
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
      {counterdataIsSelected && selectedObjectIndex === null ? (
        <div>
          <div>Here's where the collection goes</div>
          {collectionItems.map((item, index) => (
            <img
              src={item.src}
              aria-label={item.name}
              onClick={() => setSelectedObjectIndex(index)}
              width={400}
            />
          ))}
        </div>
      ) : null}
      {selectedObjectIndex !== null ? (
        <div>
          <button type="button" onClick={() => setSelectedObjectIndex(null)}>
            Back to collection
          </button>
          {selectedCounterdata[CounterdataTypes.identify] && <div>Identify information</div>}
          {selectedCounterdata[CounterdataTypes.makeVisible] && <div>Make visible information</div>}
          {selectedCounterdata[CounterdataTypes.challenge] && <div>Challenge information</div>}
          {selectedCounterdata[CounterdataTypes.resist] && <div>Resist information</div>}
        </div>
      ) : null}
    </div>
  );
}
