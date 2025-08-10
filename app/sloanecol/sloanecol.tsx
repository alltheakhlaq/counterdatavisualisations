import Collection, { type CollectionObject } from "~/collection";
import imageenslavedpeople from "./Objects-displaying-enslaved-people.jpg";
import bmimageenslavedpeople from "./bm-Objects-displaying-enslaved-people.png";
import sloane from "../sloane.webp";

const SloaneCollectionObjects: CollectionObject[] = [
  {
    name: "Objects displaying enslaved people",
    src: imageenslavedpeople,
    identify: (
      <div>
        <p>Currently available on British Museum online collection</p>
        <img src={bmimageenslavedpeople} alt="" />
      </div>
    ),
    makeVisible: (
      <div>
        <h1>Structural Domain</h1>
        <h1>Disciplinary Domain</h1>
        <h1>Hegemonic Domain</h1>
        <h1>Interpersonal Domain</h1>
      </div>
    ),
    challenge: (
      <div>
        <p>data field:</p>
        <p>data field:</p>
        <p>data field:</p>
        <p>data field:</p>
        <p>data field:</p>
        <p>data field:</p>
        <p>data field:</p>
      </div>
    ),
    resist: (
      <div>
        Objects in Sloane’s collection not only provide a gateway to comprehending lives of Black
        Africans under enslavement in British Colonies, it also provides an insight into lives of
        those who were living in European societies. Despite disregard towards recording the
        existence of Black people in the European societies of the 16th, 17th and 18th centuries, we
        still get glimpses of their lives through different means such as the art produced during
        those times. One example of such art in the Sloane Collection is that of a portrait of a
        white Italian woman Laura de' Dianti with an unnamed Black child. BM Record P_X-1-21: ‘The
        Beautiful Slave; portrait of Laura de' Dianti, three-quarter length and slightly turned to
        right, wearing a draped dress and an elaborate hair-decoration, resting her left hand on a
        black boy dressed in rich clothes in lower right corner, looking up at her; fourth state
        with publisher's address; after Titian. Engraving’ There are several instances of Black
        Africans and other people of colour being represented in European works of art. Inspecting
        these works of art from a critical perspective illustrates layers of colonialism and racial
        hierarchies in the societies of Early Modern Europe. These visual portrayals make the Black
        subject of art visible, yet the method of portrayal invisiblizes their existence (Erickson,
        2009). The above-mentioned engraved artwork in Sloane’s collection is one of the recreations
        of a painting by the Italian artist named Titian. The title of the artwork in Sloane’s
        collection, now housed at the British Museum, is labelled ‘The Beautiful Slave’ followed by
        the textual description of what’s depicted in the painting. In this painting in Slaone’s
        collection, the White woman has her hand resting on the shoulder of the Black child who
        looks up to focus only on her. The posture assumed by the two figures signals the
        benevolence of Laura Dianti – the white woman in the picture – and the reverence that the
        Black child holds for her. The smaller and receded figure of the Black child also depicts
        subservience. It encapsulates the deep seated racial hierarchies that were embedded in the
        Eurpeans societies of the time (Simons, 2023). Portraits depicting White Europeans with
        Black young pages were viewed as a sign of royalty and higher status of the White person in
        the painting (Simons, 2023) This work of art has several recreations. One recreation of this
        painting is present at a private collection called Kisters Collection, in the city of
        Kreuzlingen in Switzerland (Fanti, 2016). Along with recreations, alternate titles of these
        artwork also exist, such as ‘Laura Dianti and a Black Page’ (Revealing the African Presence
        in Renaissance Europe, 2012-2013) or ‘Laura Dianti with Her Accompanying Black Attendant’
        (Faith and Empire: The Legacy of Conversion and Commerce in the Early Modern World, 2023).
        All the various recreations of this artwork hold testimony to the presence of Black subjects
        in Europe in the 17th and 18th centuries. It also illustrates the societal hierarchies into
        which Black Africans were placed. Africans, especially Black Africans, held various status
        in European societies, ranging from free to freemen to enslaved or merely servants to the
        aristocrats or royalty (Lowe, 2013). The name of the child in the picture is unknown. It is
        often not plausible to decipher the name or the legal status of Black subjects in artwork if
        the information available about them is limited. Sloane’s catalogue entry refers to the
        child in the artwork as ‘beautiful slave’; however, the terms ‘attendant’ and ‘page’ are
        used for the child in other copies of the artwork. Pages in 17th and 18th century Europe
        were apprentices or servants, and were of various ethnicities (Wolfthal, 2022). The
        discrepancy in the description of the child makes their actual status ambiguous. Oftentimes
        the way Black children are depicted either illustrates their inferiority to the accompanying
        white person in the portrait or their status as “a curious ornament or a diverting toy”
        (Origo, 1995). Being a child, the Black page or servant in the portrait is of smaller
        stature, which renders their portrayal vulnerable and unimportant (Lowe, 2013). Along with
        aiding the depiction of the white subject of the portrait as holding higher status, the
        Black children were also used as ‘decorative’ in these artwork (Kaplan, 2003). The painting
        is an example of the visual systems that were employed to illustrate racial superiority –
        with the imposing portrait of a White person juxtaposed with the small figure of an unnamed
        Black child. The child occupies a liminal position in the portrait (Lowe, 2013). The
        portrait does not narrate anything about the life of the Black child–the only thing enhanced
        through the portrait in their vulnerability and their race. They are treated as an accessory
        or an appendage to their White counterpart – functioning as a conduit to tell the story
        about the White person instead of being a person on their own.
      </div>
    ),
  },
];

export default function () {
  return (
    <Collection
      title="Sloane collection"
      mainImageSrc={sloane}
      description="Stolen things by the Sloane"
      collectionItems={SloaneCollectionObjects}
    />
  );
}
