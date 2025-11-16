import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts, Link, NavLink } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState } from "react";
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
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
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
const logo = "/assets/logo-qXbpRKhU.png";
function Welcome() {
  return /* @__PURE__ */ jsx("main", { className: "flex items-center justify-center pt-16 pb-16", children: /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col items-center gap-5 min-h-0", children: [
    /* @__PURE__ */ jsx("header", { className: "flex flex-col items-center gap-9", children: /* @__PURE__ */ jsx("div", { className: "w-[500px] max-w-[100vw] p-4", children: /* @__PURE__ */ jsx("img", { src: logo, alt: "React Router", className: "block w-full" }) }) }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-row", children: resources.map(({ to, text, icon, bodyText }) => /* @__PURE__ */ jsx("div", { className: "max-w-[500px] w-screen space-y-6 px-4", children: /* @__PURE__ */ jsxs("nav", { className: "rounded-2xl border border-black-200 p-6", children: [
      /* @__PURE__ */ jsx("p", { className: "leading-10 text-gray-700 text-center", children: text }),
      /* @__PURE__ */ jsx("p", { children: bodyText }),
      /* @__PURE__ */ jsx("ul", { children: /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
        Link,
        {
          className: "group flex items-center gap-3 self-stretch p-3 leading-normal text-blue-700 hover:underline",
          to,
          children: [
            icon,
            text
          ]
        }
      ) }, to) })
    ] }) })) })
  ] }) });
}
const resources = [
  {
    to: "/sloane",
    text: /* @__PURE__ */ jsxs("div", { children: [
      " ",
      /* @__PURE__ */ jsx("h1", { children: "Sloane Collection " }),
      " "
    ] }),
    bodyText: "Click below to view Sloane collection",
    icon: /* @__PURE__ */ jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "20",
        viewBox: "0 0 20 20",
        fill: "none",
        className: "stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300",
        children: /* @__PURE__ */ jsx(
          "path",
          {
            d: "M9.99981 10.0751V9.99992M17.4688 17.4688C15.889 19.0485 11.2645 16.9853 7.13958 12.8604C3.01467 8.73546 0.951405 4.11091 2.53116 2.53116C4.11091 0.951405 8.73546 3.01467 12.8604 7.13958C16.9853 11.2645 19.0485 15.889 17.4688 17.4688ZM2.53132 17.4688C0.951566 15.8891 3.01483 11.2645 7.13974 7.13963C11.2647 3.01471 15.8892 0.951453 17.469 2.53121C19.0487 4.11096 16.9854 8.73551 12.8605 12.8604C8.73562 16.9853 4.11107 19.0486 2.53132 17.4688Z",
            strokeWidth: "1.5",
            strokeLinecap: "round"
          }
        )
      }
    )
  },
  {
    to: "/clive",
    text: /* @__PURE__ */ jsxs("div", { children: [
      " ",
      /* @__PURE__ */ jsx("h1", { children: "Clive Collection " }),
      " "
    ] }),
    bodyText: "Click below to view Clive collection",
    icon: /* @__PURE__ */ jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "20",
        viewBox: "0 0 24 20",
        fill: "none",
        className: "stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300",
        children: /* @__PURE__ */ jsx(
          "path",
          {
            d: "M15.0686 1.25995L14.5477 1.17423L14.2913 1.63578C14.1754 1.84439 14.0545 2.08275 13.9422 2.31963C12.6461 2.16488 11.3406 2.16505 10.0445 2.32014C9.92822 2.08178 9.80478 1.84975 9.67412 1.62413L9.41449 1.17584L8.90333 1.25995C7.33547 1.51794 5.80717 1.99419 4.37748 2.66939L4.19 2.75793L4.07461 2.93019C1.23864 7.16437 0.46302 11.3053 0.838165 15.3924L0.868838 15.7266L1.13844 15.9264C2.81818 17.1714 4.68053 18.1233 6.68582 18.719L7.18892 18.8684L7.50166 18.4469C7.96179 17.8268 8.36504 17.1824 8.709 16.4944L8.71099 16.4904C10.8645 17.0471 13.128 17.0485 15.2821 16.4947C15.6261 17.1826 16.0293 17.8269 16.4892 18.4469L16.805 18.8725L17.3116 18.717C19.3056 18.105 21.1876 17.1751 22.8559 15.9238L23.1224 15.724L23.1528 15.3923C23.5873 10.6524 22.3579 6.53306 19.8947 2.90714L19.7759 2.73227L19.5833 2.64518C18.1437 1.99439 16.6386 1.51826 15.0686 1.25995ZM16.6074 10.7755L16.6074 10.7756C16.5934 11.6409 16.0212 12.1444 15.4783 12.1444C14.9297 12.1444 14.3493 11.6173 14.3493 10.7877C14.3493 9.94885 14.9378 9.41192 15.4783 9.41192C16.0471 9.41192 16.6209 9.93851 16.6074 10.7755ZM8.49373 12.1444C7.94513 12.1444 7.36471 11.6173 7.36471 10.7877C7.36471 9.94885 7.95323 9.41192 8.49373 9.41192C9.06038 9.41192 9.63892 9.93712 9.6417 10.7815C9.62517 11.6239 9.05462 12.1444 8.49373 12.1444Z",
            strokeWidth: "1.5"
          }
        )
      }
    )
  }
];
function meta({}) {
  return [{
    title: "New React Router App"
  }, {
    name: "description",
    content: "Welcome to React Router!"
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
const CounterdataTypes = {
  identify: "Identify",
  makeVisible: "Make visible",
  challenge: "Challenge",
  resist: "Resist"
};
const initialState = Object.fromEntries(
  Object.values(CounterdataTypes).map((counterdata) => [counterdata, false])
);
function Description({ description, objectIsSelected, counterdataIsSelected }) {
  if (!objectIsSelected) {
    if (counterdataIsSelected) {
      return /* @__PURE__ */ jsxs("p", { children: [
        description.slice(0, 100),
        "..."
      ] });
    } else {
      return /* @__PURE__ */ jsx("p", { children: description });
    }
  } else {
    return null;
  }
}
function Collection({ title, mainImageSrc, description, collectionItems }) {
  const [selectedCounterdata, setSelectedCounterdata] = useState(initialState);
  const [selectedObjectIndex, setSelectedObjectIndex] = useState(null);
  const counterdataIsSelected = Object.values(selectedCounterdata).some(
    (counterdataSelected) => counterdataSelected === true
  );
  const objectIsSelected = selectedObjectIndex !== null;
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(NavLink, { to: "/", children: /* @__PURE__ */ jsx("img", { className: "w-50", src: logo, alt: "" }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-around pt-16 pb-16", children: [
      /* @__PURE__ */ jsx("img", { className: "w-100", src: mainImageSrc }),
      /* @__PURE__ */ jsx("div", { children: Object.values(CounterdataTypes).map((counterdata) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            id: counterdata,
            name: counterdata,
            checked: selectedCounterdata[counterdata],
            onChange: () => {
              const newCounterdata = {
                ...selectedCounterdata,
                [counterdata]: !selectedCounterdata[counterdata]
              };
              setSelectedCounterdata(newCounterdata);
              if (Object.values(newCounterdata).every((val) => val === false)) {
                setSelectedObjectIndex(null);
              }
            }
          }
        ),
        /* @__PURE__ */ jsxs("label", { htmlFor: counterdata, children: [
          " ",
          counterdata
        ] })
      ] }, counterdata)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { children: title }),
      /* @__PURE__ */ jsx(
        Description,
        {
          description,
          objectIsSelected,
          counterdataIsSelected
        }
      )
    ] }),
    counterdataIsSelected && selectedObjectIndex === null ? /* @__PURE__ */ jsx("div", { className: "pt-10", children: collectionItems.map((item, index) => /* @__PURE__ */ jsxs("div", { children: [
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
    ] })) }) : null,
    objectIsSelected ? /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("button", { className: "pt-10", type: "button", onClick: () => setSelectedObjectIndex(null), children: "Back to collection" }),
      selectedCounterdata[CounterdataTypes.identify] && /* @__PURE__ */ jsx("div", { className: "pt-10", children: collectionItems[selectedObjectIndex].identify }),
      selectedCounterdata[CounterdataTypes.makeVisible] && /* @__PURE__ */ jsx("div", { className: "pt-10", children: collectionItems[selectedObjectIndex].makeVisible }),
      selectedCounterdata[CounterdataTypes.challenge] && /* @__PURE__ */ jsx("div", { className: "pt-10", children: collectionItems[selectedObjectIndex].challenge }),
      selectedCounterdata[CounterdataTypes.resist] && /* @__PURE__ */ jsx("div", { className: "pt-10", children: collectionItems[selectedObjectIndex].resist })
    ] }) : null
  ] });
}
const imageenslavedpeople = "/assets/Objects-displaying-enslaved-people-BlPMKPSZ.jpg";
const bmimageenslavedpeople = "/assets/bm-Objects-displaying-enslaved-people-DkfBbLkk.png";
const sloane = "/assets/sloane-BpOhpJ_U.webp";
const SloaneCollectionObjects = [{
  name: "Objects displaying enslaved people",
  src: imageenslavedpeople,
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
  name: "Object",
  src: imageenslavedpeople,
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
  return /* @__PURE__ */ jsx(Collection, {
    title: "Sloane collection",
    mainImageSrc: sloane,
    description: "The British museum opened its doors to the public on Monday 15 January 1759. Forming this monumental colonial institution's earliest collection were cultural and natural ‘curiosities’ accumulated by Sir Hans Sloane’s over the course of his longevous life. The collection of Sir Hans Sloane that he spent his long life collecting, were bought by the British Parliament the year he died, and were displayed to the public eye at the behest of Sloane’s will. It was instrumental to the creation of the British Museum. Sloane’s collection later on was divided among other British institutions that housed colonial collections such as the British Library and Natural History Museum in London. To this day, Sloane’s collection holds testimonies to various features of the British as well as global cultural, social and political environments.\nSloane’s collection is composed of thousands of preserved plants and other natural material, preserved animal bodies, photographic material, correspondences, and 54 handwritten catalogues documenting almost the entirety of the object he amassed. There is a huge diversity in objects that Sloane accumulated as there was no pattern to his collection practice. He devised a  categorisation system for his object which are as follows: The Library, Medals and Coins,  Antiquities, Cameos and Intaglios, Precious Stones, Agates and Jaspers, Agate and Jasper Vessels, Crystals and Spars, Fossils, Flints, Other Stones, Metals, Minerals, Ores, Earths, Sands, Salts, Bitumens, Sulphurs, Ambers, Talcs and Micae, Testacea and Shells, Corals and Sponges, Echini Marini (sea urchins), Asteriae, Trochi, Entrochi (shells), Crustacea or Crabs, Starfish, Fish, Birds, Eggs, Nests, Vipers and Serpents, Quadrupeds, Insects, Humana, Vegetable Substances, Herbarium Volumes, Miscellaneous Things, Framed Pictures and Drawings, and Mathematical Instruments (Delborough, 2017).\nSloane’s interest in gathering ‘curious’ objects started during his early years in Killyleagh–the plants he gathered there make up the earliest natural specimen he collected. Although Sloane only started treating and organising his collection for  public display in the early 1700s, he was laying the foundation of it from his early days. There are documented collection items in Sloane’s collection that go as far back as the 1680s; before his voyage to Jamaica. One of Sloane’s main motives while in Jamaica was accumulating as many cultural and natural items as he could and he initiated this mission from the moment his ship left the shores of England. When the ships docked on the Island of Madeira off the coast near North Africa, Sloans used the time there to collect natural specimens on the island. This pattern continued in Jamaica where Sloane employed the physical labour of the enslaved people to gather natural and cultural materials. However, it wasn't just physical labour that Sloane’s collection benefited off of. Enslaved people as well as indigenous population of Jamaica had a close ecological relationship to the island as well as deep epistemic knowledge of herbal cures that could be extracted from their natural environment. Sloane’s collection is a testament to the richness of cultures that thrived in Jamaica as well as offers glimpses of the natural and cultural impacts that British colonialism had on Jamaica.  It is also a window into the lives led by enslaved people as well as the indigenous population of the island, and different ways in which they fought the colonial subjugation. Returning from his stay in Jamaica, Sloane had accumulated a vast variety of specimen which also included alive animals such as Serpents, Iguanas and Alligators–although the majority of them were not able to make it back into Sloane’s possession in London as they either died during the sea voyage or escaped once the ship docked. However, a significant portion of Sloane's collection made it back to London perfectly intact. Soon after moving back to London, Sloane bought a house in Chelsea where all of his collection was stored during his life and for a while after his death. \nSlaone’s collecting fixation does not end with his trip to Jamaica, but was expanded further with time. There were various ways through which Sloane acquired objects. Because of his higher status in society and the connection that it afforded him, Sloane usually had people reaching out to him to add to his ‘curiosities’. These include journeymen who travelled across seas and collected objects from different parts of the globe. Oftentimes there were entire collections of other individuals that were absorbed into Sloane’s collection. These included collections of friends but also of strangers whose widowed partners would sell their collections to Sloane at a considerable price. \nDue to the wide variety of ways through which Sloane acquired the objects in his collections, their rationalisation was seldom called into question. Sloane’s motivation to collect objects was not to research, but to document or preserve. Therefore, this led to some critiques directed at his collection with regards to their trustworthiness and the validity of the context ascribed to them under Sloane’s authority. William King, one of the major critics of credulity of Sloane’s collections questioned authenticity of Sloane’s account of a woman giving birth to a bag of bones after 15 months of pregnancy. There were also speculations about if Sloane is fully aware of all the objects in his possession. Sloane handled these critics by labelling them as ‘envious and malicious’, and did not pay much heed to them.  \nThe collection Sloane was building was ever expanding and required continuous organising and documenting. It was not possible for Sloane to be the sole custodian of the collections he amassed because of its gigantic scale. The ten assistants that Sloane hired were experts in diverse professions such as botany, librarianship and also in the art of cataloguing. Together with Sloane, these assistants were responsible for cataloguing the collections, manuscripting, organising the books and other written material in the library, annotating, translation from foreign languages, and organising trips and visits to the collections. Sections of Sloane’s library and the rest of the collection were catalogued and reorganised more than once. Therefore, the Sloane’s collection that we engage with in different institutions has been acquired, passed down and recorded through multiple individuals who in different ways have impacted the silences, gaps and errors in the Sloane’s collection. \nSloane’s collection is documented in 54 handwritten catalogues. This laborious work of cataloguing was performed by Sloane and his ten assistants. However, he himself started the process of cataloguing  his collection as far back as the 1680s when he started accumulating books. Considering the scale of the collection, Sloane designed a cataloguing and tagging system through which any description of object in his possession could be looked up in the catalogue and its location in the apartment ascertained through the number that it was assigned. Because of Sloane’s fixation on collecting, the numbering and cataloguing system was designed for it to be ever expandable. As mentioned before, Sloane’s primary focus was on documenting and recording the collection, and not for the purpose of conducting research or building up a context around them. Sloane’s obsession with the idea of documenting his collection created a maze of manuscript work., which Sloane’s collection practises provide a window into the points to the colonial fixation on hoarding ‘curiosities’ without engaging with what the objects actually represent and a refusal to explore the politics that an object embodies. It was Sloane and his assistants who attached meanings to it and reduced it to its materiality instead of addressing the deeper sociopolitical aspects that it points to or the wider context of colonial extraction and exploitation that enabled the material of land in Sloane’s possession.\nThe financial resources required for building the collection like Sloane’s were immense, however, Sloane did not have a shortage of that. He was positioned close to the high rank in the Empires; that served him well in amassing the ‘curiosities’ that came into his possession. Not only was Sloane making financial gains through his practice as a medical doctor, he also had money flowing in from his plantation in Jamaica. Purchasing the vast majority of his collection was enabled in part by the slavery money that Sloane acquired.\nSloane had a vision of making his collection accessible to the posterity. He willed it for ‘improvement, knowledge and information of all persons’. This notion of ‘all person’ could be associated with the language of universality that today's museums use as a way of applying an objective world view to their collections that are vastly varied. Today, Sloane’s collection makes up part of the British Museum, along with objects from the collections of other eminent collectors. The links that the collections and its collectors had with the empire and its exploitation are increasingly coming to the forefront of conversations on these objects.\n",
    collectionItems: SloaneCollectionObjects
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sloanecol
}, Symbol.toStringTag, { value: "Module" }));
const clivecol = UNSAFE_withComponentProps(function() {
  return /* @__PURE__ */ jsx("div", {
    children: "Hello Clive!"
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: clivecol
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-BG5FqKC5.js", "imports": ["/assets/chunk-C37GKA54-wpw43ror.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-DCTzHMqE.js", "imports": ["/assets/chunk-C37GKA54-wpw43ror.js"], "css": ["/assets/root-DOqz0vc5.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home--JvvQvZt.js", "imports": ["/assets/chunk-C37GKA54-wpw43ror.js", "/assets/logo-ZtgOBaeW.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "sloanecol/sloanecol": { "id": "sloanecol/sloanecol", "parentId": "root", "path": "/sloane", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/sloanecol-CK_dQisn.js", "imports": ["/assets/chunk-C37GKA54-wpw43ror.js", "/assets/logo-ZtgOBaeW.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "clivecol/clivecol": { "id": "clivecol/clivecol", "parentId": "root", "path": "/clive", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/clivecol-hS81SiZe.js", "imports": ["/assets/chunk-C37GKA54-wpw43ror.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-2e16676a.js", "version": "2e16676a", "sri": void 0 };
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
  "clivecol/clivecol": {
    id: "clivecol/clivecol",
    parentId: "root",
    path: "/clive",
    index: void 0,
    caseSensitive: void 0,
    module: route3
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
