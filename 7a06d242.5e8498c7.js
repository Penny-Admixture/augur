(window.webpackJsonp=window.webpackJsonp||[]).push([[207],{263:function(e,r,t){"use strict";t.r(r),t.d(r,"frontMatter",(function(){return c})),t.d(r,"metadata",(function(){return s})),t.d(r,"rightToc",(function(){return i})),t.d(r,"default",(function(){return u}));var a=t(2),n=t(6),o=(t(0),t(529)),c={},s={unversionedId:"api/sdk/interfaces/_augur_sdk_src_state_getter_zeroxordersgetters_.zeroxorders",id:"api/sdk/interfaces/_augur_sdk_src_state_getter_zeroxordersgetters_.zeroxorders",isDocsHomePage:!1,title:"_augur_sdk_src_state_getter_zeroxordersgetters_.zeroxorders",description:'@augurproject/types \u203a Globals \u203a "augur-sdk/src/state/getter/ZeroXOrdersGetters" \u203a ZeroXOrders',source:"@site/../docs/api/sdk/interfaces/_augur_sdk_src_state_getter_zeroxordersgetters_.zeroxorders.md",permalink:"/docs/api/sdk/interfaces/_augur_sdk_src_state_getter_zeroxordersgetters_.zeroxorders",editUrl:"https://github.com/AugurProject/augur/edit/v2/augur.sh/../docs/api/sdk/interfaces/_augur_sdk_src_state_getter_zeroxordersgetters_.zeroxorders.md"},i=[{value:"Hierarchy",id:"hierarchy",children:[]},{value:"Indexable",id:"indexable",children:[]}],p={rightToc:i};function u(e){var r=e.components,t=Object(n.a)(e,["components"]);return Object(o.b)("wrapper",Object(a.a)({},p,t,{components:r,mdxType:"MDXLayout"}),Object(o.b)("p",null,Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"/docs/api/sdk/README"}),"@augurproject/types")," \u203a ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"/docs/api/sdk/globals"}),"Globals")," \u203a ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"/docs/api/sdk/modules/_augur_sdk_src_state_getter_zeroxordersgetters_"}),'"augur-sdk/src/state/getter/ZeroXOrdersGetters"')," \u203a ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"/docs/api/sdk/interfaces/_augur_sdk_src_state_getter_zeroxordersgetters_.zeroxorders"}),"ZeroXOrders")),Object(o.b)("h1",{id:"interface-zeroxorders"},"Interface: ZeroXOrders"),Object(o.b)("h2",{id:"hierarchy"},"Hierarchy"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("strong",{parentName:"li"},"ZeroXOrders"))),Object(o.b)("h2",{id:"indexable"},"Indexable"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},"["," ",Object(o.b)("strong",{parentName:"p"},"marketId"),": ",Object(o.b)("em",{parentName:"p"},"string"),"]",": object")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},"["," ",Object(o.b)("strong",{parentName:"p"},"outcome"),": ",Object(o.b)("em",{parentName:"p"},"number"),"]",": object")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},"["," ",Object(o.b)("strong",{parentName:"p"},"orderType"),": ",Object(o.b)("em",{parentName:"p"},"string"),"]",": object")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("p",{parentName:"li"},"["," ",Object(o.b)("strong",{parentName:"p"},"orderId"),": ",Object(o.b)("em",{parentName:"p"},"string"),"]",": ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"/docs/api/sdk/interfaces/_augur_sdk_src_state_getter_zeroxordersgetters_.zeroxorder"}),"ZeroXOrder")))))}u.isMDXComponent=!0},529:function(e,r,t){"use strict";t.d(r,"a",(function(){return b})),t.d(r,"b",(function(){return O}));var a=t(0),n=t.n(a);function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function c(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);r&&(a=a.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,a)}return t}function s(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?c(Object(t),!0).forEach((function(r){o(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):c(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function i(e,r){if(null==e)return{};var t,a,n=function(e,r){if(null==e)return{};var t,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],r.indexOf(t)>=0||(n[t]=e[t]);return n}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var p=n.a.createContext({}),u=function(e){var r=n.a.useContext(p),t=r;return e&&(t="function"==typeof e?e(r):s(s({},r),e)),t},b=function(e){var r=u(e.components);return n.a.createElement(p.Provider,{value:r},e.children)},d={inlineCode:"code",wrapper:function(e){var r=e.children;return n.a.createElement(n.a.Fragment,{},r)}},l=n.a.forwardRef((function(e,r){var t=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),b=u(t),l=a,O=b["".concat(c,".").concat(l)]||b[l]||d[l]||o;return t?n.a.createElement(O,s(s({ref:r},p),{},{components:t})):n.a.createElement(O,s({ref:r},p))}));function O(e,r){var t=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var o=t.length,c=new Array(o);c[0]=l;var s={};for(var i in r)hasOwnProperty.call(r,i)&&(s[i]=r[i]);s.originalType=e,s.mdxType="string"==typeof e?e:a,c[1]=s;for(var p=2;p<o;p++)c[p]=t[p];return n.a.createElement.apply(null,c)}return n.a.createElement.apply(null,t)}l.displayName="MDXCreateElement"}}]);