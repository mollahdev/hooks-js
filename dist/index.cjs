"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});function s(i,r,t,n){var e=arguments.length,o=e<3?r:n===null?n=Object.getOwnPropertyDescriptor(r,t):n,l;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(i,r,t,n);else for(var a=i.length-1;a>=0;a--)(l=i[a])&&(o=(e<3?l(o):e>3?l(r,t,o):l(r,t))||o);return e>3&&o&&Object.defineProperty(r,t,o),o}const u={actions:{},filters:{}},F=i=>{let r,t,n,e;for(t=1;t<i.length;t++){for(r=i[t],n=t;(e=i[n-1])&&e.priority>r.priority;)i[n]=i[n-1],--n;i[n]=r}return i},y=(i,r,t,n,e)=>{const o={callback:t,priority:n,context:e};let l=u[i][r];if(l){let a=!1;if(l.forEach(function(A){if(A.callback===t)return a=!0,!1}),a)return;l.push(o),l=F(l)}else l=[o];u[i][r]=l},v=(i,r,t,n)=>{let e,o,l;if(u[i][r])if(!t)u[i][r]=[];else if(e=u[i][r],n)for(l=e.length;l--;)o=e[l],o.callback===t&&o.context===n&&e.splice(l,1);else for(l=e.length;l--;)e[l]&&e[l].callback===t&&e.splice(l,1)};var c;(function(i){i.ACTIONS="actions",i.FILTERS="filters"})(c||(c={}));const S={addAction(i,r,t){const n=t.value;t.value=function(e,o,l=10){if(typeof e=="string"&&typeof o=="function")return n.apply(this,[e,o,parseInt(String(l))])}},doAction(i,r,t){const n=t.value;t.value=function(e,o){if(typeof e=="string"&&Object.hasOwn(u[c.ACTIONS],e))return n.apply(this,[e,o])}},removeAction(i,r,t){const n=t.value;t.value=function(e,o){if(typeof e=="string"&&typeof o=="function"&&Object.hasOwn(u[c.ACTIONS],e))return n.apply(this,[e,o])}},applyFilters(i,r,t){const n=t.value;t.value=function(e,o){if(typeof e=="string")return n.apply(this,[e,o])}},addFilter(i,r,t){const n=t.value;t.value=function(e,o,l=10){if(typeof e=="string"&&typeof o=="function")return n.apply(this,[e,o,parseInt(String(l))])}},removeFilter(i,r,t){const n=t.value;t.value=function(e,o){if(typeof e=="string"&&typeof o=="function"&&Object.hasOwn(u[c.FILTERS],e))return n.apply(this,[e,o])}}};function d(i){return S[i]}class f{addAction(r,t,n){return y(c.ACTIONS,r,t,n||10,null),u[c.ACTIONS]}doAction(r,t){return(u[c.ACTIONS][r]||[]).forEach(e=>e.callback(t)),u[c.ACTIONS]}removeAction(r,t){return v(c.ACTIONS,r,t,null),u[c.ACTIONS]}applyFilters(r,t){const n=u[c.FILTERS][r];return(n||[]).length>0&&(n||[]).forEach(e=>{e.context=t,t=e.callback(t)}),t}addFilter(r,t,n){return y(c.FILTERS,r,t,n||10,null),u[c.FILTERS]}removeFilter(r,t){return v(c.FILTERS,r,t,null),u[c.FILTERS]}}s([d("addAction")],f.prototype,"addAction",null);s([d("doAction")],f.prototype,"doAction",null);s([d("removeAction")],f.prototype,"removeAction",null);s([d("applyFilters")],f.prototype,"applyFilters",null);s([d("addFilter")],f.prototype,"addFilter",null);s([d("removeFilter")],f.prototype,"removeFilter",null);const p=new f,I=p.addAction.bind(p),O=p.doAction.bind(p),g=p.removeAction.bind(p),h=p.addFilter.bind(p),T=p.applyFilters.bind(p),_=p.removeFilter.bind(p);exports.addAction=I;exports.addFilter=h;exports.applyFilters=T;exports.default=p;exports.doAction=O;exports.removeAction=g;exports.removeFilter=_;
