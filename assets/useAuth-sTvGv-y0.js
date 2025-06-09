import{r as a,p as d}from"./chunk-XJI4KG32-C1vvKahF.js";import{u as g}from"./state-CNeEXuqY.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),w=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,r,o)=>o?o.toUpperCase():r.toLowerCase()),c=e=>{const t=w(e);return t.charAt(0).toUpperCase()+t.slice(1)},u=(...e)=>e.filter((t,r,o)=>!!t&&t.trim()!==""&&o.indexOf(t)===r).join(" ").trim();/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var h={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=a.forwardRef(({color:e="currentColor",size:t=24,strokeWidth:r=2,absoluteStrokeWidth:o,className:n="",children:s,iconNode:l,...i},m)=>a.createElement("svg",{ref:m,...h,width:t,height:t,stroke:e,strokeWidth:o?Number(r)*24/Number(t):r,className:u("lucide",n),...i},[...l.map(([p,f])=>a.createElement(p,f)),...Array.isArray(s)?s:[s]]));/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=(e,t)=>{const r=a.forwardRef(({className:o,...n},s)=>a.createElement(A,{ref:s,iconNode:t,className:u(`lucide-${C(c(e))}`,`lucide-${e}`,o),...n}));return r.displayName=c(e),r};function x(){const{loggedIn:e}=g(),t=d();return a.useEffect(()=>{e||t("/login",{replace:!0})},[e,t]),e}export{k as c,x as u};
