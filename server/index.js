import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts, Link, NavLink, useNavigate, useLocation } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import "process";
import { useState, useMemo, useEffect } from "react";
import * as $rdf from "rdflib";
import { graph, parse, namedNode } from "rdflib";
import solidNamespace from "solid-namespace";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body2 = new PassThrough();
          const stream = createReadableStreamFromReadable(body2);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body2);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const navItems = [
  // TODO: fix home link
  { title: "Home", to: "/" },
  { title: "Documentation", to: "/documentation" },
  { title: "Vocabulary", to: "/Vocabulary" },
  { title: "Literature", to: "/Literature" }
];
function Nav() {
  return /* @__PURE__ */ jsx("nav", { className: "flex flex-row justify-center m-3", children: navItems.map((item) => /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
    Link,
    {
      className: "group flex justify-center p-3 underline hover:decoration-amber-300",
      to: item.to,
      children: item.title
    }
  ) })) });
}
function InfoBlock({ resource }) {
  const { bodyText, title: title2, to, linktext } = resource;
  return /* @__PURE__ */ jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsx("nav", { className: "bg-white rounded-2xl border border-black-200 p-6", children: /* @__PURE__ */ jsx("ul", { children: /* @__PURE__ */ jsxs("li", { children: [
    /* @__PURE__ */ jsx("h2", { children: title2 }),
    /* @__PURE__ */ jsx("p", { className: "pt-3", children: bodyText }),
    /* @__PURE__ */ jsx(
      Link,
      {
        className: "group flex items-center gap-3 self-stretch pt-3 leading-normal underline hover:decoration-amber-300",
        to,
        children: linktext
      }
    )
  ] }) }) }) });
}
function Welcome() {
  return /* @__PURE__ */ jsx("main", { className: "flex items-center", children: /* @__PURE__ */ jsxs("div", { className: "flex-1  flex-col items-center min-h-0", children: [
    /* @__PURE__ */ jsx("header", { className: "flex flex-col items-center", children: /* @__PURE__ */ jsxs("div", { className: "pt-5 font-bold", children: [
      /* @__PURE__ */ jsx("h1", { children: "Counterdata Visualisation" }),
      /* @__PURE__ */ jsx("p", { className: "text-2xl", children: "of Digital Museum Collections" })
    ] }) }),
    /* @__PURE__ */ jsx(Nav, {}),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-row justify-center gap-3", children: [
      /* @__PURE__ */ jsx("div", { className: "w-2/3", children: /* @__PURE__ */ jsx(InfoBlock, { resource: resources[0] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col w-1/3 gap-3", children: [
        /* @__PURE__ */ jsx(InfoBlock, { resource: resources[1] }),
        /* @__PURE__ */ jsx(InfoBlock, { resource: resources[2] })
      ] })
    ] })
  ] }) });
}
const resources = [
  {
    to: "",
    title: "What is counterdata visualisation?",
    linktext: /* @__PURE__ */ jsx("p", { children: "more details" }),
    bodyText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    to: "/sloane-new",
    title: "Sloane Collection",
    linktext: /* @__PURE__ */ jsx("p", { children: "View counterdata visualisation of objects from collection of Sir Hans Sloane" }),
    bodyText: ""
  },
  {
    to: "/clive",
    title: "Clive Collection",
    linktext: /* @__PURE__ */ jsx("p", { children: "View counterdata visualisation of objects from collection of the Clive Family " }),
    bodyText: ""
  }
];
function meta({}) {
  return [{
    title: "Counterdata Visualisation of Digital Museum Collections"
  }, {
    name: "description",
    content: "Challenging power in digital museum collections through data and visual interventions"
  }];
}
const home = UNSAFE_withComponentProps(function Home() {
  return /* @__PURE__ */ jsx(Welcome, {});
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const CounterdataTypes$1 = {
  identify: "Identify",
  makeVisible: "Make visible",
  // no challenge for now
  // challenge: "Challenge",
  resist: "Resist"
};
Object.fromEntries(
  Object.values(CounterdataTypes$1).map((counterdata) => [counterdata, false])
);
function Description({ description, objectIsSelected }) {
  if (!objectIsSelected) {
    return /* @__PURE__ */ jsxs("p", { className: "max-h-[520px] overflow-y-scroll", children: [
      description,
      "..."
    ] });
  } else {
    return null;
  }
}
function Collection$1({ title, mainImageSrc, description, collectionItems }) {
  const [selectedObjectIndex, setSelectedObjectIndex] = useState(null);
  const objectIsSelected = selectedObjectIndex !== null;
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
    /* @__PURE__ */ jsx(NavLink, { to: "/", children: /* @__PURE__ */ jsxs("div", { className: "pt-5 font-bold", children: [
      /* @__PURE__ */ jsx("h1", { children: "Counterdata Visualisation" }),
      /* @__PURE__ */ jsx("p", { className: "text-2xl", children: "of Digital Museum Collections" })
    ] }) }),
    /* @__PURE__ */ jsx(Nav, {}),
    /* @__PURE__ */ jsx("h2", { className: "w-full bg-white rounded-2xl border border-black-200 p-6", children: title }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-row gap-3", children: [
      /* @__PURE__ */ jsx("div", { className: "w-1/2 bg-white rounded-2xl border border-black-200 p-6", children: /* @__PURE__ */ jsx(Description, { description, objectIsSelected }) }),
      selectedObjectIndex === null ? /* @__PURE__ */ jsx("div", { className: "w-1/2 bg-white rounded-2xl border border-black-200 p-6 pt-10", children: collectionItems.map((item, index) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { children: item.name }),
        /* @__PURE__ */ jsx(
          "img",
          {
            src: item.src,
            "aria-label": item.name,
            onClick: () => setSelectedObjectIndex(index),
            style: { width: "200px" }
          }
        )
      ] })) }) : null
    ] }),
    objectIsSelected ? /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("button", { className: "pt-10", type: "button", onClick: () => setSelectedObjectIndex(null), children: "Back to collection" }),
      /* @__PURE__ */ jsxs("div", { className: "flex mb-20", children: [
        /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx("img", { src: collectionItems[selectedObjectIndex].src }) }),
        /* @__PURE__ */ jsx("div", { className: "flex-1 mr-8 max-h-[700px] overflow-y-scroll", children: /* @__PURE__ */ jsx("dl", { children: Object.entries(collectionItems[selectedObjectIndex].dataFields).map(
          ([fieldName, fieldInfo]) => {
            const fieldValues = Array.isArray(fieldInfo) ? fieldInfo : [fieldInfo];
            return /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("dt", { children: /* @__PURE__ */ jsx("strong", { children: fieldName }) }),
              fieldValues.map(({ fieldValue, contextTag }) => /* @__PURE__ */ jsx(
                "dd",
                {
                  className: "mb-4",
                  onClick: () => {
                    const context = document.querySelector(
                      `[data-context-tag="${contextTag}"]`
                    );
                    context == null ? void 0 : context.scrollIntoView({ behavior: "smooth" });
                  },
                  style: contextTag ? { cursor: "pointer" } : void 0,
                  children: fieldValue
                }
              ))
            ] });
          }
        ) }) }),
        /* @__PURE__ */ jsx("div", { className: "flex-1 max-h-[700px] overflow-y-scroll", children: collectionItems[selectedObjectIndex].objectContext })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "pt-10", children: collectionItems[selectedObjectIndex].identify }),
      /* @__PURE__ */ jsx("div", { className: "pt-10", children: collectionItems[selectedObjectIndex].makeVisible }),
      /* @__PURE__ */ jsx("div", { className: "pt-10", children: collectionItems[selectedObjectIndex].resist })
    ] }) : null
  ] });
}
const imageenslavedpeople = "/assets/Objects-displaying-enslaved-people-BlPMKPSZ.jpg";
const greybackground = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAA1BMVEWxsK62TYmqAAAASElEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwDcaiAAFXD1ujAAAAAElFTkSuQmCC";
const bmimageenslavedpeople = "/assets/bm-Objects-displaying-enslaved-people-DkfBbLkk.png";
const sloane = "/assets/sloane-BpOhpJ_U.webp";
const miscEntry1796 = /* @__PURE__ */ jsxs("div", { children: [
  "Colonisers in the colonies always lived in the fear of slave revolts. There was a continuous anxiety about the enslaved people devising non-violent and violent ways to fight the inhumane practice of their enslavement. Resistance has always been a primary feature against colonial endeavours–often enough the colonial gaze tries to minimise them or reframe them as less powerful based on their magnitude. However, digging deep into the archives and collections, and reading them against the grain illustrates the persistent nature of these revolts against colonialism. The previous section illustrates the ways in which Sloane engaged with Slavery, and the brutality that it engendered. Equally important is to highlight the resistance that was continuously put up by the enslaved people to fight the colonial and white supremacist brutality. This text espouses the ideology that there is no failed resistance or failure in the practise of resisting, the fact that there is even an attempt at subjugation and disruption of colonial power in itself constitutes as success, even if the ultimate destination of complete tarnish is not reached.",
  /* @__PURE__ */ jsx("br", {}),
  /* @__PURE__ */ jsxs("mark", { "data-context-tag": "object", style: { background: "#FFB8EBA6" }, children: [
    "Object:",
    " "
  ] }),
  "Miscellanies Entry 1796: ‘A bullet used by the runaway negros in Jamaica made of the pewter dishes & lead in a thimble When there is too much tinn they break in pieces on being shott. M r . Barham.’ Jamaica held the most number of uprisings of enslaved people in the Caribbean (Jackson, 2024). This object in Sloane’s collection illustrates different ways in which enslaved people were putting up resistance by employing and modifying everyday household items in the houses of their enslavers. Digging further into the history of these objects could connect it to a wider network of slave resistances and anti-colonial struggles. It could illustrate the deep roots that resistance to slavery has, and how its always been an intrinsic part of history of transatlantic slave trade.",
  /* @__PURE__ */ jsx("br", {}),
  /* @__PURE__ */ jsx("mark", { "data-context-tag": "medical practices", style: { background: "ABF7F7A6" }, children: "Colonial domination: Medical practices which enslaved people were subjeted to" }),
  'Although Sloane’s complicity in enslaving people, and his participation in transatlantic trade of enslaved people is acknowledged, the historical biographies of Sloane often talk about him treating them equally in his medical practice (Churchill, 2005; more citations). What this set of literature fails to consider is the level of violence entailed in an enslaved person being brought for treatment by their captor to a medical practitioner who is part of the colonial ranks. Oscar Wilde talks about ‘good’ slave holders in his text by stating “Just as the worst slave-owners were those who were kind to their slaves, and so prevented the horror of the system being realised by those who suffered from it, and understood by those who contemplated it, so, in the present state of things in England, the people who do most harm are the people who try to do most good" (Wilde, 1891). Sloane’s attitude towards enslaved people does not rectify his complicity and involvement in the transatlantic slave trade, if anything, that makes him even more dangerous for those resisting the enslavement of people – as he presents an apparently ‘non-violent’ side of the slavery which on face value presents a persona which appeal to the moral values of Western ideologies but is inflicting horrid harm to Black and indigenous population in the colony.',
  /* @__PURE__ */ jsx("br", {}),
  /* @__PURE__ */ jsx("mark", { "data-context-tag": "colonial anxiety", style: { background: "ABF7F7A6" }, children: "Resistance: Colonial anxeity: Instilling fear in the heart of the enslavers" }),
  " ",
  "x",
  " ",
  /* @__PURE__ */ jsx("mark", { "data-context-tag": "banning music", style: { background: "FF5582A6" }, children: "Domination: Banning of musical instruments for fear of revolt" }),
  "The magnitude of colonial anxiety regarding slave revotls could be further illustrated by Sloane himself in the first volume of his book ‘Natural History of Jamaica’. Writing about banning certain kinds of trumpets and musical instruments in Jamaica, Sloane mentions the reason being ‘it was thought too much inciting them to Rebellion, so they were prohibited by the customs of the Island’. The prohibition of a musical instrument in case it pushes people to revolt against the slave holders indicates the level of dread that colonisers felt towards chances of resistance. However, this dread wasnt unfounded. There was resistance put up by people within enslavement or having escaped it. Although from a colonial gaze, Sloane’s writing points to the frequency of its occurrence in the colonies, and the dread it instilled in the hearts of the whites.",
  /* @__PURE__ */ jsx("br", {}),
  /* @__PURE__ */ jsx("mark", { "data-context-tag": "direct attack", style: { background: "ABF7F7A6" }, children: "Resistance: Primary resistance/Breaking resistance - direct physical attacks on enslavers or those perceived as colonisers" }),
  "In the second volume of his book, Sloane mentions avoiding certain areas around the plantation where he had heard a lot of escaped enslaved people would ambush the White people who would be passing by. This camouflaging and attacking White people was called ‘dodging’, it was a tactic employed by escaped enslaved people to sabotage the perpetrators of colonialism. Another instance of the uprising of enslaved people in Jamaica around the time Sloane was there was when the enslaved people captured guns from their captors and shot 15 white people. Although this is in no way an exhaustive list of resistance of enslaved people during Sloane’s time in Jamaica against White supremacy and its various oppressions, it serves as a way of shedding light of different ways in which the colonised and brutalised have always resisted against their dehumanisation. Kellie Carter Jackson (2024) talks about five different legitimate ways in which enslaved people have resisted White supremacy: revolution, protection, force, flight, and joy. Munira Khayyat (2022), speaking of resistance in a different context, of those who live in South Lebanon bordering with Israel, defines it as life’s insistence on returning even after the extreme ravages of destruction caused by war. Some of these resistances make their way into colonial texts, and some don’t. History of resistance goes as far back as history of colonisation–whether their existence is recorded or not. **"
] });
const SloaneCollectionObjects$1 = [{
  name: "Objects displaying enslaved people",
  src: imageenslavedpeople,
  dataFields: {
    "Power dimensions": "a few words with link to wider MoD",
    "Instances of resistance": "a few words with link to wider MoD"
  },
  objectContext: null,
  identify: /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx("p", {
      children: "Currently available on British Museum online collection"
    }), /* @__PURE__ */ jsx("img", {
      src: bmimageenslavedpeople,
      alt: ""
    })]
  }),
  makeVisible: /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx("h1", {
      children: "Structural Domain"
    }), /* @__PURE__ */ jsx("h1", {
      children: "Disciplinary Domain"
    }), /* @__PURE__ */ jsx("h1", {
      children: "Hegemonic Domain"
    }), /* @__PURE__ */ jsx("h1", {
      children: "Interpersonal Domain"
    })]
  }),
  challenge: /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx("p", {
      children: "data field:"
    }), /* @__PURE__ */ jsx("p", {
      children: "data field:"
    }), /* @__PURE__ */ jsx("p", {
      children: "data field:"
    }), /* @__PURE__ */ jsx("p", {
      children: "data field:"
    }), /* @__PURE__ */ jsx("p", {
      children: "data field:"
    }), /* @__PURE__ */ jsx("p", {
      children: "data field:"
    }), /* @__PURE__ */ jsx("p", {
      children: "data field:"
    })]
  }),
  resist: /* @__PURE__ */ jsx("div", {
    children: "Objects in Sloane’s collection not only provide a gateway to comprehending lives of Black Africans under enslavement in British Colonies, it also provides an insight into lives of those who were living in European societies. Despite disregard towards recording the existence of Black people in the European societies of the 16th, 17th and 18th centuries, we still get glimpses of their lives through different means such as the art produced during those times. One example of such art in the Sloane Collection is that of a portrait of a white Italian woman Laura de' Dianti with an unnamed Black child. BM Record P_X-1-21: ‘The Beautiful Slave; portrait of Laura de' Dianti, three-quarter length and slightly turned to right, wearing a draped dress and an elaborate hair-decoration, resting her left hand on a black boy dressed in rich clothes in lower right corner, looking up at her; fourth state with publisher's address; after Titian. Engraving’ There are several instances of Black Africans and other people of colour being represented in European works of art. Inspecting these works of art from a critical perspective illustrates layers of colonialism and racial hierarchies in the societies of Early Modern Europe. These visual portrayals make the Black subject of art visible, yet the method of portrayal invisiblizes their existence (Erickson, 2009). The above-mentioned engraved artwork in Sloane’s collection is one of the recreations of a painting by the Italian artist named Titian. The title of the artwork in Sloane’s collection, now housed at the British Museum, is labelled ‘The Beautiful Slave’ followed by the textual description of what’s depicted in the painting. In this painting in Slaone’s collection, the White woman has her hand resting on the shoulder of the Black child who looks up to focus only on her. The posture assumed by the two figures signals the benevolence of Laura Dianti – the white woman in the picture – and the reverence that the Black child holds for her. The smaller and receded figure of the Black child also depicts subservience. It encapsulates the deep seated racial hierarchies that were embedded in the Eurpeans societies of the time (Simons, 2023). Portraits depicting White Europeans with Black young pages were viewed as a sign of royalty and higher status of the White person in the painting (Simons, 2023) This work of art has several recreations. One recreation of this painting is present at a private collection called Kisters Collection, in the city of Kreuzlingen in Switzerland (Fanti, 2016). Along with recreations, alternate titles of these artwork also exist, such as ‘Laura Dianti and a Black Page’ (Revealing the African Presence in Renaissance Europe, 2012-2013) or ‘Laura Dianti with Her Accompanying Black Attendant’ (Faith and Empire: The Legacy of Conversion and Commerce in the Early Modern World, 2023). All the various recreations of this artwork hold testimony to the presence of Black subjects in Europe in the 17th and 18th centuries. It also illustrates the societal hierarchies into which Black Africans were placed. Africans, especially Black Africans, held various status in European societies, ranging from free to freemen to enslaved or merely servants to the aristocrats or royalty (Lowe, 2013). The name of the child in the picture is unknown. It is often not plausible to decipher the name or the legal status of Black subjects in artwork if the information available about them is limited. Sloane’s catalogue entry refers to the child in the artwork as ‘beautiful slave’; however, the terms ‘attendant’ and ‘page’ are used for the child in other copies of the artwork. Pages in 17th and 18th century Europe were apprentices or servants, and were of various ethnicities (Wolfthal, 2022). The discrepancy in the description of the child makes their actual status ambiguous. Oftentimes the way Black children are depicted either illustrates their inferiority to the accompanying white person in the portrait or their status as “a curious ornament or a diverting toy” (Origo, 1995). Being a child, the Black page or servant in the portrait is of smaller stature, which renders their portrayal vulnerable and unimportant (Lowe, 2013). Along with aiding the depiction of the white subject of the portrait as holding higher status, the Black children were also used as ‘decorative’ in these artwork (Kaplan, 2003). The painting is an example of the visual systems that were employed to illustrate racial superiority – with the imposing portrait of a White person juxtaposed with the small figure of an unnamed Black child. The child occupies a liminal position in the portrait (Lowe, 2013). The portrait does not narrate anything about the life of the Black child–the only thing enhanced through the portrait in their vulnerability and their race. They are treated as an accessory or an appendage to their White counterpart – functioning as a conduit to tell the story about the White person instead of being a person on their own."
  })
}, {
  name: "Miscellanies Entry 1796",
  src: greybackground,
  dataFields: {
    "Object Name:": {
      fieldValue: "Miscellanies Entry 1796: ‘A bullet used by the runaway negros in Jamaica made of the pewter dishes & lead in a thimble When there is too much tinn they break in pieces on being shott. M r . Barham.’",
      contextTag: "object"
    },
    "Condition:": {
      fieldValue: "(Information on the preservation or deterioration of objects under institutional hold)",
      contextTag: ""
    },
    "Access to the digital material:": {
      fieldValue: "(Licensing information of all platforms it is available on)",
      contextTag: ""
    },
    "Access to the physical object:": {
      fieldValue: "(On public display, other ways of access)",
      contextTag: ""
    },
    "Cultural significance for the source community:": {
      fieldValue: "(related information)",
      contextTag: ""
    },
    "Method of acquisition:": {
      fieldValue: "(related information)",
      contextTag: ""
    },
    "Biographical history of holder (collector):": {
      fieldValue: "(related information)",
      contextTag: ""
    },
    "Current holding institution:": {
      fieldValue: "(related information)",
      contextTag: ""
    },
    "Historical Power Dimension:": [{
      fieldValue: "Colonial domination: Medical practices which enslaved people were subjeted to",
      contextTag: "medical practices"
    }, {
      fieldValue: "Resistance: Colonial anxeity: Instilling fear in the heart of the enslavers",
      contextTag: "colonial anxiety"
    }, {
      fieldValue: "Domination: Banning of musical instruments for fear of revolt",
      contextTag: "banning music"
    }, {
      fieldValue: "Resistance: Primary resistance/Breaking resistance - direct physical attacks on enslavers or those perceived as colonisers",
      contextTag: "direct attack"
    }],
    "Contemporary Power Dimension:": {
      fieldValue: "(related information)",
      contextTag: ""
    }
  },
  objectContext: miscEntry1796,
  identify: /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx("p", {
      children: "Currently available on British Museum online collection"
    }), /* @__PURE__ */ jsx("img", {
      src: bmimageenslavedpeople,
      alt: ""
    })]
  }),
  makeVisible: /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx("h1", {
      children: "Structural Domain"
    }), /* @__PURE__ */ jsx("h1", {
      children: "Disciplinary Domain"
    }), /* @__PURE__ */ jsx("h1", {
      children: "Hegemonic Domain"
    }), /* @__PURE__ */ jsx("h1", {
      children: "Interpersonal Domain"
    })]
  }),
  challenge: /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx("p", {
      children: "data field:"
    }), /* @__PURE__ */ jsx("p", {
      children: "data field:"
    }), /* @__PURE__ */ jsx("p", {
      children: "data field:"
    }), /* @__PURE__ */ jsx("p", {
      children: "data field:"
    }), /* @__PURE__ */ jsx("p", {
      children: "data field:"
    }), /* @__PURE__ */ jsx("p", {
      children: "data field:"
    }), /* @__PURE__ */ jsx("p", {
      children: "data field:"
    })]
  }),
  resist: /* @__PURE__ */ jsx("div", {
    children: "Objects in Sloane’s collection not only provide a gateway to comprehending lives of Black Africans under enslavement in British Colonies, it also provides an insight into lives of those who were living in European societies. Despite disregard towards recording the existence of Black people in the European societies of the 16th, 17th and 18th centuries, we still get glimpses of their lives through different means such as the art produced during those times. One example of such art in the Sloane Collection is that of a portrait of a white Italian woman Laura de' Dianti with an unnamed Black child. BM Record P_X-1-21: ‘The Beautiful Slave; portrait of Laura de' Dianti, three-quarter length and slightly turned to right, wearing a draped dress and an elaborate hair-decoration, resting her left hand on a black boy dressed in rich clothes in lower right corner, looking up at her; fourth state with publisher's address; after Titian. Engraving’ There are several instances of Black Africans and other people of colour being represented in European works of art. Inspecting these works of art from a critical perspective illustrates layers of colonialism and racial hierarchies in the societies of Early Modern Europe. These visual portrayals make the Black subject of art visible, yet the method of portrayal invisiblizes their existence (Erickson, 2009). The above-mentioned engraved artwork in Sloane’s collection is one of the recreations of a painting by the Italian artist named Titian. The title of the artwork in Sloane’s collection, now housed at the British Museum, is labelled ‘The Beautiful Slave’ followed by the textual description of what’s depicted in the painting. In this painting in Slaone’s collection, the White woman has her hand resting on the shoulder of the Black child who looks up to focus only on her. The posture assumed by the two figures signals the benevolence of Laura Dianti – the white woman in the picture – and the reverence that the Black child holds for her. The smaller and receded figure of the Black child also depicts subservience. It encapsulates the deep seated racial hierarchies that were embedded in the Eurpeans societies of the time (Simons, 2023). Portraits depicting White Europeans with Black young pages were viewed as a sign of royalty and higher status of the White person in the painting (Simons, 2023) This work of art has several recreations. One recreation of this painting is present at a private collection called Kisters Collection, in the city of Kreuzlingen in Switzerland (Fanti, 2016). Along with recreations, alternate titles of these artwork also exist, such as ‘Laura Dianti and a Black Page’ (Revealing the African Presence in Renaissance Europe, 2012-2013) or ‘Laura Dianti with Her Accompanying Black Attendant’ (Faith and Empire: The Legacy of Conversion and Commerce in the Early Modern World, 2023). All the various recreations of this artwork hold testimony to the presence of Black subjects in Europe in the 17th and 18th centuries. It also illustrates the societal hierarchies into which Black Africans were placed. Africans, especially Black Africans, held various status in European societies, ranging from free to freemen to enslaved or merely servants to the aristocrats or royalty (Lowe, 2013). The name of the child in the picture is unknown. It is often not plausible to decipher the name or the legal status of Black subjects in artwork if the information available about them is limited. Sloane’s catalogue entry refers to the child in the artwork as ‘beautiful slave’; however, the terms ‘attendant’ and ‘page’ are used for the child in other copies of the artwork. Pages in 17th and 18th century Europe were apprentices or servants, and were of various ethnicities (Wolfthal, 2022). The discrepancy in the description of the child makes their actual status ambiguous. Oftentimes the way Black children are depicted either illustrates their inferiority to the accompanying white person in the portrait or their status as “a curious ornament or a diverting toy” (Origo, 1995). Being a child, the Black page or servant in the portrait is of smaller stature, which renders their portrayal vulnerable and unimportant (Lowe, 2013). Along with aiding the depiction of the white subject of the portrait as holding higher status, the Black children were also used as ‘decorative’ in these artwork (Kaplan, 2003). The painting is an example of the visual systems that were employed to illustrate racial superiority – with the imposing portrait of a White person juxtaposed with the small figure of an unnamed Black child. The child occupies a liminal position in the portrait (Lowe, 2013). The portrait does not narrate anything about the life of the Black child–the only thing enhanced through the portrait in their vulnerability and their race. They are treated as an accessory or an appendage to their White counterpart – functioning as a conduit to tell the story about the White person instead of being a person on their own."
  })
}];
const sloanecol = UNSAFE_withComponentProps(function() {
  return /* @__PURE__ */ jsx(Collection$1, {
    title: "Objects from Sloane collection",
    mainImageSrc: sloane,
    description: "The British museum opened its doors to the public on Monday 15 January 1759. Forming this monumental colonial institution's earliest collection were cultural and natural ‘curiosities’ accumulated by Sir Hans Sloane’s over the course of his longevous life. The collection of Sir Hans Sloane that he spent his long life collecting, were bought by the British Parliament the year he died, and were displayed to the public eye at the behest of Sloane’s will. It was instrumental to the creation of the British Museum. Sloane’s collection later on was divided among other British institutions that housed colonial collections such as the British Library and Natural History Museum in London. To this day, Sloane’s collection holds testimonies to various features of the British as well as global cultural, social and political environments.\nSloane’s collection is composed of thousands of preserved plants and other natural material, preserved animal bodies, photographic material, correspondences, and 54 handwritten catalogues documenting almost the entirety of the object he amassed. There is a huge diversity in objects that Sloane accumulated as there was no pattern to his collection practice. He devised a  categorisation system for his object which are as follows: The Library, Medals and Coins,  Antiquities, Cameos and Intaglios, Precious Stones, Agates and Jaspers, Agate and Jasper Vessels, Crystals and Spars, Fossils, Flints, Other Stones, Metals, Minerals, Ores, Earths, Sands, Salts, Bitumens, Sulphurs, Ambers, Talcs and Micae, Testacea and Shells, Corals and Sponges, Echini Marini (sea urchins), Asteriae, Trochi, Entrochi (shells), Crustacea or Crabs, Starfish, Fish, Birds, Eggs, Nests, Vipers and Serpents, Quadrupeds, Insects, Humana, Vegetable Substances, Herbarium Volumes, Miscellaneous Things, Framed Pictures and Drawings, and Mathematical Instruments (Delborough, 2017).\nSloane’s interest in gathering ‘curious’ objects started during his early years in Killyleagh–the plants he gathered there make up the earliest natural specimen he collected. Although Sloane only started treating and organising his collection for  public display in the early 1700s, he was laying the foundation of it from his early days. There are documented collection items in Sloane’s collection that go as far back as the 1680s; before his voyage to Jamaica. One of Sloane’s main motives while in Jamaica was accumulating as many cultural and natural items as he could and he initiated this mission from the moment his ship left the shores of England. When the ships docked on the Island of Madeira off the coast near North Africa, Sloans used the time there to collect natural specimens on the island. This pattern continued in Jamaica where Sloane employed the physical labour of the enslaved people to gather natural and cultural materials. However, it wasn't just physical labour that Sloane’s collection benefited off of. Enslaved people as well as indigenous population of Jamaica had a close ecological relationship to the island as well as deep epistemic knowledge of herbal cures that could be extracted from their natural environment. Sloane’s collection is a testament to the richness of cultures that thrived in Jamaica as well as offers glimpses of the natural and cultural impacts that British colonialism had on Jamaica.  It is also a window into the lives led by enslaved people as well as the indigenous population of the island, and different ways in which they fought the colonial subjugation. Returning from his stay in Jamaica, Sloane had accumulated a vast variety of specimen which also included alive animals such as Serpents, Iguanas and Alligators–although the majority of them were not able to make it back into Sloane’s possession in London as they either died during the sea voyage or escaped once the ship docked. However, a significant portion of Sloane's collection made it back to London perfectly intact. Soon after moving back to London, Sloane bought a house in Chelsea where all of his collection was stored during his life and for a while after his death. \nSlaone’s collecting fixation does not end with his trip to Jamaica, but was expanded further with time. There were various ways through which Sloane acquired objects. Because of his higher status in society and the connection that it afforded him, Sloane usually had people reaching out to him to add to his ‘curiosities’. These include journeymen who travelled across seas and collected objects from different parts of the globe. Oftentimes there were entire collections of other individuals that were absorbed into Sloane’s collection. These included collections of friends but also of strangers whose widowed partners would sell their collections to Sloane at a considerable price. \nDue to the wide variety of ways through which Sloane acquired the objects in his collections, their rationalisation was seldom called into question. Sloane’s motivation to collect objects was not to research, but to document or preserve. Therefore, this led to some critiques directed at his collection with regards to their trustworthiness and the validity of the context ascribed to them under Sloane’s authority. William King, one of the major critics of credulity of Sloane’s collections questioned authenticity of Sloane’s account of a woman giving birth to a bag of bones after 15 months of pregnancy. There were also speculations about if Sloane is fully aware of all the objects in his possession. Sloane handled these critics by labelling them as ‘envious and malicious’, and did not pay much heed to them.  \nThe collection Sloane was building was ever expanding and required continuous organising and documenting. It was not possible for Sloane to be the sole custodian of the collections he amassed because of its gigantic scale. The ten assistants that Sloane hired were experts in diverse professions such as botany, librarianship and also in the art of cataloguing. Together with Sloane, these assistants were responsible for cataloguing the collections, manuscripting, organising the books and other written material in the library, annotating, translation from foreign languages, and organising trips and visits to the collections. Sections of Sloane’s library and the rest of the collection were catalogued and reorganised more than once. Therefore, the Sloane’s collection that we engage with in different institutions has been acquired, passed down and recorded through multiple individuals who in different ways have impacted the silences, gaps and errors in the Sloane’s collection. \nSloane’s collection is documented in 54 handwritten catalogues. This laborious work of cataloguing was performed by Sloane and his ten assistants. However, he himself started the process of cataloguing  his collection as far back as the 1680s when he started accumulating books. Considering the scale of the collection, Sloane designed a cataloguing and tagging system through which any description of object in his possession could be looked up in the catalogue and its location in the apartment ascertained through the number that it was assigned. Because of Sloane’s fixation on collecting, the numbering and cataloguing system was designed for it to be ever expandable. As mentioned before, Sloane’s primary focus was on documenting and recording the collection, and not for the purpose of conducting research or building up a context around them. Sloane’s obsession with the idea of documenting his collection created a maze of manuscript work., which Sloane’s collection practises provide a window into the points to the colonial fixation on hoarding ‘curiosities’ without engaging with what the objects actually represent and a refusal to explore the politics that an object embodies. It was Sloane and his assistants who attached meanings to it and reduced it to its materiality instead of addressing the deeper sociopolitical aspects that it points to or the wider context of colonial extraction and exploitation that enabled the material of land in Sloane’s possession.\nThe financial resources required for building the collection like Sloane’s were immense, however, Sloane did not have a shortage of that. He was positioned close to the high rank in the Empires; that served him well in amassing the ‘curiosities’ that came into his possession. Not only was Sloane making financial gains through his practice as a medical doctor, he also had money flowing in from his plantation in Jamaica. Purchasing the vast majority of his collection was enabled in part by the slavery money that Sloane acquired.\nSloane had a vision of making his collection accessible to the posterity. He willed it for ‘improvement, knowledge and information of all persons’. This notion of ‘all person’ could be associated with the language of universality that today's museums use as a way of applying an objective world view to their collections that are vastly varied. Today, Sloane’s collection makes up part of the British Museum, along with objects from the collections of other eminent collectors. The links that the collections and its collectors had with the empire and its exploitation are increasingly coming to the forefront of conversations on these objects.\n",
    collectionItems: SloaneCollectionObjects$1
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sloanecol
}, Symbol.toStringTag, { value: "Module" }));
function Collection({ description, collectionItems }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
    /* @__PURE__ */ jsx(NavLink, { to: "/", children: /* @__PURE__ */ jsxs("div", { className: "pt-5 font-bold", children: [
      /* @__PURE__ */ jsx("h1", { children: "Counterdata Visualisation" }),
      /* @__PURE__ */ jsx("p", { className: "text-2xl", children: "of Digital Museum Collections" })
    ] }) }),
    /* @__PURE__ */ jsx(Nav, {}),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-row gap-3", children: [
      /* @__PURE__ */ jsx("div", { className: "w-1/2 bg-white rounded-2xl border border-black-200 p-6", children: /* @__PURE__ */ jsxs("p", { className: "max-h-[520px] overflow-y-scroll", children: [
        description,
        "..."
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "w-1/2 bg-white rounded-2xl border border-black-200 p-6 pt-10", children: collectionItems.map((item, index) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { children: item.shortName }),
        /* @__PURE__ */ jsx(NavLink, { to: `${index}`, children: /* @__PURE__ */ jsx("img", { src: item.src, "aria-label": item.shortName, style: { width: "200px" } }) })
      ] })) })
    ] })
  ] });
}
const SloaneCollectionObjects = [{
  shortName: "Objects displaying enslaved people",
  fullName: "full name TODO",
  src: imageenslavedpeople,
  dataFields: {
    "Power dimensions": {
      fieldValue: "a few words with link to wider MoD",
      contextTag: "TODO"
    },
    "Instances of resistance": {
      fieldValue: "a few words with link to wider MoD",
      contextTag: "TODO"
    }
  },
  objectContext: null,
  identify: /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx("p", {
      children: "Currently available on British Museum online collection"
    }), /* @__PURE__ */ jsx("img", {
      src: bmimageenslavedpeople,
      alt: ""
    })]
  }),
  makeVisible: /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx("h1", {
      children: "Structural Domain"
    }), /* @__PURE__ */ jsx("h1", {
      children: "Disciplinary Domain"
    }), /* @__PURE__ */ jsx("h1", {
      children: "Hegemonic Domain"
    }), /* @__PURE__ */ jsx("h1", {
      children: "Interpersonal Domain"
    })]
  }),
  challenge: /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx("p", {
      children: "data field:"
    }), /* @__PURE__ */ jsx("p", {
      children: "data field:"
    }), /* @__PURE__ */ jsx("p", {
      children: "data field:"
    }), /* @__PURE__ */ jsx("p", {
      children: "data field:"
    }), /* @__PURE__ */ jsx("p", {
      children: "data field:"
    }), /* @__PURE__ */ jsx("p", {
      children: "data field:"
    }), /* @__PURE__ */ jsx("p", {
      children: "data field:"
    })]
  }),
  resist: /* @__PURE__ */ jsx("div", {
    children: "Objects in Sloane’s collection not only provide a gateway to comprehending lives of Black Africans under enslavement in British Colonies, it also provides an insight into lives of those who were living in European societies. Despite disregard towards recording the existence of Black people in the European societies of the 16th, 17th and 18th centuries, we still get glimpses of their lives through different means such as the art produced during those times. One example of such art in the Sloane Collection is that of a portrait of a white Italian woman Laura de' Dianti with an unnamed Black child. BM Record P_X-1-21: ‘The Beautiful Slave; portrait of Laura de' Dianti, three-quarter length and slightly turned to right, wearing a draped dress and an elaborate hair-decoration, resting her left hand on a black boy dressed in rich clothes in lower right corner, looking up at her; fourth state with publisher's address; after Titian. Engraving’ There are several instances of Black Africans and other people of colour being represented in European works of art. Inspecting these works of art from a critical perspective illustrates layers of colonialism and racial hierarchies in the societies of Early Modern Europe. These visual portrayals make the Black subject of art visible, yet the method of portrayal invisiblizes their existence (Erickson, 2009). The above-mentioned engraved artwork in Sloane’s collection is one of the recreations of a painting by the Italian artist named Titian. The title of the artwork in Sloane’s collection, now housed at the British Museum, is labelled ‘The Beautiful Slave’ followed by the textual description of what’s depicted in the painting. In this painting in Slaone’s collection, the White woman has her hand resting on the shoulder of the Black child who looks up to focus only on her. The posture assumed by the two figures signals the benevolence of Laura Dianti – the white woman in the picture – and the reverence that the Black child holds for her. The smaller and receded figure of the Black child also depicts subservience. It encapsulates the deep seated racial hierarchies that were embedded in the Eurpeans societies of the time (Simons, 2023). Portraits depicting White Europeans with Black young pages were viewed as a sign of royalty and higher status of the White person in the painting (Simons, 2023) This work of art has several recreations. One recreation of this painting is present at a private collection called Kisters Collection, in the city of Kreuzlingen in Switzerland (Fanti, 2016). Along with recreations, alternate titles of these artwork also exist, such as ‘Laura Dianti and a Black Page’ (Revealing the African Presence in Renaissance Europe, 2012-2013) or ‘Laura Dianti with Her Accompanying Black Attendant’ (Faith and Empire: The Legacy of Conversion and Commerce in the Early Modern World, 2023). All the various recreations of this artwork hold testimony to the presence of Black subjects in Europe in the 17th and 18th centuries. It also illustrates the societal hierarchies into which Black Africans were placed. Africans, especially Black Africans, held various status in European societies, ranging from free to freemen to enslaved or merely servants to the aristocrats or royalty (Lowe, 2013). The name of the child in the picture is unknown. It is often not plausible to decipher the name or the legal status of Black subjects in artwork if the information available about them is limited. Sloane’s catalogue entry refers to the child in the artwork as ‘beautiful slave’; however, the terms ‘attendant’ and ‘page’ are used for the child in other copies of the artwork. Pages in 17th and 18th century Europe were apprentices or servants, and were of various ethnicities (Wolfthal, 2022). The discrepancy in the description of the child makes their actual status ambiguous. Oftentimes the way Black children are depicted either illustrates their inferiority to the accompanying white person in the portrait or their status as “a curious ornament or a diverting toy” (Origo, 1995). Being a child, the Black page or servant in the portrait is of smaller stature, which renders their portrayal vulnerable and unimportant (Lowe, 2013). Along with aiding the depiction of the white subject of the portrait as holding higher status, the Black children were also used as ‘decorative’ in these artwork (Kaplan, 2003). The painting is an example of the visual systems that were employed to illustrate racial superiority – with the imposing portrait of a White person juxtaposed with the small figure of an unnamed Black child. The child occupies a liminal position in the portrait (Lowe, 2013). The portrait does not narrate anything about the life of the Black child–the only thing enhanced through the portrait in their vulnerability and their race. They are treated as an accessory or an appendage to their White counterpart – functioning as a conduit to tell the story about the White person instead of being a person on their own."
  })
}, {
  shortName: "Miscellanies Entry 1796",
  fullName: "Miscellanies Entry 1796: ‘A bullet used by the runaway negros in Jamaica made of the pewter dishes & lead in a thimble When there is too much tinn they break in pieces on being shott. M r . Barham.’",
  src: greybackground,
  dataFields: {
    "Condition:": {
      fieldValue: "(Information on the preservation or deterioration of objects under institutional hold)",
      contextTag: ""
    },
    "Access to the digital material:": {
      fieldValue: "(Licensing information of all platforms it is available on)",
      contextTag: ""
    },
    "Access to the physical object:": {
      fieldValue: "(On public display, other ways of access)",
      contextTag: ""
    },
    "Cultural significance for the source community:": {
      fieldValue: "(related information)",
      contextTag: ""
    },
    "Method of acquisition:": {
      fieldValue: "(related information)",
      contextTag: ""
    },
    "Biographical history of holder (collector):": {
      fieldValue: "(related information)",
      contextTag: ""
    },
    "Current holding institution:": {
      fieldValue: "(related information)",
      contextTag: ""
    },
    "Historical Power Dimension:": [{
      fieldValue: "Colonial domination: Medical practices which enslaved people were subjeted to",
      contextTag: "medical practices"
    }, {
      fieldValue: "Resistance: Colonial anxeity: Instilling fear in the heart of the enslavers",
      contextTag: "colonial anxiety"
    }, {
      fieldValue: "Domination: Banning of musical instruments for fear of revolt",
      contextTag: "banning music"
    }, {
      fieldValue: "Resistance: Primary resistance/Breaking resistance - direct physical attacks on enslavers or those perceived as colonisers",
      contextTag: "direct attack"
    }],
    "Contemporary Power Dimension:": {
      fieldValue: "(related information)",
      contextTag: ""
    }
  },
  objectContext: miscEntry1796,
  identify: /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx("p", {
      children: "Currently available on British Museum online collection"
    }), /* @__PURE__ */ jsx("img", {
      src: bmimageenslavedpeople,
      alt: ""
    })]
  }),
  makeVisible: /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx("h1", {
      children: "Structural Domain"
    }), /* @__PURE__ */ jsx("h1", {
      children: "Disciplinary Domain"
    }), /* @__PURE__ */ jsx("h1", {
      children: "Hegemonic Domain"
    }), /* @__PURE__ */ jsx("h1", {
      children: "Interpersonal Domain"
    })]
  }),
  challenge: /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx("p", {
      children: "data field:"
    }), /* @__PURE__ */ jsx("p", {
      children: "data field:"
    }), /* @__PURE__ */ jsx("p", {
      children: "data field:"
    }), /* @__PURE__ */ jsx("p", {
      children: "data field:"
    }), /* @__PURE__ */ jsx("p", {
      children: "data field:"
    }), /* @__PURE__ */ jsx("p", {
      children: "data field:"
    }), /* @__PURE__ */ jsx("p", {
      children: "data field:"
    })]
  }),
  resist: /* @__PURE__ */ jsx("div", {
    children: "Objects in Sloane’s collection not only provide a gateway to comprehending lives of Black Africans under enslavement in British Colonies, it also provides an insight into lives of those who were living in European societies. Despite disregard towards recording the existence of Black people in the European societies of the 16th, 17th and 18th centuries, we still get glimpses of their lives through different means such as the art produced during those times. One example of such art in the Sloane Collection is that of a portrait of a white Italian woman Laura de' Dianti with an unnamed Black child. BM Record P_X-1-21: ‘The Beautiful Slave; portrait of Laura de' Dianti, three-quarter length and slightly turned to right, wearing a draped dress and an elaborate hair-decoration, resting her left hand on a black boy dressed in rich clothes in lower right corner, looking up at her; fourth state with publisher's address; after Titian. Engraving’ There are several instances of Black Africans and other people of colour being represented in European works of art. Inspecting these works of art from a critical perspective illustrates layers of colonialism and racial hierarchies in the societies of Early Modern Europe. These visual portrayals make the Black subject of art visible, yet the method of portrayal invisiblizes their existence (Erickson, 2009). The above-mentioned engraved artwork in Sloane’s collection is one of the recreations of a painting by the Italian artist named Titian. The title of the artwork in Sloane’s collection, now housed at the British Museum, is labelled ‘The Beautiful Slave’ followed by the textual description of what’s depicted in the painting. In this painting in Slaone’s collection, the White woman has her hand resting on the shoulder of the Black child who looks up to focus only on her. The posture assumed by the two figures signals the benevolence of Laura Dianti – the white woman in the picture – and the reverence that the Black child holds for her. The smaller and receded figure of the Black child also depicts subservience. It encapsulates the deep seated racial hierarchies that were embedded in the Eurpeans societies of the time (Simons, 2023). Portraits depicting White Europeans with Black young pages were viewed as a sign of royalty and higher status of the White person in the painting (Simons, 2023) This work of art has several recreations. One recreation of this painting is present at a private collection called Kisters Collection, in the city of Kreuzlingen in Switzerland (Fanti, 2016). Along with recreations, alternate titles of these artwork also exist, such as ‘Laura Dianti and a Black Page’ (Revealing the African Presence in Renaissance Europe, 2012-2013) or ‘Laura Dianti with Her Accompanying Black Attendant’ (Faith and Empire: The Legacy of Conversion and Commerce in the Early Modern World, 2023). All the various recreations of this artwork hold testimony to the presence of Black subjects in Europe in the 17th and 18th centuries. It also illustrates the societal hierarchies into which Black Africans were placed. Africans, especially Black Africans, held various status in European societies, ranging from free to freemen to enslaved or merely servants to the aristocrats or royalty (Lowe, 2013). The name of the child in the picture is unknown. It is often not plausible to decipher the name or the legal status of Black subjects in artwork if the information available about them is limited. Sloane’s catalogue entry refers to the child in the artwork as ‘beautiful slave’; however, the terms ‘attendant’ and ‘page’ are used for the child in other copies of the artwork. Pages in 17th and 18th century Europe were apprentices or servants, and were of various ethnicities (Wolfthal, 2022). The discrepancy in the description of the child makes their actual status ambiguous. Oftentimes the way Black children are depicted either illustrates their inferiority to the accompanying white person in the portrait or their status as “a curious ornament or a diverting toy” (Origo, 1995). Being a child, the Black page or servant in the portrait is of smaller stature, which renders their portrayal vulnerable and unimportant (Lowe, 2013). Along with aiding the depiction of the white subject of the portrait as holding higher status, the Black children were also used as ‘decorative’ in these artwork (Kaplan, 2003). The painting is an example of the visual systems that were employed to illustrate racial superiority – with the imposing portrait of a White person juxtaposed with the small figure of an unnamed Black child. The child occupies a liminal position in the portrait (Lowe, 2013). The portrait does not narrate anything about the life of the Black child–the only thing enhanced through the portrait in their vulnerability and their race. They are treated as an accessory or an appendage to their White counterpart – functioning as a conduit to tell the story about the White person instead of being a person on their own."
  })
}];
const sloanecolNew = UNSAFE_withComponentProps(function() {
  return /* @__PURE__ */ jsx(Collection, {
    title: "Objects from Sloane collection",
    mainImageSrc: sloane,
    description: "The British museum opened its doors to the public on Monday 15 January 1759. Forming this monumental colonial institution's earliest collection were cultural and natural ‘curiosities’ accumulated by Sir Hans Sloane’s over the course of his longevous life. The collection of Sir Hans Sloane that he spent his long life collecting, were bought by the British Parliament the year he died, and were displayed to the public eye at the behest of Sloane’s will. It was instrumental to the creation of the British Museum. Sloane’s collection later on was divided among other British institutions that housed colonial collections such as the British Library and Natural History Museum in London. To this day, Sloane’s collection holds testimonies to various features of the British as well as global cultural, social and political environments.\nSloane’s collection is composed of thousands of preserved plants and other natural material, preserved animal bodies, photographic material, correspondences, and 54 handwritten catalogues documenting almost the entirety of the object he amassed. There is a huge diversity in objects that Sloane accumulated as there was no pattern to his collection practice. He devised a  categorisation system for his object which are as follows: The Library, Medals and Coins,  Antiquities, Cameos and Intaglios, Precious Stones, Agates and Jaspers, Agate and Jasper Vessels, Crystals and Spars, Fossils, Flints, Other Stones, Metals, Minerals, Ores, Earths, Sands, Salts, Bitumens, Sulphurs, Ambers, Talcs and Micae, Testacea and Shells, Corals and Sponges, Echini Marini (sea urchins), Asteriae, Trochi, Entrochi (shells), Crustacea or Crabs, Starfish, Fish, Birds, Eggs, Nests, Vipers and Serpents, Quadrupeds, Insects, Humana, Vegetable Substances, Herbarium Volumes, Miscellaneous Things, Framed Pictures and Drawings, and Mathematical Instruments (Delborough, 2017).\nSloane’s interest in gathering ‘curious’ objects started during his early years in Killyleagh–the plants he gathered there make up the earliest natural specimen he collected. Although Sloane only started treating and organising his collection for  public display in the early 1700s, he was laying the foundation of it from his early days. There are documented collection items in Sloane’s collection that go as far back as the 1680s; before his voyage to Jamaica. One of Sloane’s main motives while in Jamaica was accumulating as many cultural and natural items as he could and he initiated this mission from the moment his ship left the shores of England. When the ships docked on the Island of Madeira off the coast near North Africa, Sloans used the time there to collect natural specimens on the island. This pattern continued in Jamaica where Sloane employed the physical labour of the enslaved people to gather natural and cultural materials. However, it wasn't just physical labour that Sloane’s collection benefited off of. Enslaved people as well as indigenous population of Jamaica had a close ecological relationship to the island as well as deep epistemic knowledge of herbal cures that could be extracted from their natural environment. Sloane’s collection is a testament to the richness of cultures that thrived in Jamaica as well as offers glimpses of the natural and cultural impacts that British colonialism had on Jamaica.  It is also a window into the lives led by enslaved people as well as the indigenous population of the island, and different ways in which they fought the colonial subjugation. Returning from his stay in Jamaica, Sloane had accumulated a vast variety of specimen which also included alive animals such as Serpents, Iguanas and Alligators–although the majority of them were not able to make it back into Sloane’s possession in London as they either died during the sea voyage or escaped once the ship docked. However, a significant portion of Sloane's collection made it back to London perfectly intact. Soon after moving back to London, Sloane bought a house in Chelsea where all of his collection was stored during his life and for a while after his death. \nSlaone’s collecting fixation does not end with his trip to Jamaica, but was expanded further with time. There were various ways through which Sloane acquired objects. Because of his higher status in society and the connection that it afforded him, Sloane usually had people reaching out to him to add to his ‘curiosities’. These include journeymen who travelled across seas and collected objects from different parts of the globe. Oftentimes there were entire collections of other individuals that were absorbed into Sloane’s collection. These included collections of friends but also of strangers whose widowed partners would sell their collections to Sloane at a considerable price. \nDue to the wide variety of ways through which Sloane acquired the objects in his collections, their rationalisation was seldom called into question. Sloane’s motivation to collect objects was not to research, but to document or preserve. Therefore, this led to some critiques directed at his collection with regards to their trustworthiness and the validity of the context ascribed to them under Sloane’s authority. William King, one of the major critics of credulity of Sloane’s collections questioned authenticity of Sloane’s account of a woman giving birth to a bag of bones after 15 months of pregnancy. There were also speculations about if Sloane is fully aware of all the objects in his possession. Sloane handled these critics by labelling them as ‘envious and malicious’, and did not pay much heed to them.  \nThe collection Sloane was building was ever expanding and required continuous organising and documenting. It was not possible for Sloane to be the sole custodian of the collections he amassed because of its gigantic scale. The ten assistants that Sloane hired were experts in diverse professions such as botany, librarianship and also in the art of cataloguing. Together with Sloane, these assistants were responsible for cataloguing the collections, manuscripting, organising the books and other written material in the library, annotating, translation from foreign languages, and organising trips and visits to the collections. Sections of Sloane’s library and the rest of the collection were catalogued and reorganised more than once. Therefore, the Sloane’s collection that we engage with in different institutions has been acquired, passed down and recorded through multiple individuals who in different ways have impacted the silences, gaps and errors in the Sloane’s collection. \nSloane’s collection is documented in 54 handwritten catalogues. This laborious work of cataloguing was performed by Sloane and his ten assistants. However, he himself started the process of cataloguing  his collection as far back as the 1680s when he started accumulating books. Considering the scale of the collection, Sloane designed a cataloguing and tagging system through which any description of object in his possession could be looked up in the catalogue and its location in the apartment ascertained through the number that it was assigned. Because of Sloane’s fixation on collecting, the numbering and cataloguing system was designed for it to be ever expandable. As mentioned before, Sloane’s primary focus was on documenting and recording the collection, and not for the purpose of conducting research or building up a context around them. Sloane’s obsession with the idea of documenting his collection created a maze of manuscript work., which Sloane’s collection practises provide a window into the points to the colonial fixation on hoarding ‘curiosities’ without engaging with what the objects actually represent and a refusal to explore the politics that an object embodies. It was Sloane and his assistants who attached meanings to it and reduced it to its materiality instead of addressing the deeper sociopolitical aspects that it points to or the wider context of colonial extraction and exploitation that enabled the material of land in Sloane’s possession.\nThe financial resources required for building the collection like Sloane’s were immense, however, Sloane did not have a shortage of that. He was positioned close to the high rank in the Empires; that served him well in amassing the ‘curiosities’ that came into his possession. Not only was Sloane making financial gains through his practice as a medical doctor, he also had money flowing in from his plantation in Jamaica. Purchasing the vast majority of his collection was enabled in part by the slavery money that Sloane acquired.\nSloane had a vision of making his collection accessible to the posterity. He willed it for ‘improvement, knowledge and information of all persons’. This notion of ‘all person’ could be associated with the language of universality that today's museums use as a way of applying an objective world view to their collections that are vastly varied. Today, Sloane’s collection makes up part of the British Museum, along with objects from the collections of other eminent collectors. The links that the collections and its collectors had with the empire and its exploitation are increasingly coming to the forefront of conversations on these objects.\n",
    collectionItems: SloaneCollectionObjects
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SloaneCollectionObjects,
  default: sloanecolNew
}, Symbol.toStringTag, { value: "Module" }));
const CounterdataTypes = {
  identify: "Identify",
  makeVisible: "Make visible",
  // no challenge for now
  // challenge: "Challenge",
  resist: "Resist"
};
Object.fromEntries(Object.values(CounterdataTypes).map((counterdata) => [counterdata, false]));
const objectPage = UNSAFE_withComponentProps(function(props) {
  const navigate = useNavigate();
  const {
    pathname
  } = useLocation();
  const collectionItems = SloaneCollectionObjects;
  const objectIndex = parseInt(pathname.split("/").at(-1));
  const collectionObject = collectionItems[objectIndex];
  const getOnClickSection = (id) => () => {
    const context = document.querySelector(`#${id}`);
    context == null ? void 0 : context.scrollIntoView({
      behavior: "smooth"
    });
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "flex flex-col items-center",
    children: [/* @__PURE__ */ jsx(NavLink, {
      to: "/",
      children: /* @__PURE__ */ jsxs("div", {
        className: "pt-5 font-bold",
        children: [/* @__PURE__ */ jsx("h1", {
          children: "Counterdata Visualisation"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-2xl",
          children: "of Digital Museum Collections"
        })]
      })
    }), /* @__PURE__ */ jsx(Nav, {}), /* @__PURE__ */ jsxs("div", {
      className: "flex flex-row w-full",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "flex flex-row flex-1",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex-1",
          children: [/* @__PURE__ */ jsx("div", {
            children: /* @__PURE__ */ jsx("button", {
              className: "pb-10",
              type: "button",
              onClick: () => navigate(-1),
              children: "Back to collection"
            })
          }), /* @__PURE__ */ jsx("div", {
            children: /* @__PURE__ */ jsx("img", {
              src: collectionObject.src
            })
          }), /* @__PURE__ */ jsx("div", {
            className: "pt-3 pb-3",
            children: "Object title:"
          }), /* @__PURE__ */ jsx("div", {
            className: "",
            children: collectionObject.fullName
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex-0 pr-5 pl-3 cursor-pointer mt-16 ",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "mb-6 gap-50",
            children: [/* @__PURE__ */ jsx("div", {
              className: "rounded-full bg-[#6369d1] size-5 justify-center"
            }), /* @__PURE__ */ jsx("a", {
              onClick: getOnClickSection("label1"),
              children: "Data fields "
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "mb-6",
            children: [/* @__PURE__ */ jsx("div", {
              className: "rounded-full bg-[#ffcf56] size-5"
            }), /* @__PURE__ */ jsx("a", {
              onClick: getOnClickSection("label2"),
              children: "Power dimensions "
            })]
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("div", {
              className: "rounded-full bg-[#2ebfa5] size-5"
            }), /* @__PURE__ */ jsx("a", {
              onClick: getOnClickSection("label3"),
              children: "Current availability"
            })]
          })]
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex-2 mr-8 max-h-[700px] overflow-y-scroll ",
        children: [/* @__PURE__ */ jsxs("section", {
          className: "bg-white rounded-2xl border-8 border-[#6369d1] p-6",
          children: [/* @__PURE__ */ jsxs("div", {
            id: "label1",
            children: [/* @__PURE__ */ jsx("h2", {
              children: "Data fields"
            }), " "]
          }), /* @__PURE__ */ jsx("dl", {
            children: Object.entries(collectionItems[objectIndex].dataFields).map(([fieldName, fieldInfo]) => {
              const fieldValues = Array.isArray(fieldInfo) ? fieldInfo : [fieldInfo];
              return /* @__PURE__ */ jsxs(Fragment, {
                children: [/* @__PURE__ */ jsx("dt", {
                  children: /* @__PURE__ */ jsx("strong", {
                    children: fieldName
                  })
                }), fieldValues.map(({
                  fieldValue,
                  contextTag
                }) => /* @__PURE__ */ jsx("dd", {
                  className: "mb-4",
                  onClick: () => {
                    const context = document.querySelector(`[data-context-tag="${contextTag}"]`);
                    context == null ? void 0 : context.scrollIntoView({
                      behavior: "smooth"
                    });
                  },
                  style: contextTag ? {
                    cursor: "pointer"
                  } : void 0,
                  children: fieldValue
                }))]
              });
            })
          })]
        }), /* @__PURE__ */ jsxs("section", {
          className: "bg-white rounded-2xl border-8 border-[#ffcf56] p-6",
          children: [/* @__PURE__ */ jsx("div", {
            id: "label2",
            children: /* @__PURE__ */ jsx("h2", {
              children: "Power Dimensions"
            })
          }), /* @__PURE__ */ jsx("div", {
            className: "font-bold",
            children: "Historical Power Dimensions"
          }), /* @__PURE__ */ jsx("div", {
            children: "Forms of domination that could be inspected through the object:"
          }), /* @__PURE__ */ jsx("div", {
            children: "Forms of resistance that could be inspected through the object:"
          }), /* @__PURE__ */ jsx("br", {}), /* @__PURE__ */ jsx("div", {
            className: "font-bold",
            children: "Contemporary Power Dimensions"
          }), /* @__PURE__ */ jsx("div", {
            children: "Structural Domain"
          }), /* @__PURE__ */ jsx("div", {
            children: "Disciplinary Domain"
          }), /* @__PURE__ */ jsx("div", {
            children: "Hegemonic Domain"
          }), /* @__PURE__ */ jsx("div", {
            children: "Interpersonal Domain"
          })]
        }), /* @__PURE__ */ jsxs("section", {
          className: "bg-white rounded-2xl border-8 border-[#2ebfa5] p-6",
          children: [/* @__PURE__ */ jsx("div", {
            id: "label3",
            children: /* @__PURE__ */ jsx("h2", {
              children: "Current digital availability"
            })
          }), /* @__PURE__ */ jsx("div", {
            children: "counterdata contents 3"
          })]
        })]
      })]
    })]
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: objectPage
}, Symbol.toStringTag, { value: "Module" }));
const clivecol = UNSAFE_withComponentProps(function() {
  return /* @__PURE__ */ jsx("div", {
    children: "Hello Clive!"
  });
});
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: clivecol
}, Symbol.toStringTag, { value: "Module" }));
const body = `
@prefix crm: <http://www.cidoc-crm.org/cidoc-crm/> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

<http://example.com/event/6817497d> a crm:E5_Event ;
	rdfs:label "Winkelmann sees LaocoÃ¶n" ;
	crm:P4_has_time-span <http://example.com/time/5c5f16fc>	 ;
	crm:P12_occurred_in_the_presence_of <http://example.com/person/95cee8a7> , <http://example.com/object/23b1ddb2> ;
	crm:P7_took_place_at <http://example.com/place/96ce9dee> .

# IRIs have to be distinct

<http://example.com/object/23b1ddb2> a crm:E22_Human-made_Object ;
	rdfs:label "LaocoÃ¶n Group" ;
	crm:P2_has_type <http://example.com/type/copy/a7b49f6a> .

<http://example.com/type/copy/a7b49f6a> a crm:E55_Type ;
	rdfs:label "Copy" .

<http://example.com/person/95cee8a7> a crm:E21_Person ;
	rdfs:label "Johann-Joachim Winkelmann" .
	
<http://example.com/time/5c5f16fc> a crm:E52_Time-span ;
	rdfs:label "1755" .

<http://example.com/place/96ce9dee> a crm:E53_Place ;
	rdfs:label "Vatican, Rome" .

<http://example.com/event/creation/da3548b4> a crm:E65_Creation ;
	rdfs:label "Winkelmann writes history of the Art of Antiquity" ;
	crm:P14_carried_out_by <http://example.com/person/95cee8a7> ;
	crm:P94_has_created <http://example.com/information/2316e0b4> ;
	crm:P4_has_time-span <http://example.com/time/d55085b0>	 .
	
<http://example.com/time/d55085b0> a crm:E52_Time-span ;
	rdfs:label "1764" .

<http://example.com/information/2316e0b4> a crm:E73_Information_Object ;
		rdfs:label "History of the Art of Antiquity" ;
	crm:P67_refers_to <http://example.com/object/23b1ddb2> .

<http://example.com/event/production/29b60f4d> a crm:E12_Production ;
	rdfs:label "Roman commision copy of the LaocoÃ¶n Group" ;
	crm:P108_has_produced <http://example.com/object/23b1ddb2> ;
	crm:P12_occurred_in_the_presence_of <http://example.com/object/1da07e92> .

<http://example.com/object/1da07e92> a crm:E22_Human-made_Object ;
	rdfs:label "LaocoÃ¶n Group" ;
	crm:P2_has_type <http://example.com/type/hellenistic/93745ddf> .

<http://example.com/type/hellenistic/93745ddf> a crm:E55_Type ;
	rdfs:label "Hellenistic" .

<http://example.com/event/birth/46e90bf4> a crm:E67_Birth ;
	rdfs:label "Winkelmann's birth" ;
	crm:P98_brought_into_life <http://example.com/person/95cee8a7> ;
	crm:P96_by_mother <http://example.com/person/639e49e8> ;
	crm:P7_took_place_at <http://example.com/place/b1a8dd6b> ;
	crm:P4_has_time-span <http://example.com/time/572e3de3> .

<http://example.com/time/572e3de3> a crm:E52_Time-span ;
	rdfs:label "1717" .

<http://example.com/person/639e49e8> a crm:E21_Person ;
	rdfs:label "Anna-Maria Meyer" .

<http://example.com/place/b1a8dd6b> a crm:E53_Place ;
	rdfs:label "Stendal" .

<http://example.com/event/death/07f84a6f> a crm:E69_Death ;
	rdfs:label "Winkelmann's death" ;
	crm:P100_was_death_of <http://example.com/person/95cee8a7> ;
	crm:P7_took_place_at <http://example.com/place/a6b28b49> ;
	crm:P4_has_time-span <http://example.com/time/e949ad84> .

 <http://example.com/place/a6b28b49> a crm:E53_Place ;
 	rdfs:label "Trieste" .

 <http://example.com/time/e949ad84> a crm:E52_Time-span ;
 	rdfs:label "1768" .
`;
const ns = solidNamespace($rdf);
const CRM = $rdf.Namespace("http://www.cidoc-crm.org/cidoc-crm/");
$rdf.Namespace("http://www.w3.org/1999/02/22-rdf-syntax-ns#");
$rdf.Namespace("http://www.w3.org/2000/01/rdf-schema#");
$rdf.Namespace("http://www.w3.org/2001/XMLSchema#");
const uri = "https://example.org/resource.ttl";
const rdfTest = UNSAFE_withComponentProps(function RdflibLocalDemo() {
  const store = useMemo(() => graph(), []);
  const [name, setName] = useState();
  const [error, setError] = useState(null);
  useEffect(() => {
    parse(body, store, uri, "text/turtle", (e, updatedStore) => {
      var _a;
      if (e) setError(e);
      setName(((_a = updatedStore == null ? void 0 : updatedStore.any(namedNode(uri), ns.foaf("name"), null)) == null ? void 0 : _a.value) || "");
    });
  }, []);
  if (error) {
    return /* @__PURE__ */ jsx("div", {
      children: "There's been an error - sad!!!"
    });
  }
  if (name === void 0) {
    return /* @__PURE__ */ jsx("div", {
      children: "Loading!!??!! Wait!!!"
    });
  }
  const subject = $rdf.sym("http://example.com/event/creation/da3548b4");
  const title = store.any(subject, CRM("P14_carried_out_by"));
  return /* @__PURE__ */ jsx("div", {
    children: (title == null ? void 0 : title.value) || "Something loaded...?"
  });
});
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: rdfTest
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-DAX0zq9B.js", "imports": ["/assets/chunk-C37GKA54-3nktgu46.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-CDZZ8g-H.js", "imports": ["/assets/chunk-C37GKA54-3nktgu46.js"], "css": ["/assets/root-D9T9_odf.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-CfUbPLda.js", "imports": ["/assets/chunk-C37GKA54-3nktgu46.js", "/assets/nav-HA_jq9uc.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "sloanecol/sloanecol": { "id": "sloanecol/sloanecol", "parentId": "root", "path": "/sloane", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/sloanecol-D9QuTGhd.js", "imports": ["/assets/chunk-C37GKA54-3nktgu46.js", "/assets/nav-HA_jq9uc.js", "/assets/misc-entry-1796-D0665VOr.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "sloanecol/sloanecol-new": { "id": "sloanecol/sloanecol-new", "parentId": "root", "path": "/sloane-new", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/sloanecol-new-BFcDOj1M.js", "imports": ["/assets/sloanecol-new-CjSIVXak.js", "/assets/chunk-C37GKA54-3nktgu46.js", "/assets/nav-HA_jq9uc.js", "/assets/misc-entry-1796-D0665VOr.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "object-page": { "id": "object-page", "parentId": "root", "path": "/sloane-new/:objectIndex", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/object-page-o_jnIBbX.js", "imports": ["/assets/chunk-C37GKA54-3nktgu46.js", "/assets/nav-HA_jq9uc.js", "/assets/sloanecol-new-CjSIVXak.js", "/assets/misc-entry-1796-D0665VOr.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "clivecol/clivecol": { "id": "clivecol/clivecol", "parentId": "root", "path": "/clive", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/clivecol-RjH5wvYE.js", "imports": ["/assets/chunk-C37GKA54-3nktgu46.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "rdf-test": { "id": "rdf-test", "parentId": "root", "path": "/rdf-test", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/rdf-test-QsY-zmyp.js", "imports": ["/assets/chunk-C37GKA54-3nktgu46.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-81bcfee3.js", "version": "81bcfee3", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "sloanecol/sloanecol": {
    id: "sloanecol/sloanecol",
    parentId: "root",
    path: "/sloane",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "sloanecol/sloanecol-new": {
    id: "sloanecol/sloanecol-new",
    parentId: "root",
    path: "/sloane-new",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "object-page": {
    id: "object-page",
    parentId: "root",
    path: "/sloane-new/:objectIndex",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "clivecol/clivecol": {
    id: "clivecol/clivecol",
    parentId: "root",
    path: "/clive",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "rdf-test": {
    id: "rdf-test",
    parentId: "root",
    path: "/rdf-test",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
