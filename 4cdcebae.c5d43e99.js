(window.webpackJsonp=window.webpackJsonp||[]).push([[128],{184:function(e,t,s){"use strict";s.r(t),s.d(t,"frontMatter",(function(){return b})),s.d(t,"metadata",(function(){return a})),s.d(t,"rightToc",(function(){return i})),s.d(t,"default",(function(){return o}));var n=s(2),r=s(6),c=(s(0),s(529)),b={title:"Ens"},a={unversionedId:"api/contracts/ens",id:"api/contracts/ens",isDocsHomePage:!1,title:"Ens",description:"Contracts",source:"@site/../docs/api/contracts/ens.md",permalink:"/docs/api/contracts/ens",editUrl:"https://github.com/AugurProject/augur/edit/v2/augur.sh/../docs/api/contracts/ens.md"},i=[{value:"Contracts",id:"contracts",children:[{value:"<code>ENSRegistry</code>",id:"ensregistry",children:[]},{value:"<code>IENSRegistry</code>",id:"iensregistry",children:[]}]}],l={rightToc:i};function o(e){var t=e.components,s=Object(r.a)(e,["components"]);return Object(c.b)("wrapper",Object(n.a)({},l,s,{components:t,mdxType:"MDXLayout"}),Object(c.b)("div",{class:"contracts"},Object(c.b)("h2",{id:"contracts"},"Contracts"),Object(c.b)("h3",{id:"ensregistry"},Object(c.b)("inlineCode",{parentName:"h3"},"ENSRegistry")),Object(c.b)("div",{class:"contract-index"},Object(c.b)("span",{class:"contract-index-title"},"Functions"),Object(c.b)("ul",null,Object(c.b)("li",null,Object(c.b)("a",{href:"#ENSRegistry.constructor()"},Object(c.b)("code",{class:"function-signature"},"constructor()"))),Object(c.b)("li",null,Object(c.b)("a",{href:"#ENSRegistry.setOwner(bytes32,address)"},Object(c.b)("code",{class:"function-signature"},"setOwner(bytes32 node, address owner)"))),Object(c.b)("li",null,Object(c.b)("a",{href:"#ENSRegistry.setSubnodeOwner(bytes32,bytes32,address)"},Object(c.b)("code",{class:"function-signature"},"setSubnodeOwner(bytes32 node, bytes32 label, address owner)"))),Object(c.b)("li",null,Object(c.b)("a",{href:"#ENSRegistry.setResolver(bytes32,address)"},Object(c.b)("code",{class:"function-signature"},"setResolver(bytes32 node, address resolver)"))),Object(c.b)("li",null,Object(c.b)("a",{href:"#ENSRegistry.setTTL(bytes32,uint64)"},Object(c.b)("code",{class:"function-signature"},"setTTL(bytes32 node, uint64 ttl)"))),Object(c.b)("li",null,Object(c.b)("a",{href:"#ENSRegistry.owner(bytes32)"},Object(c.b)("code",{class:"function-signature"},"owner(bytes32 node)"))),Object(c.b)("li",null,Object(c.b)("a",{href:"#ENSRegistry.resolver(bytes32)"},Object(c.b)("code",{class:"function-signature"},"resolver(bytes32 node)"))),Object(c.b)("li",null,Object(c.b)("a",{href:"#ENSRegistry.ttl(bytes32)"},Object(c.b)("code",{class:"function-signature"},"ttl(bytes32 node)")))),Object(c.b)("span",{class:"contract-index-title"},"Events"),Object(c.b)("ul",null,Object(c.b)("li",{class:"inherited"},Object(c.b)("a",{href:"ens#IENSRegistry.NewOwner(bytes32,bytes32,address)"},Object(c.b)("code",{class:"function-signature"},"NewOwner(bytes32 node, bytes32 label, address owner)"))),Object(c.b)("li",{class:"inherited"},Object(c.b)("a",{href:"ens#IENSRegistry.Transfer(bytes32,address)"},Object(c.b)("code",{class:"function-signature"},"Transfer(bytes32 node, address owner)"))),Object(c.b)("li",{class:"inherited"},Object(c.b)("a",{href:"ens#IENSRegistry.NewResolver(bytes32,address)"},Object(c.b)("code",{class:"function-signature"},"NewResolver(bytes32 node, address resolver)"))),Object(c.b)("li",{class:"inherited"},Object(c.b)("a",{href:"ens#IENSRegistry.NewTTL(bytes32,uint64)"},Object(c.b)("code",{class:"function-signature"},"NewTTL(bytes32 node, uint64 ttl)"))))),Object(c.b)("h4",null,Object(c.b)("a",{class:"anchor","aria-hidden":"true",id:"ENSRegistry.constructor()"}),Object(c.b)("code",{class:"function-signature"},"constructor()"),Object(c.b)("span",{class:"function-visibility"},"public")),Object(c.b)("p",null,"Constructs a new ENS registrar."),Object(c.b)("h4",null,Object(c.b)("a",{class:"anchor","aria-hidden":"true",id:"ENSRegistry.setOwner(bytes32,address)"}),Object(c.b)("code",{class:"function-signature"},"setOwner(bytes32 node, address owner)"),Object(c.b)("span",{class:"function-visibility"},"external")),Object(c.b)("p",null,"Transfers ownership of a node to a new address. May only be called by the current owner of the node."),Object(c.b)("h4",null,Object(c.b)("a",{class:"anchor","aria-hidden":"true",id:"ENSRegistry.setSubnodeOwner(bytes32,bytes32,address)"}),Object(c.b)("code",{class:"function-signature"},"setSubnodeOwner(bytes32 node, bytes32 label, address owner)"),Object(c.b)("span",{class:"function-visibility"},"external")),Object(c.b)("p",null,"Transfers ownership of a subnode keccak256(node, label) to a new address. May only be called by the owner of the parent node."),Object(c.b)("h4",null,Object(c.b)("a",{class:"anchor","aria-hidden":"true",id:"ENSRegistry.setResolver(bytes32,address)"}),Object(c.b)("code",{class:"function-signature"},"setResolver(bytes32 node, address resolver)"),Object(c.b)("span",{class:"function-visibility"},"external")),Object(c.b)("p",null,"Sets the resolver address for the specified node."),Object(c.b)("h4",null,Object(c.b)("a",{class:"anchor","aria-hidden":"true",id:"ENSRegistry.setTTL(bytes32,uint64)"}),Object(c.b)("code",{class:"function-signature"},"setTTL(bytes32 node, uint64 ttl)"),Object(c.b)("span",{class:"function-visibility"},"external")),Object(c.b)("p",null,"Sets the TTL for the specified node."),Object(c.b)("h4",null,Object(c.b)("a",{class:"anchor","aria-hidden":"true",id:"ENSRegistry.owner(bytes32)"}),Object(c.b)("code",{class:"function-signature"},"owner(bytes32 node) ",Object(c.b)("span",{class:"return-arrow"},"\u2192")," ",Object(c.b)("span",{class:"return-type"},"address")),Object(c.b)("span",{class:"function-visibility"},"external")),Object(c.b)("p",null,"Returns the address that owns the specified node."),Object(c.b)("h4",null,Object(c.b)("a",{class:"anchor","aria-hidden":"true",id:"ENSRegistry.resolver(bytes32)"}),Object(c.b)("code",{class:"function-signature"},"resolver(bytes32 node) ",Object(c.b)("span",{class:"return-arrow"},"\u2192")," ",Object(c.b)("span",{class:"return-type"},"address")),Object(c.b)("span",{class:"function-visibility"},"external")),Object(c.b)("p",null,"Returns the address of the resolver for the specified node."),Object(c.b)("h4",null,Object(c.b)("a",{class:"anchor","aria-hidden":"true",id:"ENSRegistry.ttl(bytes32)"}),Object(c.b)("code",{class:"function-signature"},"ttl(bytes32 node) ",Object(c.b)("span",{class:"return-arrow"},"\u2192")," ",Object(c.b)("span",{class:"return-type"},"uint64")),Object(c.b)("span",{class:"function-visibility"},"external")),Object(c.b)("p",null,"Returns the TTL of a node, and any records associated with it."),Object(c.b)("h3",{id:"iensregistry"},Object(c.b)("inlineCode",{parentName:"h3"},"IENSRegistry")),Object(c.b)("div",{class:"contract-index"},Object(c.b)("span",{class:"contract-index-title"},"Functions"),Object(c.b)("ul",null,Object(c.b)("li",null,Object(c.b)("a",{href:"#IENSRegistry.setSubnodeOwner(bytes32,bytes32,address)"},Object(c.b)("code",{class:"function-signature"},"setSubnodeOwner(bytes32 node, bytes32 label, address owner)"))),Object(c.b)("li",null,Object(c.b)("a",{href:"#IENSRegistry.setResolver(bytes32,address)"},Object(c.b)("code",{class:"function-signature"},"setResolver(bytes32 node, address resolver)"))),Object(c.b)("li",null,Object(c.b)("a",{href:"#IENSRegistry.setOwner(bytes32,address)"},Object(c.b)("code",{class:"function-signature"},"setOwner(bytes32 node, address owner)"))),Object(c.b)("li",null,Object(c.b)("a",{href:"#IENSRegistry.setTTL(bytes32,uint64)"},Object(c.b)("code",{class:"function-signature"},"setTTL(bytes32 node, uint64 ttl)"))),Object(c.b)("li",null,Object(c.b)("a",{href:"#IENSRegistry.owner(bytes32)"},Object(c.b)("code",{class:"function-signature"},"owner(bytes32 node)"))),Object(c.b)("li",null,Object(c.b)("a",{href:"#IENSRegistry.resolver(bytes32)"},Object(c.b)("code",{class:"function-signature"},"resolver(bytes32 node)"))),Object(c.b)("li",null,Object(c.b)("a",{href:"#IENSRegistry.ttl(bytes32)"},Object(c.b)("code",{class:"function-signature"},"ttl(bytes32 node)")))),Object(c.b)("span",{class:"contract-index-title"},"Events"),Object(c.b)("ul",null,Object(c.b)("li",null,Object(c.b)("a",{href:"#IENSRegistry.NewOwner(bytes32,bytes32,address)"},Object(c.b)("code",{class:"function-signature"},"NewOwner(bytes32 node, bytes32 label, address owner)"))),Object(c.b)("li",null,Object(c.b)("a",{href:"#IENSRegistry.Transfer(bytes32,address)"},Object(c.b)("code",{class:"function-signature"},"Transfer(bytes32 node, address owner)"))),Object(c.b)("li",null,Object(c.b)("a",{href:"#IENSRegistry.NewResolver(bytes32,address)"},Object(c.b)("code",{class:"function-signature"},"NewResolver(bytes32 node, address resolver)"))),Object(c.b)("li",null,Object(c.b)("a",{href:"#IENSRegistry.NewTTL(bytes32,uint64)"},Object(c.b)("code",{class:"function-signature"},"NewTTL(bytes32 node, uint64 ttl)"))))),Object(c.b)("h4",null,Object(c.b)("a",{class:"anchor","aria-hidden":"true",id:"IENSRegistry.setSubnodeOwner(bytes32,bytes32,address)"}),Object(c.b)("code",{class:"function-signature"},"setSubnodeOwner(bytes32 node, bytes32 label, address owner)"),Object(c.b)("span",{class:"function-visibility"},"external")),Object(c.b)("h4",null,Object(c.b)("a",{class:"anchor","aria-hidden":"true",id:"IENSRegistry.setResolver(bytes32,address)"}),Object(c.b)("code",{class:"function-signature"},"setResolver(bytes32 node, address resolver)"),Object(c.b)("span",{class:"function-visibility"},"external")),Object(c.b)("h4",null,Object(c.b)("a",{class:"anchor","aria-hidden":"true",id:"IENSRegistry.setOwner(bytes32,address)"}),Object(c.b)("code",{class:"function-signature"},"setOwner(bytes32 node, address owner)"),Object(c.b)("span",{class:"function-visibility"},"external")),Object(c.b)("h4",null,Object(c.b)("a",{class:"anchor","aria-hidden":"true",id:"IENSRegistry.setTTL(bytes32,uint64)"}),Object(c.b)("code",{class:"function-signature"},"setTTL(bytes32 node, uint64 ttl)"),Object(c.b)("span",{class:"function-visibility"},"external")),Object(c.b)("h4",null,Object(c.b)("a",{class:"anchor","aria-hidden":"true",id:"IENSRegistry.owner(bytes32)"}),Object(c.b)("code",{class:"function-signature"},"owner(bytes32 node) ",Object(c.b)("span",{class:"return-arrow"},"\u2192")," ",Object(c.b)("span",{class:"return-type"},"address")),Object(c.b)("span",{class:"function-visibility"},"external")),Object(c.b)("h4",null,Object(c.b)("a",{class:"anchor","aria-hidden":"true",id:"IENSRegistry.resolver(bytes32)"}),Object(c.b)("code",{class:"function-signature"},"resolver(bytes32 node) ",Object(c.b)("span",{class:"return-arrow"},"\u2192")," ",Object(c.b)("span",{class:"return-type"},"address")),Object(c.b)("span",{class:"function-visibility"},"external")),Object(c.b)("h4",null,Object(c.b)("a",{class:"anchor","aria-hidden":"true",id:"IENSRegistry.ttl(bytes32)"}),Object(c.b)("code",{class:"function-signature"},"ttl(bytes32 node) ",Object(c.b)("span",{class:"return-arrow"},"\u2192")," ",Object(c.b)("span",{class:"return-type"},"uint64")),Object(c.b)("span",{class:"function-visibility"},"external")),Object(c.b)("h4",null,Object(c.b)("a",{class:"anchor","aria-hidden":"true",id:"IENSRegistry.NewOwner(bytes32,bytes32,address)"}),Object(c.b)("code",{class:"function-signature"},"NewOwner(bytes32 node, bytes32 label, address owner)"),Object(c.b)("span",{class:"function-visibility"})),Object(c.b)("h4",null,Object(c.b)("a",{class:"anchor","aria-hidden":"true",id:"IENSRegistry.Transfer(bytes32,address)"}),Object(c.b)("code",{class:"function-signature"},"Transfer(bytes32 node, address owner)"),Object(c.b)("span",{class:"function-visibility"})),Object(c.b)("h4",null,Object(c.b)("a",{class:"anchor","aria-hidden":"true",id:"IENSRegistry.NewResolver(bytes32,address)"}),Object(c.b)("code",{class:"function-signature"},"NewResolver(bytes32 node, address resolver)"),Object(c.b)("span",{class:"function-visibility"})),Object(c.b)("h4",null,Object(c.b)("a",{class:"anchor","aria-hidden":"true",id:"IENSRegistry.NewTTL(bytes32,uint64)"}),Object(c.b)("code",{class:"function-signature"},"NewTTL(bytes32 node, uint64 ttl)"),Object(c.b)("span",{class:"function-visibility"}))))}o.isMDXComponent=!0},529:function(e,t,s){"use strict";s.d(t,"a",(function(){return d})),s.d(t,"b",(function(){return y}));var n=s(0),r=s.n(n);function c(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}function b(e,t){var s=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),s.push.apply(s,n)}return s}function a(e){for(var t=1;t<arguments.length;t++){var s=null!=arguments[t]?arguments[t]:{};t%2?b(Object(s),!0).forEach((function(t){c(e,t,s[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(s)):b(Object(s)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(s,t))}))}return e}function i(e,t){if(null==e)return{};var s,n,r=function(e,t){if(null==e)return{};var s,n,r={},c=Object.keys(e);for(n=0;n<c.length;n++)s=c[n],t.indexOf(s)>=0||(r[s]=e[s]);return r}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)s=c[n],t.indexOf(s)>=0||Object.prototype.propertyIsEnumerable.call(e,s)&&(r[s]=e[s])}return r}var l=r.a.createContext({}),o=function(e){var t=r.a.useContext(l),s=t;return e&&(s="function"==typeof e?e(t):a(a({},t),e)),s},d=function(e){var t=o(e.components);return r.a.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},O=r.a.forwardRef((function(e,t){var s=e.components,n=e.mdxType,c=e.originalType,b=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),d=o(s),O=n,y=d["".concat(b,".").concat(O)]||d[O]||u[O]||c;return s?r.a.createElement(y,a(a({ref:t},l),{},{components:s})):r.a.createElement(y,a({ref:t},l))}));function y(e,t){var s=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var c=s.length,b=new Array(c);b[0]=O;var a={};for(var i in t)hasOwnProperty.call(t,i)&&(a[i]=t[i]);a.originalType=e,a.mdxType="string"==typeof e?e:n,b[1]=a;for(var l=2;l<c;l++)b[l]=s[l];return r.a.createElement.apply(null,b)}return r.a.createElement.apply(null,s)}O.displayName="MDXCreateElement"}}]);