(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{529:function(e,r,t){"use strict";t.d(r,"a",(function(){return d})),t.d(r,"b",(function(){return m}));var n=t(0),a=t.n(n);function c(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function s(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){c(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function u(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},c=Object.keys(e);for(n=0;n<c.length;n++)t=c[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)t=c[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var b=a.a.createContext({}),i=function(e){var r=a.a.useContext(b),t=r;return e&&(t="function"==typeof e?e(r):s(s({},r),e)),t},d=function(e){var r=i(e.components);return a.a.createElement(b.Provider,{value:r},e.children)},p={inlineCode:"code",wrapper:function(e){var r=e.children;return a.a.createElement(a.a.Fragment,{},r)}},l=a.a.forwardRef((function(e,r){var t=e.components,n=e.mdxType,c=e.originalType,o=e.parentName,b=u(e,["components","mdxType","originalType","parentName"]),d=i(t),l=n,m=d["".concat(o,".").concat(l)]||d[l]||p[l]||c;return t?a.a.createElement(m,s(s({ref:r},b),{},{components:t})):a.a.createElement(m,s({ref:r},b))}));function m(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var c=t.length,o=new Array(c);o[0]=l;var s={};for(var u in r)hasOwnProperty.call(r,u)&&(s[u]=r[u]);s.originalType=e,s.mdxType="string"==typeof e?e:n,o[1]=s;for(var b=2;b<c;b++)o[b]=t[b];return a.a.createElement.apply(null,o)}return a.a.createElement.apply(null,t)}l.displayName="MDXCreateElement"},69:function(e,r,t){"use strict";t.r(r),t.d(r,"frontMatter",(function(){return o})),t.d(r,"metadata",(function(){return s})),t.d(r,"rightToc",(function(){return u})),t.d(r,"default",(function(){return i}));var n=t(2),a=t(6),c=(t(0),t(529)),o={},s={unversionedId:"api/sdk/interfaces/_augur_sdk_src_state_db_zeroxorders_.document",id:"api/sdk/interfaces/_augur_sdk_src_state_db_zeroxorders_.document",isDocsHomePage:!1,title:"_augur_sdk_src_state_db_zeroxorders_.document",description:'@augurproject/types \u203a Globals \u203a "augur-sdk/src/state/db/ZeroXOrders" \u203a Document',source:"@site/../docs/api/sdk/interfaces/_augur_sdk_src_state_db_zeroxorders_.document.md",permalink:"/docs/api/sdk/interfaces/_augur_sdk_src_state_db_zeroxorders_.document",editUrl:"https://github.com/AugurProject/augur/edit/v2/augur.sh/../docs/api/sdk/interfaces/_augur_sdk_src_state_db_zeroxorders_.document.md"},u=[{value:"Hierarchy",id:"hierarchy",children:[]},{value:"Indexable",id:"indexable",children:[]},{value:"Index",id:"index",children:[{value:"Properties",id:"properties",children:[]}]},{value:"Properties",id:"properties-1",children:[{value:"blockNumber",id:"blocknumber",children:[]}]}],b={rightToc:u};function i(e){var r=e.components,t=Object(a.a)(e,["components"]);return Object(c.b)("wrapper",Object(n.a)({},b,t,{components:r,mdxType:"MDXLayout"}),Object(c.b)("p",null,Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"/docs/api/sdk/README"}),"@augurproject/types")," \u203a ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"/docs/api/sdk/globals"}),"Globals")," \u203a ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"/docs/api/sdk/modules/_augur_sdk_src_state_db_zeroxorders_"}),'"augur-sdk/src/state/db/ZeroXOrders"')," \u203a ",Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"/docs/api/sdk/interfaces/_augur_sdk_src_state_db_zeroxorders_.document"}),"Document")),Object(c.b)("h1",{id:"interface-document"},"Interface: Document"),Object(c.b)("h2",{id:"hierarchy"},"Hierarchy"),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},Object(c.b)("p",{parentName:"li"},Object(c.b)("a",Object(n.a)({parentName:"p"},{href:"/docs/api/sdk/interfaces/_augur_sdk_src_state_db_abstracttable_.basedocument"}),"BaseDocument")),Object(c.b)("p",{parentName:"li"},"\u21b3 ",Object(c.b)("strong",{parentName:"p"},"Document")))),Object(c.b)("h2",{id:"indexable"},"Indexable"),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},"["," ",Object(c.b)("strong",{parentName:"li"},"key"),": ",Object(c.b)("em",{parentName:"li"},"string"),"]",": any")),Object(c.b)("h2",{id:"index"},"Index"),Object(c.b)("h3",{id:"properties"},"Properties"),Object(c.b)("ul",null,Object(c.b)("li",{parentName:"ul"},Object(c.b)("a",Object(n.a)({parentName:"li"},{href:"/docs/api/sdk/interfaces/_augur_sdk_src_state_db_zeroxorders_.document#blocknumber"}),"blockNumber"))),Object(c.b)("h2",{id:"properties-1"},"Properties"),Object(c.b)("h3",{id:"blocknumber"},"blockNumber"),Object(c.b)("p",null,"\u2022 ",Object(c.b)("strong",{parentName:"p"},"blockNumber"),": ",Object(c.b)("em",{parentName:"p"},"number")),Object(c.b)("p",null,Object(c.b)("em",{parentName:"p"},"Defined in ",Object(c.b)("a",Object(n.a)({parentName:"em"},{href:"https://github.com/AugurProject/augur/blob/88b6e76efb/packages/augur-sdk/src/state/db/ZeroXOrders.ts#L28"}),"packages/augur-sdk/src/state/db/ZeroXOrders.ts:28"))))}i.isMDXComponent=!0}}]);