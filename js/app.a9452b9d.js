(function(t){function e(e){for(var r,c,o=e[0],i=e[1],u=e[2],b=0,m=[];b<o.length;b++)c=o[b],Object.prototype.hasOwnProperty.call(a,c)&&a[c]&&m.push(a[c][0]),a[c]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(t[r]=i[r]);l&&l(e);while(m.length)m.shift()();return s.push.apply(s,u||[]),n()}function n(){for(var t,e=0;e<s.length;e++){for(var n=s[e],r=!0,o=1;o<n.length;o++){var i=n[o];0!==a[i]&&(r=!1)}r&&(s.splice(e--,1),t=c(c.s=n[0]))}return t}var r={},a={app:0},s=[];function c(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.m=t,c.c=r,c.d=function(t,e,n){c.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)c.d(n,r,function(e){return t[e]}.bind(null,r));return n},c.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(e,"a",e),e},c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],i=o.push.bind(o);o.push=e,o=o.slice();for(var u=0;u<o.length;u++)e(o[u]);var l=i;s.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"4b59":function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("7a23"),a=(n("d3b7"),n("ddb0"),{class:"text--center my-4"}),s=Object(r["i"])("Netherworld"),c=Object(r["i"])(" · "),o=Object(r["i"])("Settings"),i=Object(r["i"])(" · "),u=Object(r["i"])("Statistics"),l=Object(r["i"])(" · "),b=Object(r["i"])("About"),m={class:"text--center py-4"},f=Object(r["g"])("h1",{class:"mt-4"},"Who am I?",-1),d={class:"align-items--center justify-content--center"},p={key:0,class:"py-2"},v={class:"align-items--center justify-content--center mb-4 text--2"},g=Object(r["i"])(" Souls"),j={key:0,style:{position:"fixed",bottom:"1em",right:"1em"}};function O(t,e,n,O,h,y){var w=Object(r["z"])("router-link"),k=Object(r["z"])("fire"),$=Object(r["z"])("number-badge"),x=Object(r["z"])("router-view");return Object(r["t"])(),Object(r["f"])(r["a"],null,[Object(r["g"])("nav",a,[Object(r["j"])(w,{class:"discrete",to:"/"},{default:Object(r["E"])((function(){return[s]})),_:1}),c,Object(r["j"])(w,{class:"discrete",to:"/settings"},{default:Object(r["E"])((function(){return[o]})),_:1}),i,Object(r["j"])(w,{class:"discrete",to:"/statistics"},{default:Object(r["E"])((function(){return[u]})),_:1}),l,Object(r["j"])(w,{class:"discrete",to:"/about"},{default:Object(r["E"])((function(){return[b]})),_:1})]),Object(r["g"])("div",m,[f,Object(r["g"])("div",d,[Object(r["j"])(k,{class:"mr-4"}),t.$store.getters["values"]("prompts.current")?(Object(r["t"])(),Object(r["f"])("div",p,[(Object(r["t"])(!0),Object(r["f"])(r["a"],null,Object(r["x"])(t.$store.getters["values"]("prompts.current").text,(function(t,e){return Object(r["t"])(),Object(r["f"])("p",{key:e},[Object(r["g"])("i",null,Object(r["B"])(t),1)])})),128))])):Object(r["e"])("",!0)])]),Object(r["g"])("div",v,[t.$store.state.lifetime.souls>0?(Object(r["t"])(),Object(r["d"])($,{key:0,class:"ml-4 float--right",unit:"souls",value:parseInt(t.$store.state.current.souls)},{default:Object(r["E"])((function(){return[g]})),_:1},8,["value"])):Object(r["e"])("",!0)]),Object(r["j"])(x),t.$store.state.settings.debug?(Object(r["t"])(),Object(r["f"])("div",j,[Object(r["g"])("button",{onClick:e[0]||(e[0]=Object(r["F"])((function(e){return t.$store.commit("reset")}),["prevent"]))}," Reset ")])):Object(r["e"])("",!0)],64)}var h={version:"1.1",id:"fire",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",x:"0px",y:"0px",width:"125px",height:"189.864px",viewBox:"0 0 125 189.864","enable-background":"new 0 0 125 189.864","xml:space":"preserve"},y=Object(r["h"])('<path class="flame-main" d="M76.553,186.09c0,0-10.178-2.976-15.325-8.226s-9.278-16.82-9.278-16.82s-0.241-6.647-4.136-18.465\n      c0,0,3.357,4.969,5.103,9.938c0,0-5.305-21.086,1.712-30.418c7.017-9.333,0.571-35.654-2.25-37.534c0,0,13.07,5.64,19.875,47.54\n      c6.806,41.899,16.831,45.301,6.088,53.985"></path><path class="flame-main one" d="M61.693,122.257c4.117-15.4,12.097-14.487-11.589-60.872c0,0,32.016,10.223,52.601,63.123\n      c20.585,52.899-19.848,61.045-19.643,61.582c0.206,0.537-19.401-0.269-14.835-18.532S57.576,137.656,61.693,122.257z"></path><path class="flame-main two" d="M81.657,79.192c0,0,11.549,24.845,3.626,40.02c-7.924,15.175-21.126,41.899-0.425,64.998\n      C84.858,184.21,125.705,150.905,81.657,79.192z"></path><path class="flame-main three" d="M99.92,101.754c0,0-23.208,47.027-12.043,80.072c0,0,32.741-16.073,20.108-45.79\n      C95.354,106.319,99.92,114.108,99.92,101.754z"></path><path class="flame-main four" d="M103.143,105.917c0,0,8.927,30.753-1.043,46.868c-9.969,16.115-14.799,29.041-14.799,29.041\n      S134.387,164.603,103.143,105.917z"></path><path class="flame-main five" d="M62.049,104.171c0,0-15.645,67.588,10.529,77.655C98.753,191.894,69.033,130.761,62.049,104.171z"></path><path class="flame" d="M101.011,112.926c0,0,8.973,10.519,4.556,16.543C99.37,129.735,106.752,117.406,101.011,112.926z"></path><path class="flame one" d="M55.592,126.854c0,0-3.819,13.29,2.699,16.945C64.038,141.48,55.907,132.263,55.592,126.854z"></path><path class="flame two" d="M54.918,104.595c0,0-3.959,6.109-1.24,8.949C56.93,113.256,52.228,107.329,54.918,104.595z"></path>',9),w=[y];function k(t,e){return Object(r["t"])(),Object(r["f"])("svg",h,w)}var $=n("6b0d"),x=n.n($);const I={},P=x()(I,[["render",k]]);var F=P,S={class:"number-badge"},T={key:0,class:"unit"},C={class:"value"};function M(t,e,n,a,s,c){return Object(r["t"])(),Object(r["f"])("span",S,[n.unit?(Object(r["t"])(),Object(r["f"])("span",T,Object(r["B"])(s.unitToIcon[n.unit]),1)):Object(r["e"])("",!0),Object(r["g"])("span",C,[Object(r["i"])(Object(r["B"])(s.formatNumber(n.value||0)),1),Object(r["y"])(t.$slots,"default")])])}var _=n("7c5c");function q(t){return _["marked"].parse(t)}var D={default:new Intl.NumberFormat("en-US",{notation:"compact",minimumFractionDigits:2}),compact:new Intl.NumberFormat("en-US",{notation:"compact",minimumFractionDigits:2}),scientific:new Intl.NumberFormat("en-US",{notation:"scientific",minimumFractionDigits:2})};function z(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"default",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r="";"%"===n&&(t=100*(t-1),r=" %");var a=D[e];return a.format(t)+r}var N={props:{value:{},unit:{}},data:function(){return{unitToIcon:{souls:"⚱️",minions:"😈",occultists:"🕯️",preys:"🐇",power:"💪"},formatNumber:z}}};const V=x()(N,[["render",M]]);var B=V,E={components:{Fire:F,NumberBadge:B},data:function(){return{loop:null}},mounted:function(){var t=this,e=300;this.loop=window.setInterval((function(){t.$store.dispatch("tick",(new Date).getTime())}),e)},unmounted:function(){window.clearInverval(this.loop)}};n("b4b5");const H=x()(E,[["render",O]]);var Y=H,G=n("6c02"),A=["innerHTML"];function R(t,e,n,a,s,c){return Object(r["t"])(),Object(r["f"])("section",{class:"narrow",innerHTML:c.renderedDocument},null,8,A)}var U="# About\n\nDemonology is an incremental game I build on my spare time. This is my first game, so I'm learning a lot. It isn't stable, it will contain bugs, and your saves might become incompatible with future versions.\n\nThe game itself is free and [open-source](https://github.com/agateblue/demonology).\n\n## Credits and inspirations\n\n- [Deepak K Vijayan](https://codepen.io/2xsamurai/pen/EKpYMg) for the flame animation\n- [entropyqueen_](https://twitter.com/entropyqueen_) and [99klnd](https://www.reddit.com/r/incremental_games/comments/99klnd/tutorial_and_questions_finding_cost_cumulative/) for the math\n- [Grimoire Incremental](https://play.google.com/store/apps/details?id=com.dragonmegaliths.grimoire)",L={computed:{renderedDocument:function(){return q(U)}}};const J=x()(L,[["render",R]]);var W=J,K=(n("b0c0"),n("ac1f"),n("5319"),n("a4d3"),n("e01a"),{class:"tiny transparent px-0 pt-0 my-3"}),Q={key:0},X=Object(r["g"])("h2",null,"Legion",-1),Z={class:"stackable row"},tt=Object(r["i"])(" Hunt power"),et=Object(r["i"])(" Minions"),nt=Object(r["i"])(" Occultists"),rt={key:0,class:"my-4"},at=Object(r["g"])("thead",null,[Object(r["g"])("th",null,"Action"),Object(r["g"])("th",{class:"text--center text--monospace"},"x1"),Object(r["g"])("th",{class:"text--center text--monospace"},"x10"),Object(r["g"])("th",{class:"text--center text--monospace"},"x100")],-1),st={key:0},ct=Object(r["g"])("td",null," Turn preys into Minions ",-1),ot={key:1},it=Object(r["g"])("td",null," Turn preys into Occultists ",-1),ut={key:1},lt=Object(r["i"])(" Your legion improves your power by "),bt=Object(r["i"])(". "),mt={key:2},ft=Object(r["i"])(" Your occultists channel your legion into the mortal realm, granting you "),dt=Object(r["i"])(" every second. "),pt={key:1,class:"my-3"},vt=Object(r["g"])("h2",null,"Upgrades",-1),gt=Object(r["g"])("hr",null,null,-1),jt={class:"align-items--center justify-content--space-between"},Ot=["disabled","onClick"],ht=Object(r["i"])(" Purchase for "),yt={key:1};function wt(t,e,n,a,s,c){var o=Object(r["z"])("number-badge"),i=Object(r["z"])("purchase-button");return Object(r["t"])(),Object(r["f"])("div",null,[Object(r["g"])("section",K,[Object(r["g"])("button",{class:"fluid py-3 text--1",onClick:e[0]||(e[0]=Object(r["F"])((function(){return c.hunt&&c.hunt.apply(c,arguments)}),["prevent"]))}," Hunt some preys ")]),t.$store.state.lifetime.souls>0?(Object(r["t"])(),Object(r["f"])("section",Q,[X,Object(r["g"])("div",Z,[Object(r["j"])(o,{unit:"power",value:parseInt(t.$store.getters["values"]("hunt.power"))},{default:Object(r["E"])((function(){return[tt]})),_:1},8,["value"]),t.$store.state.current.minions>0?(Object(r["t"])(),Object(r["d"])(o,{key:0,unit:"minions",value:parseInt(t.$store.state.current.minions)},{default:Object(r["E"])((function(){return[et]})),_:1},8,["value"])):Object(r["e"])("",!0),t.$store.state.current.occultists>0?(Object(r["t"])(),Object(r["d"])(o,{key:1,unit:"occultists",value:parseInt(t.$store.state.current.occultists)},{default:Object(r["E"])((function(){return[nt]})),_:1},8,["value"])):Object(r["e"])("",!0)]),t.$store.getters["values"]("minions.enabled")||t.$store.getters["values"]("occultists.enabled")?(Object(r["t"])(),Object(r["f"])("table",rt,[at,Object(r["g"])("tbody",null,[t.$store.getters["values"]("minions.enabled")?(Object(r["t"])(),Object(r["f"])("tr",st,[ct,(Object(r["t"])(),Object(r["f"])(r["a"],null,Object(r["x"])([1,10,100],(function(e){return Object(r["g"])("td",{key:e},[Object(r["j"])(i,{class:"fluid",quantity:e,"cost-getter":t.$store.getters["values"]("minions.costGetter"),onPurchase:function(e){return t.$store.commit("purchase",{name:"minions",quantity:e.quantity,cost:e.cost})}},null,8,["quantity","cost-getter","onPurchase"])])})),64))])):Object(r["e"])("",!0),t.$store.getters["values"]("occultists.enabled")?(Object(r["t"])(),Object(r["f"])("tr",ot,[it,(Object(r["t"])(),Object(r["f"])(r["a"],null,Object(r["x"])([1,10,100],(function(e){return Object(r["g"])("td",{key:e},[Object(r["j"])(i,{class:"fluid",quantity:e,"cost-getter":t.$store.getters["values"]("occultists.costGetter"),onPurchase:function(e){return t.$store.commit("purchase",{name:"occultists",quantity:e.quantity,cost:e.cost})}},null,8,["quantity","cost-getter","onPurchase"])])})),64))])):Object(r["e"])("",!0)])])):Object(r["e"])("",!0),t.$store.state.current.minions>0?(Object(r["t"])(),Object(r["f"])("p",ut,[lt,Object(r["j"])(o,{unit:"power",value:parseInt(t.$store.getters["values"]("minions.power.total"))},null,8,["value"]),bt])):Object(r["e"])("",!0),t.$store.state.current.occultists>0?(Object(r["t"])(),Object(r["f"])("p",mt,[ft,Object(r["j"])(o,{unit:"souls",value:parseInt(t.$store.getters["values"]("occultists.perTick"))},null,8,["value"]),dt])):Object(r["e"])("",!0)])):Object(r["e"])("",!0),t.$store.getters["values"]("upgrades.enabled")?(Object(r["t"])(),Object(r["f"])("section",pt,[vt,t.$store.getters["values"]("upgrades.available").length>0?(Object(r["t"])(!0),Object(r["f"])(r["a"],{key:0},Object(r["x"])(t.$store.getters["values"]("upgrades.available"),(function(e){return Object(r["t"])(),Object(r["f"])("div",{key:e.key},[gt,Object(r["g"])("div",jt,[Object(r["g"])("strong",null,Object(r["B"])(e.name),1),Object(r["g"])("button",{disabled:t.$store.state.current.souls<e.cost,onClick:Object(r["F"])((function(n){return t.$store.commit("purchaseUpgrade",{id:e.id,cost:e.cost})}),["prevent"])},[ht,Object(r["j"])(o,{value:e.cost,unit:"souls"},null,8,["value"])],8,Ot)]),Object(r["g"])("p",null,Object(r["B"])(e.description.replace("${value}",s.formatNumber(s.getComputedValue(e.value,t.$store.getters["values"]),"compact",e.valueFormat))),1)])})),128)):(Object(r["t"])(),Object(r["f"])("p",yt,"No available upgrades. Try getting more souls."))])):Object(r["e"])("",!0)])}var kt=n("b85c"),$t=n("3835"),xt=(n("4de4"),n("2ca0"),n("159b"),n("4fad"),n("c707")),It=n.n(xt);function Pt(t){var e=t.value,n=t.modifierValue;return e+n}function Ft(t){var e=t.value,n=t.modifierValue;return e*n}function St(t){var e=t.n,n=t.base,r=t.increaseFactor;return n*Math.pow(r,e-1)}function Tt(t){var e=t.start,n=t.quantity,r=t.base,a=t.increaseFactor;if(0===e)return r*(Math.pow(a,e+n)-1)/(a-1);var s=St({n:e,base:r,increaseFactor:a});return Tt({start:0,base:s*a,quantity:n,increaseFactor:a})}var Ct={hunts:0,souls:0,minions:0,occultists:0,upgrades:[]};function Mt(t,e,n){return function(r){var a=r.state;return a[e][n]>=t}}var _t=[{text:["The sky is void, the earth is grey","You crave the body of a prey"],condition:function(t){var e=t.state;return 0===e.total.souls}},{text:["In a motion, you kill your first","A soul remains, so does your thirst"],condition:function(t){var e=t.state;return 1===e.total.souls}},{text:["You move around, spreading your doom","You find a whole world to consume"],condition:function(t){var e=t.state;return e.total.souls>1}},{text:["A prey stays still, soon a minion","Witness the birth of your legion"],condition:function(t){var e=t.get,n=t.state;return 0===n.lifetime.minions&&n.current.souls>=e("minions.cost")}},{text:["Your armies advance, relentless","Gathering souls in the process"],condition:function(t){var e=t.state;return e.lifetime.minions>0}},{text:["A new ambition eats your core:","Your nightmares need an open door"],condition:function(t){var e=t.get,n=t.state;return 0===n.lifetime.occultists&&n.current.minions>=e("occultists.cost")}},{text:["Two worlds flow into each other","Hundreds of souls roam the ether"],condition:function(t){var e=t.state;return e.lifetime.occultists>0}},{text:["Your plans shall bind a thousand slaves","Your wrath shall fill a million graves"],condition:function(t){var e=t.get;return e("hunt.power")>=1e3||e("occultists.perTick")>=1e6}},{text:["The meaning fades, Subjugator","Maybe you should come back later"],condition:function(t){var e=t.state;return e.lifetime.souls>=1e8}}],qt=It()([{id:"minions.power.1",name:"Fangs",description:"Increase minion power by ${value}",available:Mt(1,"lifetime","minions"),affects:{"minions.basePower":Pt},cost:100,value:1},{id:"minions.power.2",name:"Horns",description:"Increase minion power by ${value}",available:Mt(5,"lifetime","minions"),affects:{"minions.basePower":Pt},cost:1e3,value:2},{id:"minions.power.3",name:"Claws",description:"Increase minion power by ${value}",available:Mt(10,"lifetime","minions"),affects:{"minions.basePower":Pt},cost:5e3,value:3},{id:"minions.power.4",name:"Tails",description:"Increase minion power by ${value}",available:Mt(20,"lifetime","minions"),affects:{"minions.basePower":Pt},cost:25e3,value:5},{id:"minions.power.5",name:"Wings",description:"Increase minion power by ${value}",available:Mt(50,"lifetime","minions"),affects:{"minions.basePower":Pt},cost:125e3,value:10},{id:"hunt.power.1",name:"Hounds",description:"Increase hunt power by ${value}",available:Mt(20,"lifetime","hunts"),affects:{"hunt.power":Ft},cost:200,value:1.25,valueFormat:"%"},{id:"hunt.power.2",name:"Demonic olfaction",description:"Increase hunt power by ${value}",available:Mt(50,"lifetime","hunts"),affects:{"hunt.power":Ft},cost:1e3,value:1.5,valueFormat:"%"},{id:"hunt.power.3",name:"Silent orders",description:"Increase hunt power by ${value}",available:Mt(100,"lifetime","hunts"),affects:{"hunt.power":Ft},cost:1e4,value:2,valueFormat:"%"},{id:"occultists.power.1",name:"Hidden signs",description:"Increase occultists power by ${value}",available:Mt(1,"lifetime","occultists"),affects:{"occultists.basePower":Ft},cost:7500,value:1.25,valueFormat:"%"},{id:"occultists.power.2",name:"Dark rituals",description:"Increase occultists power by ${value}",available:Mt(2,"lifetime","occultists"),affects:{"occultists.basePower":Ft},cost:5e4,value:1.25,valueFormat:"%"},{id:"occultists.power.3",name:"Secret gathering",description:"Increase occultists power by ${value}",available:Mt(3,"lifetime","occultists"),affects:{"occultists.basePower":Ft},cost:3e5,value:2,valueFormat:"%"},{id:"occultists.synergy.1",name:"Moral support",description:"Each one of your occultists multiply your minions power by ${value}",available:Mt(4,"lifetime","occultists"),affects:{"minions.basePower":function(t){var e=t.state,n=t.value,r=t.modifierValue;return n*Math.pow(r,e.current.occultists)}},cost:5e5,value:"occultists.synergyPower",valueFormat:"%"},{id:"occultists.power.4",name:"Demonic lore",description:"Increase occultists power by ${value}",available:Mt(5,"lifetime","occultists"),affects:{"occultists.basePower":Ft},cost:2e6,value:1.5,valueFormat:"%"}],["cost"]);function Dt(t,e){return"string"===typeof t?"function"===typeof e?e(t):e[t]:t}function zt(t){var e={};return t.forEach((function(t){for(var n=0,r=Object.entries(t.affects||{});n<r.length;n++){var a=Object($t["a"])(r[n],2),s=a[0],c=a[1],o=e[s]||[];o.push({modifier:c,modifierValue:t.value}),e[s]=o}})),e}function Nt(t){var e={};function n(r){var a=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],s=e[r].value;if("upgrades.active"===r)return s;var c=n("upgrades.active"),o=zt(c);if(!a)return s;var i,u=Object(kt["a"])(o[r]||[]);try{for(u.s();!(i=u.n()).done;){var l=i.value,b=l.modifier,m=l.modifierValue;s=b({value:s,modifierValue:Dt(m,n),state:t})}}catch(f){u.e(f)}finally{u.f()}return s}for(var a={"hunt.basePower":function(){return 1},"hunt.power":function(){return n("hunt.basePower")+n("minions.power.total")},"minions.baseCost":function(){return 10},"minions.costIncreaseFactor":function(){return 1.1},"minions.basePower":function(){return 1},"minions.enabled":function(){return t.total.souls>=n("minions.baseCost")},"minions.cost":function(){return(t.lifetime.minions+1)*n("minions.baseCost")},"minions.costGetter":function(){return function(e){var r=Tt({start:t.current.minions,base:n("minions.baseCost"),increaseFactor:n("minions.costIncreaseFactor"),quantity:e});return{value:parseInt(r),unit:"souls"}}},"minions.power":function(){return n("minions.basePower")},"minions.power.total":function(){return n("minions.power")*t.current.minions},"occultists.baseCost":function(){return 30},"occultists.costIncreaseFactor":function(){return 1.3},"occultists.basePower":function(){return.5},"occultists.synergyPower":function(){return 1.1},"occultists.enabled":function(){return t.total.minions>=n("occultists.baseCost")},"occultists.cost":function(){return(t.lifetime.occultists+1)*n("occultists.baseCost")},"occultists.costGetter":function(){return function(e){var r=Tt({start:t.lifetime.occultists,base:n("occultists.baseCost"),increaseFactor:n("occultists.costIncreaseFactor"),quantity:e});return{value:parseInt(r),unit:"minions"}}},"occultists.perTick":function(){return n("minions.power.total")*t.current.occultists*n("occultists.basePower")},"prompts.available":function(){return _t.filter((function(e){return e.condition({state:t,get:n})}))},"prompts.current":function(){var t=n("prompts.available");return t[t.length-1]},"tick.duration":function(){return 1e3},"upgrades.active":function(){return qt.filter((function(e){return t.current.upgrades.indexOf(e.id)>-1}))},"upgrades.enabled":function(){if(t.current.upgrades.length>0)return!0;var e=n("upgrades.available");return 0!==e.length&&t.total.souls>=e[0].cost},"upgrades.available":function(){var e=qt.filter((function(e){return t.current.upgrades.indexOf(e.id)<0&&t.total.souls>=e.cost}));return e.filter((function(e){return e.available?e.available({state:t,get:n}):e}))}},s=0,c=Object.entries(a);s<c.length;s++){var o=Object($t["a"])(c[s],2),i=o[0],u=o[1];e[i]=Object(r["b"])(u)}return n}var Vt=["disabled"];function Bt(t,e,n,a,s,c){var o=Object(r["z"])("number-badge");return Object(r["t"])(),Object(r["f"])("button",{onClick:e[0]||(e[0]=Object(r["F"])((function(){return c.submit&&c.submit.apply(c,arguments)}),["prevent"])),disabled:!c.canPurchase},[Object(r["j"])(o,{value:c.cost.value,unit:c.cost.unit},null,8,["value","unit"])],8,Vt)}var Et={props:{costGetter:{},quantity:{}},components:{NumberBadge:B},computed:{cost:function(){return this.costGetter(this.quantity)},canPurchase:function(){return this.$store.state.current[this.cost.unit]>=this.cost.value},purchaseQuantity:function(){return this.quantity}},methods:{submit:function(){this.canPurchase&&this.$emit("purchase",{cost:this.cost,quantity:this.purchaseQuantity})}}};const Ht=x()(Et,[["render",Bt]]);var Yt=Ht,Gt={components:{NumberBadge:B,PurchaseButton:Yt},data:function(){return{formatNumber:z,getComputedValue:Dt}},methods:{hunt:function(){this.$store.commit("increment",{name:"hunts",value:1}),this.$store.commit("increment",{name:"souls",value:this.$store.getters["values"]("hunt.power")})}}};const At=x()(Gt,[["render",wt]]);var Rt=At,Ut={class:"narrow"},Lt=Object(r["g"])("h1",null,"Settings",-1),Jt={class:"checkbox field"},Wt=["checked"],Kt=Object(r["g"])("label",{for:"debug"},"Enable debug mode",-1),Qt=Object(r["g"])("hr",null,null,-1),Xt=Object(r["g"])("p",null," Reset all your progress and delete all your data. Proceed with caution, this is irreversible. You will be asked for confirmation. ",-1);function Zt(t,e,n,a,s,c){return Object(r["t"])(),Object(r["f"])("section",Ut,[Lt,Object(r["g"])("div",Jt,[Object(r["g"])("input",{id:"debug",name:"debug",type:"checkbox",onChange:e[0]||(e[0]=function(e){return t.$store.commit("setting",{name:"debug",value:e.target.checked})}),checked:t.$store.state.settings.debug},null,40,Wt),Kt]),Qt,Xt,Object(r["g"])("button",{onClick:e[1]||(e[1]=Object(r["F"])((function(){return c.triggerReset&&c.triggerReset.apply(c,arguments)}),["prevent"]))}," Hard reset ")])}var te={methods:{triggerReset:function(){window.confirm("Do you want to erase all your data and start from a blank state?")&&(this.$store.commit("hardReset"),this.$router.push("/"))}}};const ee=x()(te,[["render",Zt]]);var ne=ee,re=(n("99af"),{class:"narrow"}),ae=Object(r["g"])("h1",null,"Statistics",-1),se={class:"simple"},ce=Object(r["g"])("th",null,null,-1),oe=["colspan"],ie=["colspan"],ue={class:"monospace text--right"},le={key:0},be=["onSubmit"],me=["value"],fe=Object(r["g"])("button",{class:"display--inline-block text--center",type:"submit"},"Set",-1);function de(t,e,n,a,s,c){return Object(r["t"])(),Object(r["f"])("section",re,[ae,Object(r["g"])("table",se,[Object(r["g"])("thead",null,[ce,t.$store.state.settings.debug?(Object(r["t"])(),Object(r["f"])("th",{key:0,colspan:t.$store.state.settings.debug?2:1},"Current",8,oe)):Object(r["e"])("",!0),Object(r["g"])("th",{colspan:t.$store.state.settings.debug?2:1},"Lifetime",8,ie)]),Object(r["g"])("tbody",null,[(Object(r["t"])(!0),Object(r["f"])(r["a"],null,Object(r["x"])(s.stats,(function(e,n,a,o){var i=[e.id,c.getValue(e,"current"),c.getValue(e,"lifetime")];if(o&&o.key===e.label&&Object(r["o"])(o,i))return o;var u=(Object(r["t"])(),Object(r["f"])("tr",{key:e.label},[Object(r["g"])("td",null,Object(r["B"])(e.label),1),(Object(r["t"])(!0),Object(r["f"])(r["a"],null,Object(r["x"])(c.columns,(function(n){return Object(r["t"])(),Object(r["f"])(r["a"],{key:n},[Object(r["g"])("td",ue,Object(r["B"])(c.getValue(e,n)),1),t.$store.state.settings.debug?(Object(r["t"])(),Object(r["f"])("td",le,[e.getter?Object(r["e"])("",!0):(Object(r["t"])(),Object(r["f"])("form",{key:0,onSubmit:Object(r["F"])((function(t){return c.setStat(e,n)}),["prevent"]),class:"stackable row"},[Object(r["g"])("input",{type:"text",style:{"min-width":"80px","text-align":"right"},value:s.values[n][e.name],ref_for:!0,ref:"input-".concat(n,"-").concat(e.name)},null,8,me),fe],40,be))])):Object(r["e"])("",!0)],64)})),128))]));return u.memo=i,u}),e,0),128))])])])}n("a9e3");var pe={data:function(){return{stats:[{name:"hunts",label:"Hunts"},{name:"souls",label:"Souls"},{name:"minions",label:"Minions"},{name:"occultists",label:"Occultists"},{name:"upgrades",label:"Purchased upgrades",getter:function(t){return t.length}}],values:{current:{},lifetime:{},total:{}}}},computed:{columns:function(){var t=["lifetime"];return this.$store.state.settings.debug&&t.unshift("current"),t}},methods:{getValue:function(t,e){var n,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"default",a=this.$store.state[e][t.name];return n=t.getter?t.getter(a):z(parseInt(a),r),void 0===this.values[e][t.name]&&(this.values[e][t.name]=z(parseInt(a),"scientific")),n},setStat:function(t,e){var n=this.$refs["input-".concat(e,"-").concat(t.name)][0],r=n.value;r=Number(n.value),this.$store.commit("setFromDebug",{namespace:e,name:t.name,value:r})}}};const ve=x()(pe,[["render",de]]);var ge=ve,je=[{path:"/",name:"Home",component:Rt},{path:"/settings",name:"Settings",component:ne},{path:"/about",name:"About",component:W},{path:"/statistics",name:"Statistics",component:ge}],Oe=Object(G["a"])({history:Object(G["b"])(),routes:je}),he=Oe,ye=n("2909"),we=n("5530"),ke=(n("e9c4"),n("5502")),$e=n("bfa9"),xe=n("0f32"),Ie=n.n(xe),Pe=n("eed6"),Fe=n.n(Pe);function Se(t,e){var n=e.name,r=e.value;t.current[n]+=r,t.lifetime[n]+=r,t.total[n]+=r}function Te(){return{time:{gameStart:(new Date).getTime(),lifetimeStart:(new Date).getTime(),lastTick:(new Date).getTime()},current:Object(we["a"])({},Ct),lifetime:Object(we["a"])({},Ct),total:Object(we["a"])({},Ct),settings:{notation:"default",debug:!1}}}var Ce={increment:function(t,e){var n=e.name,r=e.value;Se(t,{name:n,value:r})},lastTick:function(t,e){t.time.lastTick=e},reset:function(t){t.current=Object(we["a"])({},Ct),t.lifetime=Object(we["a"])({},Ct),t.total=Object(we["a"])({},Ct)},hardReset:function(t){Object.assign(t,Te())},setting:function(t,e){var n=e.name,r=e.value;t.settings[n]=r},purchase:function(t,e){var n=e.name,r=e.quantity,a=e.cost,s=t.current[a.unit];s<a.value?console.warn("Cannot purchase ".concat(r," ").concat(n," for ").concat(a,": only ").concat(s," available")):(t.current[a.unit]-=a.value,Se(t,{name:n,value:r}))},purchaseUpgrade:function(t,e){var n=e.id,r=e.cost;if(t.current.upgrades.indexOf(n)>-1)console.warn("Upgrade ".concat(n," already purchased"));else{var a=t.current.souls;a<r?console.warn("Cannot purchase upgrade ".concat(n," for ").concat(r,": only ").concat(a," available")):(t.current.souls-=r,t.current.upgrades=Fe()([].concat(Object(ye["a"])(t.current.upgrades),[n])),t.lifetime.upgrades=Fe()([].concat(Object(ye["a"])(t.lifetime.upgrades),[n])),t.total.upgrades=Fe()([].concat(Object(ye["a"])(t.total.upgrades),[n])))}},setFromDebug:function(t,e){var n=e.namespace,r=e.name,a=e.value;t[n][r]=a}},Me={tick:function(t,e){var n=t.state,r=t.commit,a=t.getters,s=e-n.time.lastTick,c=s/a.values("tick.duration");if(c>0&&a.values("occultists.perTick")>0){var o=a.values("occultists.perTick")*c;r("increment",{name:"souls",value:o})}r("lastTick",e)}},_e=Object(ke["a"])({state:Object(we["a"])({},Te()),mutations:Ce,actions:Me,getters:{values:function(){return function(t){return qe(t)}}},plugins:[new $e["a"]({reducer:function(t){return{current:t.current,lifetime:t.lifetime,total:t.total,settings:t.settings,time:t.time}},saveState:Ie()((function(t,e,n){n[t]=JSON.stringify(e)}),3e3)}).plugin]}),qe=Nt(_e.state),De=_e;Object(r["c"])(Y).use(De).use(he).mount("#app")},b4b5:function(t,e,n){"use strict";n("4b59")}});
//# sourceMappingURL=app.a9452b9d.js.map