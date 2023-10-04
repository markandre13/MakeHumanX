var makehuman=function(t){"use strict";function e(t,e,i,s){return new(i||(i=Promise))((function(o,n){function a(t){try{l(s.next(t))}catch(t){n(t)}}function r(t){try{l(s.throw(t))}catch(t){n(t)}}function l(t){var e;t.done?o(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(a,r)}l((s=s.apply(t,e||[])).next())}))}"function"==typeof SuppressedError&&SuppressedError;class i{constructor(t,e){this.object=t,this.attribute=e.toString()}get(){return this.object[this.attribute]}set(t){Object.defineProperty(this.object,this.attribute,{value:t})}toString(){return`${this.object[this.attribute]}`}fromString(t){const e=typeof this.object[this.attribute];let i;switch(e){case"string":i=t;break;case"number":i=Number.parseFloat(t);break;default:throw Error(`Reference.fromString() isn't yet supported for type ${e}`)}Object.defineProperty(this.object,this.attribute,{value:i})}}function s(t,e){return new i(t,e)}class o extends Array{constructor(t){super(...t?.children);for(let t=0;t<this.length;++t){const e=this[t];"string"==typeof e&&(this[t]=document.createTextNode(e))}}replaceIn(t){t.replaceChildren(...this)}appendTo(t){for(let e of this)t.appendChild(e)}}function n(t,e,i){return void 0!==e&&void 0!==e.children&&(e.children=[e.children]),a(t,e)}function a(t,e,i){let s;if("string"!=typeof t)return new t(e);const o=t;switch(o){case"svg":case"line":case"rect":case"circle":case"path":case"text":s="http://www.w3.org/2000/svg";break;default:s="http://www.w3.org/1999/xhtml"}const n=document.createElementNS(s,o);return r(n,e,s),n}function r(t,e,i){if(null!=e){for(let[s,o]of Object.entries(e))switch(s){case"children":break;case"action":t.setAction(o);break;case"model":t.setModel(o);break;case"class":t.classList.add(o);break;case"style":for(let[e,i]of Object.entries(o)){const s=/[A-Z]/g;e=e.replace(s,(t=>"-"+t.toLowerCase())),"number"==typeof i&&(i=`${i}`),t.style.setProperty(e,i)}break;case"set":Object.defineProperty(e.set.object,e.set.attribute,{value:t});break;default:if("on"===s.substring(0,2))t.addEventListener(s.substring(2),o);else if("string"==typeof o||"number"==typeof o||"boolean"==typeof o){if("http://www.w3.org/2000/svg"===i){const t=/[A-Z]/g;s=s.replace(t,(t=>"-"+t.toLowerCase()))}t.setAttributeNS(null,s,`${o}`)}}void 0!==e.children&&l(t,e.children)}}function l(t,e){for(const i of e)i instanceof Array?l(t,i):"string"!=typeof i?t.appendChild(i):t.appendChild(document.createTextNode(i))}class h{constructor(t,e){this.callback=t,this.id=e}}class d{constructor(){this.locked=!1,this.busy=!1}add(t,e){this.callbacks||(this.callbacks=new Array),this.callbacks.push(new h(t,e))}remove(t){if(this.callbacks)for(let e=this.callbacks.length-1;e>=0;--e)this.callbacks[e].id===t&&this.callbacks.splice(e,1)}count(){return this.callbacks?this.callbacks.length:0}lock(){this.locked=!0}unlock(){if(this.locked=!1,this.triggered){let t=this.triggered.data;this.triggered=void 0,this.trigger(t)}}withLock(t){this.lock();const e=t();return this.unlock(),e}trigger(t){if(this.busy)return;if(this.busy=!0,this.locked)return this.triggered={data:t},void(this.busy=!1);if(!this.callbacks)return void(this.busy=!1);let e;for(let i=0;i<this.callbacks.length;++i)try{this.callbacks[i].callback(t)}catch(t){e=t}if(this.busy=!1,void 0!==e)throw e}}var c,u,p;!function(t){t[t.ALL=0]="ALL",t[t.VALUE=1]="VALUE",t[t.ENABLED=2]="ENABLED",t[t.COLOR=3]="COLOR",t[t.LABEL=4]="LABEL",t[t.DESCRIPTION=5]="DESCRIPTION",t[t.ERROR=6]="ERROR",t[t.MAX_REASON=7]="MAX_REASON"}(c||(c={}));class g{constructor(t){this.modified=new d,this.options=t}set enabled(t){this.options?.enabled!==t&&(void 0===this.options&&(this.options={}),this.options.enabled=t,this.modified.trigger(c.ENABLED))}get enabled(){return!1!==this.options?.enabled}set color(t){this.options?.color!==t&&(void 0===this.options&&(this.options={}),this.options.color=t,this.modified.trigger(c.COLOR))}get color(){return this.options?.color}set label(t){this.options?.label!==t&&(void 0===this.options&&(this.options={}),this.options.label=t,this.modified.trigger(c.LABEL))}get label(){return this.options?.label}set description(t){this.options?.description!==t&&(void 0===this.options&&(this.options={}),this.options.description=t,this.modified.trigger(c.DESCRIPTION))}get description(){return this.options?.description}set error(t){this.options?.error!==t&&(void 0===this.options&&(this.options={}),this.options.error=t,this.modified.trigger(c.ERROR))}get error(){return this.options?.error}}!function(t){t[t.DEFAULT=7]="DEFAULT",t[t.MAX_REASON=8]="MAX_REASON"}(u||(u={}));class f extends g{constructor(t,e){super(e),this._value=t}set value(t){this._value!==t&&(this._value=t,this.modified.trigger(c.VALUE))}get value(){return this._value}set default(t){this.options?.default!==t&&(void 0===this.options&&(this.options={}),this.options.default=t,this.modified.trigger(u.DEFAULT))}get default(){return this.options?.default}}class m{constructor(t){if(this._n=0n,t instanceof m)return t;let[e,i]=String(t).split(".").concat("");this._n=BigInt(e+i.padEnd(m.DECIMALS,"0").slice(0,m.DECIMALS))+BigInt(m.ROUNDED&&i[m.DECIMALS]>="5")}static fromBigInt(t){return Object.assign(Object.create(m.prototype),{_n:t})}add(t){return m.fromBigInt(this._n+new m(t)._n)}sub(t){return m.fromBigInt(this._n-new m(t)._n)}static _divRound(t,e){return m.fromBigInt(t/e+(m.ROUNDED?2n*t/e%2n:0n))}mul(t){return m._divRound(this._n*new m(t)._n,m.SHIFT)}div(t){return m._divRound(this._n*m.SHIFT,new m(t)._n)}toString(){const t=this._n.toString().padStart(m.DECIMALS+1,"0");return t.slice(0,-m.DECIMALS)+"."+t.slice(-m.DECIMALS).replace(/\.?0+$/,"")}}m.DECIMALS=18,m.ROUNDED=!0,m.SHIFT=BigInt("1"+"0".repeat(m.DECIMALS));class x{constructor(t){this.value=t}eval(t){if("number"==typeof this.value)return this.value;if(this.value instanceof Array){if(void 0===t)throw Error(`yikes: no model to get cell [${this.value[0]},${this.value[1]}]`);return t.getCell(this.value[0],this.value[1])._calculatedValue}switch(this.value){case"+":return this.down.eval(t)+this.down.next.eval(t);case"-":return this.down?.next?this.down.eval(t)-this.down.next.eval(t):-this.down.eval(t);case"*":return this.down.eval(t)*this.down.next.eval(t);case"/":return this.down.eval(t)/this.down.next.eval(t);default:throw Error(`unexpected token '${this.value}'`)}}append(t){if(void 0===this.down)this.down=t;else{let e=this.down;for(;e.next;)e=e.next;e.next=t}}dependencies(t=[]){return this.value instanceof Array&&t.push(this.value),this.next&&this.next.dependencies(t),this.down&&this.down.dependencies(t),t}toString(){return this._toString()}_toString(t="\n",e=0){for(let i=0;i<e;++i)t+="    ";t+=this.value,t+="\n";for(let i=this.down;i;i=i.next)t=i._toString(t,e+1);return t}}class v{constructor(t){this.i=0,this.stack=[],this.str=t}isspace(t){return" "==t||"\n"==t||"\r"==t||"\t"==t||"\t"==t}isnumber(t){const e=t.charCodeAt(0);return e>=48&&e<=57}isalpha(t){const e=t.charCodeAt(0);return e>=65&&e<=90||e>=145&&e<=122}isalnum(t){return this.isnumber(t)||this.isalpha(t)}unlex(t){this.stack.push(t)}lex(){if(this.stack.length>0)return this.stack.pop();let t=0,e=0,i=0;if(this.i>=this.str.length)return;const s=this.i;for(;;){let o=this.str.at(this.i);switch(i){case 0:if(void 0===o)return;if(this.isspace(o)){++this.i;break}if(this.isnumber(o)){++this.i,i=1;break}if(this.isalpha(o)){t=0,i=3;break}switch(o){case"+":case"-":case"*":case"/":case"(":case")":case"=":return++this.i,new x(o)}return;case 1:if(void 0!==o&&this.isnumber(o)){++this.i;break}if("."===o||"e"==o||"E"==o){++this.i,i=2;break}return new x(parseFloat(this.str.substring(s,this.i)));case 2:if(void 0!==o&&this.isnumber(o)){++this.i;break}return new x(parseFloat(this.str.substring(s,this.i)));case 3:if(void 0!==o){const s=o.charCodeAt(0);if(s>=48&&s<=57){e=s-48,i=4,++this.i;break}if(s>=65&&s<=90){t*=26,t+=s-64,++this.i;break}if(s>=145&&s<=122){t*=26,t+=s-144,++this.i;break}}return new x(this.str.substring(s,this.i));case 4:if(void 0!==o){const t=o.charCodeAt(0);if(t>=48&&t<=57){e*=10,e+=t-48,++this.i;break}}return new x([t-1,e-1])}}}}function b(t){const e=y(t);if(void 0===e)return;const i=t.lex();if(void 0===i)return e;if("+"===i.value||"-"===i.value){const s=b(t);return void 0===s?(t.unlex(i),e):(i.append(e),i.append(s),i)}return t.unlex(i),e}function y(t){const e=w(t);if(void 0===e)return;const i=t.lex();if(void 0===i)return e;if("*"===i.value||"/"===i.value){const s=y(t);if(void 0===s)throw Error(`expexted expression after ${i.value}`);return i.append(e),i.append(s),i}return t.unlex(i),e}function w(t){const e=t.lex();if(void 0!==e){if("number"==typeof e.value)return e;if(e.value instanceof Array)return e;if("("===e.value){const e=b(t);if(void 0===e)throw Error("Unexpected end after '(");const i=t.lex();if(")"!==i?.value)throw Error("Excepted ')");return e}if("-"===e.value){const i=w(t);if(void 0!==i)return e.append(i),e}t.unlex(e)}}!function(t){t[t.MIN=8]="MIN",t[t.MAX=9]="MAX",t[t.STEP=10]="STEP",t[t.AUTOCORRECT=11]="AUTOCORRECT",t[t.MAX_REASON=12]="MAX_REASON"}(p||(p={}));class C extends f{constructor(t,e){super(t,e)}increment(){if(void 0!==this.step){const t=new m(this.value),e=new m(this.step);super.value=this.clip(parseFloat(t.add(e).toString()))}}decrement(){if(void 0!==this.step){const t=new m(this.value),e=new m(this.step);super.value=this.clip(parseFloat(t.sub(e).toString()))}}set value(t){let e;if("string"==typeof t){const i=b(new v(t));e=i.eval()}else e=t;this.modified.withLock((()=>{this.autocorrect?super.value=this.clip(e):(super.value=e,this.error=this.check(e))}))}get value(){return super.value}set min(t){this.options?.min!==t&&(void 0===this.options&&(this.options={}),this.options.min=t,this.modified.trigger(p.MIN))}get min(){return this.options?.min}set max(t){this.options?.max!==t&&(void 0===this.options&&(this.options={}),this.options.max=t,this.modified.trigger(p.MAX))}get max(){return this.options?.max}set step(t){this.options?.step!==t&&(void 0===this.options&&(this.options={}),this.options.step=t,this.modified.trigger(p.STEP))}get step(){return this.options?.step}set autocorrect(t){this.options?.autocorrect!==t&&(void 0===this.options&&(this.options={}),this.options.autocorrect=t,this.modified.trigger(p.AUTOCORRECT))}get autocorrect(){return!0===this.options?.autocorrect}clip(t){return void 0!==this.min&&t<this.min&&(t=this.min),void 0!==this.max&&t>this.max&&(t=this.max),t}check(t){if(void 0!==this.min&&t<this.min)return`The value must not be below ${this.min}.`;if(void 0!==this.max&&t>this.max){if(!this.autocorrect)return`The value must not be above ${this.max}.`;t=this.max}}}class k{constructor(){this.modified=new d,this.age=new C(.5,{min:0,max:1,step:.05}),this.gender=new C(.5,{min:0,max:1,step:.05}),this.weight=new C(.5,{min:0,max:1,step:.05}),this.muscle=new C(.5,{min:0,max:1,step:.05}),this.height=new C(.5,{min:0,max:1,step:.05}),this.breastSize=new C(.5,{min:0,max:1,step:.05}),this.breastFirmness=new C(.5,{min:0,max:1,step:.05}),this.bodyProportions=new C(.5,{min:0,max:1,step:.05}),this.caucasianVal=new C(1/3,{min:0,max:1,step:.05}),this.asianVal=new C(1/3,{min:0,max:1,step:.05}),this.africanVal=new C(1/3,{min:0,max:1,step:.05}),this.maleVal=new C(0),this.femaleVal=new C(0),this.oldVal=new C(0),this.babyVal=new C(0),this.youngVal=new C(0),this.childVal=new C(0),this.maxweightVal=new C(0),this.minweightVal=new C(0),this.averageweightVal=new C(0),this.maxmuscleVal=new C(0),this.minmuscleVal=new C(0),this.averagemuscleVal=new C(0),this.maxheightVal=new C(0),this.minheightVal=new C(0),this.averageheightVal=new C(0),this.maxcupVal=new C(0),this.mincupVal=new C(0),this.averagecupVal=new C(0),this.maxfirmnessVal=new C(0),this.minfirmnessVal=new C(0),this.averagefirmnessVal=new C(0),this.idealproportionsVal=new C(0),this.uncommonproportionsVal=new C(0),this.regularproportionsVal=new C(0),this.flag=!1,this._setDependendValues(),this.gender.modified.add((()=>this._setGenderVals())),this.age.modified.add((()=>this._setAgeVals())),this.muscle.modified.add((()=>this._setMuscleVals())),this.weight.modified.add((()=>this._setWeightVals())),this.height.modified.add((()=>this._setHeightVals())),this.breastSize.modified.add((()=>this._setBreastSizeVals())),this.breastFirmness.modified.add((()=>this._setBreastFirmnessVals())),this.bodyProportions.modified.add((()=>this._setBodyProportionVals())),this.africanVal.modified.add((()=>this._setEthnicVals("African"))),this.asianVal.modified.add((()=>this._setEthnicVals("Asian"))),this.caucasianVal.modified.add((()=>this._setEthnicVals("Caucasian"))),this.modifiers=new Map,this.modifierGroups=new Map,this.targetsDetailStack=new Map}getModifier(t){return this.modifiers.get(t)}getModifiersByGroup(t){const e=this.modifierGroups.get(t);return void 0===e?(console.log(`Modifier group ${t} does not exist.`),[]):e}addModifier(t){if(this.modifiers.has(t.fullName))throw Error(`Modifier with name ${t.fullName} is already attached to human.`);this.modifiers.set(t.fullName,t),this.modifierGroups.has(t.groupName)||this.modifierGroups.set(t.groupName,new Array),this.modifierGroups.get(t.groupName).push(t)}setDetail(t,e){void 0!==e?this.targetsDetailStack.set(t,e):this.targetsDetailStack.delete(t)}getDetail(t){let e=this.targetsDetailStack.get(t);return void 0===e&&(e=0),e}setDefaultValues(){this.age.value=.5,this.gender.value=.5,this.weight.value=.5,this.muscle.value=.5,this.height.value=.5,this.breastSize.value=.5,this.breastFirmness.value=.5,this.bodyProportions.value=.5,this.caucasianVal.value=1/3,this.asianVal.value=1/3,this.africanVal.value=1/3,this._setDependendValues()}_setDependendValues(){this._setGenderVals(),this._setAgeVals(),this._setWeightVals(),this._setMuscleVals(),this._setHeightVals(),this._setBreastSizeVals(),this._setBreastFirmnessVals(),this._setBodyProportionVals()}_setGenderVals(){this.maleVal.value=this.gender.value,this.femaleVal.value=1-this.gender.value}_setAgeVals(){this.age.value<.5?(this.oldVal.value=0,this.babyVal.value=Math.max(0,1-5.333*this.age.value),this.youngVal.value=Math.max(0,3.2*(this.age.value-.1875)),this.childVal.value=Math.max(0,Math.min(1,5.333*this.age.value)-this.youngVal.value)):(this.childVal.value=0,this.babyVal.value=0,this.oldVal.value=Math.max(0,2*this.age.value-1),this.youngVal.value=1-this.oldVal.value)}_setWeightVals(){this.maxweightVal.value=Math.max(0,2*this.weight.value-1),this.minweightVal.value=Math.max(0,1-2*this.weight.value),this.averageweightVal.value=1-(this.maxweightVal.value+this.minweightVal.value)}_setMuscleVals(){this.maxmuscleVal.value=Math.max(0,2*this.muscle.value-1),this.minmuscleVal.value=Math.max(0,1-2*this.muscle.value),this.averagemuscleVal.value=1-(this.maxmuscleVal.value+this.minmuscleVal.value)}_setHeightVals(){this.maxheightVal.value=Math.max(0,2*this.height.value-1),this.minheightVal.value=Math.max(0,1-2*this.height.value),this.maxheightVal.value>this.minheightVal.value?this.averageheightVal.value=1-this.maxheightVal.value:this.averageheightVal.value=1-this.minheightVal.value}_setBreastSizeVals(){this.maxcupVal.value=Math.max(0,2*this.breastSize.value-1),this.mincupVal.value=Math.max(0,1-2*this.breastSize.value),this.maxcupVal.value>this.mincupVal.value?this.averagecupVal.value=1-this.maxcupVal.value:this.averagecupVal.value=1-this.mincupVal.value}_setBreastFirmnessVals(){this.maxfirmnessVal.value=Math.max(0,2*this.breastFirmness.value-1),this.minfirmnessVal.value=Math.max(0,1-2*this.breastFirmness.value),this.maxfirmnessVal.value>this.minfirmnessVal.value?this.averagefirmnessVal.value=1-this.maxfirmnessVal.value:this.averagefirmnessVal.value=1-this.minfirmnessVal.value}_setBodyProportionVals(){this.idealproportionsVal.value=Math.max(0,2*this.bodyProportions.value-1),this.uncommonproportionsVal.value=Math.max(0,1-2*this.bodyProportions.value),this.idealproportionsVal>this.uncommonproportionsVal?this.regularproportionsVal.value=1-this.idealproportionsVal.value:this.regularproportionsVal.value=1-this.uncommonproportionsVal.value}_setEthnicVals(t){this.flag||(this.flag=!0,this.africanVal.modified.lock(),this.asianVal.modified.lock(),this.caucasianVal.modified.lock(),this._setEthnicValsCore(t),this.africanVal.modified.unlock(),this.asianVal.modified.unlock(),this.caucasianVal.modified.unlock(),this.flag=!1)}_setEthnicValsCore(t){let e=1,i=0;"African"!==t?i+=this.africanVal.value:e-=this.africanVal.value,"Asian"!==t?i+=this.asianVal.value:e-=this.asianVal.value,"Caucasian"!==t?i+=this.caucasianVal.value:e-=this.caucasianVal.value,0===i?void 0===t?(this.caucasianVal.value=1/3,this.asianVal.value=1/3,this.africanVal.value=1/3):Math.abs(e)<.001?(this.africanVal.value="African"!==t?1:0,this.asianVal.value="Asian"!==t?1:0,this.caucasianVal.value="Caucasian"!==t?1:0):("African"!==t&&(this.africanVal.value=.01),"Asian"!==t&&(this.asianVal.value=.01),"Caucasian"!==t&&(this.caucasianVal.value=.01),this._setEthnicValsCore(t)):("African"!==t&&(this.africanVal.value=e*this.africanVal.value/i),"Asian"!==t&&(this.asianVal.value=e*this.asianVal.value/i),"Caucasian"!==t&&(this.caucasianVal.value=e*this.caucasianVal.value/i))}updateProxyMesh(t=!1){this.modified.trigger()}}class _{constructor(t){this.data=t,this.index=0}next(){if(0===this.data.length||-1===this.index)return{value:void 0,done:!0};const t=this.data.indexOf("\n",this.index);let e;e=-1===t?void 0:t-this.index;const i=this.data.substr(this.index,e);return this.index=-1===t?-1:t+1,{value:i,done:!1}}}class E{constructor(t){this.data=t}[Symbol.iterator](){return new _(this.data)}}class S{static setInstance(t){S.instance=t}static readFile(t){return S.instance.readFile(t)}static exists(t){return S.instance.exists(t)}static isFile(t){return S.instance.isFile(t)}static isDir(t){return S.instance.isDir(t)}static listDir(t){return S.instance.listDir(t)}static realPath(t){return S.instance.realPath(t)}static joinPath(t,e){return S.instance.joinPath(t,e)}}class A{constructor(){this.verts=new Array,this.data=new Array}load(t){const e=S.readFile(t),i=new E(e);for(let t of i){if(t=t.trim(),0===t.length)continue;if("#"===t[0])continue;const e=t.split(/\s+/);this.data.push(parseInt(e[0],10)),this.verts.push(parseFloat(e[1])),this.verts.push(parseFloat(e[2])),this.verts.push(parseFloat(e[3]))}}apply(t,e){let i=0,s=0;for(;i<this.data.length;){let o=3*this.data[i++];t[o++]+=this.verts[s++]*e,t[o++]+=this.verts[s++]*e,t[o++]+=this.verts[s++]*e}}}const H={gender:["male","female"],age:["baby","child","young","old"],race:["caucasian","asian","african"],muscle:["maxmuscle","averagemuscle","minmuscle"],weight:["minweight","averageweight","maxweight"],height:["minheight","averageheight","maxheight"],breastsize:["mincup","averagecup","maxcup"],breastfirmness:["minfirmness","averagefirmness","maxfirmness"],bodyproportions:["uncommonproportions","regularproportions","idealproportions"]},M=new Array,T=new Map;for(const t in H)if(H.hasOwnProperty(t)){M.push(t);for(const e of H[t])T.set(e,t)}class R{constructor(t){this.parent=t,void 0===t?(this.key=new Array,this.data=new Map):(this.key=t.key.slice(),this.data=new Map(t.data))}isRoot(){return void 0===this.parent}createChild(){return new R(this)}update(t){const e=T.get(t);void 0!==e?this.setData(e,t):"target"!==t&&this.addKey(t)}tuple(){let t="";for(const e of this.key)0!==t.length&&(t+="-"),t+=e;return t}getVariables(){const t=[];for(const[e,i]of this.data.entries())void 0!==i&&t.push(i);return t}addKey(t){this.key.push(t)}setData(t,e){this.data=new Map(this.data);const i=this.data.get(t);if(void 0===i)this.data.set(t,e);else if(i!==e)throw Error(`Component category ${t} can not be set to ${e} as it is already been set to ${i}`)}finish(t){this.path=t;for(const t of M)this.data.has(t)||this.data.set(t,void 0)}}class N{constructor(){this.rootComponent=new R,this.images=new Map,this.targets=new Array,this.groups=new Map,this.index=new Map,this.loadTargetDirectory(),console.log(`Loaded target directory: ${this.targets.length} targets, ${this.groups.size} groups, ${this.index.size} indizes, ${this.images.size} images`)}static getInstance(){return void 0===N.instance&&(N.instance=new N),N.instance}loadTargetDirectory(){this.walkTargets("",this.rootComponent),this.buildIndex()}findTargets(t){if(!this.index.has(t))return[];const e=new Array;for(const i of this.index.get(t))i instanceof R?e.push(i):e.concat(this.findTargets(i));return e}getTargetsByGroup(t){return this.groups.get(t)}walkTargets(t,e){const i=S.realPath(t),s=S.listDir(i).sort();for(const o of s){const s=S.joinPath(i,o);if(S.isFile(s)&&!s.toLowerCase().endsWith(".target"))s.toLowerCase().endsWith(".png")&&this.images.set(o.toLowerCase(),s);else{const i=e.createChild(),n=o.replace("_","-").replace(".","-").split("-");for(const t of n.entries())0===t[0]&&"targets"===t[1]||i.update(t[1]);if(S.isDir(s)){const e=S.joinPath(t,o);this.walkTargets(e,i)}else{i.finish(`data/${t}/${o}`),this.targets.push(i);const e=i.tuple();let s=this.groups.get(e);void 0===s&&(s=new Array,this.groups.set(e,s)),s.push(i)}}}}buildIndex(){for(const t of this.targets){this.index.has(t.tuple())||this.index.set(t.tuple(),[]),this.index.get(t.tuple()).push(t);let e=t;for(;void 0!==e.parent;){const t=e.parent;this.index.has(t.tuple())||this.index.set(t.tuple(),new Array),e.tuple()===t.tuple()||this.index.get(t.tuple()).includes(e.tuple())||this.index.get(t.tuple()).push(e.tuple()),e=t}}}}const $=new Map;var L=1e-6,I="undefined"!=typeof Float32Array?Float32Array:Array;function D(){var t=new I(9);return I!=Float32Array&&(t[1]=0,t[2]=0,t[3]=0,t[5]=0,t[6]=0,t[7]=0),t[0]=1,t[4]=1,t[8]=1,t}function B(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=0,t[8]=1,t}function z(){var t=new I(16);return I!=Float32Array&&(t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0),t[0]=1,t[5]=1,t[10]=1,t[15]=1,t}function V(t,e,i,s,o,n,a,r,l,h,d,c,u,p,g,f){var m=new I(16);return m[0]=t,m[1]=e,m[2]=i,m[3]=s,m[4]=o,m[5]=n,m[6]=a,m[7]=r,m[8]=l,m[9]=h,m[10]=d,m[11]=c,m[12]=u,m[13]=p,m[14]=g,m[15]=f,m}function O(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function P(t,e){var i=e[0],s=e[1],o=e[2],n=e[3],a=e[4],r=e[5],l=e[6],h=e[7],d=e[8],c=e[9],u=e[10],p=e[11],g=e[12],f=e[13],m=e[14],x=e[15],v=i*r-s*a,b=i*l-o*a,y=i*h-n*a,w=s*l-o*r,C=s*h-n*r,k=o*h-n*l,_=d*f-c*g,E=d*m-u*g,S=d*x-p*g,A=c*m-u*f,H=c*x-p*f,M=u*x-p*m,T=v*M-b*H+y*A+w*S-C*E+k*_;return T?(T=1/T,t[0]=(r*M-l*H+h*A)*T,t[1]=(o*H-s*M-n*A)*T,t[2]=(f*k-m*C+x*w)*T,t[3]=(u*C-c*k-p*w)*T,t[4]=(l*S-a*M-h*E)*T,t[5]=(i*M-o*S+n*E)*T,t[6]=(m*y-g*k-x*b)*T,t[7]=(d*k-u*y+p*b)*T,t[8]=(a*H-r*S+h*_)*T,t[9]=(s*S-i*H-n*_)*T,t[10]=(g*C-f*y+x*v)*T,t[11]=(c*y-d*C-p*v)*T,t[12]=(r*E-a*A-l*_)*T,t[13]=(i*A-s*E+o*_)*T,t[14]=(f*b-g*w-m*v)*T,t[15]=(d*w-c*b+u*v)*T,t):null}function F(t,e,i){var s=e[0],o=e[1],n=e[2],a=e[3],r=e[4],l=e[5],h=e[6],d=e[7],c=e[8],u=e[9],p=e[10],g=e[11],f=e[12],m=e[13],x=e[14],v=e[15],b=i[0],y=i[1],w=i[2],C=i[3];return t[0]=b*s+y*r+w*c+C*f,t[1]=b*o+y*l+w*u+C*m,t[2]=b*n+y*h+w*p+C*x,t[3]=b*a+y*d+w*g+C*v,b=i[4],y=i[5],w=i[6],C=i[7],t[4]=b*s+y*r+w*c+C*f,t[5]=b*o+y*l+w*u+C*m,t[6]=b*n+y*h+w*p+C*x,t[7]=b*a+y*d+w*g+C*v,b=i[8],y=i[9],w=i[10],C=i[11],t[8]=b*s+y*r+w*c+C*f,t[9]=b*o+y*l+w*u+C*m,t[10]=b*n+y*h+w*p+C*x,t[11]=b*a+y*d+w*g+C*v,b=i[12],y=i[13],w=i[14],C=i[15],t[12]=b*s+y*r+w*c+C*f,t[13]=b*o+y*l+w*u+C*m,t[14]=b*n+y*h+w*p+C*x,t[15]=b*a+y*d+w*g+C*v,t}function W(t,e,i){var s,o,n,a,r,l,h,d,c,u,p,g,f=i[0],m=i[1],x=i[2];return e===t?(t[12]=e[0]*f+e[4]*m+e[8]*x+e[12],t[13]=e[1]*f+e[5]*m+e[9]*x+e[13],t[14]=e[2]*f+e[6]*m+e[10]*x+e[14],t[15]=e[3]*f+e[7]*m+e[11]*x+e[15]):(s=e[0],o=e[1],n=e[2],a=e[3],r=e[4],l=e[5],h=e[6],d=e[7],c=e[8],u=e[9],p=e[10],g=e[11],t[0]=s,t[1]=o,t[2]=n,t[3]=a,t[4]=r,t[5]=l,t[6]=h,t[7]=d,t[8]=c,t[9]=u,t[10]=p,t[11]=g,t[12]=s*f+r*m+c*x+e[12],t[13]=o*f+l*m+u*x+e[13],t[14]=n*f+h*m+p*x+e[14],t[15]=a*f+d*m+g*x+e[15]),t}function U(t,e,i,s){var o,n,a,r,l,h,d,c,u,p,g,f,m,x,v,b,y,w,C,k,_,E,S,A,H=s[0],M=s[1],T=s[2],R=Math.hypot(H,M,T);return R<L?null:(H*=R=1/R,M*=R,T*=R,o=Math.sin(i),a=1-(n=Math.cos(i)),r=e[0],l=e[1],h=e[2],d=e[3],c=e[4],u=e[5],p=e[6],g=e[7],f=e[8],m=e[9],x=e[10],v=e[11],b=H*H*a+n,y=M*H*a+T*o,w=T*H*a-M*o,C=H*M*a-T*o,k=M*M*a+n,_=T*M*a+H*o,E=H*T*a+M*o,S=M*T*a-H*o,A=T*T*a+n,t[0]=r*b+c*y+f*w,t[1]=l*b+u*y+m*w,t[2]=h*b+p*y+x*w,t[3]=d*b+g*y+v*w,t[4]=r*C+c*k+f*_,t[5]=l*C+u*k+m*_,t[6]=h*C+p*k+x*_,t[7]=d*C+g*k+v*_,t[8]=r*E+c*S+f*A,t[9]=l*E+u*S+m*A,t[10]=h*E+p*S+x*A,t[11]=d*E+g*S+v*A,e!==t&&(t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15]),t)}function j(t,e){var i=new I(3);!function(t,e){var i=e[0],s=e[1],o=e[2],n=e[4],a=e[5],r=e[6],l=e[8],h=e[9],d=e[10];t[0]=Math.hypot(i,s,o),t[1]=Math.hypot(n,a,r),t[2]=Math.hypot(l,h,d)}(i,e);var s=1/i[0],o=1/i[1],n=1/i[2],a=e[0]*s,r=e[1]*o,l=e[2]*n,h=e[4]*s,d=e[5]*o,c=e[6]*n,u=e[8]*s,p=e[9]*o,g=e[10]*n,f=a+d+g,m=0;return f>0?(m=2*Math.sqrt(f+1),t[3]=.25*m,t[0]=(c-p)/m,t[1]=(u-l)/m,t[2]=(r-h)/m):a>d&&a>g?(m=2*Math.sqrt(1+a-d-g),t[3]=(c-p)/m,t[0]=.25*m,t[1]=(r+h)/m,t[2]=(u+l)/m):d>g?(m=2*Math.sqrt(1+d-a-g),t[3]=(u-l)/m,t[0]=(r+h)/m,t[1]=.25*m,t[2]=(c+p)/m):(m=2*Math.sqrt(1+g-a-d),t[3]=(r-h)/m,t[0]=(u+l)/m,t[1]=(c+p)/m,t[2]=.25*m),t}Math.hypot||(Math.hypot=function(){for(var t=0,e=arguments.length;e--;)t+=arguments[e]*arguments[e];return Math.sqrt(t)});var G=function(t,e,i,s,o){var n,a=1/Math.tan(e/2);return t[0]=a/i,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=a,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[11]=-1,t[12]=0,t[13]=0,t[15]=0,null!=o&&o!==1/0?(n=1/(s-o),t[10]=(o+s)*n,t[14]=2*o*s*n):(t[10]=-1,t[14]=-2*s),t},X=F;function J(){var t=new I(3);return I!=Float32Array&&(t[0]=0,t[1]=0,t[2]=0),t}function Y(t,e,i){var s=new I(3);return s[0]=t,s[1]=e,s[2]=i,s}function q(t,e,i){return t[0]=e[0]-i[0],t[1]=e[1]-i[1],t[2]=e[2]-i[2],t}function K(t,e,i){return t[0]=e[0]*i,t[1]=e[1]*i,t[2]=e[2]*i,t}function Z(t,e){var i=e[0],s=e[1],o=e[2],n=i*i+s*s+o*o;return n>0&&(n=1/Math.sqrt(n)),t[0]=e[0]*n,t[1]=e[1]*n,t[2]=e[2]*n,t}function Q(t,e,i){var s=e[0],o=e[1],n=e[2],a=i[0],r=i[1],l=i[2];return t[0]=o*l-n*r,t[1]=n*a-s*l,t[2]=s*r-o*a,t}function tt(t,e,i){var s=e[0],o=e[1],n=e[2],a=i[3]*s+i[7]*o+i[11]*n+i[15];return a=a||1,t[0]=(i[0]*s+i[4]*o+i[8]*n+i[12])/a,t[1]=(i[1]*s+i[5]*o+i[9]*n+i[13])/a,t[2]=(i[2]*s+i[6]*o+i[10]*n+i[14])/a,t}function et(t,e,i){var s=e[0],o=e[1],n=e[2];return t[0]=s*i[0]+o*i[3]+n*i[6],t[1]=s*i[1]+o*i[4]+n*i[7],t[2]=s*i[2]+o*i[5]+n*i[8],t}function it(){var t=new I(4);return I!=Float32Array&&(t[0]=0,t[1]=0,t[2]=0,t[3]=0),t}function st(t,e,i,s){var o=new I(4);return o[0]=t,o[1]=e,o[2]=i,o[3]=s,o}function ot(t,e,i){var s=e[0],o=e[1],n=e[2],a=e[3];return t[0]=i[0]*s+i[4]*o+i[8]*n+i[12]*a,t[1]=i[1]*s+i[5]*o+i[9]*n+i[13]*a,t[2]=i[2]*s+i[6]*o+i[10]*n+i[14]*a,t[3]=i[3]*s+i[7]*o+i[11]*n+i[15]*a,t}J();var nt=function(t,e,i){return t[0]=e[0]-i[0],t[1]=e[1]-i[1],t[2]=e[2]-i[2],t[3]=e[3]-i[3],t};function at(){var t=new I(4);return I!=Float32Array&&(t[0]=0,t[1]=0,t[2]=0),t[3]=1,t}!function(){var t=it()}();var rt=st,lt=function(t,e){return t[0]*e[0]+t[1]*e[1]+t[2]*e[2]+t[3]*e[3]};function ht(){var t=new I(8);return I!=Float32Array&&(t[0]=0,t[1]=0,t[2]=0,t[4]=0,t[5]=0,t[6]=0,t[7]=0),t[3]=1,t}function dt(t,e){var i=at();j(i,e);var s=new I(3);return function(t,e){t[0]=e[12],t[1]=e[13],t[2]=e[14]}(s,e),function(t,e,i){var s=.5*i[0],o=.5*i[1],n=.5*i[2],a=e[0],r=e[1],l=e[2],h=e[3];t[0]=a,t[1]=r,t[2]=l,t[3]=h,t[4]=s*h+o*l-n*r,t[5]=o*h+n*a-s*l,t[6]=n*h+s*r-o*a,t[7]=-s*a-o*r-n*l}(t,i,s),t}function ct(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t}function ut(t,e,i){var s=e[0],o=e[1],n=e[2],a=e[3],r=i[4],l=i[5],h=i[6],d=i[7],c=e[4],u=e[5],p=e[6],g=e[7],f=i[0],m=i[1],x=i[2],v=i[3];return t[0]=s*v+a*f+o*x-n*m,t[1]=o*v+a*m+n*f-s*x,t[2]=n*v+a*x+s*m-o*f,t[3]=a*v-s*f-o*m-n*x,t[4]=s*d+a*r+o*h-n*l+c*v+g*f+u*x-p*m,t[5]=o*d+a*l+n*r-s*h+u*v+g*m+p*f-c*x,t[6]=n*d+a*h+s*l-o*r+p*v+g*x+c*m-u*f,t[7]=a*d-s*r-o*l-n*h+g*v-c*f-u*m-p*x,t}J(),Y(1,0,0),Y(0,1,0),at(),at(),D();var pt=lt;class gt{constructor(t,e,i,s,o,n,a,r){this.index=-1,this.headPos=[0,0,0],this.tailPos=[0,0,0],this.length=0,this.children=[],this.reference_bones=[],this.skeleton=t,this.name=e,this.headJoint=s,this.tailJoint=o,this.roll=n,this.updateJointPositions(),null!==i&&(this.parent=this.skeleton.getBone(i),this.parent.children.push(this)),this.parent?this.level=this.parent.level+1:this.level=0,this.matPose=O(z())}get planes(){return this.skeleton.planes}hasChild(t){for(const e of this.children){if(this.name===t)return!0;if(e.hasChild(t))return!0}return!1}updateJointPositions(t=!0){this.headPos=this.skeleton.getJointPosition(this.headJoint,t),this.tailPos=this.skeleton.getJointPosition(this.tailJoint,t)}build(t){const e=Y(this.headPos[0],this.headPos[1],this.headPos[2]),i=Y(this.tailPos[0],this.tailPos[1],this.tailPos[2]);let s;if(t)throw Error("not implemented yet");s=this.get_normal(),this.matRestGlobal=function(t,e,i){let s=q(J(),e,t);Z(s,s);const o=Z(J(),i),n=Z(J(),Q(J(),o,s)),a=Z(J(),Q(J(),s,n));return V(a[0],a[1],a[2],0,s[0],s[1],s[2],0,n[0],n[1],n[2],0,t[0],t[1],t[2],1)}(e,i,s),this.length=function(t,e){var i=e[0]-t[0],s=e[1]-t[1],o=e[2]-t[2];return Math.hypot(i,s,o)}(e,i),void 0===this.parent?this.matRestRelative=this.matRestGlobal:this.matRestRelative=X(z(),P(z(),this.parent.matRestGlobal),this.matRestGlobal),this.yvector4=st(0,this.length,0,1)}update(){void 0!==this.parent?this.matPoseGlobal=F(z(),this.parent.matPoseGlobal,F(z(),this.matRestRelative,this.matPose)):this.matPoseGlobal=F(z(),this.matRestRelative,this.matPose),this.matPoseVerts=F(z(),this.matPoseGlobal,P(z(),this.matRestGlobal))}get_normal(){let t;if(this.roll instanceof Array)throw Error("Not implemented yet");if("string"==typeof this.roll){const e=this.roll;t=function(t,e,i){i.has(e)||(console.warn(`No plane with name ${e} defined for skeleton.`),Y(0,1,0));const s=i.get(e),[o,n,a]=s,r=K(J(),$i(t.getJointPosition(o)),t.scale),l=K(J(),$i(t.getJointPosition(n)),t.scale),h=K(J(),$i(t.getJointPosition(a)),t.scale),d=Z(J(),q(J(),l,r)),c=Z(J(),q(J(),h,l));return Z(J(),Q(J(),c,d))}(this.skeleton,e,this.planes)}else t=Y(0,1,0);return t}}class ft{constructor(t,e){e.name&&(this.info={name:e.name,version:e.version,description:e.description,copyright:e.copyright,license:e.license}),this._data=this._build_vertex_weights_data(e.weights)}_build_vertex_weights_data(t,e=void 0,i="root"){if(void 0===t)throw Error("vertexWeightsDict must not be undefined");let s;if(void 0!==e)s=e;else{s=0;for(let e of Object.getOwnPropertyNames(t)){t[e].forEach((t=>{const e=t[0];s=Math.max(s,e)}))}++s}this._vertexCount=s;const o=new Array(s).fill(0);for(let e of Object.getOwnPropertyNames(t)){t[e].forEach((t=>{const e=t[0],i=t[1];o[e]+=i}))}const n=new Map;for(let e of Object.getOwnPropertyNames(t)){const i=t[e];if(0===i.length)continue;let s=[],a=[],r=new Map;for(let[t,e]of i){const i=e/o[t];if(r.has(t)){const e=r.get(t);s[e]+=i}else r.set(t,a.length),a.push(t),s.push(i)}const l=s.map(((t,e)=>t>1e-4?e:void 0)).filter((t=>void 0!==t)).sort(((t,e)=>a[t]-a[e]));a=l.map((t=>a[t])),s=l.map((t=>s[t])),n.set(e,[a,s])}let a,r;n.has(i)?[a,r]=n.get(i):(a=[],r=[]);const l=o.map(((t,e)=>0===t?e:-1)).filter((t=>t>=0));return a=a.concat(l),r=r.concat(new Array(l.length).fill(1)),l.length>0&&(l.length<100?console.log(`Adding trivial bone weights to root bone ${i} for ${l.length} unweighted vertices. [${l}]`):console.log(`Adding trivial bone weights to root bone ${i} for ${l.length} unweighted vertices.`)),a.length>0&&n.set(i,[a,r]),n}}function mt(t,...e){let i=t[0];return e.forEach(((e,s)=>{i=i.concat(e).concat(t[s+1])})),i}function xt(t,e){const i=document.createElement(t);for(let t=0;t<e.length;++t){let s=e[t];s instanceof Array&&(e.splice(t,1,...s),s=e[t]),"string"!=typeof s?i.appendChild(s):i.appendChild(document.createTextNode(s))}return i}function vt(t){return document.createTextNode(t)}const bt=(...t)=>xt("div",t),yt=(...t)=>xt("span",t),wt=(...t)=>xt("slot",t),Ct=(...t)=>xt("input",t),kt=(...t)=>xt("button",t),_t=(...t)=>xt("ul",t),Et=(...t)=>xt("li",t),St="http://www.w3.org/2000/svg";function At(t){const e=document.createElementNS(St,"svg");return void 0!==t&&e.appendChild(t),e}function Ht(t){const e=document.createElementNS(St,"path");return void 0!==t&&e.setAttributeNS(null,"d",t),e}function Mt(t,e,i,s,o,n){const a=document.createElementNS(St,"line");return a.setAttributeNS(null,"x1",`${t}`),a.setAttributeNS(null,"y1",`${e}`),a.setAttributeNS(null,"x2",`${i}`),a.setAttributeNS(null,"y2",`${s}`),void 0!==o&&a.setAttributeNS(null,"stroke",o),void 0!==n&&a.setAttributeNS(null,"fill",n),a}class Tt extends f{constructor(t,e){super(t,e)}}class Rt extends g{constructor(t="",e){super(e),this.value=t}set promise(t){this._value=t,this.modified.trigger()}get promise(){if("string"==typeof this._value){const t=this._value;return()=>t}return this._value}set value(t){this._value!==t&&("string"==typeof t?this.modified.withLock((()=>{this.error=void 0,this._value=t,this.modified.trigger()})):console.trace(`TextModel.set value(value: string): ${typeof t} is not type string`))}get value(){switch(typeof this._value){case"number":case"string":this._value=`${this._value}`;break;case"function":this._value=this._value()}return this._value}}class Nt extends Rt{constructor(t,e){super(t,e)}}class $t extends g{constructor(t){super(),this.signal=new d,this.signal.add(t)}set value(t){throw Error("Action.value can not be assigned a value")}get value(){throw Error("Action.value can not return a value")}trigger(t){this.enabled&&this.signal.trigger(t)}}function Lt(t,e){let i=t.getAttribute(e);if(null===i)throw console.log("missing attribute '"+e+"' in ",t),Error("missing attribute '"+e+"' in "+t.nodeName);return i}function It(t,e){let i=t.getAttribute(e);return null===i?void 0:i}let Dt=new class{constructor(){this.modelId2Models=new Map,this.modelId2Views=new Map,this.view2ModelIds=new Map,this.sigChanged=new d}registerAction(t,e){let i=new $t(e);return i.signal.add(e),this._registerModel("A:"+t,i),i}registerModel(t,e){this._registerModel("M:"+t,e)}_registerModel(t,e){let i=this.modelId2Models.get(t);i||(i=new Set,this.modelId2Models.set(t,i)),i.add(e);let s=this.modelId2Views.get(t);if(s)for(let t of s)t.setModel(e)}registerView(t,e){if(e.controller&&e.controller!==this)return void console.log("error: attempt to register view more than once at different controllers");e.controller=this;let i=this.view2ModelIds.get(e);i||(i=new Set,this.view2ModelIds.set(e,i)),i.add(t);let s=this.modelId2Views.get(t);s||(s=new Set,this.modelId2Views.set(t,s)),s.add(e);let o=this.modelId2Models.get(t);if(o)for(let t of o)e.setModel(t)}unregisterView(t){if(!t.controller)return;if(t.controller!==this)throw Error("attempt to unregister view from wrong controller");let e=this.view2ModelIds.get(t);if(e)for(let i of e){let e=this.modelId2Views.get(i);e&&(e.delete(t),0===e.size&&this.modelId2Views.delete(i),t.setModel(void 0))}}clear(){for(let t of this.view2ModelIds)t[0].setModel(void 0);this.modelId2Models.clear(),this.modelId2Views.clear(),this.view2ModelIds.clear()}bind(t,e){this.registerModel(t,e)}action(t,e){return this.registerAction(t,e)}text(t,e){let i=new Rt(e);return this.bind(t,i),i}html(t,e){let i=new Nt(e);return this.bind(t,i),i}boolean(t,e){let i=new Tt(e);return this.bind(t,i),i}number(t,e,i){let s=new C(e,i);return this.bind(t,s),s}};class Bt{constructor(){this._stop=!1,this._firstFrame=this._firstFrame.bind(this),this._animationFrame=this._animationFrame.bind(this)}start(){this.prepare(),!0!==this._stop&&this.requestAnimationFrame(this._firstFrame)}stop(){this._stop=!0,this.animator?.current===this&&this.animator.clearCurrent()}replace(t){this.next=t,this.animationFrame(1),this.lastFrame(),t.prepare()}prepare(){}firstFrame(){}animationFrame(t){}lastFrame(){}requestAnimationFrame(t){window.requestAnimationFrame(t)}_firstFrame(t){this.startTime=t,this.firstFrame(),this._stop||(this.animationFrame(0),this.requestAnimationFrame(this._animationFrame))}_animationFrame(t){if(this.next)return void this.next._firstFrame(t);let e=Bt.animationFrameCount>0?(t-this.startTime)/Bt.animationFrameCount:1;e=e>1?1:e;const i=this.ease(e);this.animationFrame(i),this._stop||(i<1?this.requestAnimationFrame(this._animationFrame.bind(this)):(this.lastFrame(),this.animator&&this.animator._current===this&&this.animator.clearCurrent()))}ease(t){return.5*(1-Math.cos(Math.PI*t))}}Bt.animationFrameCount=468;class zt extends Bt{constructor(t){super(),this.animation=t}prepare(){this.animation.prepare()}firstFrame(){this.animation.firstFrame()}animationFrame(t){this.animation.animationFrame(t)}lastFrame(){this.animation.lastFrame()}}class Vt{get current(){if(void 0!==this._current)return this._current instanceof zt?this._current.animation:this._current}clearCurrent(){this._current=void 0}run(t){let e;e=t instanceof Bt?t:new zt(t);const i=this._current;if(this._current=e,e.animator=this,i)i.animator=void 0,i.replace(e);else{if(Vt.halt)return;e.start()}}}Vt.halt=!1;class Ot extends f{map(t){const e=[];return this.forEach(((i,s,o)=>{e.push(t(i,s,o))})),e}get html(){let t;return this.forEach(((e,i,s)=>{this.value===e&&(t=i)})),this.asHtml(t)}asHtml(t){if("string"==typeof t)return yt(vt(t));if("number"==typeof t)return yt(vt(`${t}`));if("object"==typeof t&&t instanceof Node){let e=t.cloneNode(!0);const i=3;return t.nodeType===i&&(t=yt(t)),e.style.height="100%",e.style.width="100%",e}return yt(vt(`${t}`))}indexOf(t){let e;return this.forEach(((i,s,o)=>{t===i&&(e=o)})),e}labelOf(t){let e;return this.forEach(((i,s,o)=>{t===i&&(e=s)})),this.asHtml(e)}isEnabledOf(t){let e=!1;return this.forEach(((i,s,o)=>{t===i&&(e=!0)})),e}set index(t){this.forEach(((e,i,s)=>{s===t&&(this.value=e)}))}get index(){let t;return this.forEach(((e,i,s)=>{this.value===e&&(t=s)})),t}next(){const t=this.index;this.index=void 0===t?0:t+1}prev(){const t=this.index;this.index=void 0===t?0:t-1}}class Pt extends Ot{constructor(t,e,i){super(t,i),this.enumType=e}forEach(t){let e="string";const i=Object.entries(this.enumType);for(const t of i){if("object"==typeof t[1]){e="object";break}if("number"==typeof t[1]){e="number";break}}let s=0;switch(e){case"object":for(const e of i)"object"==typeof e[1]&&t(e[1],e[1],s++);break;case"number":for(const e of i)"number"==typeof e[1]&&t(e[1],e[0],s++);break;default:for(const e of i)"string"==typeof e[0]&&t(e[1],e[1],s++)}}}class Ft extends Ot{constructor(t,e,i){if(super(t,i),e[0]instanceof Array)this._mapping=e;else{const t=[];e.forEach((e=>t.push([e,`${e}`]))),this._mapping=t}}forEach(t){this._mapping.forEach((([e,i],s)=>{t(e,i,s)}))}}class Wt extends HTMLElement{static define(t,e,i){const s=window.customElements.get(t);if(void 0===s)window.customElements.define(t,e,i);else if(s!==e){for(let s=0;s<255;++s){const o=`${t}-duplicate-${s}`;if(void 0===window.customElements.get(o))return console.log(`View::define(${t}, ...) with different constructor, using ${o} instead (known issue on Safari and Edge)`),void window.customElements.define(o,e,i)}console.error(`View::define(${t}, ...): attempt to redefine view with different constructor (known issue on Safari and Edge), giving up after 255 times`)}}constructor(t){super(),r(this,t)}setModel(t){console.trace("Please note that View.setModel(model) has no implementation.")}getModelId(){if(!this.hasAttribute("model"))throw Error("no 'model' attribute");let t=this.getAttribute("model");if(!t)throw Error("no model id");return"M:"+t}getActionId(){if(!this.hasAttribute("action"))throw Error("no 'action' attribute");let t=this.getAttribute("action");if(!t)throw Error("no action id");return"A:"+t}connectedCallback(){if(this.controller)return;let t="";try{t=this.getModelId()}catch(t){}""!=t&&Dt.registerView(t,this)}disconnectedCallback(){this.controller&&this.controller.unregisterView(this)}}class Ut extends Wt{constructor(t){super(t),this.model=void 0,void 0!==t?.model&&this.setModel(t.model)}updateModel(){}updateView(t){}setModel(t){if(t===this.model)return;const e=this;this.model&&this.model.modified.remove(e),t&&t.modified.add((t=>e.updateView(t)),e),this.model=t,this.isConnected&&this.updateView(c.ALL)}connectedCallback(){super.connectedCallback(),this.model&&this.updateView(c.ALL)}}class jt extends Ut{constructor(t){super(t)}connectedCallback(){if(this.controller)this.updateView();else{try{Dt.registerView(this.getActionId(),this)}catch(t){}try{Dt.registerView(this.getModelId(),this)}catch(t){}this.updateView()}}disconnectedCallback(){super.disconnectedCallback(),this.controller&&this.controller.unregisterView(this)}setModel(t){if(!t)return this.model&&this.model.modified.remove(this),this.action&&this.action.modified.remove(this),this.model=void 0,this.action=void 0,void this.updateView();if(t instanceof $t)this.action=t,this.action.modified.add((()=>{this.updateView()}),this);else{if(!(t instanceof Rt))throw Error("unexpected model of type "+t.constructor.name);this.model=t,this.model.modified.add((()=>{this.updateView()}),this)}this.updateView()}setAction(t){t instanceof Function?this.setModel(new $t(t)):this.setModel(t)}isEnabled(){return void 0!==this.action&&this.action.enabled}}const Gt=new CSSStyleSheet;Gt.replaceSync(mt`
:host {
    display: inline-block;
}

.tx-text {
    width: 100%;
    box-shadow: none;
    box-sizing: border-box;
    color: var(--tx-edit-fg-color);
    background-color: var(--tx-edit-bg-color);

    /* we use the border instead of an outline to indicate the focus */
    outline: none;
    border-width: var(--tx-border-width);
    border-style: solid;
    border-color: var(--tx-border-color);
    border-radius: var(--tx-border-radius);

    font-weight: var(--tx-edit-font-weight);
    font-size: var(--tx-edit-font-size);
    line-height: 18px;

    padding: 4px 8px 4px 8px;
    text-indent: 0;
    vertical-align: top;
    margin: 0;
    overflow: visible;
    text-overflow: ellipsis;
}
.tx-text:hover {
    border-color: var(--tx-border-color-hover);
}
.tx-text:disabled {
    color: var(--tx-fg-color-disabled);
    background-color: var(--tx-bg-color-disabled);
    border-color: var(--tx-bg-color-disabled);
}
.tx-text::placeholder {
    color: var(--tx-placeholder-fg-color);
    font-style: italic;
    font-weight: 300;
}
.tx-text:hover::placeholder {
    color: var(--tx-placeholder-fg-color-hover);
}
.tx-text:focus {
    border-color: var(--tx-outline-color);
}
.tx-text.tx-error {
    border-color: var(--tx-warning-color)
}
`);class Xt extends Ut{constructor(t){super(t),this.input=document.createElement("input"),this.input.classList.add("tx-text"),this.input.onkeydown=t=>{"Enter"===t.key&&this.model instanceof C&&this.updateModel()},this.input.onblur=t=>{this.model instanceof C&&this.updateModel()},this.input.oninput=t=>{this.model instanceof C||this.updateModel()},this.wheel=this.wheel.bind(this),this.input.onwheel=this.wheel,this.attachShadow({mode:"open",delegatesFocus:!0}),this.shadowRoot.adoptedStyleSheets=[Gt],this.shadowRoot.appendChild(this.input),this.updateView()}wheel(t){this.model instanceof C&&(t.preventDefault(),t.deltaY>0&&this.model.decrement(),t.deltaY<0&&this.model.increment())}focus(){this.input.focus()}blur(){this.input.blur()}static get observedAttributes(){return["value"]}attributeChangedCallback(t,e,i){if("value"===t)this.model&&void 0!==i&&(this.model.value=i)}updateModel(){this.model&&(this.model.value=this.input.value),this.setAttribute("value",this.input.value)}updateView(){if(!this.model)return this.setAttribute("disabled","disabled"),void this.input.setAttribute("disabled","disabled");if(this.model.enabled?(this.removeAttribute("disabled"),this.input.removeAttribute("disabled")):(this.setAttribute("disabled","disabled"),this.input.setAttribute("disabled","disabled")),void 0!==this.model.color)switch(this.input.style.fontStyle="",this.input.style.fontWeight="",this.input.style.color="",this.model.color){case"italic":this.input.style.fontStyle="italic";break;case"bold":this.input.style.fontWeight="bold";break;default:this.input.style.color=this.model.color}else this.input.style.color="";const t=`${this.model.value}`;this.input.value!==t&&(this.input.value=t,this.setAttribute("value",t)),void 0!==this.model.error?this.input.classList.add("tx-error"):this.input.classList.remove("tx-error")}get value(){return this.input.value}set value(t){this.input.value=t,this.updateModel()}}Xt.define("tx-text",Xt);const Jt=new CSSStyleSheet;Jt.replaceSync(mt`

/* try to follow material ui: when active render button labels in black, otherwise in gray */
svg .fill {
  fill: var(--tx-gray-700);
  stroke: var(--tx-gray-700);
}
svg .stroke {
  fill: none;
  stroke: var(--tx-gray-700);
}
svg .strokeFill {
  fill: var(--tx-gray-200);
  stroke: var(--tx-gray-700);
}

/*
these don't seem to be in use anymore
.toolbar.active svg .fill {
  fill: #000;
  stroke: #000;
}
.toolbar.active svg .stroke {
  fill: none;
  stroke: #000;
}
.toolbar.active svg .strokeFill {
  fill: #fff;
  stroke: #000;
}
*/

.toolbar button {
    background: var(--tx-gray-75);
    color: var(--tx-gray-800);
    border: 1px var(--tx-gray-400);
    border-style: solid solid solid none;
    padding: 5;
    margin: 0;
    vertical-align: middle;
    height: 22px;
}

.toolbar button:active:hover {
    background: linear-gradient(to bottom, var(--tx-gray-600) 0%,var(--tx-gray-50) 100%,var(--tx-gray-500) 100%);
}

.toolbar button.left {
    border-style: solid;
    border-radius: 3px 0 0 3px;
}

.toolbar button.right {
    border: 1px var(--tx-gray-400);
    border-style: solid solid solid none;
    border-radius: 0 3px 3px 0;
}

.toolbar button.active {
    background: linear-gradient(to bottom, var(--tx-gray-600) 0%,var(--tx-gray-50) 100%,var(--tx-gray-500) 100%);
    border: 1px var(--tx-global-blue-500) solid;
    color: var(--tx-gray-900);
}

div.textarea {
  font-family: var(--tx-font-family);
  font-size: var(--tx-font-size);
  border: 1px var(--tx-gray-400) solid;
  border-radius: 3px;
  margin: 2px;
  padding: 4px 5px;
  outline-offset: -2px;
}

div.textarea h1 {
  font-size: 22px;
  margin: 0;
  padding: 4px 0 4px 0;
}

div.textarea h2 {
  font-size: 18px;
  margin: 0;
  padding: 4px 0 4px 0;
}

div.textarea h3 {
  font-size: 16px;
  margin: 0;
  padding: 4px 0 4px 0;
}

div.textarea h4 {
  font-size: 14px;
  margin: 0;
  padding: 4px 0 4px 0;
}

div.textarea div {
  padding: 2px 0 2px 0;
}
`);class Yt extends Ut{constructor(){super(),Yt.texttool=this;let t=n("div",{class:"toolbar"});this.buttonH1=n("button",{class:"left",children:"H1"}),this.buttonH1.onclick=()=>{document.execCommand("formatBlock",!1,"<h1>"),this.update()},t.appendChild(this.buttonH1),this.buttonH2=n("button",{children:"H2"}),this.buttonH2.onclick=()=>{document.execCommand("formatBlock",!1,"<h2>"),this.update()},t.appendChild(this.buttonH2),this.buttonH3=n("button",{children:"H3"}),this.buttonH3.onclick=()=>{document.execCommand("formatBlock",!1,"<h3>"),this.update()},t.appendChild(this.buttonH3),this.buttonH4=n("button",{class:"right",children:"H4"}),this.buttonH4.onclick=()=>{document.execCommand("formatBlock",!1,"<h4>"),this.update()},t.appendChild(this.buttonH4),t.appendChild(document.createTextNode(" ")),this.buttonBold=n("button",{class:"left",children:n("b",{children:"B"})}),this.buttonBold.onclick=()=>{document.execCommand("bold",!1),this.update()},t.appendChild(this.buttonBold),this.buttonItalic=n("button",{children:n("i",{children:"I"})}),this.buttonItalic.onclick=()=>{document.execCommand("italic",!1),this.update()},t.appendChild(this.buttonItalic),this.buttonUnderline=n("button",{children:n("u",{children:"U"})}),this.buttonUnderline.onclick=()=>{document.execCommand("underline",!1),this.update()},t.appendChild(this.buttonUnderline),this.buttonStrikeThrough=n("button",{children:n("strike",{children:"S"})}),this.buttonStrikeThrough.onclick=()=>{document.execCommand("strikeThrough",!1),this.update()},t.appendChild(this.buttonStrikeThrough),this.buttonSubscript=n("button",{children:"x₂"}),this.buttonSubscript.onclick=()=>{document.execCommand("subscript",!1),this.update()},t.appendChild(this.buttonSubscript),this.buttonSuperscript=n("button",{class:"right",children:"x²"}),this.buttonSuperscript.onclick=()=>{document.execCommand("superscript",!1),this.update()},t.appendChild(this.buttonSuperscript),t.appendChild(document.createTextNode(" ")),this.buttonJustifyLeft=n("button",{class:"left",children:a("svg",{viewBox:"0 0 10 9",width:"10",height:"9",children:[n("line",{x1:"0",y1:"0.5",x2:"10",y2:"0.5",class:"stroke"}),n("line",{x1:"0",y1:"2.5",x2:"6",y2:"2.5",class:"stroke"}),n("line",{x1:"0",y1:"4.5",x2:"10",y2:"4.5",class:"stroke"}),n("line",{x1:"0",y1:"6.5",x2:"6",y2:"6.5",class:"stroke"}),n("line",{x1:"0",y1:"8.5",x2:"10",y2:"8.5",class:"stroke"})]})}),this.buttonJustifyLeft.onclick=()=>{document.execCommand("justifyLeft",!1),this.update()},t.appendChild(this.buttonJustifyLeft),this.buttonJustifyCenter=n("button",{children:a("svg",{viewBox:"0 0 10 9",width:"10",height:"9",children:[n("line",{x1:"0",y1:"0.5",x2:"10",y2:"0.5",class:"stroke"}),n("line",{x1:"2",y1:"2.5",x2:"8",y2:"2.5",class:"stroke"}),n("line",{x1:"0",y1:"4.5",x2:"10",y2:"4.5",class:"stroke"}),n("line",{x1:"2",y1:"6.5",x2:"8",y2:"6.5",class:"stroke"}),n("line",{x1:"0",y1:"8.5",x2:"10",y2:"8.5",class:"stroke"})]})}),this.buttonJustifyCenter.onclick=()=>{document.execCommand("justifyCenter",!1),this.update()},t.appendChild(this.buttonJustifyCenter),this.buttonJustifyRight=n("button",{class:"right",children:a("svg",{viewBox:"0 0 10 9",width:"10",height:"9",children:[n("line",{x1:"0",y1:"0.5",x2:"10",y2:"0.5",class:"stroke"}),n("line",{x1:"4",y1:"2.5",x2:"10",y2:"2.5",class:"stroke"}),n("line",{x1:"0",y1:"4.5",x2:"10",y2:"4.5",class:"stroke"}),n("line",{x1:"4",y1:"6.5",x2:"10",y2:"6.5",class:"stroke"}),n("line",{x1:"0",y1:"8.5",x2:"10",y2:"8.5",class:"stroke"})]})}),this.buttonJustifyRight.onclick=()=>{document.execCommand("justifyRight",!1),this.update()},t.appendChild(this.buttonJustifyRight),this.attachShadow({mode:"open"}),this.shadowRoot.adoptedStyleSheets=[Jt],this.shadowRoot.appendChild(t)}update(){this.buttonH1.classList.toggle("active","h1"===document.queryCommandValue("formatBlock")),this.buttonH2.classList.toggle("active","h2"===document.queryCommandValue("formatBlock")),this.buttonH3.classList.toggle("active","h3"===document.queryCommandValue("formatBlock")),this.buttonH4.classList.toggle("active","h4"===document.queryCommandValue("formatBlock")),this.buttonBold.classList.toggle("active",document.queryCommandState("bold")),this.buttonItalic.classList.toggle("active",document.queryCommandState("italic")),this.buttonUnderline.classList.toggle("active",document.queryCommandState("underline")),this.buttonStrikeThrough.classList.toggle("active",document.queryCommandState("strikeThrough")),this.buttonSubscript.classList.toggle("active",document.queryCommandState("subscript")),this.buttonSuperscript.classList.toggle("active",document.queryCommandState("superscript")),this.buttonJustifyLeft.classList.toggle("active",document.queryCommandState("justifyLeft")),this.buttonJustifyCenter.classList.toggle("active",document.queryCommandState("justifyCenter")),this.buttonJustifyRight.classList.toggle("active",document.queryCommandState("justifyRight"))}}Yt.define("tx-texttool",Yt);class qt extends Ut{constructor(t){super(t);let e=document.createElement("div");this.content=e,e.classList.add("tx-text"),e.contentEditable="true",e.oninput=t=>{if(this.model instanceof Nt){let i=t.target.firstChild;i&&3===i.nodeType?document.execCommand("formatBlock",!1,"<div>"):"<br>"===e.innerHTML&&(e.innerHTML="")}this.updateModel()},e.onkeydown=t=>{this.model instanceof Nt&&(!0===t.metaKey&&"b"===t.key?(t.preventDefault(),document.execCommand("bold",!1),this.updateTextTool()):!0===t.metaKey&&"i"===t.key?(t.preventDefault(),document.execCommand("italic",!1),this.updateTextTool()):!0===t.metaKey&&"u"===t.key?(t.preventDefault(),document.execCommand("underline",!1),this.updateTextTool()):"Tab"===t.key?t.preventDefault():"Enter"===t.key&&!0!==t.shiftKey&&"blockquote"===document.queryCommandValue("formatBlock")&&document.execCommand("formatBlock",!1,"<p>"))},e.onkeyup=()=>{this.updateTextTool()},e.onmouseup=()=>{this.updateTextTool()},this.attachShadow({mode:"open"}),this.shadowRoot.adoptedStyleSheets=[Gt],this.shadowRoot.appendChild(e)}updateTextTool(){void 0!==Yt.texttool&&Yt.texttool.update()}updateModel(){this.model&&(this.model.promise=()=>this.model instanceof Nt?this.content.innerHTML:this.content.innerText)}updateView(){this.model&&(this.model instanceof Nt?this.content.innerHTML!==this.model.value&&(this.content.innerHTML=this.model.value):this.content.innerText!==this.model.value&&(this.content.innerText=this.model.value))}}qt.define("tx-textarea",qt);class Kt extends Ut{constructor(t){super(t)}updateView(){void 0!==this.model?this.model instanceof Rt?this.innerText=this.model.value:this.model instanceof Nt?this.innerHTML=this.model.value:this.model instanceof C&&(this.innerText=`${this.model.value}`):this.innerText=""}}Kt.define("tx-display",Kt);const Zt=new CSSStyleSheet;var Qt;Zt.replaceSync(mt`
.tx-button {
    padding: 2px 14px 2px 14px;
    margin: 0;
    color: var(--tx-gray-800);
    transition: background-color 130ms ease-in-out;
    background-color: var(--tx-gray-300);
    border: 0 none;
    height: 28px;
    border-radius: 16px;
    box-shadow: none;
    font-family: inherit;
}

.tx-button:hover, .tx-button:active {
    color: var(--tx-gray-900);
    background-color: var(--tx-gray-400);
}

.tx-button:hover:active > span {
    transition: transform 130ms ease-in-out;
}
:host > .tx-button:hover:active {
    transform: translate(1px, 1px);
}
:host([disabled]) > .tx-button:hover:active {
    transform: translate(0px, 0px);
}

/* accent */

.tx-button.tx-accent {
    color: var(--tx-static-white);
    background-color: var(--tx-static-blue-600);
}
.tx-button.tx-accent:hover, .tx-button.tx-accent:active {
    color: var(--tx-static-white);
    background-color: var(--tx-static-blue-700);
}
.tx-button.tx-accent:hover:active {
    color: var(--tx-static-white);
    background-color: var(--tx-static-blue-500);
}

/* negative */

.tx-button.tx-negative {
    color: var(--tx-static-white);
    background-color: var(--tx-static-red-600);
}
.tx-button.tx-negative:hover, .tx-button.tx-negative:active {
    color: var(--tx-static-white);
    background-color: var(--tx-static-red-700);
}
.tx-button.tx-negative:hover:active {
    color: var(--tx-static-white);
    background-color: var(--tx-static-red-500);
}

/* primary */

.tx-button.tx-default {
    color: var(--tx-gray-50);
    background-color: var(--tx-gray-800);
}

.tx-button.tx-default:hover, .tx-button.tx-default:hover:active {
    color: var(--tx-gray-50);
    background-color: var(--tx-gray-900);
}

.tx-button.tx-default:active {
    color: var(--tx-gray-50);
    background-color: var(--tx-gray-900);
}

.tx-label {
    font-weight: bold;
    padding: 4px 0 6px 0;
    /* override parent flex/grid's align-items property to align in the center */
    align-self: center;
    /* adjust sides in container to look centered...? */
    justify-self: center;
    /* align children in the center */
    text-align: center;
}

:host([disabled]) > .tx-button, :host([disabled]) > .tx-button:active {
    color: var(--tx-fg-color-disabled);
    background-color: var(--tx-gray-200);
}
`),function(t){t[t.PRIMARY=0]="PRIMARY",t[t.SECONDARY=1]="SECONDARY",t[t.ACCENT=2]="ACCENT",t[t.NEGATIVE=3]="NEGATIVE"}(Qt||(Qt={}));class te extends jt{constructor(t){switch(super(t),this.button=kt(this.label=yt()),this.button.classList.add("tx-button"),this.label.classList.add("tx-label"),this.button.onclick=()=>{this.action&&this.action.trigger()},this.getAttribute("variant")){case"primary":this.button.classList.add("tx-default");break;case"secondary":break;case"accent":this.button.classList.add("tx-accent");break;case"negative":this.button.classList.add("tx-negative")}switch(t?.variant){case Qt.PRIMARY:this.button.classList.add("tx-default");break;case Qt.SECONDARY:break;case Qt.ACCENT:this.button.classList.add("tx-accent");break;case Qt.NEGATIVE:this.button.classList.add("tx-negative")}this.attachShadow({mode:"open"}),this.shadowRoot.adoptedStyleSheets=[Zt],this.shadowRoot.appendChild(this.button)}connectedCallback(){super.connectedCallback(),0===this.children.length&&(this._observer=new MutationObserver(((t,e)=>{void 0!==this._timer&&clearTimeout(this._timer),this._timer=window.setTimeout((()=>{this._timer=void 0,this.updateView()}),100)})),this._observer.observe(this,{childList:!0,subtree:!0,characterData:!0}))}updateView(){this.isConnected&&(this.model&&this.model.value?this.model instanceof Nt?this.label.innerHTML=this.model.value:this.label.innerText=this.model.value:this.label.innerHTML=this.innerHTML,this.isEnabled()?this.removeAttribute("disabled"):this.setAttribute("disabled","disabled"))}}te.define("tx-button",te);class ee extends Ut{setModel(t){if(void 0!==t&&!(t instanceof Tt))throw Error("BooleanView.setModel(): model is not of type BooleanModel");super.setModel(t)}updateModel(){this.model&&(this.model.value=this.input.checked)}updateView(){this.model&&this.model.enabled?this.input.removeAttribute("disabled"):this.input.setAttribute("disabled",""),this.model&&(this.input.checked=this.model.value)}}const ie=new CSSStyleSheet;ie.replaceSync(mt`
:host(.tx-checkbox) {
    display: inline-block;
    position: relative;
    box-shadow: none;
    box-sizing: border-box;
    padding: 0;
    margin: 2px; /* leave space for the focus ring */
    border: none 0;
    height: 14px;
    width: 14px;
}

:host(.tx-checkbox) > input {
    box-sizing: border-box;
    width: 14px;
    height: 14px;
    outline: none;
    padding: 0;
    margin: 0;
    border: 2px solid;
    border-radius: 2px;
    border-color: var(--tx-gray-700);
    /* border-radius: var(--tx-border-radius); */
    color: var(--tx-edit-fg-color);
    background-color: var(--tx-edit-bg-color);
    -webkit-appearance: none;
}

/* this is a svg 2 feature, works with firefox, chrome and edge, but not safari */
/* :host(.tx-checkbox) > svg > path {
    d: path("M3.5 9.5a.999.999 0 01-.774-.368l-2.45-3a1 1 0 111.548-1.264l1.657 2.028 4.68-6.01A1 1 0 019.74 2.114l-5.45 7a1 1 0 01-.777.386z");
} */

/* focus ring */
:host(.tx-checkbox) > input:focus-visible {
    outline: 2px solid;
    outline-color: var(--tx-outline-color);
    outline-offset: 2px;
}

:host(.tx-checkbox) > svg {
    position: absolute;
    left: 2px;
    top: 2px;
    stroke: none;
    fill: var(--tx-edit-bg-color);
    width: 10px;
    height: 10px;
    pointer-events: none;
}

:host(.tx-checkbox) > input:hover {
    border-color: var(--tx-gray-800);
}
.tx-checkbox > input:focus {
    border-color: var(--tx-outline-color);
}

:host(.tx-checkbox) > input:checked {
    background-color: var(--tx-gray-700);
}
:host(.tx-checkbox) > input:hover:checked {
    background-color: var(--tx-gray-800);
}

:host(.tx-checkbox) > input:disabled {
    color: var(--tx-gray-400);
    border-color: var(--tx-gray-400);
}
:host(.tx-checkbox) > input:checked:disabled {
    background-color: var(--tx-gray-400);
}
`);class se extends ee{constructor(t){super(t),this.classList.add("tx-checkbox"),this.input=Ct(),this.input.type="checkbox",this.updateModel=this.updateModel.bind(this),this.input.onchange=this.updateModel;const e=At(Ht("M3.5 9.5a.999.999 0 01-.774-.368l-2.45-3a1 1 0 111.548-1.264l1.657 2.028 4.68-6.01A1 1 0 019.74 2.114l-5.45 7a1 1 0 01-.777.386z"));this.attachShadow({mode:"open",delegatesFocus:!0}),this.shadowRoot.adoptedStyleSheets=[ie],this.shadowRoot.replaceChildren(this.input,e)}}se.define("tx-checkbox",se);const oe=new CSSStyleSheet;oe.replaceSync(mt`
.tx-search {
    display: inline-block;
    position: relative;
}
.tx-search > div {
    display: inline-flex;
    position: relative;
}
.tx-search > div > svg {
    display: block;
    position: absolute;
    height: 18px;
    width: 18px;
    top: 7px;
    left: 10px;
    pointer-events: none;
    overflow: hidden;
    fill: var(--tx-gray-700);
}
.tx-search > div > input {
    box-sizing: border-box;
    padding: 3px 12px 5px 35px;
    margin: 0;
    border: 1px solid var(--tx-gray-400);
    border-radius: 4px;
    -webkit-appearance: none;
    outline-offset: -2px;
    outline: none;
    width: 100%;
    height: 32px;
    overflow: visible;
    background: var(--tx-gray-50);

    color: var(--tx-gray-900);  
    font-weight: var(--tx-edit-font-weight);
    font-size: var(--tx-edit-font-size);
    line-height: 18px;
}
/* the button is transparent so that the border of the input field remains visible */
.tx-search > button {
    display: inline-flex;
    position: absolute;
    box-sizing: border-box;
    right: 0;
    top: 0;
    bottom: 0;
    width: 32px;
    padding: 0;
    margin: 1px;
    border: none;
    align-items: center;
    justify-content: center;
    overflow: visible;
    vertical-align: top;
    cursor: pointer;
    border-radius: 0 4px 4px 0;
    text-align: center;
    outline: none;

    background-color: var(--tx-gray-50);
    border-radius: 0 4px 4px 0;

}
.tx-search > button > svg {
    display: inline-block;
    pointer-events: none;
    height: 10px;
    width: 10px;
    padding: 0;
    margin: 0;
    border: none;
    fill: var(--tx-gray-700);
}
.tx-search > div > input:hover {
    border-color: var(--tx-gray-500);
}

.tx-search > div > input:focus {
    border-color: var(--tx-outline-color);
}
.tx-search > button:focus > svg {
    fill: var(--tx-outline-color);
}

.tx-search > div > input:disabled {
    color: var(--tx-gray-700);
    background-color: var(--tx-gray-200);
    border-color: var(--tx-gray-200);
}
.tx-search > button:disabled {
    background-color: var(--tx-gray-200);
}
.tx-search > button:disabled > svg {
    fill: var(--tx-gray-400);
}`);class ne extends Ut{constructor(t){let e,i,s,o;super(t);const n=((...t)=>xt("form",t))(bt(e=At(o=Ht("M33.173 30.215L25.4 22.443a12.826 12.826 0 10-2.957 2.957l7.772 7.772a2.1 2.1 0 002.958-2.958zM6 15a9 9 0 119 9 9 9 0 01-9-9z")),s=Ct()),kt(i=At(Ht("M6.548 5L9.63 1.917A1.094 1.094 0 008.084.371L5.001 3.454 1.917.37A1.094 1.094 0 00.371 1.917L3.454 5 .37 8.085A1.094 1.094 0 101.917 9.63l3.084-3.083L8.084 9.63a1.094 1.094 0 101.547-1.546z"))));e.setAttributeNS(null,"width","100%"),e.setAttributeNS(null,"height","100%"),o.setAttributeNS(null,"transform","scale(0.5, 0.5)"),i.setAttributeNS(null,"width","100%"),i.setAttributeNS(null,"height","100%"),s.type="search",s.placeholder="Search",s.autocomplete="off",n.classList.add("tx-search"),this.attachShadow({mode:"open"}),this.shadowRoot.adoptedStyleSheets=[oe],this.shadowRoot.appendChild(n)}}ne.define("tx-search",ne);const ae=new CSSStyleSheet;ae.replaceSync(mt`
/* a div on top serves as the container for elements used for the switch*/
:host(.tx-switch) {
    display: inline-flex;
    align-items: flex-start;
    position: relative;
    vertical-align: top;
}
/* an invisible checkbox will overlay everything, handling input and state */
:host(.tx-switch) > input {
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    box-sizing: absolute;
    margin: 0;
    padding: 0;
    opacity: 0;
    z-index: 1;
}
/* the span provides the visual appearance */
:host(.tx-switch) > span {
    display: block;
    position: relative;
    left: 0;
    top: 0;
    box-sizing: border-box;
    flex-grow: 0;
    flex-shrink: 0;

    border: 0px none;
    border-radius: 7px;

    width: 26px;
    height: 14px;
    background: var(--tx-gray-300);
}

/* focus ring */
:host(.tx-switch) > input:focus-visible + span {
    outline: 2px solid;
    outline-color: var(--tx-outline-color);
    outline-offset: 2px;
}

/* this is the knob on the switch */
:host(.tx-switch) > span:before {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 14px;
    height: 14px;
    background: var(--tx-gray-75);
    border: 2px solid var(--tx-gray-700);
    border-radius: 7px;
    content: "";
    box-sizing: border-box;

    /* 'transform' usually can be GPU acclerated while 'left' can not */
    transition: transform 130ms ease-in-out;
}
:host(.tx-switch) > input:hover + span:before {
    border-color: var(--tx-gray-900);
}

:host(.tx-switch) > input:checked + span:before {
    /* border-color: var(--tx-gray-700); */
    transform: translateX(calc(100% - 2px));
}

:host(.tx-switch) > input:checked + span {
    background: var(--tx-gray-700);
}
:host(.tx-switch) > input:checked:hover + span {
    background: var(--tx-gray-900);
}
:host(.tx-switch) > input:hover + span + label {
    color: var(--tx-gray-900);
}

:host(.tx-switch) > input:checked:disabled + span {
    background: var(--tx-gray-400);
}
:host(.tx-switch) > input:disabled + span:before {
    border-color: var(--tx-gray-400);
}
:host(.tx-switch) > input:disabled + span + label {
    color: var(--tx-gray-400);
}`);class re extends ee{constructor(t){super(t),this.classList.add("tx-switch"),this.input=Ct(),this.input.type="checkbox",this.input.onchange=()=>{this.updateModel()},this.attachShadow({mode:"open"}),this.shadowRoot.adoptedStyleSheets=[ae],this.shadowRoot.appendChild(this.input),this.shadowRoot.appendChild(yt())}}re.define("tx-switch",re);const le=new CSSStyleSheet;le.replaceSync(mt`
:host(.tx-radio) {
    display: inline-flex;
    align-items: flex-start;
    position: relative;
    vertical-align: top;
    padding: 2px;
}
/* an invisible radiobutton will overlay everything, handling input and state */
:host(.tx-radio) > input {
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    box-sizing: absolute;
    margin: 0;
    padding: 0;
    opacity: 0;
    z-index: 1;
}

/* the span provides the visual appearance */
:host(.tx-radio) > span {
    display: block;
    position: relative;
    left: 0;
    top: 2px;
    margin-right: 3px;
    box-sizing: border-box;
    flex-grow: 0;
    flex-shrink: 0;

    border: 2px solid var(--tx-gray-700);
    border-radius: 7px;

    width: 14px;
    height: 14px;
    background: none;
}

/* focus ring */
:host(.tx-radio) > input:focus-visible + span {
    outline: 2px solid;
    outline-color: var(--tx-outline-color);
    outline-offset: 2px;
}
/* this is the knob on the switch */
:host(.tx-radio) > span:before {
    display: block;
    position: absolute;
    left: 0px;
    top: 0px;
    width: 10px;
    height: 10px;
    background: var(--tx-gray-75);
    border: 2px solid var(--tx-gray-75);
    border-radius: 7px;
    content: "";
    box-sizing: border-box;

    /* 'transform' usually can be GPU acclerated while 'left' can not */
    transition: opacity 130ms ease-in-out;
}
:host(.tx-radio) > input:checked + span:before {
    background: var(--tx-gray-700);
}
:host(.tx-radio) > input:checked:hover + span:before {
    background: var(--tx-gray-900);
}
:host(.tx-radio) > input:hover + span {
    border-color: var(--tx-gray-900);
}

:host(.tx-radio) > input:checked:disabled + span:before {
    background: var(--tx-gray-500);
}
:host(.tx-radio) > input:disabled + span {
    border-color: var(--tx-gray-500);
}
:host(.tx-radio) > input:disabled + span + label {
    color: var(--tx-gray-500);
}
`);class he extends Ut{constructor(t){super(t),this.value=t?.value,this.updateModel=this.updateModel.bind(this),this.updateView=this.updateView.bind(this),this.classList.add("tx-radio"),this.input=Ct(),this.input.type="radio",this.input.onchange=this.updateModel,this.input.disabled=!0,this.label=((...t)=>xt("label",t))(),this.attachShadow({mode:"open",delegatesFocus:!0}),this.shadowRoot.adoptedStyleSheets=[le],this.shadowRoot.replaceChildren(this.input,yt(),this.label)}updateModel(){this.input.checked&&void 0!==this.model&&(this.model.value=this.value)}updateView(){if(void 0!==this.model){let t=he.radioGroups.get(this.model);void 0===t&&(t=++he.radioGroupCounter,he.radioGroups.set(this.model,t)),this.input.name=`tx-radio-group-${t}`,this.input.value=`${this.model.indexOf(this.value)}`,this.childNodes.length>0?this.label.replaceChildren(wt()):this.label.replaceChildren(this.model.labelOf(this.value))}else this.input.name="";this.model&&this.model.enabled&&this.model.isEnabledOf(this.value)?this.input.removeAttribute("disabled"):this.input.setAttribute("disabled",""),this.model&&(this.input.checked=this.model.value===this.value)}}var de;he.radioGroupCounter=0,he.radioGroups=new WeakMap,he.define("tx-radio",he),function(t){t[t.WAIT=0]="WAIT",t[t.DOWN=1]="DOWN",t[t.UP_N_HOLD=2]="UP_N_HOLD",t[t.DOWN_N_HOLD=3]="DOWN_N_HOLD",t[t.DOWN_N_OUTSIDE=4]="DOWN_N_OUTSIDE",t[t.DOWN_N_INSIDE_AGAIN=5]="DOWN_N_INSIDE_AGAIN"}(de||(de={}));class ce extends Wt{constructor(t){super(t),this.vertical=!0,this.closeOnClose=!1,this.state=de.WAIT}}class ue extends ce{constructor(t,e){super(),this.vertical=!0,this.root=t,this.parentButton=e,this.popup=document.createElement("div"),this.popup.classList.add("menu-popup");let i=t.down;for(;i;)i.isAvailable()?i.createWindowAt(this,this.popup):i.deleteWindow(),i=i.next;this.appendChild(this.popup),this.show()}show(){this.parentButton.master.vertical?function(t,e){let i=t.getBoundingClientRect();e.style.opacity="0",e.style.left=i.left+i.width+"px",e.style.top=i.top+"px",setTimeout((function(){let t=e.getBoundingClientRect();i.top+t.height>window.innerHeight&&(e.style.top=i.top+i.height-t.height+"px"),i.left+i.width+t.width>window.innerWidth&&(e.style.left=i.left-t.width+"px"),e.style.opacity="1"}),0)}(this.parentButton,this.popup):pe(this.parentButton,this.popup),this.style.display=""}hide(){this.style.display="none"}}function pe(t,e){let i=t.getBoundingClientRect();e.style.opacity="0",e.style.left=i.left+"px",e.style.top=i.top+i.height+"px",setTimeout((function(){let t=e.getBoundingClientRect(),s=i.top+i.height+t.height;if(s>window.innerHeight){const o=i.top-t.height;(o>0||-o<s-window.innerHeight)&&(e.style.top=`${o}px`)}i.left+t.width>window.innerWidth&&(e.style.left=i.left+i.width-t.width+"px"),e.style.opacity="1"}),0)}Wt.define("tx-popupmenu",ue);const ge=new CSSStyleSheet;ge.replaceSync(mt`
:host(.tx-combobox) {
    display: inline-flex;
    align-items: flex-start;
    position: relative;
    vertical-align: top;
}
:host(.tx-combobox) > :first-child {
    box-sizing: border-box;
    width: 100%;
    height: 32px;
    line-height: 30px; /* center text vertically */
    overflow: hidden; /* children shall not overlap our border */
    margin: 0;
    padding: 0;
    vertical-align: top;
    text-align: left;
    outline: none;
    display: inline-block;
    border: 1px solid var(--tx-gray-400);
    border-radius: 4px;
    background-color: var(--tx-gray-50);
    
    color: var(--tx-gray-900);  
    font-weight: var(--tx-edit-font-weight);
    font-size: var(--tx-edit-font-size);
}
:host(.tx-combobox) > input:first-child {
    padding: 4px 32px 4px 11px;
}
:host(.tx-combobox) > :first-child > :first-child {
    padding-left: 7px;
}
:host(.tx-combobox) > :first-child::placeholder {
    color: var(--tx-placeholder-fg-color);
    font-style: italic;
    font-weight: 300;
}
:host(.tx-combobox) > button {
    position: absolute;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-style: none;
    box-sizing: border-box;
    overflow: visible;
    margin: 0;
    text-transform: none;

    width: 32px;
    height: 32px;
    background-color: var(--tx-gray-75);
    border-radius: 0 4px 4px 0;
    border: 1px solid var(--tx-gray-400);
}
:host(.tx-combobox) > button > svg {
    fill: var(--tx-gray-700);
    transform: rotate(90deg) translate(5px, 8px);
}

:host(.tx-combobox) > :first-child:hover {
    border-color: var(--tx-gray-500);
}
:host(.tx-combobox) > button:hover {
    border-color: var(--tx-gray-500);
    background-color: var(--tx-gray-50);
}
:host(.tx-combobox) > button:hover > svg {
    fill: var(--tx-gray-900);
}

:host(.tx-combobox) > :first-child:focus {
    border-color: var(--tx-outline-color);
}
:host(.tx-combobox) > :first-child:focus + button {
    border-color: var(--tx-outline-color);
}
/* spectrum use a 1px focus ring when the focus was set by mouse
 * and a 2px focus ring when the focus was set by keyboard
 * no clue how to do that with css
 *
/* :host(.tx-combobox) > input:focus-visible {
    outline: 1px solid var(--tx-outline-color);
}
:host(.tx-combobox) > input:focus-visible + button {
    outline: 1px solid var(--tx-outline-color);
    border-left: none;
} */

:host(.tx-combobox) > :first-child.tx-disabled {
    color: var(--tx-gray-700);
    background-color: var(--tx-gray-200);
    border-color: var(--tx-gray-200);
}
:host(.tx-combobox) > :first-child.tx-disabled > * {
    color: var(--tx-gray-500);
    background-color: var(--tx-gray-200);
    border-color: var(--tx-gray-200);
}
:host(.tx-combobox) > :first-child.tx-disabled + button {
    background-color: var(--tx-gray-200);
    border-color: var(--tx-gray-200);
}
:host(.tx-combobox) > :first-child.tx-disabled + button > svg {
    fill: var(--tx-gray-400);
}
:host(.tx-combobox) > :first-child.tx-error {
    color: var(--tx-warning-color);
    border-color: var(--tx-warning-color)
}
:host(.tx-combobox) > :first-child.tx-error + button {
    border-color: var(--tx-warning-color)
}
`);const fe=new CSSStyleSheet;fe.replaceSync(mt`
.tx-popover {
    background-color: var(--tx-gray-50);
    border: 1px solid var(--tx-gray-400);
    border-radius: 4px;
    display: inline-flex;
    flex-direction: column;
    filter: drop-shadow(rgba(0, 0, 0, 0.5) 0px 1px 4px);
}
.tx-menu {
    display: inline-block;
    padding: 0;
    margin: 2px 0 2px 0;
}
.tx-menu > li {
    cursor: pointer;
    display: flex;
    border: none;
    border-left: 2px solid var(--tx-gray-50);
    margin-right: 2px;
    padding: 0;
    margin: 0;
    font-weight: 500;
    outline: none;
}
.tx-menu > li:first-child {
    border-top-right-radius: 4px;
    overflow: hidden;
}
.tx-menu > li:last-child {
    border-bottom-right-radius: 4px;
    overflow: hidden;
}
.tx-menu > li > :first-child {
    padding: 7px 11px 7px 10px;
}
.tx-menu > li:hover {
    background-color: var(--tx-gray-100);
    border-color: var(--tx-gray-100);
}
.tx-menu > li.tx-hover {
    filter: brightness(1.2);
    backdrop-filter: brightness(1.2);
    border-color: var(--tx-gray-100);
}
.tx-menu > li:focus {
    border-left-color: var(--tx-outline-color);
}
.tx-menu > li[role=separator] {
    display: block;
    box-sizing: content-box;
    overflow: visible;
    cursor: default;
    height: 2px;
    padding: 0px;
    margin: 1.5px 7px 1.5px 7px;
    background-color: var(--tx-gray-100);
    white-space: pre;
    list-style-type: none;
}
.tx-menu > li.tx-disabled {
    color: var(--tx-gray-500);
}
.tx-menu > li.tx-disabled:hover {
    background-color: var(--tx-gray-50);
}`);class me extends Ut{constructor(t){let e;super(t),this.pointerup=this.pointerup.bind(this),this.pointermove=this.pointermove.bind(this),this.pointerdown=this.pointerdown.bind(this),this.wheel=this.wheel.bind(this),this.keydown=this.keydown.bind(this);const i=kt(e=At(Ht("M3 9.95a.875.875 0 01-.615-1.498L5.88 5 2.385 1.547A.875.875 0 013.615.302L7.74 4.377a.876.876 0 010 1.246L3.615 9.698A.872.872 0 013 9.95z")));this.button=i,i.tabIndex=-1,i.style.outline="none",e.style.width="100%",e.style.height="100%",i.onpointerdown=this.pointerdown,i.onpointermove=this.pointermove,i.onpointerup=this.pointerup,this.classList.add("tx-combobox"),this.attachShadow({mode:"open"}),this.shadowRoot.adoptedStyleSheets=[ge,fe]}finalize(){this.displayElement.onwheel=this.button.onwheel=this.wheel,this.shadowRoot.replaceChildren(this.displayElement,this.button)}keydown(t){if(t.preventDefault(),this.model)switch(t.key){case"ArrowUp":this.model.prev();break;case"ArrowDown":this.model.next();break;case"Enter":this.togglePopup();break;case"Escape":void 0!==this.popup&&this.close()}}wheel(t){t.preventDefault(),void 0!==this.model&&this.model.enabled&&(this.displayElement.focus(),t.deltaY>0&&this.model.next(),t.deltaY<0&&this.model.prev())}pointerdown(t){t.preventDefault(),void 0!==this.model&&this.model.enabled&&(this.popup?this.close():(this.displayElement.focus(),this.open(),this.button.setPointerCapture(t.pointerId)))}pointermove(t){if(void 0===this.popup)return;let e=this.findMenuItem(t);this.hover!==e&&(this.hover&&this.hover.classList.remove("tx-hover"),this.hover=e,this.hover&&this.hover.classList.add("tx-hover"))}findMenuItem(t){let e=this.shadowRoot.elementFromPoint(t.clientX,t.clientY);for(;e&&("LI"!==e.nodeName||!e.parentElement?.classList.contains("tx-menu")||!e.parentElement?.parentElement?.classList.contains("tx-popover"));)e=e?.parentElement;return e||void 0}pointerup(t){if(this.hover){const t=parseInt(this.hover.dataset.idx);return this.close(),void this.select(t)}const e=this.shadowRoot.elementFromPoint(t.clientX,t.clientY);this.displayElement.contains(e)||this.button.contains(e)||this.close()}togglePopup(){this.popup?this.close():this.open()}open(){this.popup=bt(),this.model&&this.popup.replaceChildren(n("ul",{class:"tx-menu","aria-roledescription":"listbox",children:this.model.map(((t,e,i)=>{const s=Et(this.model.asHtml(e));return s.tabIndex=0,s.ariaRoleDescription="option",s.dataset.idx=`${i}`,s.onpointerdown=t=>{this.button.setPointerCapture(t.pointerId),this.hover=s,t.preventDefault()},s.onkeydown=this.keydown,s}))})),this.popup.classList.add("tx-popover"),this.popup.style.position="fixed",this.popup.style.zIndex="99",this.shadowRoot.appendChild(this.popup),pe(this,this.popup),this.focusToItem()}focusToItem(){if(this.popup&&this.model){void 0!==this.model.index&&this.popup.children[0].children[this.model.index].focus()}}close(){this.hover=void 0,void 0!==this.popup&&(this.shadowRoot.removeChild(this.popup),this.popup=void 0,this.displayElement.focus())}select(t){this.model&&(this.model.index=t)}updateView(){this.model&&this.model.enabled?(this.displayElement.classList.remove("tx-disabled"),this.displayElement.removeAttribute("disabled"),this.button.removeAttribute("disabled")):(this.displayElement.classList.add("tx-disabled"),this.displayElement.setAttribute("disabled",""),this.button.setAttribute("disabled","")),void 0!==this.model?.error?this.displayElement.classList.add("tx-error"):this.displayElement.classList.remove("tx-error")}}class xe extends me{constructor(t){super(t),this.displayElement=bt(),this.displayElement.tabIndex=0,this.displayElement.style.minWidth="200px",this.displayElement.onpointerdown=this.pointerdown,this.displayElement.onkeydown=this.keydown,this.finalize()}updateView(){super.updateView(),void 0!==this.model&&this.displayElement.replaceChildren(this.model.html),this.focusToItem()}}class ve extends me{constructor(t){super(t),this.textModel=t?.text,this.displayElement=Ct(),this.displayElement.type="text",this.displayElement.onkeydown=t=>{"Enter"!==t.key&&void 0===this.popup||this.keydown(t)},this.displayElement.oninput=()=>{this.updateModel()},this.finalize()}close(){super.close(),void 0===this.popup&&this.displayElement.focus()}updateModel(){this.model&&("number"==typeof this.model.value?this.model.value=Number.parseFloat(this.displayElement.value):this.model.value=this.displayElement.value),this.textModel&&(this.textModel.value=this.displayElement.value)}updateView(){super.updateView(),void 0!==this.model&&(this.displayElement.value=`${this.model.value}`),this.focusToItem()}}xe.define("tx-select",xe),ve.define("tx-combobox",ve);const be=new CSSStyleSheet;function ye(t){let e,i,s,o,n;return e=(t=t.trim()).match(/^#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])$/),null!==e?(i=parseInt(e[1],16),s=parseInt(e[2],16),o=parseInt(e[3],16),i=16*i+i,s=16*s+s,o=16*o+o,n=1,{r:i,g:s,b:o,a:n}):(e=t.match(/^#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/),null!==e?(i=parseInt(e[1],16),s=parseInt(e[2],16),o=parseInt(e[3],16),n=1,{r:i,g:s,b:o,a:n}):(e=t.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/),null!==e?(i=parseInt(e[1]),s=parseInt(e[2]),o=parseInt(e[3]),n=1,{r:i,g:s,b:o,a:n}):(e=t.match(/^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/),null!==e?(i=parseInt(e[1]),s=parseInt(e[2]),o=parseInt(e[3]),n=parseInt(e[4]),{r:i,g:s,b:o,a:n}):void 0)))}be.replaceSync(mt`
    :host {
        position: relative;
        box-sizing: content-box;
        display: inline-block;
    }

    :host(:not([orientation="vertical"])) {
        height: 4px;
        width: 100%;
        padding-top: 8px;
        padding-bottom: 8px;
    }

    :host([orientation="vertical"]) {
        width: 4px;
        height: 100%;
        padding-left: 8px;
        padding-right: 8px;
    }

    .tx-space {
        position: absolute;
        box-sizing: content-box;
        padding: 0;
        margin: 0;
        border: 0;
    }

    :host(:not([orientation="vertical"])) .tx-space {
        left: 8px;
        right: 8px;
        top: 0;
        bottom: 0;
    }

    :host([orientation="vertical"]) .tx-space {
        left: 0;
        right: 0;
        top: 8px;
        bottom: 8px;
    }

    .tx-rail {
        background-color: var(--tx-gray-300);
        position: absolute;
        display: block;
        border-radius: 2px;
    }

    :host(:not([orientation="vertical"])) .tx-rail {
        top: 50%;
        width: 100%;
        height: 2px;
        transform: translateY(-50%);
    }

    :host([orientation="vertical"]) .tx-rail {
        left: 50%;
        height: 100%;
        width: 2px;
        transform: translateX(-50%);
    }

    :host([disabled]) .tx-rail {
        background-color: var(--tx-gray-100);
    }
    :host([disabled]) .tx-track {
        background-color: var(--tx-gray-100);
    }
    :host([disabled]) .tx-thumb {
        border-color: var(--tx-gray-500);
    }
    .tx-track {
        background-color: var(--tx-gray-700);
        position: absolute;
        display: block;
        border-radius: 2px;
    }

    :host(:not([orientation="vertical"])) .tx-track {  
        top: 50%;
        height: 2px;
        transform: translateY(-50%);
    }

    :host([orientation="vertical"]) .tx-track {  
        left: 50%;
        width: 2px;
        transform: translateX(-50%);
    }

    .tx-thumb {
        border: 2px solid var(--tx-gray-700); /* knob border */
        border-radius: 50%;
        background: var(--tx-gray-75); /* inside knob */
        cursor: pointer;
        position: absolute;
        display: flex;
        width: 14px;
        height: 14px;
        box-sizing: border-box;
        outline-width: 0px;
        border-radius: 50%;
        transform: translate(-50%, -50%);
    }
    .tx-thumb:hover {
        border-color: var(--tx-gray-800)
    }

    :host(:not([orientation="vertical"])) .tx-thumb { 
        top: 50%;
    }
    :host([orientation="vertical"]) .tx-thumb { 
        left: 50%;
    }

    .tx-focus {
        outline: 2px solid;
        outline-color: var(--tx-outline-color);
        outline-offset: 1px;
    }

    .tx-thumb>input {
        border: 0;
        clip: rect(0, 0, 0, 0);
        width: 100%;
        height: 100%;
        margin: -1px;
        /* this hides most of the slider and centers the thumb */
        overflow: hidden;
        position: absolute;
        white-space: nowrap;
        direction: ltr;
    }
`);class we extends Ut{constructor(t){let e,i,s,o,n;super(t),this.vertical=t?"vertical"===t.orientation:"vertical"===this.getAttribute("orientation"),e=bt(i=yt(),s=yt(),o=yt(n=Ct())),e.classList.add("tx-space"),i.classList.add("tx-rail"),s.classList.add("tx-track"),o.classList.add("tx-thumb"),n.type="range",this.input=n,this.rail=i,this.track=s,this.thumb=o;const a=t?t.minColor:this.getAttribute("minColor"),r=t?t.maxColor:this.getAttribute("maxColor");let l;a&&(this.minColor=ye(a)),r&&(this.maxColor=ye(r)),this.setGradient(),this.updateView(),n.onfocus=()=>{o.classList.add("tx-focus")},n.onblur=()=>{o.classList.remove("tx-focus")},n.oninput=()=>{this.model&&(this.model.value=parseFloat(n.value))},o.onpointerdown=t=>{if(!0!==this.model?.enabled)return;o.setPointerCapture(t.pointerId);const e=parseFloat(n.value),i=this.getBoundingClientRect(),s=parseFloat(n.min),a=parseFloat(n.max);if(this.vertical){const o=a-(t.clientY-i.y)/i.height*(a-s);l=e-o}else{const o=(t.clientX-i.x)/i.width*(a-s)+s;l=e-o}},o.onpointermove=t=>{if(void 0===l)return;t.preventDefault();const e=this.getBoundingClientRect(),i=parseFloat(n.min),s=parseFloat(n.max);let o;o=this.vertical?s-(t.clientY-e.y)/e.height*(s-i):(t.clientX-e.x)/e.width*(s-i)+i+l,o<i&&(o=i),o>s&&(o=s),this.model&&(this.model.value=o)},o.onpointerup=t=>{void 0!==l&&(o.onpointermove(t),l=void 0)},this.attachShadow({mode:"open",delegatesFocus:!0}),this.shadowRoot.adoptedStyleSheets=[be],this.shadowRoot.replaceChildren(e)}setGradient(){if(this.minColor&&this.maxColor){if(!0===this.model?.enabled){const t=this.vertical?"0deg":"90deg",e=this.minColor,i=this.maxColor;this.rail.style.backgroundImage=`linear-gradient(${t}, rgb(${e.r},${e.g},${e.b}), rgb(${i.r},${i.g},${i.b}))`}else this.rail.style.backgroundImage="";this.track.style.display="none"}}updateModel(){this.model&&(this.model.value=Number.parseFloat(this.input.value))}updateView(){if(this.setGradient(),!this.model)return void this.setAttribute("disabled","disabled");this.model.enabled?this.removeAttribute("disabled"):this.setAttribute("disabled","disabled"),void 0===this.model.step&&void 0!==this.model.min&&void 0!==this.model.max?this.input.step=""+(this.model.max-this.model.min)/100:this.input.step=String(this.model.step),this.input.min=String(this.model.min),this.input.max=String(this.model.max),this.input.value=String(this.model.value);const t=this.model.min,e=this.model.max;let i=(this.model.value-t)/(e-t);if(this.minColor&&this.maxColor)if(!0!==this.model?.enabled)this.thumb.style.backgroundColor="";else{const t=`rgb(${(this.maxColor.r-this.minColor.r)*i+this.minColor.r},${(this.maxColor.g-this.minColor.g)*i+this.minColor.g},${(this.maxColor.b-this.minColor.b)*i+this.minColor.b})`;this.thumb.style.backgroundColor=t}i*=100,this.vertical?(this.track.style.top=100-i+"%",this.track.style.height=`${i}%`,this.thumb.style.top=100-i+"%"):(this.track.style.left="0%",this.track.style.width=`${i}%`,this.thumb.style.left=`${i}%`)}}we.define("tx-slider",we);class Ce extends Wt{static focusIn(t){const e=new Map;for(let i=t.parentElement,s=0;null!==i;i=i.parentElement,++s)e.set(i,s);let i,s,o=Number.MAX_SAFE_INTEGER,n=new Array;for(const s of this.allTools.values())if(s.canHandle(t))for(let t=s.parentElement,a=0;null!==t;t=t.parentElement,++a){const a=e.get(t);void 0!==a&&(o<a||(o>a&&(n.length=0),o=a,i=t,n.push(s)))}if(!i)return;const a=Ce.getIndex(t,i);let r=Number.MIN_SAFE_INTEGER;for(let t of n){const e=Ce.getIndex(t,i);e<a&&e>r&&(r=e,s=t)}this.setActive(s,t)}static getIndex(t,e){void 0===e&&console.trace(`GenericTool.getIndex(${t}, ${e})`);let i=t;for(;i.parentElement!==e;)i=i.parentElement;return Array.from(e.childNodes).indexOf(i)}static setActive(t,e){this.activeTool&&this.activeTool.deactivate(),this.activeTool=t,this.activeView=e,t&&t.activate()}static focusOut(t){this.activeView===t&&this.setActive(void 0,void 0)}connectedCallback(){super.connectedCallback(),Ce.allTools.add(this)}disconnectedCallback(){Ce.activeTool===this&&Ce.setActive(void 0,void 0),Ce.allTools.delete(this),super.disconnectedCallback()}}Ce.allTools=new Set,window.addEventListener("focusin",(t=>{t.target instanceof Ce||(t.relatedTarget instanceof Wt&&Ce.focusOut(t.relatedTarget),t.target instanceof Wt&&Ce.focusIn(t.target))}));const ke=new CSSStyleSheet;ke.replaceSync(mt`
:host {
    display: inline-block;
    overflow: hidden;
    box-sizing: border-box;
    border: 1px solid var(--tx-gray-400);
    border-radius: 3px;
    background: var(--tx-gray-400);
    color: var(--tx-gray-900);
    width: 24px;
    height: 22px;
    margin: 0;
    padding: 0;
}

:host([selected]) {
    background-color: var(--tx-gray-100);
    border: 1px solid var(--tx-gray-100);
}

:host([disabled]) {
    opacity: 0.5;
}

:host([disabled]) img {
    opacity: 0.5;
}
`);class _e extends Ut{constructor(t){super(t),t?this.setAttribute("value",`${t.value}`):t={value:this.getAttribute("value")},this.value=t?.value,this.onpointerdown=t=>{this.hasAttribute("disabled")||(this.focus(),t.preventDefault(),void 0!==this.model&&(this.model.value=this.value))},this.attachShadow({mode:"open",delegatesFocus:!0}),this.shadowRoot.adoptedStyleSheets=[ke],this.shadowRoot.appendChild(document.createElement("slot"))}connectedCallback(){super.connectedCallback(),void 0===this.model&&this.setAttribute("disabled","")}updateView(){if(void 0===this.model)return this.setAttribute("disabled",""),void this.removeAttribute("selected");this.model.enabled&&this.model.isEnabledOf(this.value)?this.removeAttribute("disabled"):this.setAttribute("disabled",""),this.model.value===this.value?this.setAttribute("selected",""):this.removeAttribute("selected")}}_e.define("tx-toolbutton",_e);class Ee extends Ut{constructor(t){super(t)}updateView(){if(!this.model)return;let t=void 0===this.model.value?"":this.model.value;this.model instanceof Nt?this.innerHTML=t:this.innerText=t}}Ee.define("tx-slot",Ee);class Se extends Ut{constructor(t){super(t)}updateView(){this.model&&(this.style.display=this.model.value?"":"none")}}Se.define("tx-if",Se);const Ae=new CSSStyleSheet;Ae.replaceSync(mt`
    /*
     * tabs, line, content
     */
    :host {
        /* position: relative; */
        display: grid;
        /* flex-wrap: nowrap; */
        /* box-sizing: border-box; */
        margin: 0;
        padding: 0;
    }
    :host(:not(.tx-vertical)) {
        /* flex-direction: column; */
        /* display: grid; */
        /* height: */
        grid-template-rows: 0 max-content auto;
        grid-template-columns: 1;
        /* https://stackoverflow.com/questions/43311943/prevent-content-from-expanding-grid-items */
        /* https://www.w3.org/TR/css3-grid-layout/#min-size-auto */
        min-width: 0;
    }
    :host(.tx-vertical) {
        grid-template-rows: 1;
        grid-template-columns: 0 max-content auto;
        min-height: 0;
    }

    /*
     * tabs
     */
    :host > ul {
        display: flex;
        flex-wrap: nowrap;
        list-style: none;
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }
    :host(:not(.tx-vertical)) > ul {
        flex-direction: row;
        border-bottom: 2px solid var(--tx-gray-200);
    }
    :host(.tx-vertical) > ul {
        flex-direction: column;
         border-left: 2px solid var(--tx-gray-200);
    }
    :host > ul > li {
        box-sizing: border-box;
        list-style: none;
    }

    /*
     * label
     */
    :host > ul > li > span {
        display: block;
        list-style: none;
        font-weight: 500;
        margin: 8px 12px 8px 12px;
        color: var(--tx-gray-700);
        cursor: pointer;
    }
    :host(.tx-vertical) > ul > li > span {
        margin: 0;
        padding: 12px 8px 12px 8px;
    }
    :host > ul > li > span.active {
        color: var(--tx-gray-900);
    }
    :host > ul > li > span:hover {
        color: var(--tx-gray-900);
    }

    /*
     * line
     */
    .line-container {
        position: relative;
        overflow: none;
    }
    :host > .line-container > .line {
        position: absolute;
        background-color: var(--tx-gray-900);
        pointer-events: none;
    }
    :host(:not(.tx-vertical)) > .line-container > .line {
        transition: left 0.5s ease-in-out, width 0.5s 0.1s;
        /* position: relative; below labels */
        top: 0px;
        height: 2px;
        left: 12px;
        width: 0px;
    }
    :host(.tx-vertical) > .line-container > .line {
        transition: top 0.5s ease-in-out, width 0.5s 0.1s;
        /* position: absolute; */
        left: 0; /* before labels */
        height: 0px;
        width: 2px;
    }

    /*
     * content
     */
    .content {
        overflow: auto;
    }
`);const He=new CSSStyleSheet;He.replaceSync(mt`
    ::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 5px;
    }
    ::-webkit-scrollbar-track {
        background: #1e1e1e;
    }
    ::-webkit-scrollbar-corner {
        background: #1e1e1e;
    }
    ::-webkit-scrollbar-thumb {
        background: var(--tx-gray-500);
    }
`);class Me extends Ut{constructor(t){let e,i;super(t),this.labelMap=new Map,this.activateTab=this.activateTab.bind(this),this.classList.add("tx-tabs"),this.vertical=this.hasAttribute("vertical")||"vertical"===t?.orientation,this.vertical&&this.classList.add("tx-vertical");const s=[e=yt(this.markerLine=bt()),i=_t(),this.content=bt(wt())];e.classList.add("line-container"),this.markerLine.classList.add("line"),this.content.classList.add("content");let o=this.activeLabel,n=this.activePanel;for(let t=0;t<this.children.length;++t){const e=this.children[t];if(!(e instanceof Te)){console.log(`unexpected <${e.nodeName.toLowerCase()}> within <Tabs>`);continue}const s=e;let a;typeof s.value!=typeof this.model?.value&&console.log(`Type error: Tab<${typeof s.value}>({label="${s.label}", value=${s.value}}) differs from Tabs<${typeof this.model?.value}>({model.value=${this.model?.value}})`),i.appendChild(Et(a=yt(vt(s.getAttribute("label"))))),a.onpointerdown=t=>{t.stopPropagation(),t.preventDefault(),this.activateTab(a,s)},this.labelMap.set(s,a),void 0!==o||void 0!==this.model&&this.model.value!==s.value?s.style.display="none":(o=a,n=s)}this.attachShadow({mode:"open"}),this.shadowRoot.adoptedStyleSheets=[Ae,He],this.shadowRoot.replaceChildren(...s),void 0!==o&&this.activateTab(o,n)}updateView(){if(this.model)for(let t=0;t<this.children.length;++t){const e=this.children[t];if(!(e instanceof Te)){console.log(`unexpected <${e.nodeName.toLowerCase()}> within <Tabs>`);continue}const i=e;if(this.model.value===i.value){this.activateTab(this.labelMap.get(i),i);break}}}activateTab(t,e){this.activePanel!==e&&(void 0!==this.activeLabel&&void 0!==this.activePanel&&(this.activeLabel.classList.remove("active"),this.activePanel.style.display="none",this.activePanel.close()),this.activeLabel=t,this.activePanel=e,this.activePanel.open(),this.activeLabel.classList.add("active"),this.activePanel.style.display="",setTimeout((()=>this.adjustLine()),0),this.model&&void 0!==e.value&&(this.model.value=e.value))}adjustLine(){const t=this.markerLine,e=this.activeLabel;void 0!==e&&(this.vertical?(t.style.top=e.offsetTop-this.offsetTop+"px",t.style.height=`${e.clientHeight}px`):(t.style.top="-2px",t.style.left=e.offsetLeft-this.offsetLeft+"px",t.style.width=`${e.clientWidth}px`))}}Me.define("tx-tabs",Me);class Te extends Wt{constructor(t){super(t),this.value=t?.value,this.label=t?.label,this.content=t?.content}open(){if(0===this.childNodes.length&&void 0!==this.content){const t=this.content();t instanceof Promise?t.then((t=>{if("object"==typeof t&&"default"in t){const e=t.default;if("function"==typeof e){const t=e();t instanceof Promise?t.then((t=>{Re(this,t)})):Re(this,e())}else Re(this,e)}})):Re(this,this.content())}}close(){}}function Re(t,e){for(const i of e)i instanceof Array?Re(t,i):"string"!=typeof i?t.appendChild(i):t.appendChild(document.createTextNode(i))}Wt.define("tx-tab",Te);const Ne=new CSSStyleSheet;Ne.replaceSync(mt`
  :host(.menu-button) {
    font-family: var(--tx-font-family);
    font-size: var(--tx-edit-font-size);
    font-weight: var(--tx-edit-font-weight);
    padding: 7px;
    vertical-align: center;
  
    background: var(--tx-gray-200);
    color: var(--tx-gray-900);
    cursor: default;
  }
  :host(.menu-button:hover) {
    background: var(--tx-gray-300);
  }
  :host(.menu-button.active) {
    background: var(--tx-gray-400);
    color: var(--tx-gray-900);
  }
  :host(.menu-button.disabled) {
    color: var(--tx-gray-500);
  }
  :host(.menu-button.active.disabled) {
    color: var(--tx-gray-700);
  }
  :host(.menu-button.menu-down) {
    padding-right: 20px;
    background-image: url("data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="15" height="14"><path d="M 0 4 l 10 0 l -5 5 Z" fill="#fff" stroke="none"/></svg>')}");
    background-repeat: no-repeat;
    background-position: right center;
  }
  :host(.menu-button.active.menu-down) {
    background-image: url("data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="15" height="14"><path d="M 0 4 l 10 0 l -5 5 Z" fill="#fff" stroke="none"/></svg>')}");
    background-repeat: no-repeat;
    background-position: right center;
  }
  :host(.menu-button.menu-side) {
    padding-right: 20px;
    background-image: url("data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="15" height="14"><path d="M 0 2 l 0 10 l 5 -5 Z" fill="#fff" stroke="none"/></svg>')}");
    background-repeat: no-repeat;
    background-position: right center;
  }
  :host(.menu-button.active.menu-side) {
    background-image: url("data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="15" height="14"><path d="M 0 2 l 0 10 l 5 -5 Z" fill="#fff" stroke="none"/></svg>')}");
    background-repeat: no-repeat;
    background-position: right center;
  }
  .menu-bar {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background-color: var(--tx-gray-200);
  }
  .menu-popup {
    position: fixed;
    display: flex;
    flex-direction: column;
    box-shadow: 2px 2px 5px var(--tx-gray-50);
  }
`);class $e extends Ut{constructor(t,e){super(),this.master=t,this.node=e;let i=this;if(this.classList.add("menu-button"),e.down&&(t.vertical?this.classList.add("menu-side"):this.classList.add("menu-down")),this.updateView(),this.onmousedown=t=>{t.stopPropagation();let e=function(t){document.removeEventListener("mouseup",e,{capture:!0}),t.preventDefault(),setTimeout((()=>{$e.buttonDown&&i.dispatchEvent(new MouseEvent("mouseup",t))}),0)};if(document.addEventListener("mouseup",e,{capture:!0}),$e.buttonDown=!0,!this.master)throw Error("yikes");switch(this.master.state){case de.WAIT:this.master.state=de.DOWN,this.activate();break;case de.UP_N_HOLD:this.master.active!==this?(this.master.state=de.DOWN,this.activate()):this.master.state=de.DOWN_N_HOLD;break;default:throw Error("unexpected state "+this.master.state)}return!1},this.onmouseup=t=>{if(t.stopPropagation(),$e.buttonDown){if($e.buttonDown=!1,!this.master)throw Error("yikes");if(!this.node)throw Error("yikes");switch(this.master.state){case de.DOWN:this.node.isEnabled()&&!this.node.down?(this.trigger(),this.master.state=de.WAIT):(this.master.state=de.UP_N_HOLD,$e.documentMouseDown&&document.removeEventListener("mousedown",$e.documentMouseDown,{capture:!1}),$e.documentMouseDown=function(t){$e.documentMouseDown&&document.removeEventListener("mousedown",$e.documentMouseDown,{capture:!1}),$e.documentMouseDown=void 0,"TOAD-MENUBUTTON"!==t.target.tagName&&i.collapse()},document.addEventListener("mousedown",$e.documentMouseDown,{capture:!1}));break;case de.DOWN_N_HOLD:case de.DOWN_N_OUTSIDE:this.master.state=de.WAIT,this.deactivate(),this.collapse(),this.master.closeOnClose;break;case de.DOWN_N_INSIDE_AGAIN:this.trigger();break;default:throw Error("unexpected state "+this.master.state)}return!1}},this.onmouseout=t=>{if(t.stopPropagation(),!this.master)throw Error("yikes");switch($e.inside=void 0,this.master.state){case de.WAIT:case de.DOWN_N_OUTSIDE:case de.UP_N_HOLD:case de.DOWN_N_HOLD:break;case de.DOWN:case de.DOWN_N_INSIDE_AGAIN:this.master.state=de.DOWN_N_OUTSIDE,this.updateView();break;default:throw Error("unexpected state")}return!1},this.onmouseover=t=>{if(t.stopPropagation(),!i.master)throw Error("yikes");switch($e.inside=i,i.master.state){case de.WAIT:case de.UP_N_HOLD:case de.DOWN_N_OUTSIDE:case de.DOWN_N_HOLD:case de.DOWN:case de.DOWN_N_INSIDE_AGAIN:if(!$e.buttonDown)break;if(!this.master)throw Error("yikes");this.master.active&&this.master.active.deactivate(),this.master.state=de.DOWN_N_INSIDE_AGAIN,this.activate();break;default:throw Error("unexpected state "+i.master.state)}return!1},this.attachShadow({mode:"open"}),!this.shadowRoot)throw Error("yikes");this.shadowRoot.adoptedStyleSheets=[Ne],this.node.modelId||this.shadowRoot.appendChild(document.createTextNode(e.label))}connectedCallback(){if(!this.controller){if(void 0===this.node.down){let t=this.node.title;for(let e=this.node.parent;e&&e.title.length;e=e.parent)t=e.title+"|"+t;t="A:"+t,Dt.registerView(t,this)}if(void 0!==this.node.modelId)if("string"==typeof this.node.modelId){let t="M:"+this.node.modelId;Dt.registerView(t,this)}else this.setModel(this.node.modelId)}}disconnectedCallback(){this.controller&&this.controller.unregisterView(this)}setModel(t){if(!t)return this.action&&this.action.modified.remove(this),this.model=void 0,this.action=void 0,void this.updateView();if(t instanceof $t)this.action=t,this.action.modified.add((()=>{this.updateView()}),this);else{if(!(t instanceof Rt))throw Error("unexpected model of type "+t.constructor.name);this.model=t}this.updateView()}updateView(){if(this.model&&this.model.value){if(!this.shadowRoot)throw Error("yikes");let t=document.createElement("span");this.model instanceof Nt?t.innerHTML=this.model.value:t.innerText=this.model.value,this.shadowRoot.children.length>1&&this.shadowRoot.removeChild(this.shadowRoot.children[1]),this.shadowRoot.children.length>1?this.shadowRoot.insertBefore(t,this.shadowRoot.children[1]):this.shadowRoot.appendChild(t)}if(!this.master)throw Error("yikes");let t=!1;if(this.master.active==this)switch(this.master.state){case de.DOWN:case de.UP_N_HOLD:case de.DOWN_N_HOLD:case de.DOWN_N_INSIDE_AGAIN:t=!0;break;case de.DOWN_N_OUTSIDE:if(!this.node)throw Error("yikes");t=void 0!==this.node.down&&this.node.isEnabled()}this.classList.toggle("active",t),this.classList.toggle("disabled",!this.isEnabled())}isEnabled(){return void 0!==this.node.down||void 0!==this.action&&this.action.enabled}trigger(){this.collapse(),this.action&&this.action.trigger()}collapse(){if(!this.master)throw Error("yikes");this.master.parentButton?this.master.parentButton.collapse():this.deactivate()}openPopup(){if(this.node&&this.node.down){if(!this.shadowRoot)throw Error("yikes");this.popup?this.popup.show():(this.popup=new ue(this.node,this),this.shadowRoot.appendChild(this.popup))}}closePopup(){this.popup&&(this.popup.active&&this.popup.active.deactivate(),this.popup.hide())}activate(){if(!this.master)throw Error("yikes");if(!this.node)throw Error("yikes");let t=this.master.active;this.master.active=this,t&&t!==this&&(t.closePopup(),t.updateView()),this.updateView(),this.openPopup()}deactivate(){if(!this.master)throw Error("yikes");this.master.active===this&&(this.master.active.closePopup(),this.master.active=void 0,this.master.state=de.WAIT,this.updateView())}}$e.define("tx-menubutton",$e);class Le{constructor(t,e,i,s,o){this.title=t,this.label=e,this.shortcut=i,this.type=s||"entry",this.modelId=o}isEnabled(){return!0}isAvailable(){return!0}createWindowAt(t,e){if("spacer"==this.type){let t=document.createElement("span");return t.style.flexGrow="1",void e.appendChild(t)}this.view=new $e(t,this),e.appendChild(this.view)}deleteWindow(){}}class Ie extends ce{constructor(t){super(t),this.config=t?.config,this.vertical=!1,this.root=new Le("","",void 0,void 0)}connectedCallback(){if(super.connectedCallback(),this.tabIndex=0,this.config)return this.config2nodes(this.config,this.root),this.referenceActions(),void this.createShadowDOM();0===this.children.length?(this._observer=new MutationObserver(((t,e)=>{void 0!==this._timer&&clearTimeout(this._timer),this._timer=window.setTimeout((()=>{this._timer=void 0,this.layout2nodes(this.children,this.root),this.referenceActions(),this.createShadowDOM()}),100)})),this._observer.observe(this,{childList:!0,subtree:!0})):(this.layout2nodes(this.children,this.root),this.referenceActions(),this.createShadowDOM())}layout2nodes(t,e){let i=e.down;for(let s of t){let t;switch(s.nodeName){case"TX-MENUSPACER":t=new Le("","","","spacer");break;case"TX-MENUENTRY":t=new Le(Lt(s,"name"),Lt(s,"label"),It(s,"shortcut"),It(s,"type"),It(s,"model"))}if(t&&(t.parent=e,i?i.next=t:e.down=t,i=t),!i)throw Error("yikes");this.layout2nodes(s.children,i)}}config2nodes(t,e){let i=e.down;for(let s of t){let t;if(t=!0===s.space?new Le("","","","spacer"):new Le(s.name,s.label,s.shortcut,s.type,s.model),t&&(t.parent=e,i?i.next=t:e.down=t,i=t),!i)throw Error("yikes");s.sub&&this.config2nodes(s.sub,i)}}referenceActions(){}findNode(t,e){let i=t.indexOf("|"),s=-1==i?t:t.substr(0,i),o=-1==i?"":t.substr(i+1);e||(e=this.root);for(let t=e.down;t;t=t.next)if(t.title==s)return t.down?this.findNode(o,t):t}createShadowDOM(){this.view=document.createElement("div"),this.view.classList.add("menu-bar");let t=this.root.down;for(;t;)t.isAvailable()?t.createWindowAt(this,this.view):t.deleteWindow(),t=t.next;this.attachShadow({mode:"open"}),this.shadowRoot.adoptedStyleSheets=[Ne],this.shadowRoot.appendChild(this.view)}}Ie.define("tx-menu",Ie);class De extends HTMLElement{}Wt.define("tx-menuspacer",De);class Be extends g{isEmpty(){return 0===this.colCount&&0===this.rowCount}}var ze,Ve,Oe;!function(t){t[t.EDIT_CELL=0]="EDIT_CELL",t[t.SELECT_CELL=1]="SELECT_CELL",t[t.SELECT_ROW=2]="SELECT_ROW"}(ze||(ze={}));class Pe{constructor(t,e){this.col=t,this.row=e}toString(){return`TablePos { col:${this.col}, row:${this.row} }`}}class Fe extends g{constructor(t=ze.EDIT_CELL){super(),this.mode=t,this._value=new Pe(0,0)}set col(t){this._value.col!==t&&(this._value.col=t,this.modified.trigger())}get col(){return this._value.col}set row(t){this._value.row!==t&&(this._value.row=t,this.modified.trigger())}get row(){return this._value.row}set value(t){this._value.col===t.col&&this._value.row===t.row||(this._value=t,this.modified.trigger())}get value(){return this._value}toString(){return`SelectionModel {enabled: ${this.enabled}, mode: ${ze[this.mode]}, value: ${this._value}}`}}class We extends Be{constructor(t,e){super(),this.nodeClass=t}}!function(t){t[t.EDIT_ON_FOCUS=0]="EDIT_ON_FOCUS",t[t.EDIT_ON_ENTER=1]="EDIT_ON_ENTER"}(Ve||(Ve={}));class Ue{constructor(){this.editMode=Ve.EDIT_ON_FOCUS,this.seamless=!1,this.expandColumn=!1,this.expandRow=!1}}class je{constructor(t){this.config=new Ue,this.model=t}get colCount(){return void 0===this.model?0:this.model.colCount}get rowCount(){return void 0===this.model?0:this.model.rowCount}getColumnHead(t){}getRowHead(t){}showCell(t,e){}saveCell(t,e){}editCell(t,e){}isViewCompact(){return!1}static register(t,e,i){let s=je.modelToAdapter.get(e);if(void 0===s&&(s=new Map,je.modelToAdapter.set(e,s)),void 0!==i){if(s.has(i))throw Error("attempt to redefine existing table adapter");s.set(i,t)}else{if(s.has(null))throw Error("attempt to redefine existing table adapter");s.set(null,t)}}static unbind(){je.modelToAdapter.clear()}static lookup(t){let e;e=t instanceof We?t.nodeClass:null;const i=je.modelToAdapter.get(Object.getPrototypeOf(t).constructor);let s=i?.get(e);if(void 0===s)for(let i of je.modelToAdapter.keys())if(t instanceof i){s=je.modelToAdapter.get(i)?.get(e);break}if(void 0===s){let i=`TableAdapter.lookup(): Did not find an adapter for model of type ${t.constructor.name}`;if(i+=`\n    Requested adapter: model=${t.constructor.name}, type=${e?.name}\n    Available adapters:`,0===je.modelToAdapter.size)i+=" none.";else for(const[t,e]of je.modelToAdapter)for(const[s,o]of e)i+=`\n        model=${t.name}`,null!=s&&(i+=`, type=${s.name}`);throw Error(i)}return s}}je.modelToAdapter=new Map,function(t){t[t.INSERT_ROW=0]="INSERT_ROW",t[t.REMOVE_ROW=1]="REMOVE_ROW",t[t.INSERT_COL=2]="INSERT_COL",t[t.REMOVE_COL=3]="REMOVE_COL",t[t.CELL_CHANGED=4]="CELL_CHANGED",t[t.RESIZE_ROW=5]="RESIZE_ROW",t[t.RESIZE_COL=6]="RESIZE_COL",t[t.CHANGED=7]="CHANGED"}(Oe||(Oe={}));class Ge{constructor(t,e,i){this.type=t,this.index=e,this.size=i}get col(){return this.index}get row(){return this.size}toString(){return`TableEvent {type: ${Oe[this.type]}, index: ${this.index}, size: ${this.size}}`}}class Xe{constructor(t){this.table=t}get adapter(){return this.table.adapter}get root(){return this.table.root}get measure(){return this.table.measure}getStaging(){const t=this.table.animator;if(void 0===t.current)return;return t.current.bodyStaging}getHeadStaging(){const t=this.table.animator;if(void 0===t.current)return;return t.current.headStaging}get body(){return this.table.body}get splitBody(){return this.table.splitBody}get colHeads(){return this.table.colHeads}set colHeads(t){this.table.colHeads=t}get rowHeads(){return this.table.rowHeads}set rowHeads(t){this.table.rowHeads=t}get colResizeHandles(){return this.table.colResizeHandles}set colResizeHandles(t){this.table.colResizeHandles=t}get rowResizeHandles(){return this.table.rowResizeHandles}set rowResizeHandles(t){this.table.rowResizeHandles=t}set animationDone(t){this.table.animationDone=t}get selection(){return this.table.selection}get style(){return this.table.style}setCellSize(t,e,i,s,o){this.table.setCellSize(t,e,i,s,o)}clearAnimation(){this.table.animation=void 0}}class Je extends Xe{constructor(t){super(t)}prepareStagingWithRows(){this.prepareBodyStaging(),this.prepareRowHeadStaging(),this.table.addStaging(this.bodyStaging,this.headStaging),this.scrollStaging()}prepareStagingWithColumns(){this.prepareBodyStaging(),this.prepareColHeadStaging(),this.table.addStaging(this.bodyStaging,this.headStaging),this.scrollStaging()}prepareBodyStaging(){this.bodyStaging=bt(),this.bodyStaging.className="staging",this.bodyStaging.style.left=this.body.style.left,this.bodyStaging.style.top=this.body.style.top}prepareRowHeadStaging(){void 0!==this.rowHeads&&(this.headStaging=bt(),this.headStaging.classList.add("staging"),this.headStaging.style.top=this.rowHeads.style.top,this.headStaging.style.width=this.rowHeads.style.width)}prepareColHeadStaging(){void 0!==this.colHeads&&(this.headStaging=bt(),this.headStaging.classList.add("staging"),this.headStaging.classList.add("colHack"),this.headStaging.style.left=this.colHeads.style.left,this.headStaging.style.height=this.colHeads.style.height)}disposeStaging(){this.table.removeStaging(this.bodyStaging,this.headStaging)}scrollStaging(){}makeRowMask(t,e){const i=yt();return i.style.boxSizing="content-box",i.style.top=`${t}px`,i.style.height=`${e}px`,i.style.left="0",i.style.right="0",i.style.border="none",i.style.backgroundColor=gi.maskColor,i}makeColumnMask(t,e){const i=yt();return i.style.boxSizing="content-box",i.style.left=`${t}px`,i.style.width=`${e}px`,i.style.top="0",i.style.bottom="0",i.style.border="none",i.style.backgroundColor=gi.maskColor,i}}class Ye extends Je{constructor(t,e){super(t),this.done=!1,this.event=e}prepare(){this.prepareCellsToBeMeasured(),this.prepareStaging()}firstFrame(){this.arrangeInStaging(),this.split()}animationFrame(t){this.animate(this.animationStart+t*this.totalSize)}lastFrame(){this.animate(this.animationStart+this.totalSize),this.join(),this.disposeStaging()}join(){this.done||(this.done=!0,this.joinHeader(),this.joinBody(),this.table.animationDone&&this.table.animationDone())}}class qe extends Ye{constructor(t,e){super(t,e),this.join=this.join.bind(this),this.initialRowCount=this.adapter.rowCount-e.size,qe.current=this}prepareStaging(){this.prepareStagingWithRows()}animate(t){this.splitBody.style.top=`${t}px`,this.mask.style.top=`${t}px`,void 0!==this.rowHeads&&(this.splitHead.style.top=`${t}px`,this.headMask.style.top=`${t}px`)}prepareCellsToBeMeasured(){this.table.prepareMinCellSize();let t=new Array(this.event.size);for(let e=this.event.index;e<this.event.index+this.event.size;++e){const i=this.adapter.getRowHead(e);void 0===this.rowHeads&&void 0!==i&&(this.rowHeads=bt(),this.rowHeads.className="rows",this.root.appendChild(this.rowHeads),this.rowResizeHandles=bt(),this.rowResizeHandles.className="rows",this.root.appendChild(this.rowResizeHandles)),t[e-this.event.index]=i}if(void 0!==this.rowHeads)for(let e=0;e<this.event.size;++e){const i=yt(t[e]);i.className="head",this.measure.appendChild(i)}if(void 0===this.colHeads&&this.adapter.colCount===this.event.size){let t=new Array(this.adapter.colCount);for(let e=0;e<this.adapter.colCount;++e){const i=this.adapter.getColumnHead(e);void 0===this.colHeads&&void 0!==i&&(this.colHeads=bt(),this.colHeads.className="cols",this.root.appendChild(this.colHeads),this.colResizeHandles=bt(),this.colResizeHandles.className="cols",this.root.appendChild(this.colResizeHandles)),t[e]=i}if(void 0!==this.colHeads)for(let e=0;e<this.adapter.colCount;++e){const i=yt(t[e]);i.className="head",this.measure.appendChild(i)}}for(let t=this.event.index;t<this.event.index+this.event.size;++t)for(let e=0;e<this.adapter.colCount;++e){const i=this.table.createCell();this.table.showCell(new Pe(e,t),i),this.measure.appendChild(i)}}arrangeInStaging(){this.table.calculateMinCellSize();const t=this.adapter.config.seamless?0:1;let e=0,i=this.event.index*this.adapter.colCount;if(0!==this.body.children.length)if(i<this.body.children.length){e=ui(this.body.children[i].style.top)}else{let i=this.body.children[this.body.children.length-1],s=i.getBoundingClientRect();e=ui(i.style.top)+s.height-t}let s=new Array(this.adapter.colCount);if(this.body.children.length>0)for(let t=0;t<this.adapter.colCount;++t){const e=this.body.children[t].getBoundingClientRect();s[t]=e.width,this.adapter.config.seamless&&(s[t]+=2)}else s.fill(this.table.minCellWidth);let o=this.table.minCellWidth;if(this.rowHeads&&this.rowHeads.children.length>0){const t=this.rowHeads.children[0].getBoundingClientRect();o=Math.max(o,t.width),this.adapter.config.seamless&&(o+=2)}let n=new Array(this.event.size);if(n.fill(this.table.minCellHeight),this.totalSize=0,i=0,void 0!==this.rowHeads)for(let t=0;t<this.event.size;++t){const e=this.measure.children[i++].getBoundingClientRect();n[t]=Math.max(n[t],e.height),o=Math.max(o,e.width)}o=Math.ceil(o);let a=0;if(void 0!==this.colHeads&&0===this.colHeads.children.length&&this.adapter.rowCount==this.event.size){a=this.table.minCellHeight;for(let t=0;t<this.adapter.colCount;++t){const e=this.measure.children[i++].getBoundingClientRect();s[t]=Math.max(s[t],e.width-this.table.WIDTH_ADJUST),a=Math.max(a,e.height-this.table.HEIGHT_ADJUST)}}else if(void 0!==this.colHeads){a=this.colHeads.children[0].getBoundingClientRect().height-this.table.HEIGHT_ADJUST}a=Math.ceil(a),this.rowHeads&&(this.rowHeads.style.top=0===a?"0px":a+this.table.HEIGHT_ADJUST-t+"px",this.rowHeads.style.bottom="0px",this.rowHeads.style.width=`${o}px`,this.body.style.left=o-t+"px",this.bodyStaging.style.left=o-t+"px");for(let e=0;e<this.event.size;++e){for(let t=0;t<this.adapter.colCount;++t){const o=this.measure.children[i++].getBoundingClientRect();n[e]=Math.max(n[e],o.height),this.adapter.config.expandColumn?s[t]=Math.ceil(Math.max(s[t],o.width)):0===e&&0===this.body.children.length&&(s[t]=Math.ceil(o.width))}this.totalSize+=n[e]-t}if(this.adapter.config.expandColumn){i=0;let e=0,o=0;for(;i<this.body.children.length;){const n=this.body.children[i];n.style.left=`${e}px`,n.style.width=s[o]-this.table.WIDTH_ADJUST+"px",e+=s[o]-t,this.adapter.config.seamless&&(e-=2),++o,++i,o>=this.adapter.colCount&&(e=0,o=0)}}this.totalSize+=t,this.adapter.config.seamless&&(this.totalSize-=2*this.event.size);let r=e;if(void 0!==this.rowHeads)for(let e=0;e<this.event.size;++e){const i=this.measure.children[0];this.setCellSize(i,0,r,o,n[e]),this.headStaging.appendChild(i),r+=n[e]-t,this.adapter.config.seamless&&(r-=2)}if(void 0!==this.colHeads&&0===this.colHeads.children.length&&this.adapter.rowCount==this.event.size){let e=0;for(let i=0;i<this.adapter.colCount;++i){const o=this.measure.children[0];o.style.left=`${e}px`,o.style.width=s[i]-this.table.WIDTH_ADJUST+"px",o.style.height=`${a}px`,this.colHeads.appendChild(o),e+=s[i]-t}a+=this.table.HEIGHT_ADJUST,this.body.style.top=a-t+"px",this.bodyStaging.style.top=a-t+"px",this.headStaging.style.top=a-t+"px",this.rowHeads.style.top=a-t+"px",this.colHeads.style.left=o-t+"px",this.colHeads.style.right="0px",this.colHeads.style.height=`${a}px`}r=e;for(let e=0;e<this.event.size;++e){let i=0;for(let o=0;o<this.adapter.colCount;++o){const a=this.measure.children[0];this.setCellSize(a,i,r,s[o],n[e]),this.bodyStaging.appendChild(a),i+=s[o]-t,this.adapter.config.seamless&&(i-=2)}r+=n[e]-t,this.adapter.config.seamless&&(r-=2)}if(this.mask=this.makeRowMask(e,this.totalSize),this.bodyStaging.appendChild(this.mask),void 0!==this.rowHeads&&(this.headMask=this.makeRowMask(e,this.totalSize),this.headStaging.appendChild(this.headMask)),0!==this.initialRowCount){const t=this.adapter.config.seamless?0:1;this.totalSize-=t}}split(){this.table.splitHorizontalNew(this.event.index),void 0!==this.rowHeads&&(this.splitHead=this.rowHeads.lastElementChild),this.animationStart=ui(this.splitBody.style.top)}joinHeader(){if(void 0!==this.rowHeads){for(this.headStaging.removeChild(this.headMask),this.rowHeads.removeChild(this.splitHead);this.headStaging.children.length>0;)this.rowHeads.appendChild(this.headStaging.children[0]);if(this.splitHead.children.length>0){let t=ui(this.splitHead.style.top);for(;this.splitHead.children.length>0;){const e=this.splitHead.children[0];e.style.top=`${ui(e.style.top)+t}px`,this.rowHeads.appendChild(e)}}}}joinBody(){for(this.bodyStaging.removeChild(this.mask),this.body.removeChild(this.splitBody);this.bodyStaging.children.length>0;)this.body.appendChild(this.bodyStaging.children[0]);if(this.splitBody.children.length>0){let t=ui(this.splitBody.style.top);for(;this.splitBody.children.length>0;){const e=this.splitBody.children[0];e.style.top=`${ui(e.style.top)+t}px`,this.body.appendChild(e)}}}}class Ke extends Je{constructor(t,e){if(super(t),this.event=e,this.joinHorizontal=this.joinHorizontal.bind(this),0===this.body.children.length)this.initialHeight=0;else{const t=this.body.children[this.body.children.length-1],e=ui(t.style.top),i=t.getBoundingClientRect();this.initialHeight=e+i.height}this.overlap=this.adapter.config.seamless?0:1,this.removeAll=this.event.index>=this.adapter.rowCount,Ke.current=this}prepare(){this.prepareStagingWithRows(),this.arrangeRowsInStaging(),this.splitHorizontal()}firstFrame(){}animationFrame(t){this.splitBody.style.top=this.topSplitBody-t*this.animationHeight+"px",this.mask.style.top=this.topMask-t*this.animationHeight+"px",void 0!==this.rowHeads&&(this.splitHead.style.top=this.topSplitBody-t*this.animationHeight+"px",this.headMask.style.top=this.topMask-t*this.animationHeight+"px")}lastFrame(){this.joinHorizontal(),this.disposeStaging()}arrangeRowsInStaging(){const t=this.event.index*this.adapter.colCount,e=this.event.size*this.adapter.colCount,i=ui(this.body.children[t].style.top);for(let i=0;i<e;++i)this.bodyStaging.appendChild(this.body.children[t]);let s;if(t<this.body.children.length)s=ui(this.body.children[t].style.top);else{const t=this.bodyStaging.children[this.bodyStaging.children.length-1];s=ui(t.style.top)+ui(t.style.height)+this.table.HEIGHT_ADJUST}if(this.animationHeight=s-i,this.mask=this.makeRowMask(s,this.animationHeight),this.bodyStaging.appendChild(this.mask),void 0!==this.rowHeads){for(let t=0;t<this.event.size;++t)this.headStaging.appendChild(this.rowHeads.children[this.event.index]);this.headMask=this.makeRowMask(s,this.animationHeight),this.headStaging.appendChild(this.headMask)}}splitHorizontal(){this.table.splitHorizontalNew(this.event.index),void 0!==this.rowHeads&&(this.splitHead=this.rowHeads.lastElementChild),this.topSplitBody=ui(this.splitBody.style.top),this.topMask=ui(this.mask.style.top)}joinHorizontal(){this.bodyStaging.removeChild(this.mask),this.body.removeChild(this.splitBody),this.bodyStaging.replaceChildren(),this.moveSplitBodyToBody(),this.rowHeads&&(this.headStaging.removeChild(this.headMask),this.rowHeads.removeChild(this.splitHead),this.headStaging.replaceChildren(),this.moveSplitHeadToHead()),this.table.animationDone&&this.table.animationDone()}moveSplitHeadToHead(){if(0===this.splitHead.children.length)return;let t=ui(this.splitHead.style.top);for(;this.splitHead.children.length>0;){const e=this.splitHead.children[0];e.style.top=`${ui(e.style.top)+t}px`,this.rowHeads.appendChild(e)}}moveSplitBodyToBody(){if(0===this.splitBody.children.length)return;let t=ui(this.splitBody.style.top);for(;this.splitBody.children.length>0;){const e=this.splitBody.children[0];e.style.top=`${ui(e.style.top)+t}px`,this.body.appendChild(e)}}}class Ze extends Ye{constructor(t,e){super(t,e),this.event=e,this.join=this.join.bind(this),this.colCount=this.adapter.colCount,this.rowCount=this.adapter.rowCount,Ze.current=this}prepareStaging(){this.prepareStagingWithColumns()}animate(t){this.mask.style.left=`${t}px`,this.splitBody.style.left=`${t}px`,void 0!==this.colHeads&&(this.splitHead.style.left=`${t}px`,this.headMask.style.left=`${t}px`)}prepareCellsToBeMeasured(){this.table.prepareMinCellSize();let t=new Array(this.event.size);for(let e=this.event.index;e<this.event.index+this.event.size;++e){const i=this.adapter.getColumnHead(e);void 0===this.colHeads&&void 0!==i&&(this.colHeads=bt(),this.colHeads.className="cols",this.root.appendChild(this.colHeads),this.colResizeHandles=bt(),this.colResizeHandles.className="cols",this.root.appendChild(this.colResizeHandles)),t[e-this.event.index]=i}if(void 0!==this.colHeads)for(let e=0;e<this.event.size;++e){const i=yt(t[e]);i.className="head",this.measure.appendChild(i)}if(void 0===this.rowHeads&&this.adapter.rowCount===this.event.size){let t=new Array(this.adapter.rowCount);for(let e=0;e<this.adapter.rowCount;++e){const i=this.adapter.getRowHead(e);void 0===this.rowHeads&&void 0!==i&&(this.rowHeads=bt(),this.rowHeads.className="rows",this.root.appendChild(this.rowHeads),this.rowResizeHandles=bt(),this.rowResizeHandles.className="rows",this.root.appendChild(this.rowResizeHandles)),t[e]=i}if(void 0!==this.rowHeads)for(let e=0;e<this.adapter.rowCount;++e){const i=yt(t[e]);i.className="head",this.measure.appendChild(i)}}for(let t=this.event.index;t<this.event.index+this.event.size;++t)for(let e=0;e<this.rowCount;++e){const i=yt();this.table.showCell(new Pe(t,e),i),this.measure.appendChild(i)}}arrangeInStaging(){this.table.calculateMinCellSize();const t=this.colCount-this.event.size,e=this.adapter.config.seamless?0:1;let i,s=this.event.index;if(s<t){i=ci(this.body.children[s].style.left)}else if(0===this.body.children.length)i=0;else{const s=this.body.children[t-1];i=ci(s.style.left)+ci(s.style.width)+this.table.WIDTH_ADJUST-e}this.animationStart=i;let o=new Array(this.adapter.rowCount);if(0!==this.body.children.length)for(let e=0;e<this.adapter.rowCount;++e){const i=this.body.children[e*t].getBoundingClientRect();o[e]=i.height,this.adapter.config.seamless&&(o[e]+=2)}else o.fill(this.table.minCellHeight);let n=this.table.minCellHeight;if(this.colHeads&&this.colHeads.children.length>0){n=this.colHeads.children[0].getBoundingClientRect().height,this.adapter.config.seamless&&(n+=2)}let a=new Array(this.event.size);if(a.fill(this.table.minCellWidth),this.totalSize=0,s=0,void 0!==this.colHeads)for(let t=0;t<this.event.size;++t){const e=this.measure.children[s++].getBoundingClientRect();a[t]=Math.max(a[t],e.width),n=Math.max(n,e.height)}n=Math.ceil(n);let r=0;if(void 0!==this.rowHeads&&0===this.rowHeads.children.length&&this.adapter.colCount==this.event.size){r=this.table.minCellWidth;for(let t=0;t<this.adapter.rowCount;++t){const e=this.measure.children[s++].getBoundingClientRect();o[t]=Math.max(o[t],e.height-this.table.HEIGHT_ADJUST),r=Math.max(r,e.width-this.table.WIDTH_ADJUST)}}else if(void 0!==this.rowHeads){r=this.rowHeads.children[0].getBoundingClientRect().width-this.table.WIDTH_ADJUST}r=Math.ceil(r),this.colHeads&&(this.colHeads.style.left=0===r?"0px":r+this.table.WIDTH_ADJUST+2-e+"px",this.colHeads.style.right="0px",this.colHeads.style.height=`${n}px`,this.body.style.top=n-1+"px",this.bodyStaging.style.top=n-1+"px");for(let t=0;t<this.event.size;++t){for(let e=0;e<this.adapter.rowCount;++e){const i=this.measure.children[s++].getBoundingClientRect();a[t]=Math.ceil(Math.max(a[t],i.width)-2),this.adapter.config.expandRow?o[t]=Math.ceil(Math.max(o[e],i.height)):0===t&&0===this.body.children.length&&(o[e]=Math.ceil(i.height))}this.totalSize+=a[t]-e}a.forEach(((t,e)=>a[e]=t+4)),this.totalSize+=e,this.adapter.config.seamless&&(this.totalSize-=2*this.event.size);let l=i;if(void 0!==this.colHeads)for(let t=0;t<this.event.size;++t){const i=this.measure.children[0];this.setCellSize(i,l,0,a[t],n),this.headStaging.appendChild(i),l+=a[t]-e,this.adapter.config.seamless&&(l-=2)}if(void 0!==this.rowHeads&&0===this.rowHeads.children.length&&this.adapter.colCount==this.event.size){let t=0;for(let i=0;i<this.adapter.rowCount;++i){const s=this.measure.children[0];s.style.top=`${t}px`,s.style.height=o[i]-this.table.HEIGHT_ADJUST+"px",s.style.width=`${r}px`,this.rowHeads.appendChild(s),t+=o[i]-e}r+=this.table.WIDTH_ADJUST,this.body.style.left=r-e+"px",this.bodyStaging.style.left=r-e+"px",this.headStaging.style.left=r-e+"px",this.colHeads.style.left=r-e+"px",this.rowHeads.style.top=n-e+"px",this.rowHeads.style.bottom="0px",this.rowHeads.style.width=`${r}px`}let h=0;l=i;for(let t=this.event.index;t<this.event.index+this.event.size;++t){let i=a[t-this.event.index],s=0;for(let t=0;t<this.rowCount;++t){const n=this.measure.children[0];this.setCellSize(n,l,s,i,o[t]),this.bodyStaging.appendChild(n),s+=o[t]-e,this.adapter.config.seamless&&(s-=2)}l+=i-e-2,this.adapter.config.seamless||(l+=2),h+=i-2}this.totalSize=h+2,this.mask=this.makeColumnMask(i,this.totalSize),this.bodyStaging.appendChild(this.mask),void 0!==this.colHeads&&(this.headMask=this.makeColumnMask(i,this.totalSize),this.headStaging.appendChild(this.headMask))}split(){this.table.splitVerticalNew(this.event.index),void 0!==this.colHeads&&(this.splitHead=this.colHeads.lastElementChild)}joinHeader(){if(void 0!==this.colHeads){for(this.headStaging.removeChild(this.headMask),this.colHeads.removeChild(this.splitHead);this.headStaging.children.length>0;)this.colHeads.appendChild(this.headStaging.children[0]);if(this.splitHead.children.length>0){let t=ui(this.splitHead.style.left);for(;this.splitHead.children.length>0;){const e=this.splitHead.children[0];e.style.left=`${ui(e.style.left)+t}px`,this.colHeads.appendChild(e)}}}}joinBody(){this.bodyStaging.removeChild(this.mask),this.body.removeChild(this.splitBody);const t=this.adapter.model.colCount,e=this.event.index,i=this.event.size,s=t-i-this.event.index;for(let t=0;t<i;++t)for(let s=0;s<this.rowCount;++s){const o=this.bodyStaging.children[0],n=s*(e+i)+e+t;this.bodyInsertAt(o,n)}let o=this.totalSize+this.animationStart;for(let n=0;n<this.rowCount;++n)for(let a=0;a<s;++a){const s=this.splitBody.children[0];s.style.left=`${ui(s.style.left)+o}px`;const r=n*t+e+i+a;this.bodyInsertAt(s,r)}}bodyInsertAt(t,e){let i;i=e<this.body.children.length?this.body.children[e]:null,this.body.insertBefore(t,i)}}class Qe extends Je{constructor(t,e){if(super(t),this.done=!1,this.colCount=this.adapter.colCount,this.rowCount=this.adapter.rowCount,this.event=e,this.joinVertical=this.joinVertical.bind(this),0===this.body.children.length)this.initialWidth=0;else{const t=this.body.children[this.body.children.length-1],e=ui(t.style.left),i=t.getBoundingClientRect();this.initialWidth=e+i.width}Qe.current=this}prepare(){this.prepareStagingWithColumns(),this.arrangeColumnsInStaging(),this.splitVertical()}firstFrame(){}animationFrame(t){let e=0;this.adapter.config.seamless&&(e=1),this.splitBody.style.left=`${this.leftSplitBody-t*this.animationWidth+e}px`,this.mask.style.left=this.leftMask-t*this.animationWidth+"px",void 0!==this.colHeads&&(this.splitHead.style.left=`${this.leftSplitBody-t*this.animationWidth+e}px`,this.headMask.style.left=this.leftMask-t*this.animationWidth+"px")}lastFrame(){this.joinVertical(),this.disposeStaging()}arrangeColumnsInStaging(){let t=this.event.index;for(let e=0;e<this.adapter.rowCount;++e){for(let e=0;e<this.event.size;++e)this.bodyStaging.appendChild(this.body.children[t]);t+=this.colCount}const e=this.bodyStaging.children[0],i=this.bodyStaging.children[this.bodyStaging.children.length-1];let s=ui(i.style.left)+ui(i.style.width)+this.table.WIDTH_ADJUST;s-=1;let o=s-ui(e.style.left);if(this.animationWidth=o,this.mask=this.makeColumnMask(s,o),this.bodyStaging.appendChild(this.mask),void 0!==this.colHeads){for(let t=0;t<this.event.size;++t)this.headStaging.appendChild(this.colHeads.children[this.event.index]);this.headMask=this.makeColumnMask(s,o),this.headStaging.appendChild(this.headMask)}}splitVertical(){this.table.splitVerticalNew(this.event.index),void 0!==this.colHeads&&(this.splitHead=this.colHeads.lastElementChild);const t=ui(this.splitBody.style.left);this.splitBody.style.width=this.initialWidth-t-1+"px",this.leftSplitBody=t,this.leftMask=ui(this.mask.style.left),void 0!==this.colHeads&&(this.splitHead.style.left=`${t}px`,this.splitHead.style.width=this.initialWidth-t-1+"px")}joinVertical(){this.bodyStaging.removeChild(this.mask),this.body.removeChild(this.splitBody),this.bodyStaging.replaceChildren(),this.moveSplitBodyToBody(),this.colHeads&&(this.headStaging.removeChild(this.headMask),this.colHeads.removeChild(this.splitHead),this.headStaging.replaceChildren(),this.moveSplitHeadToHead()),this.table.animationDone&&this.table.animationDone()}moveSplitHeadToHead(){if(0===this.splitHead.children.length)return;let t=ui(this.splitHead.style.left);for(;this.splitHead.children.length>0;){const e=this.splitHead.children[0];e.style.left=`${ui(e.style.left)+t}px`,this.colHeads.appendChild(e)}}moveSplitBodyToBody(){if(0===this.splitBody.children.length)return;let t=ui(this.splitBody.style.left);for(let e=0;e<this.rowCount;++e)for(let i=0;i<this.colCount-this.event.index;++i){const s=this.splitBody.children[0];s.style.left=`${ui(s.style.left)+t}px`;const o=e*this.adapter.colCount+this.event.index+i;this.bodyInsertAt(s,o)}}bodyInsertAt(t,e){let i;i=e<this.body.children.length?this.body.children[e]:null,this.body.insertBefore(t,i)}}let ti=468;function ei(t){if(void 0===t)return;const e=function(t){for(;t!==document.body&&!1===ri(t);){if(null===t.parentElement)return;t=t.parentElement}return t}(t);if(void 0===e)return;const i=e.getBoundingClientRect(),s=t.getBoundingClientRect();if(e!==document.body){const{x:t,y:o}=function(t,e,i){const s=16,o=i.left+t.scrollLeft-e.left-s,n=i.right+t.scrollLeft-e.left+s,a=i.top+t.scrollTop-e.top-s,r=i.bottom+t.scrollTop-e.top+s,l=t.clientWidth,h=t.clientHeight;var d=t.scrollLeft,c=t.scrollTop;n-o-2*s>l?d=o:n>t.scrollLeft+l?d=n-l:o<t.scrollLeft&&(d=o);r-a-2*s>h?c=a:r>t.scrollTop+h?c=r-h:a<t.scrollTop&&(c=a);return d=Math.max(0,d),c=Math.max(0,c),{x:d,y:c}}(e,i,s);!function(t,e,i){let s,o,n=ii.get(t);void 0===n?(n={x:e,y:i},ii.set(t,n)):(n.x=e,n.y=i);t===document.body?(s=window.scrollX||window.pageXOffset,o=window.scrollY||window.pageYOffset):(s=t.scrollLeft,o=t.scrollTop);const a=e-s,r=i-o;if(0===a&&0===r)return void ii.delete(t);l=l=>{if(n.x!==e||n.y!==i)return!1;const h=s+l*a,d=o+l*r;return t===document.body?window.scrollTo(h,d):(t.scrollLeft=h,t.scrollTop=d),1===l&&ii.delete(t),!0},setTimeout((()=>{window.requestAnimationFrame(oi.bind(window,l,void 0,void 0))}),0);var l}(e,t,o),"fixed"!==window.getComputedStyle(e).position&&window.scrollBy({left:i.left,top:i.top,behavior:"smooth"})}else window.scrollBy({left:s.left,top:s.top,behavior:"smooth"})}const ii=new Map;let si=0;function oi(t,e,i){void 0===e&&(e=Date.now(),i=++si);let s=(Date.now()-e)/ti;s=s>1?1:s;const o=(n=s,.5*(1-Math.cos(Math.PI*n)));var n;!1!==t(o)&&o<1&&window.requestAnimationFrame(oi.bind(window,t,e,i))}var ni,ai=(ni=window.navigator.userAgent,new RegExp(["MSIE ","Trident/","Edge/"].join("|")).test(ni)?1:0);function ri(t){const e=li(t,"Y")&&hi(t,"Y"),i=li(t,"X")&&hi(t,"X");return e||i}function li(t,e){return"X"===e?t.clientWidth+ai<t.scrollWidth:t.clientHeight+ai<t.scrollHeight}function hi(t,e){const i=window.getComputedStyle(t,null)["overflow"+e];return"auto"===i||"scroll"===i}const di=new CSSStyleSheet;function ci(t){return parseInt(t.substring(0,t.length-2))}function ui(t){return parseFloat(t.substring(0,t.length-2))}function pi(t){return!1!==t.isConnected&&("none"!==window.getComputedStyle(t).display&&(!t.parentElement||pi(t.parentElement)))}di.replaceSync(mt`
:host {
    position: relative;
    display: inline-block;
    border: 1px solid var(--tx-gray-300);
    border-radius: 3px;
    /* outline-offset: -2px; */
    outline: none;
    font-family: var(--tx-font-family);
    font-size: var(--tx-font-size);
    background: #1e1e1e;

    /* not sure about these */
    /*
    width: 100%;
    width: -moz-available;
    width: -webkit-fill-available;
    width: fill-available;
    height: 100%;
    height: -moz-available;
    height: -webkit-fill-available;
    height: fill-available;
    */

    min-height: 50px;
    min-width: 50px;
}

.staging, .body, .splitBody, .cols, .rows {
    position: absolute;
}

.cols {
    right: 0;
    top: 0;
}

.rows {
    left: 0;
    bottom: 0;
}

.staging {
    overflow: hidden;
    inset: 0;
}

.body {
    overflow: auto;
    inset: 0;
}

.cols, .rows {
    overflow: hidden;
}

.body > span,
.splitBody > span,
.cols > span,
.rows > span,
.measure > span,
.staging > span {
    position: absolute;
    box-sizing: content-box;
    white-space: nowrap;
    outline: none;
    border: solid 1px var(--tx-gray-200);
    padding: 0 2px 0 2px;
    margin: 0;
    background-color: #080808;
    font-weight: 400;
    overflow: hidden;
    cursor: default;
    caret-color: transparent;
}

.seamless > .body > span,
.seamless > .body > .splitBody > span,
.seamless > .cols > span,
.seamless > .rows > span,
.seamless > .cols > .splitBody > span,
.seamless > .rows > .splitBody > span,
.seamless > .measure > span,
.seamless > .staging > span {
    border: none 0px;
}

.body > span:hover {
    background: #1a1a1a;
}

.body > span.error, .splitBody > span.error {
    border-color: var(--tx-global-red-600);
    z-index: 1;
}

.body > span:focus, .splitBody > span:focus {
    background: #0e2035;
    border-color: #2680eb;
    z-index: 2;
}

.body > span:focus:hover {
    background: #112d4d;
}

.body > span.error, .splitBody > span.error {
    background-color: #522426;
}

.body > span.error:hover {
    background: #401111;
}

.cols > span.handle,
.rows > span.handle {
    padding: 0;
    border: 0 none;
    opacity: 0;
    background-color: #08f;
}
.fill {
    opacity: 0;
}

.cols > span.handle {
    cursor: col-resize;
}
.rows > span.handle {
    cursor: row-resize;
}

.staging span.head,
.cols span.head,
.rows span.head,
.measure span.head {
    background: #1e1e1e;
    font-weight: 600;
}

.colHack > span,
.cols > span {
    text-align: center;
}

.measure {
    position: absolute;
    opacity: 0;
}

.body > span.edit, .splitBody > span.edit, .body > span.edit:hover, .splitBody > span.edit:hover {
    caret-color: currentcolor;
}
`);class gi extends Wt{constructor(t){super(),this.WIDTH_ADJUST=6,this.HEIGHT_ADJUST=2,this.HANDLE_SIZE=5,this.HANDLE_SKEW=3,this.visible=!1,this.animator=new Vt,this.arrangeAllMeasuredInGrid=this.arrangeAllMeasuredInGrid.bind(this),this.hostKeyDown=this.hostKeyDown.bind(this),this.cellKeyDown=this.cellKeyDown.bind(this),this.cellFocus=this.cellFocus.bind(this),this.focusIn=this.focusIn.bind(this),this.focusOut=this.focusOut.bind(this),this.pointerDown=this.pointerDown.bind(this),this.handleDown=this.handleDown.bind(this),this.handleMove=this.handleMove.bind(this),this.handleUp=this.handleUp.bind(this),this.setHeadingFillerSizeToScrollbarSize=this.setHeadingFillerSizeToScrollbarSize.bind(this),this.selectionChanged=this.selectionChanged.bind(this),this.modelChanged=this.modelChanged.bind(this),this.root=bt(this.body=bt()),this.root.className="root",this.body.className="body",this.measure=bt(),this.measure.classList.add("measure"),this.onkeydown=this.hostKeyDown,this.addEventListener("focusin",this.focusIn),this.addEventListener("focusout",this.focusOut),this.body.onresize=this.setHeadingFillerSizeToScrollbarSize,this.body.onscroll=()=>{this.animator.current&&this.animator.current instanceof Je&&this.animator.current.scrollStaging(),this.setHeadingFillerSizeToScrollbarSize(),this.colHeads&&(this.colHeads.scrollLeft=this.body.scrollLeft,this.colResizeHandles.scrollLeft=this.body.scrollLeft),this.rowHeads&&(this.rowHeads.scrollTop=this.body.scrollTop,this.rowResizeHandles.scrollTop=this.body.scrollTop)},this.body.onpointerdown=this.pointerDown,this.attachShadow({mode:"open",delegatesFocus:!0}),this.shadowRoot.adoptedStyleSheets=[di,He],this.shadowRoot.appendChild(this.root),this.shadowRoot.appendChild(this.measure),t&&(r(this,t),t.selectionModel&&this.setModel(t.selectionModel)),void 0===gi.observer&&(gi.observer=new MutationObserver(((t,e)=>{gi.allTables.forEach((t=>{pi(t)&&(gi.allTables.delete(t),t.prepareCells())}))})),gi.observer.observe(document.body,{attributes:!0,subtree:!0}))}connectedCallback(){setTimeout((()=>{pi(this)?this.prepareCells():gi.allTables.add(this)}),0),super.connectedCallback(),void 0===this.selection&&(this.selection=new Fe(ze.SELECT_CELL),this.selection.modified.add(this.selectionChanged,this))}disconnectedCallback(){gi.allTables.delete(this)}addStaging(...t){for(const e of t)void 0!==e&&this.root.insertBefore(e,this.root.children[0])}removeStaging(...t){for(const e of t)void 0!==e&&this.root.removeChild(e)}hostKeyDown(t){if(this.selection)switch(this.selection.mode){case ze.SELECT_ROW:{let e=this.selection.value.row;switch(t.key){case"ArrowDown":e+1<this.adapter.rowCount&&++e;break;case"ArrowUp":e>0&&--e}this.selection.row=e}break;case ze.SELECT_CELL:{let e={col:this.selection.col,row:this.selection.row};switch(t.key){case"ArrowRight":void 0===this.editing&&e.col+1<this.adapter.colCount&&(++e.col,t.preventDefault(),t.stopPropagation());break;case"ArrowLeft":void 0===this.editing&&e.col>0&&(--e.col,t.preventDefault(),t.stopPropagation());break;case"ArrowDown":e.row+1<this.adapter.rowCount&&(++e.row,t.preventDefault(),t.stopPropagation());break;case"ArrowUp":e.row>0&&(--e.row,t.preventDefault(),t.stopPropagation());break;case"Enter":void 0===this.editing?this.adapter?.config.editMode===Ve.EDIT_ON_ENTER&&this.editCell():(this.saveCell(),e.row+1<this.adapter.rowCount&&(++e.row,this.selection.value=e,this.editCell())),t.preventDefault(),t.stopPropagation()}this.selection.value=e}}}cellKeyDown(t){const e=t.target;if("Enter"===t.key)return this.hostKeyDown(t),void t.preventDefault();if(!e.classList.contains("edit")&&void 0===this.editing)switch(t.key){case"ArrowDown":case"ArrowUp":case"ArrowRight":case"ArrowLeft":case"Tab":case"Enter":break;default:this.adapter?.config.editMode===Ve.EDIT_ON_ENTER&&t.preventDefault()}}cellFocus(t){const e=t.target;if(e instanceof HTMLElement){const t=e.getBoundingClientRect(),i=this.clientPosToTablePos(t.x+t.width/2,t.y+t.height/2);void 0!==i&&(this.selection.value=i)}}focusIn(t){}focusOut(t){}editCell(){if(void 0!==this.editing){if(this.editing.col===this.selection.value.col&&this.editing.row===this.selection.value.row)return;console.log("WARN: Table.editCell(): already editing ANOTHER cell")}console.log("Table.editCell()");const t=this.selection.value.col,e=this.selection.value.row,i=this.body.children[t+e*this.adapter.colCount];this.editing=new Pe(t,e),i.classList.add("edit"),this.adapter.editCell(this.editing,i)}saveCell(){if(void 0===this.editing)return;console.log("Table.saveCell()");const t=this.editing.col,e=this.editing.row,i=this.body.children[t+e*this.adapter.colCount];i.classList.remove("edit"),this.adapter.saveCell(this.editing,i),this.editing=void 0,this.focus()}pointerDown(t){}getModel(){return this.model}setModel(t){if(void 0===t)return this.selection&&this.selection.modified.remove(this),this.model=void 0,this.selection=new Fe,void this.selection.modified.add(this.selectionChanged,this);if(t instanceof Fe)return this.selection&&this.selection.modified.remove(this),this.selection=t,void this.selection.modified.add(this.selectionChanged,this);if(t instanceof Be){this.model=t,this.model.modified.add(this.modelChanged,this);const e=je.lookup(t);try{this.adapter=new e(t)}catch(t){throw console.log(`Table.setModel(): failed to instantiate table adapter: ${t}`),console.log("setting TypeScript's target to 'es6' might help"),t}this.prepareCells()}else if(t instanceof Object)throw Error("Table.setModel(): unexpected model of type "+t.constructor.name)}selectionChanged(){if(void 0!==this.selection)switch(this.saveCell(),this.selection.mode){case ze.EDIT_CELL:if(document.activeElement===this){const t=this.body.children[this.selection.col+this.selection.row*this.adapter.colCount];(function(t){if(!document.hasFocus())return!1;let e=document.activeElement;for(;null!==e;){if(e===t)return!0;if(null===e.shadowRoot)break;e=e.shadowRoot.activeElement}return!1})(t)||t.focus(),ei(t),this.adapter?.config.editMode===Ve.EDIT_ON_FOCUS&&this.editCell()}break;case ze.SELECT_CELL:case ze.SELECT_ROW:if(document.activeElement===this){const t=this.body.children[this.selection.col+this.selection.row*this.adapter.colCount];t.focus(),ei(t)}}}modelChanged(t){if(t instanceof Ge)switch(t.type){case Oe.CELL_CHANGED:{const e=this.body.children[t.col+t.row*this.adapter.colCount];this.showCell(t,e)}break;case Oe.INSERT_ROW:this.animator.run(new qe(this,t));break;case Oe.REMOVE_ROW:this.animator.run(new Ke(this,t));break;case Oe.INSERT_COL:this.animator.run(new Ze(this,t));break;case Oe.REMOVE_COL:this.animator.run(new Qe(this,t))}}prepareCells(){this.adapter&&(this.visible=pi(this),this.visible&&0!==this.adapter.colCount&&0!==this.adapter.rowCount&&(this.adapter.config.seamless&&this.root.classList.add("seamless"),this.prepareMinCellSize(),this.prepareColumnHeads(),this.prepareRowHeads(),this.prepareBody(),setTimeout(this.arrangeAllMeasuredInGrid,0)))}arrangeAllMeasuredInGrid(){this.calculateMinCellSize();let{colWidths:t,colHeadHeight:e}=this.calculateColumnWidths(),{rowHeights:i,rowHeadWidth:s}=this.calculateRowHeights();this.placeColumnHeads(t,e,s),this.placeRowHeads(i,e,s),this.placeBody(s,e),this.placeBodyCells(t,i,e,s),this.setHeadingFillerSizeToScrollbarSize()}prepareMinCellSize(){if(void 0!==this.minCellHeight)return;const t=yt(vt("Tg"));this.measure.appendChild(t)}calculateMinCellSize(){if(void 0!==this.minCellHeight)return;const t=this.measure.children[0],e=t.getBoundingClientRect();this.minCellWidth=Math.ceil(e.width-this.WIDTH_ADJUST),this.minCellHeight=Math.ceil(e.height-this.HEIGHT_ADJUST),this.measure.removeChild(t)}prepareColumnHeads(){const t=new Array(this.adapter.colCount);for(let e=0;e<this.adapter.colCount;++e){const i=this.adapter.getColumnHead(e);void 0===this.colHeads&&void 0!==i&&(this.colHeads=bt(),this.colHeads.className="cols",this.root.appendChild(this.colHeads),this.colResizeHandles=bt(),this.colResizeHandles.className="cols",this.root.appendChild(this.colResizeHandles)),t[e]=i}if(void 0!==this.colHeads)for(let e=0;e<this.adapter.colCount;++e){const i=yt(t[e]);i.className="head",this.measure.appendChild(i)}}prepareRowHeads(){let t=new Array(this.adapter.rowCount);for(let e=0;e<this.adapter.rowCount;++e){const i=this.adapter.getRowHead(e);void 0===this.rowHeads&&void 0!==i&&(this.rowHeads=bt(),this.rowHeads.className="rows",this.root.appendChild(this.rowHeads),this.rowResizeHandles=bt(),this.rowResizeHandles.className="rows",this.root.appendChild(this.rowResizeHandles)),t[e]=i}if(this.rowHeads)for(let e=0;e<this.adapter.rowCount;++e){const i=yt(t[e]);i.className="head",this.measure.appendChild(i)}}prepareBody(){for(let t=0;t<this.adapter.rowCount;++t)for(let e=0;e<this.adapter.colCount;++e){const i=this.createCell();this.showCell(new Pe(e,t),i),this.measure.appendChild(i)}}createCell(){const t=yt();return t.onfocus=this.cellFocus,t.onkeydown=this.cellKeyDown,t.tabIndex=0,t.setAttribute("contenteditable",""),t}setCellSize(t,e,i,s,o){t.style.left=`${e}px`,t.style.top=`${i}px`,t.style.width=s-this.WIDTH_ADJUST+"px",t.style.height=o-this.HEIGHT_ADJUST+"px"}showCell(t,e){this.adapter.showCell(t,e),0!==e.children.length&&(e.style.caretColor="currentcolor")}calculateRowHeights(){let t=this.colHeads?this.adapter.colCount:0,e=0;const i=Array(this.adapter.rowCount);if(this.rowHeads)for(let s=0;s<this.adapter.rowCount;++s){const o=this.measure.children[t++].getBoundingClientRect();i[s]=Math.max(o.height,this.minCellHeight),e=Math.max(e,o.width)}else i.fill(this.minCellHeight);t=(this.colHeads?this.adapter.colCount:0)+(this.rowHeads?this.adapter.rowCount:0);for(let e=0;e<this.adapter.rowCount;++e){let s=i[e];for(let i=0;i<this.adapter.colCount;++i){const o=this.measure.children[t+i+e*this.adapter.colCount].getBoundingClientRect();s=Math.max(s,o.height)}i[e]=Math.ceil(s)}return e=Math.ceil(e),{rowHeights:i,rowHeadWidth:e}}calculateColumnWidths(t=!1){let e=0;const i=Array(this.adapter.colCount);if(this.colHeads)for(let t=0;t<this.adapter.colCount;++t){const s=this.measure.children[t].getBoundingClientRect();i[t]=Math.max(s.width,this.minCellWidth),e=Math.max(e,s.height)}else i.fill(this.minCellWidth);let s;e=Math.ceil(e),s=t?0:(this.colHeads?this.adapter.colCount:0)+(this.rowHeads?this.adapter.rowCount:0);for(let e=0;e<this.adapter.colCount;++e){let o=i[e];for(let i=0;i<this.adapter.rowCount;++i){let n,a=s+e+i*this.adapter.colCount;n=t?this.body.children[a]:this.measure.children[a];const r=n.getBoundingClientRect();o=Math.max(o,r.width)}i[e]=Math.ceil(o)}return{colWidths:i,colHeadHeight:e}}placeColumnHeads(t,e,i){if(void 0===this.colHeads)return;const s=this.adapter.config.seamless?0:1;let o=0;for(let i=0;i<this.adapter.colCount;++i){const n=this.measure.children[0];this.setCellSize(n,o,0,t[i],e),this.colHeads.appendChild(n),o+=t[i]-1-1+s}let n=yt();n.classList.add("head"),n.classList.add("fill"),n.style.left=`${o}px`,n.style.top="0",n.style.width="256px",n.style.height=`${e}px`,this.colHeads.appendChild(n),this.colResizeHandles.style.left=`${i}px`,this.colResizeHandles.style.height=`${e}px`,o=-this.HANDLE_SKEW;for(let i=0;i<this.adapter.colCount;++i){o+=t[i]-1;const s=this.createHandle(i,o,0,this.HANDLE_SIZE,e);this.colResizeHandles.appendChild(s)}o+=this.HANDLE_SIZE,n=yt(),n.classList.add("head"),n.classList.add("fill"),n.style.left=`${o}px`,n.style.top="0",n.style.width="256px",n.style.height=`${e}px`,this.colResizeHandles.appendChild(n)}placeRowHeads(t,e,i){if(void 0===this.rowHeads)return;const s=this.adapter.config.seamless?0:1;let o=0;for(let e=0;e<this.adapter.rowCount;++e){const n=this.measure.children[0];this.setCellSize(n,0,o,i,t[e]),this.rowHeads.appendChild(n),o+=t[e]-1-1+s}let n=yt();n.classList.add("head"),n.classList.add("fill"),n.style.left="0",n.style.top=`${o}px`,n.style.width=`${i}px`,n.style.height="256px",this.rowHeads.appendChild(n),this.rowResizeHandles.style.top=`${e}px`,this.rowResizeHandles.style.width=`${i}px`,o=-this.HANDLE_SKEW;for(let e=0;e<this.adapter.rowCount;++e){o+=t[e]-1;const s=this.createHandle(e,0,o,i,this.HANDLE_SIZE);this.rowResizeHandles.appendChild(s)}o+=this.HANDLE_SIZE,n=yt(),n.classList.add("head"),n.classList.add("fill"),n.style.left="0",n.style.top=`${o}0px`,n.style.width=`${i}px`,n.style.height="256px",this.rowResizeHandles.appendChild(n)}placeBody(t,e){return void 0!==this.colHeads&&(this.adapter?.config.seamless?(this.colHeads.style.height=e-2+"px",this.colHeads.style.left=t-(null==this.rowHeads?0:2)+"px"):(this.colHeads.style.height=`${e}px`,this.colHeads.style.left=t-(null==this.rowHeads?0:1)+"px")),void 0!==this.rowHeads&&(this.adapter?.config.seamless?(this.rowHeads.style.width=t-2+"px",this.rowHeads.style.top=e-(null==this.colHeads?0:2)+"px"):(this.rowHeads.style.width=`${t}px`,this.rowHeads.style.top=e-(null==this.colHeads?0:1)+"px")),--t,--e,this.adapter?.config.seamless&&(--t,--e),t<0&&(t=0),e<0&&(e=0),this.body.style.left=`${t}px`,this.body.style.top=`${e}px`,{rowHeadWidth:t,colHeadHeight:e}}placeBodyCells(t,e,i,s){const o=this.adapter.config.seamless?0:1;let n=0;for(let i=0;i<this.adapter.rowCount;++i){let s=0;for(let a=0;a<this.adapter.colCount;++a){const r=this.measure.children[0];this.setCellSize(r,s,n,t[a],e[i]),this.body.appendChild(r),s+=t[a]-2+o}n+=e[i]-2+o}}createHandle(t,e,i,s,o){const n=yt();return n.className="handle",n.style.left=`${e}px`,n.style.top=`${i}px`,n.style.width=`${s}px`,n.style.height=`${o}px`,n.dataset.idx=`${t}`,n.onpointerdown=this.handleDown,n.onpointermove=this.handleMove,n.onpointerup=this.handleUp,n}handleDown(t){t.preventDefault(),this.handle=t.target,this.handleIndex=parseInt(this.handle.dataset.idx)+1,this.handle.setPointerCapture(t.pointerId);if(this.handle.parentElement===this.colResizeHandles){this.deltaHandle=t.clientX-ci(this.handle.style.left),this.deltaSplitBody=t.clientX,this.deltaSplitHead=t.clientX-ui(this.body.style.left);const e=this.colHeads.children[this.handleIndex-1];this.deltaColumn=t.clientX-ui(e.style.width),this.splitVertical(this.handleIndex)}else{this.deltaHandle=t.clientY-ui(this.handle.style.top),this.deltaSplitBody=t.clientY,this.deltaSplitHead=t.clientY-ui(this.body.style.top);const e=this.rowHeads.children[this.handleIndex-1];this.deltaColumn=t.clientY-ui(e.style.height),this.splitHorizontal(this.handleIndex)}}handleMove(t){if(void 0===this.handle)return;if(this.handle.parentElement===this.colResizeHandles){let e=t.clientX;const i=this.deltaColumn+8;e<i&&(e=i),this.handle.style.left=e-this.deltaHandle+"px",this.splitHead.style.left=e-this.deltaSplitHead+"px",this.splitBody.style.left=e-this.deltaSplitBody+"px";const s=this.handleIndex;this.colHeads.children[s-1].style.width=e-this.deltaColumn+"px";for(let t=0;t<this.adapter.rowCount;++t)this.body.children[s-1+t*s].style.width=e-this.deltaColumn+"px"}else{let e=t.clientY;const i=this.deltaColumn+8;e<i&&(e=i),this.handle.style.top=e-this.deltaHandle+"px",this.splitHead.style.top=e-this.deltaSplitHead+"px",this.splitBody.style.top=e-this.deltaSplitBody+"px";const s=this.handleIndex;this.rowHeads.children[s-1].style.height=e-this.deltaColumn+"px";let o=(s-1)*this.adapter.colCount;for(let t=0;t<this.adapter.colCount;++t)this.body.children[o+t].style.height=e-this.deltaColumn+"px"}}handleUp(t){if(void 0===this.handle)return;this.handleMove(t);if(this.handle.parentElement===this.colResizeHandles){let e=t.clientX;const i=this.deltaColumn+8;e<i&&(e=i),this.joinVertical(this.handleIndex,e-this.deltaSplitBody)}else{let e=t.clientY;const i=this.deltaColumn+8;e<i&&(e=i),this.joinHorizontal(this.handleIndex,e-this.deltaSplitBody)}this.handle=void 0}splitVerticalNew(t){this.splitHeadVertical(t),this.splitBodyVertical(t)}splitHeadVertical(t){if(void 0===this.colHeads)return;const e=this.adapter.config.seamless?0:1;this.splitHead=bt(),this.splitHead.className="splitBody colHack",this.splitHead.style.top="0",this.splitHead.style.bottom="0",this.splitHead.style.backgroundColor=gi.splitColor;const i=t;if(0===this.body.children.length)this.splitHead.style.left="0px",this.splitHead.style.width="1px";else if(i<this.colHeads.children.length){let t=this.colHeads.children[i],s=0;const o=ui(t.style.left);for(;i<this.colHeads.children.length;){t=this.colHeads.children[i];s+=t.getBoundingClientRect().width-e;let n=ui(t.style.left);t.style.left=n-o+"px",this.splitHead.appendChild(t)}this.adapter.config.seamless&&(s+=e),this.splitHead.style.left=`${o}px`,this.splitHead.style.width=`${s}px`}else{let t=this.colHeads.children[this.body.children.length-1],i=t.getBoundingClientRect(),s=ui(t.style.left)+i.width-e;this.splitHead.style.left=`${s}px`,this.splitHead.style.width="1px"}this.colHeads.appendChild(this.splitHead)}splitBodyVertical(t){const e=this.adapter.config.seamless?0:1;if(this.splitBody=bt(),this.splitBody.className="splitBody",this.splitBody.style.top="0",this.splitBody.style.bottom="0",this.splitBody.style.backgroundColor=gi.splitColor,0===this.body.children.length)this.splitBody.style.left="0px",this.splitBody.style.width="1px";else{if(t<this.body.children.length/this.adapter.rowCount){let i=this.body.children[t];const s=ui(i.style.left);let o=0;const n=this.body.children.length/this.adapter.rowCount-t;let a=t;for(let r=0;r<this.adapter.rowCount;++r){for(let t=0;t<n;++t){if(i=this.body.children[a],0===r){o+=i.getBoundingClientRect().width-e}i.style.left=ui(i.style.left)-s+"px",this.splitBody.appendChild(i)}a+=t}this.splitBody.style.left=`${s}px`,this.splitBody.style.width=`${o}px`}else{let t=this.body.children[this.body.children.length-1],i=t.getBoundingClientRect(),s=ui(t.style.left)+i.width-e;this.splitBody.style.left=`${s}px`,this.splitBody.style.width="1px"}}this.body.appendChild(this.splitBody)}splitVertical(t,e=0){void 0!==this.colHeads&&(this.splitHead=bt(),this.splitHead.className="cols",this.splitHead.style.left=this.colHeads.style.left,this.splitHead.style.height=this.colHeads.style.height,this.root.appendChild(this.splitHead),setTimeout((()=>{this.splitHead.scrollTop=this.colHeads.scrollTop,this.splitHead.scrollLeft=this.colHeads.scrollLeft}),0)),this.splitBody=bt(),this.splitBody.className="splitBody";const i=this.body.getBoundingClientRect();this.splitBody.style.width=`${i.width}px`,this.splitBody.style.height=`${i.height}px`,this.body.appendChild(this.splitBody);const s=t,o=this.adapter.colCount-t+e;if(void 0!==this.splitHead){for(let e=0;e<o;++e)this.splitHead.appendChild(this.colHeads.children[t]);this.splitHead.appendChild(this.colHeads.children[this.colHeads.children.length-1].cloneNode())}let n=t;for(let t=0;t<this.adapter.rowCount;++t){for(let t=0;t<o;++t)this.splitBody.appendChild(this.body.children[n]);n+=s}}joinVertical(t,e,i=0,s,o){void 0===s&&(s=this.adapter.colCount),void 0===o&&(o=this.adapter.rowCount);const n=s-t+i;let a=t-i;if(void 0!==this.colHeads){const t=this.colHeads.children[this.colHeads.children.length-1];for(let i=0;i<n;++i){const i=this.splitHead.children[0],s=ui(i.style.left);i.style.left=`${s+e}px`,this.colHeads.insertBefore(i,t)}const i=ui(t.style.left);t.style.left=`${i+e}px`;for(let t=a;t<=s;++t){const i=this.colResizeHandles.children[t],s=ui(i.style.left);i.style.left=`${s+e}px`}}for(let t=0;t<o;++t){let t=this.body.children[a];for(let i=0;i<n;++i){const i=this.splitBody.children[0],s=ui(i.style.left);i.style.left=`${s+e}px`,this.body.insertBefore(i,t)}a+=s}void 0!==this.colHeads&&(this.root.removeChild(this.splitHead),this.splitHead=void 0),this.body.removeChild(this.splitBody),this.splitBody=void 0}splitHorizontalNew(t){this.splitHeadHorizontal(t),this.splitBodyHorizontal(t)}splitHeadHorizontal(t){if(void 0===this.rowHeads)return;const e=this.adapter.config.seamless?0:1;this.splitHead=bt(),this.splitHead.className="splitBody",this.splitHead.style.left="0",this.splitHead.style.right="0",this.splitHead.style.backgroundColor=gi.splitColor;const i=t;if(0===this.body.children.length)this.splitHead.style.top="0px",this.splitHead.style.height="1px";else if(i<this.rowHeads.children.length){let t=this.rowHeads.children[i],s=0;const o=ui(t.style.top);for(;i<this.rowHeads.children.length;){t=this.rowHeads.children[i];s+=t.getBoundingClientRect().height-e;let n=ui(t.style.top);t.style.top=n-o+"px",this.splitHead.appendChild(t)}this.adapter.config.seamless&&(s+=e),this.splitHead.style.top=`${o}px`,this.splitHead.style.height=`${s}px`}else{let t=this.rowHeads.children[this.body.children.length-1],i=t.getBoundingClientRect(),s=ui(t.style.top)+i.height-e;this.splitHead.style.top=`${s}px`,this.splitHead.style.height="1px"}this.rowHeads.appendChild(this.splitHead)}splitBodyHorizontal(t){const e=this.adapter.config.seamless?0:1;this.splitBody=bt(),this.splitBody.className="splitBody",this.splitBody.style.left="0",this.splitBody.style.right="0",this.splitBody.style.backgroundColor=gi.splitColor;const i=t*this.adapter.colCount;if(0===this.body.children.length)this.splitBody.style.top="0px",this.splitBody.style.height="1px";else if(i<this.body.children.length){let t=this.body.children[i],s=this.adapter.colCount,o=0;const n=ui(t.style.top);for(;i<this.body.children.length;){if(t=this.body.children[i],--s,0===s){o+=t.getBoundingClientRect().height-e,s=this.adapter.colCount}let a=ui(t.style.top);t.style.top=a-n+"px",this.splitBody.appendChild(t)}o+=e,this.splitBody.style.top=`${n}px`,this.splitBody.style.height=`${o}px`}else{let t=this.body.children[this.body.children.length-1],i=t.getBoundingClientRect(),s=ui(t.style.top)+i.height-e;this.splitBody.style.top=`${s}px`,this.splitBody.style.height="1px"}this.body.appendChild(this.splitBody)}splitHorizontal(t,e=0,i){void 0!==this.rowHeads&&(this.splitHead=bt(),this.splitHead.className="rows",this.splitHead.style.top=this.rowHeads.style.top,this.splitHead.style.width=this.rowHeads.style.width,this.root.appendChild(this.splitHead),setTimeout((()=>{this.splitHead.scrollTop=this.rowHeads.scrollTop,this.splitHead.scrollLeft=this.rowHeads.scrollLeft}),0)),this.splitBody=bt(),this.splitBody.className="splitBody",this.splitBody.style.backgroundColor="rgba(255,128,0,0.5)";const s=this.body.getBoundingClientRect();this.splitBody.style.width=`${s.width}px`,this.splitBody.style.height=`${s.height}px`,this.body.appendChild(this.splitBody);const o=this.adapter.rowCount-t+e;if(void 0!==this.splitHead){for(let e=0;e<o;++e)this.splitHead.appendChild(this.rowHeads.children[t]);this.splitHead.appendChild(this.rowHeads.children[this.rowHeads.children.length-1].cloneNode())}let n=this.adapter.colCount*t;for(let t=0;t<o;++t)for(let t=0;t<this.adapter.colCount;++t)this.splitBody.appendChild(this.body.children[n]);if(this.splitBody.children.length>0){n=this.splitBody.children.length-1;const t=ci(this.splitBody.children[n].style.top);for(let e=0;e<this.splitBody.children.length;++e){const i=this.splitBody.children[e],s=ci(i.style.top);i.style.top=s-t+"px"}this.splitBody.style.backgroundColor="#f80",this.splitBody.style.top=`${t}px`,this.splitBody.style.height=s.height-t+"px"}else if(void 0!==i&&this.body.children.length>0){n=i.index*this.adapter.colCount;const t=ci(this.body.children[n].style.top);this.splitBody.style.top=`${t}px`,this.splitBody.style.height=s.height-t+"px"}else if(this.body.children.length>0){const t=yt();n=this.body.children.length-2;const e=this.body.children[n],i=this.body.children[n].getBoundingClientRect();t.style.border="none",t.style.backgroundColor="#1e1e1e";const o=ci(e.style.top)+i.height;t.style.top=`${o}px`,t.style.left="0px",t.style.width=s.width-2+"px",t.style.height=s.height-o+"px",this.splitBody.appendChild(t)}}joinHorizontal(t,e,i=0,s,o){void 0===s&&(s=this.adapter.colCount),void 0===o&&(o=this.adapter.rowCount);const n=o-t+i;if(void 0!==this.rowHeads){const i=this.rowHeads.children[this.rowHeads.children.length-1];for(let t=0;t<n;++t){const t=this.splitHead.children[0],s=ui(t.style.top);t.style.top=`${s+e}px`,this.rowHeads.insertBefore(t,i)}const s=ui(i.style.top);i.style.top=`${s+e}px`;for(let i=t;i<=o;++i){const t=this.rowResizeHandles.children[i],s=ui(t.style.top);t.style.top=`${s+e}px`}}for(let t=0;t<n;++t)for(let t=0;t<s;++t){const t=this.splitBody.children[0],i=ui(t.style.top);t.style.top=`${i+e}px`,this.body.appendChild(t)}void 0!==this.rowHeads&&(this.root.removeChild(this.splitHead),this.splitHead=void 0),this.body.removeChild(this.splitBody),this.splitBody=void 0}setHeadingFillerSizeToScrollbarSize(){const t=this.body.getBoundingClientRect();if(void 0!==this.colHeads){const e=Math.ceil(t.width-this.body.clientWidth);this.colHeads.children[this.colHeads.children.length-1].style.width=`${e}px`,this.colHeads.style.right=`${e}px`}if(void 0!==this.rowHeads){const e=Math.ceil(t.height-this.body.clientHeight);this.rowHeads.children[this.rowHeads.children.length-1].style.height=`${e}px`,this.rowHeads.style.bottom=`${e}px`}}clientPosToTablePos(t,e){let i,s;for(i=0;i<this.adapter.colCount;++i){const e=this.body.children[i].getBoundingClientRect();if(e.x<=t&&t<e.x+e.width)break}if(i>=this.adapter.colCount)return;let o=0;for(s=0;s<this.adapter.rowCount;++s){const t=this.body.children[o].getBoundingClientRect();if(t.y<=e&&e<t.y+t.height)break;o+=this.adapter.colCount}return s>=this.adapter.rowCount?void 0:new Pe(i,s)}}gi.maskColor="#1e1e1e",gi.splitColor="#1e1e1e",gi.allTables=new Set,gi.define("tx-table",gi);function fi(t){return void 0!==t&&"insertRow"in t&&"removeRow"in t}function mi(t){return void 0!==t&&"insertColumn"in t&&"removeColumn"in t}Wt.define("tx-tabletool",class extends Ce{constructor(){super(),this.toolbar=n("div",{class:"toolbar"}),this.buttonAddRowAbove=n("button",{class:"left",title:"add row above",children:a("svg",{style:{display:"block"},viewBox:"0 0 13 13",width:"13",height:"13",children:[n("rect",{x:"0.5",y:"0.5",width:"12",height:"12",class:"strokeFill"}),n("line",{x1:"0.5",y1:"8.5",x2:"12.5",y2:"8.5",class:"stroke"}),n("line",{x1:"4.5",y1:"8.5",x2:"4.5",y2:"13.5",class:"stroke"}),n("line",{x1:"8.5",y1:"8.5",x2:"8.5",y2:"13.5",class:"stroke"}),n("line",{x1:"6.5",y1:"2",x2:"6.5",y2:"7",class:"stroke"}),n("line",{x1:"4",y1:"4.5",x2:"9",y2:"4.5",class:"stroke"})]})}),this.buttonAddRowAbove.onclick=()=>{this.lastActiveTable?.focus();const t=this.lastActiveTable?.model,e=this.lastActiveTable?.selection;e&&fi(t)&&t.insertRow(e.row)},this.toolbar.appendChild(this.buttonAddRowAbove),this.buttonAddRowBelow=n("button",{title:"add row below",children:a("svg",{viewBox:"0 0 13 13",width:"13",height:"13",children:[n("rect",{x:"0.5",y:"0.5",width:"12",height:"12",class:"strokeFill"}),n("line",{x1:"0.5",y1:"4.5",x2:"12.5",y2:"4.5",class:"stroke"}),n("line",{x1:"4.5",y1:"0.5",x2:"4.5",y2:"4.5",class:"stroke"}),n("line",{x1:"8.5",y1:"0.5",x2:"8.5",y2:"4.5",class:"stroke"}),n("line",{x1:"6.5",y1:"6",x2:"6.5",y2:"11",class:"stroke"}),n("line",{x1:"4",y1:"8.5",x2:"9",y2:"8.5",class:"stroke"})]})}),this.buttonAddRowBelow.onclick=()=>{this.lastActiveTable?.focus();const t=this.lastActiveTable?.model,e=this.lastActiveTable?.selection;e&&fi(t)&&t.insertRow(e.row+1)},this.toolbar.appendChild(this.buttonAddRowBelow),this.buttonDeleteRow=n("button",{class:"right",title:"delete row",children:a("svg",{viewBox:"0 0 13 13",width:"13",height:"13",children:[n("rect",{x:"0.5",y:"0.5",width:"12",height:"12",class:"strokeFill"}),n("line",{x1:"0.5",y1:"4.5",x2:"12.5",y2:"4.5",class:"stroke"}),n("line",{x1:"0.5",y1:"8.5",x2:"12.5",y2:"8.5",class:"stroke"}),n("line",{x1:"5.5",y1:"3.5",x2:"11.5",y2:"9.5",class:"stroke","stroke-width":"1.5"}),n("line",{x1:"11.5",y1:"3.5",x2:"5.5",y2:"9.5",class:"stroke","stroke-width":"1.5"})]})}),this.buttonDeleteRow.onclick=()=>{this.lastActiveTable?.focus();const t=this.lastActiveTable?.model,e=this.lastActiveTable?.selection;e&&fi(t)&&t.removeRow(e.row,1)},this.toolbar.appendChild(this.buttonDeleteRow),this.toolbar.appendChild(document.createTextNode(" ")),this.buttonAddColumnLeft=n("button",{class:"left",title:"add column left",children:a("svg",{viewBox:"0 0 13 13",width:"13",height:"13",children:[n("rect",{x:"0.5",y:"0.5",width:"12",height:"12",class:"strokeFill"}),n("line",{x1:"8.5",y1:"0.5",x2:"8.5",y2:"12.5",class:"stroke"}),n("line",{x1:"8.5",y1:"4.5",x2:"12.5",y2:"4.5",class:"stroke"}),n("line",{x1:"8.5",y1:"8.5",x2:"12.5",y2:"8.5",class:"stroke"}),n("line",{x1:"2",y1:"6.5",x2:"7",y2:"6.5",class:"stroke"}),n("line",{x1:"4.5",y1:"4",x2:"4.5",y2:"9",class:"stroke"})]})}),this.buttonAddColumnLeft.onclick=()=>{this.lastActiveTable?.focus();const t=this.lastActiveTable?.model,e=this.lastActiveTable?.selection;e&&mi(t)&&t.insertColumn(e.col)},this.toolbar.appendChild(this.buttonAddColumnLeft),this.buttonAddColumnRight=n("button",{title:"add column right",children:a("svg",{viewBox:"0 0 13 13",width:"13",height:"13",children:[n("rect",{x:"0.5",y:"0.5",width:"12",height:"12",class:"strokeFill"}),n("line",{x1:"4.5",y1:"0.5",x2:"4.5",y2:"12.5",class:"stroke"}),n("line",{x1:"0.5",y1:"4.5",x2:"4.5",y2:"4.5",class:"stroke"}),n("line",{x1:"0.5",y1:"8.5",x2:"4.5",y2:"8.5",class:"stroke"}),n("line",{x1:"6",y1:"6.5",x2:"11",y2:"6.5",class:"stroke"}),n("line",{x1:"8.5",y1:"4",x2:"8.5",y2:"9",class:"stroke"})]})}),this.buttonAddColumnRight.onclick=()=>{this.lastActiveTable?.focus();const t=this.lastActiveTable?.model,e=this.lastActiveTable?.selection;e&&mi(t)&&t.insertColumn(e.col+1)},this.toolbar.appendChild(this.buttonAddColumnRight),this.buttonDeleteColumn=n("button",{class:"right",title:"delete column",children:a("svg",{viewBox:"0 0 13 13",width:"13",height:"13",children:[n("rect",{x:"0.5",y:"0.5",width:"12",height:"12",class:"strokeFill"}),n("line",{x1:"4.5",y1:"0.5",x2:"4.5",y2:"12.5",class:"stroke"}),n("line",{x1:"8.5",y1:"0.5",x2:"8.5",y2:"12.5",class:"stroke"}),n("line",{x1:"3.5",y1:"5.5",x2:"9.5",y2:"11.5",class:"stroke","stroke-width":"1.5"}),n("line",{x1:"3.5",y1:"11.5",x2:"9.5",y2:"5.5",class:"stroke","stroke-width":"1.5"})]})}),this.buttonDeleteColumn.onclick=()=>{this.lastActiveTable?.focus();const t=this.lastActiveTable?.model,e=this.lastActiveTable?.selection;e&&mi(t)&&t.removeColumn(e.col,1)},this.toolbar.appendChild(this.buttonDeleteColumn),this.toolbar.appendChild(document.createTextNode(" ")),this.buttonAddNodeAbove=n("button",{class:"left",title:"add node above",children:a("svg",{style:{display:"block",border:"none"},viewBox:"0 0 8 17",width:"8",height:"17",children:[n("rect",{x:"0.5",y:"1.5",width:"6",height:"6",class:"strokeFill"}),n("rect",{x:"0.5",y:"9.5",width:"6",height:"6",class:"fill"}),n("line",{x1:"3.5",y1:"3",x2:"3.5",y2:"6",class:"stroke"}),n("line",{x1:"2",y1:"4.5",x2:"5",y2:"4.5",class:"stroke"}),n("line",{x1:"3.5",y1:"0",x2:"3.5",y2:"1",class:"stroke"}),n("line",{x1:"3.5",y1:"8",x2:"3.5",y2:"17",class:"stroke"})]})}),this.toolbar.appendChild(this.buttonAddNodeAbove),this.buttonAddNodeBelow=n("button",{title:"add node below",children:a("svg",{style:{display:"block",border:"none"},viewBox:"0 0 8 17",width:"8",height:"17",children:[n("rect",{x:"0.5",y:"1.5",width:"6",height:"6",class:"fill"}),n("rect",{x:"0.5",y:"9.5",width:"6",height:"6",class:"strokeFill"}),n("line",{x1:"3.5",y1:"11",x2:"3.5",y2:"14",class:"stroke"}),n("line",{x1:"2",y1:"12.5",x2:"5",y2:"12.5",class:"stroke"}),n("line",{x1:"3.5",y1:"0",x2:"3.5",y2:"9",class:"stroke"}),n("line",{x1:"3.5",y1:"16",x2:"3.5",y2:"17",class:"stroke"})]})}),this.toolbar.appendChild(this.buttonAddNodeBelow),this.buttonAddNodeParent=n("button",{title:"add node parent",children:a("svg",{viewBox:"0 0 13 17",width:"13",height:"17",children:[n("rect",{x:"0.5",y:"1.5",width:"6",height:"6",class:"strokeFill"}),n("rect",{x:"6.5",y:"9.5",width:"6",height:"6",class:"fill"}),n("line",{x1:"7",y1:"4.5",x2:"10",y2:"4.5",class:"stroke"}),n("line",{x1:"9.5",y1:"4",x2:"9.5",y2:"9",class:"stroke"}),n("line",{x1:"3.5",y1:"3",x2:"3.5",y2:"6",class:"stroke"}),n("line",{x1:"2",y1:"4.5",x2:"5",y2:"4.5",class:"stroke"}),n("line",{x1:"3.5",y1:"0",x2:"3.5",y2:"1",class:"stroke"}),n("line",{x1:"3.5",y1:"8",x2:"3.5",y2:"17",class:"stroke"})]})}),this.buttonAddNodeParent.onclick=()=>{},this.toolbar.appendChild(this.buttonAddNodeParent),this.buttonAddNodeChild=n("button",{title:"add node child",children:a("svg",{viewBox:"0 0 13 17",width:"13",height:"17",children:[n("rect",{x:"0.5",y:"1.5",width:"6",height:"6",class:"fill"}),n("rect",{x:"6.5",y:"9.5",width:"6",height:"6",class:"strokeFill"}),n("line",{x1:"7",y1:"4.5",x2:"10",y2:"4.5",class:"stroke"}),n("line",{x1:"9.5",y1:"4",x2:"9.5",y2:"9",class:"stroke"}),n("line",{x1:"9.5",y1:"11",x2:"9.5",y2:"14",class:"stroke"}),n("line",{x1:"8",y1:"12.5",x2:"11",y2:"12.5",class:"stroke"}),n("line",{x1:"3.5",y1:"0",x2:"3.5",y2:"17",class:"stroke"})]})}),this.toolbar.appendChild(this.buttonAddNodeChild),this.buttonDeleteNode=n("button",{class:"right",title:"delete node",children:a("svg",{viewBox:"0 0 10 17",width:"10",height:"17",children:[n("rect",{x:"1.5",y:"5.5",width:"6",height:"6",class:"strokeFill"}),n("line",{x1:"4.5",y1:"2",x2:"4.5",y2:"5",class:"stroke"}),n("line",{x1:"4.5",y1:"12",x2:"4.5",y2:"15",class:"stroke"}),n("line",{x1:"0.5",y1:"4.5",x2:"8.5",y2:"12.5",class:"stroke","stroke-width":"1.5"}),n("line",{x1:"8.5",y1:"4.5",x2:"0.5",y2:"12.5",class:"stroke","stroke-width":"1.5"})]})}),this.toolbar.appendChild(this.buttonDeleteNode),this.attachShadow({mode:"open"}),this.shadowRoot.adoptedStyleSheets=[Jt],this.shadowRoot.appendChild(this.toolbar)}canHandle(t){return t instanceof gi}activate(){this.lastActiveTable=Ce.activeView,this.toolbar.classList.add("active")}deactivate(){this.lastActiveTable=void 0,this.toolbar.classList.remove("active")}});class xi extends je{}class vi extends xi{}class bi{constructor(t,e,i=!0){this.node=t,this.depth=e,this.open=i}}class yi extends We{constructor(t,e){super(t),this.rows=new Array,void 0!==e&&this.createRowInfoHelper(this.rows,e,0)}get colCount(){return 1}get rowCount(){return this.rows.length}getRow(t){for(let e=0;e<this.rows.length;++e)if(this.rows[e].node===t)return e}addSiblingBefore(t){const e=this.createNode();return 0===this.rows.length?(t=0,this.setRoot(e),this.rows.push(new bi(e,0))):0===t?(this.setNext(e,this.getRoot()),this.setRoot(e),this.rows.unshift(new bi(e,0))):(this.setNext(e,this.rows[t].node),this.getNext(this.rows[t-1].node)===this.rows[t].node?this.setNext(this.rows[t-1].node,e):this.setDown(this.rows[t-1].node,e),this.rows.splice(t,0,new bi(e,this.rows[t].depth))),this.modified.trigger(new Ge(Oe.INSERT_ROW,t,1)),t}addSiblingAfter(t){const e=this.createNode();if(0===this.rows.length)t=0,this.setRoot(e),this.rows.push(new bi(e,0));else{this.setNext(e,this.getNext(this.rows[t].node)),this.setNext(this.rows[t].node,e);const i=this.nodeCount(this.getDown(this.rows[t].node)),s=this.rows[t].depth;t+=i+1,this.rows.splice(t,0,new bi(e,s))}return this.modified.trigger(new Ge(Oe.INSERT_ROW,t,1)),t}addChildAfter(t){const e=this.createNode();if(0===this.rows.length)this.setRoot(e),this.rows.push(new bi(e,0)),this.modified.trigger(new Ge(Oe.INSERT_ROW,0,1));else{const i=this.getDown(this.rows[t].node),s=this.nodeCount(i);for(let e=0;e<s;++e)++this.rows[t+1+e].depth;this.setDown(e,i),this.setDown(this.rows[t].node,e),this.rows.splice(t+1,0,new bi(e,this.rows[t].depth+1)),this.modified.trigger(new Ge(Oe.INSERT_ROW,t+1,1))}return t}addParentBefore(t){const e=this.createNode();if(0===t){for(let e=0;e<this.rows.length;++e)++this.rows[t+e].depth;this.setDown(e,this.getRoot()),this.setRoot(e),this.rows.unshift(new bi(e,0))}else{const i=this.rows[t].depth,s=this.nodeCount(this.getDown(this.rows[t].node))+1;for(let e=0;e<s;++e)++this.rows[t+e].depth;this.setDown(e,this.rows[t].node),this.setNext(e,this.getNext(this.rows[t].node)),this.setNext(this.rows[t].node,void 0),this.getNext(this.rows[t-1].node)===this.rows[t].node?this.setNext(this.rows[t-1].node,e):this.setDown(this.rows[t-1].node,e),this.rows.splice(t,0,new bi(e,i))}return this.modified.trigger(new Ge(Oe.INSERT_ROW,t,1)),t}deleteAt(t){let e=this.getDown(this.rows[t].node);if(void 0!==e){const i=this.nodeCount(e)+1;for(let e=0;e<i;++e)--this.rows[t+e].depth;this.append(e,this.getNext(this.rows[t].node)),this.setNext(this.rows[t].node,void 0),0===t?this.setRoot(e):this.setNext(this.rows[t-1].node,e)}else if(0===t){const e=this.getNext(this.rows[t].node);this.setNext(this.rows[t].node,void 0),this.setRoot(e)}else{const e=this.getNext(this.rows[t].node);this.setNext(this.rows[t].node,void 0),this.getNext(this.rows[t-1].node)===this.rows[t].node?this.setNext(this.rows[t-1].node,e):this.setDown(this.rows[t-1].node,e)}return this.rows.splice(t,1),this.modified.trigger(new Ge(Oe.REMOVE_ROW,t,1)),t}init(){}toggleAt(t){this.rows[t].open?this.closeAt(t):this.openAt(t)}isOpen(t){return this.rows[t].open}openAt(t){let e=this.rows[t];if(e.open||void 0===this.getDown(e.node))return;e.open=!0;const i=this.createRowInfo(t);this.rows.splice(t+1,0,...i),this.modified.trigger(new Ge(Oe.INSERT_ROW,t+1,i.length))}closeAt(t){let e=this.rows[t];if(!e.open||void 0===this.getDown(e.node))return;const i=this.getVisibleChildCount(t);e.open=!1,this.rows.splice(t+1,i),this.modified.trigger(new Ge(Oe.REMOVE_ROW,t+1,i))}collapse(){let t=0;for(;t<this.rowCount;)this.closeAt(t),++t;for(let t of this.rows)t.open=!1}createRowInfo(t){const e=new Array;let i=this.rows[t];return i.open&&this.getDown(i.node)&&this.createRowInfoHelper(e,this.getDown(i.node),i.depth+1),e}createRowInfoHelper(t,e,i){const s=new bi(e,i,!1);t.push(s),s.open&&this.getDown(e)&&this.createRowInfoHelper(t,this.getDown(e),s.depth+1),this.getNext(e)&&this.createRowInfoHelper(t,this.getNext(e),s.depth)}getVisibleChildCount(t){let e=this.rows[t],i=1;if(e.open&&this.getDown(e.node)){const e=this.getVisibleChildCountHelper(t+1);t+=e,i+=e}return i-1}getVisibleChildCountHelper(t){let e=this.rows[t],i=1;if(e.open&&this.getDown(e.node)){const e=this.getVisibleChildCountHelper(t+1);t+=e,i+=e}if(this.getNext(e.node)){const e=this.getVisibleChildCountHelper(t+1);t+=e,i+=e}return i}append(t,e){if(void 0===e)return;let i,s=t;for(;i=this.getNext(s),void 0!==i;)s=i;this.setNext(s,e)}nodeCount(t){return void 0===t?0:1+this.nodeCount(this.getDown(t))+this.nodeCount(this.getNext(t))}}class wi extends vi{constructor(t){super(t),this.config.seamless=!0}treeCell(t,e,i){this._showCell(t,e);const s=yt(vt(i));s.style.verticalAlign="middle",s.style.padding="2px",e.appendChild(s)}showCell(t,e){this._showCell(t,e)}_showCell(t,e){if(void 0===this.model)return void console.log("no model");const i=this.model.rows[t.row],s=12,o=3.5,n=Math.round(2)-.5,a=i.depth*s+s+o,r=At();r.setAttributeNS(null,"width",`${a}`),r.setAttributeNS(null,"height","12"),r.style.verticalAlign="middle",r.style.background="none";const l=i.depth;if(void 0!==this.model.getDown(i.node)){const t=l*s+o,e=function(t,e,i,s,o,n){const a=document.createElementNS(St,"rect");return a.setAttributeNS(null,"x",`${t}`),a.setAttributeNS(null,"y",`${e}`),a.setAttributeNS(null,"width",`${i}`),a.setAttributeNS(null,"height",`${s}`),void 0!==o&&a.setAttributeNS(null,"stroke",o),void 0!==n&&a.setAttributeNS(null,"fill",n),a}(t,n,8,8,"#000","#fff");e.style.cursor="pointer",r.appendChild(e);const a=Mt(t+2,n+4,t+8-2,n+4,"#000");a.style.cursor="pointer",r.appendChild(a);const h=Mt(t+4,n+2,t+4,n+8-2,"#000");h.style.cursor="pointer",h.style.display=i.open?"none":"",r.appendChild(h),r.appendChild(Mt(t+8,n+4,t+8+3,n+4,"#f80")),r.onpointerdown=e=>{e.preventDefault(),e.stopPropagation();const s=this.model.getRow(i.node);if(void 0===s)return void console.log("  ==> couldn't find row number for node");const o=r.getBoundingClientRect(),a=e.clientX-o.left,l=e.clientY-o.top;t<=a&&a<=t+8&&n<=l&&l<=n+8&&(this.model?.toggleAt(s),h.style.display=this.model.isOpen(s)?"none":"")}}else r.appendChild(Mt(l*s+o+4-.5,0,l*s+o+4,n+4,"#f80")),r.appendChild(Mt(l*s+o+4,n+4,l*s+o+8+3,n+4,"#f80"));let h="";for(let e=0;e<=l;++e){const n=e*s+o+4+2;for(let s=t.row+1;s<this.model.rowCount&&!(this.model.rows[s].depth<e);++s)if(e===this.model.rows[s].depth){(e!==l||void 0!==this.model.getNext(i.node))&&(h+=`<line x1='${n}' y1='0' x2='${n}' y2='100%' stroke='%23f80' />`);break}}if(void 0===this.model.getDown(i.node)||void 0===this.model.getNext(i.node)){const t=l*s+o+4+2;h+=`<line x1='${t}' y1='0' x2='${t}' y2='4' stroke='%23f80' />`}e.style.background=`url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' style='background: %23000;'>${h}</svg>")`,e.style.backgroundRepeat="repeat-y",e.replaceChildren(r)}}class Ci extends yi{constructor(t,e){super(t,e),this.root=e}createNode(){return new this.nodeClass}deleteNode(t){}getRoot(){return this.root}setRoot(t){this.root=t}getDown(t){return t.down}setDown(t,e){t.down=e}getNext(t){return t.next}setNext(t,e){t.next=e}}var ki;!function(t){t[t.NONE=0]="NONE",t[t.MORPH=1]="MORPH",t[t.POSE=2]="POSE"}(ki||(ki={}));class _i{constructor(t,e){this.proxies=new Map,this.updateRequired=ki.NONE,this.wireframe=new Tt(!1,{label:"Wireframe"}),this.human=t,this.baseMesh=e,this.vertexRigged=this.vertexMorphed=e.vertex}getRestposeCoordinates(){return this.vertexMorphed}update(){this.updateRequired!==ki.NONE&&(this.updateRequired===ki.MORPH&&(this.vertexMorphed=new Float32Array(this.baseMesh.vertex),this.human.targetsDetailStack.forEach(((t,e)=>{if(isNaN(t))return;if(i=t,Math.abs(i)<=1e-9||isNaN(t))return;var i;(function(t){let e=$.get(t);return void 0!==e||(e=new A,e.load(t),$.set(t,e)),e})(e).apply(this.vertexMorphed,t)})),this.skeleton.updateJoints(),this.skeleton.build(),this.skeleton.update()),this.vertexRigged=this.skeleton.skinMesh(this.vertexMorphed,this.skeleton.vertexWeights._data),this.updateRequired=ki.NONE)}}class Ei extends C{constructor(t,e){super(t,e),this.observed=[],this.change=this.change.bind(this)}observe(t){this.observed.push(t),t.modified.add(this.change,this)}clear(){this.observed.forEach((t=>t.modified.remove(this))),this.observed.length=0}change(){var t,e;let i=!1;for(let e of this.observed)if(e.value!==(null===(t=e.options)||void 0===t?void 0:t.default)){i=!0;break}i?this.color="italic":this.value===(null===(e=this.options)||void 0===e?void 0:e.default)?this.color="bold":this.color=""}set value(t){this.modified.withLock((()=>{super.value=t,this.change()}))}get value(){return super.value}}function Si(t,e,i,s="sxyz"){const o=Mi.get(s);if(void 0===o)throw Error(`invalid axes of '${s}'`);const[n,a,r,l]=o;let h=n,d=Hi[h+a],c=Hi[h-a+1];l&&([t,i]=[i,t]),a&&([t,e,i]=[-t,-e,-i]);let[u,p,g]=[Math.sin(t),Math.sin(e),Math.sin(i)],[f,m,x]=[Math.cos(t),Math.cos(e),Math.cos(i)],[v,b]=[f*x,f*g],[y,w]=[u*x,u*g];const C=z();function k(t,e,i){C[4*e+t]=i}return r?(k(h,h,m),k(h,d,p*u),k(h,c,p*f),k(d,h,p*g),k(d,d,-m*w+v),k(d,c,-m*b-y),k(c,h,-p*x),k(c,d,m*y+b),k(c,c,m*v-w)):(k(h,h,m*x),k(h,d,p*y-b),k(h,c,p*v+w),k(d,h,m*g),k(d,d,p*w+v),k(d,c,p*b-y),k(c,h,-p),k(c,d,m*u),k(c,c,m*f)),C}function Ai(t,e="sxyz"){const i=Mi.get(e);if(void 0===i)throw Error(`invalid axes of '${e}'`);const[s,o,n,a]=i,r=s,l=Hi[r+o],h=Hi[r-o+1];function d(t,e,i){return t[4*i+e]}let c,u,p;if(n){const e=Math.sqrt(d(t,r,l)*d(t,r,l)+d(t,r,h)*d(t,r,h));e>Number.EPSILON?(c=Math.atan2(d(t,r,l),d(t,r,h)),u=Math.atan2(e,d(t,r,r)),p=Math.atan2(d(t,l,r),-d(t,h,r))):(c=Math.atan2(-d(t,l,h),d(t,l,l)),u=Math.atan2(e,d(t,r,r)),p=0)}else{const e=Math.sqrt(d(t,r,r)*d(t,r,r)+d(t,l,r)*d(t,l,r));e>Number.EPSILON?(c=Math.atan2(d(t,h,l),d(t,h,h)),u=Math.atan2(-d(t,h,r),e),p=Math.atan2(d(t,l,r),d(t,r,r))):(c=Math.atan2(-d(t,l,h),d(t,l,l)),u=Math.atan2(-d(t,h,r),e),p=0)}return o&&([c,u,p]=[-c,-u,-p]),a&&([c,p]=[p,c]),{x:c,y:u,z:p}}const Hi=[1,2,0,1],Mi=new Map([["sxyz",[0,0,0,0]],["sxyx",[0,0,1,0]],["sxzy",[0,1,0,0]],["sxzx",[0,1,1,0]],["syzx",[1,0,0,0]],["syzy",[1,0,1,0]],["syxz",[1,1,0,0]],["syxy",[1,1,1,0]],["szxy",[2,0,0,0]],["szxz",[2,0,1,0]],["szyx",[2,1,0,0]],["szyz",[2,1,1,0]],["rzyx",[0,0,0,1]],["rxyx",[0,0,1,1]],["ryzx",[0,1,0,1]],["rxzx",[0,1,1,1]],["rxzy",[1,0,0,1]],["ryzy",[1,0,1,1]],["rzxy",[1,1,0,1]],["ryxy",[1,1,1,1]],["ryxz",[2,0,0,1]],["rzxz",[2,0,1,1]],["rxyz",[2,1,0,1]],["rzyz",[2,1,1,1]]]);class Ti{constructor(t=void 0,e=void 0){if(this.x=new Ei(0,{min:-180,max:180,step:5,default:0}),this.y=new Ei(0,{min:-180,max:180,step:5,default:0}),this.z=new Ei(0,{min:-180,max:180,step:5,default:0}),void 0===t||void 0===e)return;const i=()=>{this.updateBonesMatPoseRecursivly(),e.trigger(this)};this.x.modified.add(i),this.y.modified.add(i),this.z.modified.add(i),this.bone=t,t.children.forEach((t=>{if(void 0===this.down)this.down=new Ti(t,e);else{const i=this.down;this.down=new Ti(t,e),this.down.next=i}}))}updateBonesMatPose(){this.bone.matPose=Si(this.x.value/360*2*Math.PI,this.y.value/360*2*Math.PI,this.z.value/360*2*Math.PI)}updateBonesMatPoseRecursivly(){this.updateBonesMatPose(),this.bone.skeleton.boneslist.forEach((t=>t.update()))}find(t){var e,i;if(this.bone.name===t)return this;const s=null===(e=this.next)||void 0===e?void 0:e.find(t);if(s)return s;const o=null===(i=this.down)||void 0===i?void 0:i.find(t);return o||void 0}}Ti.count=0;class Ri{constructor(t,e,i){this.poseChanged=new d,this.bones=new Map,this.roots=[],this.joint_pos_idxs=new Map,this.planes=new Map,this.plane_map_strategy=3,this.has_custom_weights=!1,this.scale=1,this.scene=t,this.info={name:i.name,version:i.version,tags:i.tags,description:i.description,copyright:i.copyright,license:i.license},this.plane_map_strategy=i.plane_map_strategy;for(let t of Object.getOwnPropertyNames(i.joints)){const e=i.joints[t];e&&e.length>0&&this.joint_pos_idxs.set(t,e)}console.log(`Skeleton.construction(): this.joint_pos_idxs.size = ${this.joint_pos_idxs.size}`);for(let t of Object.getOwnPropertyNames(i.planes))this.planes.set(t,i.planes[t]);const s=new Set,o=new Array;let n=-1;for(;s.size!=i.bones.length&&n!=s.size;){n=s.size;for(let t of Object.getOwnPropertyNames(i.bones)){const e=i.bones[t];if(!s.has(t)){const i=e.parent;if(null!==i&&"string"!=typeof i){console.log(`Bone '${t}' has invalid parent '${i}'`);continue}(null===i||s.has(i))&&(s.add(t),o.push(t))}}}if(s.size!==Object.getOwnPropertyNames(i.bones).length){let t=[];for(let e in i.bones)s.has(e)||t.push(e);console.log(`Some bones defined in file '${e}' could not be added to skeleton '${this.info.name}', because they have an invalid parent bone (${t})`)}console.log(`breadthfirst_bones.length: ${o.length}`);for(let t of o){const e=i.bones[t];let s=e.rotation_plane;"string"!=typeof s&&(console.log(`Invalid rotation plane '${JSON.stringify(s)}' specified for bone ${t}. Please make sure that you edited the .mhskel file by hand to include roll plane joints."`),s=null),this.addBone(t,e.parent,e.head,e.tail,s,e.reference,e.weights_reference)}this.build();const a=i.weights_file;if(void 0!==a){const t=`data/rigs/${a}`,e=S.readFile(t);let i;try{i=JSON.parse(e)}catch(i){throw console.log(`Failed to parse JSON in ${t}:\n${e.substring(0,256)}`),i}this.vertexWeights=new ft(t,i),this.has_custom_weights=!0,console.log("loaded weights...")}this.poseNodes=new Ti(this.roots[0],this.poseChanged)}getJointPosition(t,e=!0){if(this.joint_pos_idxs.has(t)){const i=this.joint_pos_idxs.get(t);let s;if(!e)throw Error("NOT IMPLEMENTED YET");{const t=this.scene.getRestposeCoordinates();s=i.map((e=>[t[e*=3],t[e+1],t[e+2]]))}let o=0,n=0,a=0;return s.forEach((t=>{o+=t[0],n+=t[1],a+=t[2]})),o/=s.length,n/=s.length,a/=s.length,[o,n,a]}throw Error("not implemented")}build(t){this.boneslist=void 0;for(const e of this.getBones())e.build(t)}update(){for(const t of this.getBones())t.update();this.scene.updateRequired=ki.POSE}updateJoints(){for(const t of this.getBones())t.updateJointPositions()}getBones(){return void 0===this.boneslist&&(this.boneslist=this.buildBoneList()),this.boneslist}buildBoneList(){const t=[];let e=[...this.roots];for(;e.length>0;){const i=e.shift();i.index=t.length,t.push(i),e=e.concat(...i.children)}return t}addBone(t,e,i,s,o,n,a){if(t in this.bones)throw Error(`The skeleton ${this.info.name} already contains a bone named ${t}.`);const r=new gt(this,t,e,i,s,o,n,a);return this.bones.set(t,r),e||this.roots.push(r),r}getBone(t){const e=this.bones.get(t);if(void 0===e)throw console.trace(`Skeleton.getBone(${t}): no such bone`),Error(`Skeleton.getBone(${t}): no such bone`);return e}skinMesh(t,e){const i=new Float32Array(t.length);for(let[s,o]of e.entries()){const[e,n]=o,a=this.getBone(s);for(let s=0;s<e.length;++s){const o=3*e[s],r=n[s],l=tt(J(),Y(t[o],t[o+1],t[o+2]),a.matPoseVerts);i[o]+=l[0]*r,i[o+1]+=l[1]*r,i[o+2]+=l[2]*r}}return i}}function Ni(t,e){const i=function(t,e,i="memory"){let s;try{s=JSON.parse(e)}catch(t){throw console.log(`Failed to parse JSON in ${i}:\n${e.substring(0,256)}`),t}return new Ri(t,i,s)}(t,S.readFile(e),e);return console.log(`Loaded skeleton with ${i.bones.size} bones from file ${e}`),i}function $i(t){if(void 0===t)throw Error();return Y(t[0],t[1],t[2])}function Li(t,e,i=1,s=!1){const o=new Map;return s?t.forEach((t=>{let s=1;t.factorDependencies.forEach((t=>{const i=e.get(t);void 0!==i?s*=i:console.log(`no factor for '${t}'`)})),o.set(t.targetPath,i*s)})):t.forEach((t=>{let s=1;t.factorDependencies.forEach((t=>{let i=e.get(t);void 0===i&&(console.log(`no factor for ${t}`),i=1/3),s*=i||0})),o.set(t.targetPath,i*s)})),o}class Ii{constructor(t,e){this.groupName=t.replace("/","-"),this.name=e.replace("/","-"),this.description="",this.value=0,this.defaultValue=0,this.targets=[]}setHuman(t){this.human=t,t.addModifier(this)}get fullName(){return`${this.groupName}/${this.name}`}getMin(){return 0}getMax(){return 1}setValue(t,{skipDependencies:e=!1}={}){const i=this.clampValue(t),s=this.getFactors(i),o=Li(this.targets,s,i);for(let t of o)this.human.setDetail(t[0],t[1]);e||this.propagateUpdate(!1)}resetValue(){const t=this.getValue();return this.setValue(this.getDefaultValue()),t}propagateUpdate(t=!1){console.log("please note: Modifier.propagateUpdate is not implemented")}getValue(){let t=0;for(let e of this.targets)t+=this.human.getDetail(e.targetPath);return t}getDefaultValue(){return this.defaultValue}buildLists(){if(void 0===this.verts&&void 0===this.faces)for(const t in this.targets);}updateValue(t,{updateNormals:e=1,skipUpdate:i=!1}={}){this.setValue(t,{skipDependencies:!0})}getSymmetrySide(){throw Error("Not implemented")}getSymmetricOpposite(){throw Error("Not implemented")}getSimilar(){throw Error("Not implemented")}isMacro(){return void 0!==this.macroVariable}getModel(){return void 0===this.model&&(this.model=new C(this.getDefaultValue(),{min:this.getMin(),max:this.getMax(),step:.05})),this.model}}class Di extends Ii{constructor(t,e){super(t,e)}clampValue(t){return t=Math.min(t),t=void 0!==this.left?Math.max(-1,t):Math.max(0,t)}setValue(t,{skipDependencies:e=!1}={}){t=this.clampValue(t);const i=this.getFactors(t),s=Li(this.targets,i);for(const t of s)this.human.setDetail(t[0],t[1]);e||this.propagateUpdate(!1)}getValue(){if(this.rTargets){let t=0;for(let e of this.rTargets)t+=this.human.getDetail(e.targetPath);return t}let t=0;for(let e of this.lTargets)t+=this.human.getDetail(e.targetPath);return t}getFactors(t){const e=new Map,i=Object.getOwnPropertyDescriptors(this.human);for(const t in i)t.endsWith("Val")&&e.set(t.substring(0,t.length-3),i[t].value.value);return e}}class Bi{constructor(t,e){this.targetPath=t,this.factorDependencies=e}}function zi(t){if(void 0===t)return[];const e=N.getInstance().getTargetsByGroup(t);if(void 0===e)throw Error(`findTargets(): failed to get targetsList for ${t}`);const i=[];for(const t of e){const e=t.tuple(),s=t.getVariables();s.push(e),i.push(new Bi(t.path,s))}return i}class Vi extends Di{constructor(t,e){super(t,e),this.defaultValue=.5,this.targets=zi(t),this.macroDependencies=function(t){var e;const i=new Set;return void 0===t||null===(e=N.getInstance().groups.get(t))||void 0===e||e.forEach((t=>{t.data.forEach(((t,e)=>{void 0!==t&&i.add(e)}))})),i}(t),this.macroVariable=this.getMacroVariable(),this.macroVariable&&this.macroDependencies.delete(this.macroVariable)}getMacroVariable(){if(this.name){let t=this.name.toLowerCase();if(-1!==M.indexOf(t))return t;if(T.has(t))return T.get(t)}}getValue(){return this.getModel().value}setValue(t,{skipDependencies:e=!1}={}){t=this.clampValue(t),this.getModel().value=t,super.setValue(t,{skipDependencies:e})}clampValue(t){return Math.max(0,Math.min(1,t))}getFactors(t){const e=super.getFactors(t);return e.set(this.groupName,1),e}buildLists(){}getModel(){if(void 0!==this.model)return this.model;if(void 0===this.human)throw Error("MacroModifier.getModel(): can only be called after human has been set");switch(this.name){case"Gender":this.model=this.human.gender;break;case"Age":this.model=this.human.age;break;case"Muscle":this.model=this.human.muscle;break;case"Weight":this.model=this.human.weight;break;case"Height":this.model=this.human.height;break;case"BodyProportions":this.model=this.human.bodyProportions;break;case"BreastSize":this.model=this.human.breastSize;break;case"BreastFirmness":this.model=this.human.breastFirmness;break;case"African":this.model=this.human.africanVal;break;case"Asian":this.model=this.human.asianVal;break;case"Caucasian":this.model=this.human.caucasianVal;break;default:throw Error(`MacroModifier.getModel(): not implemented for name '${this.name}'`)}return this.model}}class Oi extends Vi{constructor(t,e){super(t,e),this.defaultValue=1/3}}class Pi extends Di{constructor(t,e,i,s,o){let n,a,r,l,h=`${t}-${e}`;void 0!==i&&void 0!==s?(a=`${h}-${i}`,l=`${h}-${s}`,void 0!==o?(r=`${h}-${o}`,h=`${h}-${i}|${o}|${s}`,n=`${e}-${i}|${o}|${s}`):(r=void 0,h=`${h}-${i}|${s}`,n=`${e}-${i}|${s}`)):(a=void 0,l=h,r=void 0,n=e),super(t,n),this.targetName=h,this.left=a,this.center=r,this.right=l,this.lTargets=zi(this.left),this.rTargets=zi(this.right),this.cTargets=zi(this.center);for(const t of[this.lTargets,this.rTargets,this.cTargets])if(void 0!==t)for(const e of t)this.targets.push(e)}getMin(){return void 0!==this.left?-1:0}getFactors(t){const e=super.getFactors(t);return void 0!==this.left&&e.set(this.left,-Math.min(t,0)),void 0!==this.center&&e.set(this.center,1-Math.abs(t)),e.set(this.right,Math.max(0,t)),e}}function Fi(t,e){return function(t,e,i="memory"){const s=new Map([["EthnicModifier",Oi]]),o=JSON.parse(e),n=new Array,a=new Map;for(const t of o){const e=t.group;for(const i of t.modifiers){let t,o;if("modifierType"in i){if(t=s.get(i.modifierType),void 0===t)throw Error(`failed to instantiate modifer ${i.modifierType}`)}else t="macrovar"in i?Vi:Pi;if("macrovar"in i)o=new t(e,i.macrovar),o.isMacro()||console.log(`Expected modifier ${t.name} to be a macro modifier, but identifies as a regular one. Please check variable category definitions in class Component.`);else{if(t!==Pi)throw Error();o=new t(e,i.target,i.min,i.max,i.mid)}"defaultValue"in i&&(o.defaultValue=i.defaultValue),void 0===o.fullName&&(console.log("ERROR: modifier has no fullName"),console.log(o)),n.push(o),a.set(o.fullName,o)}}for(const e of n)e.setHuman(t);return console.log(`Loaded ${n.length} modifiers from file ${i}`),n}(t,S.readFile(e),e)}class Wi{constructor(t,e,i){if(Wi.count++,this.label=e||"",this.modifierSpec=i,i){const e=t.getModifier(i.mod);void 0!==e&&(this.model=e.getModel(),this.model.modified.add((()=>{e.updateValue(this.model.value),t.updateProxyMesh(!0)})))}}}function Ui(t){return t[0].toUpperCase()+t.slice(1)}function ji(t,e){const i=e.split("-");return-1!==i[i.length-1].indexOf("|")&&i.pop(),i.length>1&&i[0]===t&&i.shift(),i[0]=Ui(i[0]),i.join(" ")}function Gi(t,e){const i=function(t,e,i="memory"){const s=JSON.parse(e);let o,n;for(const[e,i]of Object.entries(s).sort(((t,e)=>t[1].sortOrder-e[1].sortOrder))){const s=i;let a=e;void 0!==s.label&&(a=s.label);const r=new Wi(t,a);let l;r.category=s,n?n.next=r:o=r,n=r;for(const[e,i]of Object.entries(s.modifiers)){const s=new Wi(t,Ui(e));let o;l?l.next=s:n.down=s,l=s;for(const e of i){let i=e.label;if(void 0===i){const t=e.mod.split("/");i=ji(t[0],t[1])}const s=new Wi(t,i,e);o?o.next=s:l.down=s,o=s}}}if(void 0===o)throw Error("No sliders found.");return o}(t,S.readFile(e),e);return console.log(`Loaded ${Wi.count} slider nodes from file ${e}`),i}Wi.count=0;class Xi{constructor(t,e){this.name=t,this.startIndex=e,this.length=0}}class Ji{toString(){return`WavefrontObj {name: '${this.name}', vertices: ${this.vertex.length/3}, quads: ${this.fxyz.length/6}, groups: ${this.groups.length}} `}constructor(t,e){this.name="",this.vcount=[],this.fxyz=[],this.fuv=[],this.name=t,void 0===e&&(e=S.readFile(t)),this.groups=[],this.material=[];const i=[],s=[],o=[],n=[],a=new E(e);for(let t of a){if(t=t.trim(),0===t.length)continue;if("#"===t[0])continue;const e=t.split(/\s+/);switch(e[0]){case"v":if(4!==e.length)throw Error(`vertex (v) must have 3 arguments in ${t}`);s.push(parseFloat(e[1])),s.push(parseFloat(e[2])),s.push(parseFloat(e[3]));break;case"vt":if(3!=e.length)throw Error(`vertex texture (vt) must have 2 arguments in ${t}`);o.push(parseFloat(e[1])),o.push(parseFloat(e[2]));break;case"vn":if(4!=e.length)throw Error(`vertex normal (vn) must have 3 arguments in ${t}`);n.push(parseFloat(e[1])),n.push(parseFloat(e[2])),n.push(parseFloat(e[3]));break;case"vp":case"deg":case"bmat":case"step":case"cstype":case"p":case"l":case"curv":case"curv2":case"surf":case"parm":case"trim":case"hole":case"scrv":case"sp":case"end":case"con":case"s":case"mg":case"bevel":case"c_interp":case"d_interp":case"lod":case"mtllib":case"shadow_obj":case"trace_obj":case"ctech":case"stech":break;case"f":i.push(e.length-1);for(let t=1;t<e.length;++t){const i=e[t].split("/");this.fxyz.push(parseInt(i[0],10)-1),this.fuv.push(parseInt(i[1],10)-1)}break;case"g":this.groups.push(new Xi(e[1],this.fxyz.length));break;case"o":this.name=e[1];break;case"usemtl":this.material.push(new Xi(e[1],this.fxyz.length));break;default:throw Error(`Unknown keyword '${e[0]}' in Wavefront OBJ file in line '${t}' of length ${t.length}.`)}}if(this.vcount=i,this.vertex=new Float32Array(s),this.uv=new Float32Array(o),this.groups.length>0){for(let t=0;t<this.groups.length-1;++t)this.groups[t].length=this.groups[t+1].startIndex-this.groups[t].startIndex;this.groups[this.groups.length-1].length=this.fxyz.length-this.groups[this.groups.length-1].startIndex}if(this.material.length>0){for(let t=0;t<this.material.length-1;++t)this.material[t].length=this.material[t+1].startIndex-this.material[t].startIndex;this.material[this.material.length-1].length=this.fxyz.length-this.material[this.material.length-1].startIndex}this.logStatistics(t)}getFaceGroup(t){const e=this.groups.filter((e=>e.name===t));if(1===e.length)return e[0]}logStatistics(t){let e="",i=0,s=0;this.groups.forEach((t=>{t.name.startsWith("joint-")?++i:t.name.startsWith("helper-")?++s:e=0===e.length?t.name:`${e}, ${t.name}`})),0!==e.length&&(e=` and ${e}`),console.log(`Loaded ${this.groups.length} groups (${i} joints, ${s} helpers${e}), ${this.material.length} materials, ${this.vertex.length/3} vertices, ${this.uv.length/2} uvs, ${this.fxyz.length/3} triangles from file '${t}'`)}}var Yi,qi,Ki;function Zi(t,e,i){if(t.length!==e.length)throw Error(`lengths must be equal but are ${t.length} and ${e.length}`);for(let s=0;s<t.length;++s)i(t[s],e[s])}!function(t){t[t.EXPRESSION=0]="EXPRESSION",t[t.POLYGON=1]="POLYGON",t[t.WIREFRAME=2]="WIREFRAME",t[t.CHORDATA=3]="CHORDATA"}(Yi||(Yi={})),function(t){t[t.SKIN=0]="SKIN",t[t.PANTS_HELPER=1]="PANTS_HELPER",t[t.SKIRT=126]="SKIRT",t[t.HAIR=127]="HAIR",t[t.EYEBALL0=128]="EYEBALL0",t[t.EYEBALL1=129]="EYEBALL1",t[t.PENIS=130]="PENIS",t[t.TEETH_TOP=131]="TEETH_TOP",t[t.TEETH_BOTTOM=132]="TEETH_BOTTOM",t[t.TOUNGE=169]="TOUNGE",t[t.CUBE=171]="CUBE"}(qi||(qi={}));class Qi{constructor(t){}fromSingle(t,e,i){const s=parseInt(t[0]);this._verts=[s,0,1],this._weights=[1,0,0],this._offset=[0,0,0],this._addProxyVertWeight(i,s,e,1)}fromTriple(t,e,i){const s=parseInt(t[0]),o=parseInt(t[1]),n=parseInt(t[2]),a=parseFloat(t[3]),r=parseFloat(t[4]),l=parseFloat(t[5]);let h,d,c;t.length>6?(h=parseFloat(t[6]),d=parseFloat(t[7]),c=parseFloat(t[8])):[h,d,c]=[0,0,0],this._verts=[s,o,n],this._weights=[a,r,l],this._offset=[h,d,c],this._addProxyVertWeight(i,s,e,a),this._addProxyVertWeight(i,o,e,r),this._addProxyVertWeight(i,n,e,l)}_addProxyVertWeight(t,e,i,s){t.has(e)?t.get(e).push([i,s]):t.set(e,[[i,s]])}}class ts{getScaleData(t,e){const i=parseInt(t[0]),s=parseInt(t[1]),o=parseFloat(t[2]);void 0===this.scaleData&&(this.scaleData=[void 0,void 0,void 0]),this.scaleData[e]=[i,s,o]}getShearData(t,e,i=void 0){const s=[parseInt(t[0]),parseInt(t[1]),parseFloat(t[2]),parseFloat(t[3])];"Left"===i&&(void 0===this.lShearData&&(this.lShearData=[void 0,void 0,void 0]),this.lShearData[e]=s),"Right"===i&&(void 0===this.rShearData&&(this.rShearData=[void 0,void 0,void 0]),this.rShearData[e]=s),void 0===i&&(void 0===this.shearData&&(this.shearData=[void 0,void 0,void 0]),this.shearData[e]=s)}getMatrix(t){if(void 0!==this.scaleData){const e=B(D());for(let i=0;i<3;++i){const[s,o,n]=this.scaleData[i],a=3*s,r=3*o,l=Math.abs(t[a+i]-t[r+i]);e[3*i+i]=l/n}return e}if(void 0!==this.shearData)throw Error("not implemented");if(void 0!==this.lShearData)throw Error("not implemented");if(void 0!==this.rShearData)throw Error("not implemented");return B(D())}}!function(t){t[t.Proxymeshes=0]="Proxymeshes",t[t.Clothes=1]="Clothes",t[t.Hair=2]="Hair",t[t.Eyes=3]="Eyes",t[t.Eyebrows=4]="Eyebrows",t[t.Eyelashes=5]="Eyelashes",t[t.Teeth=6]="Teeth",t[t.Tongue=7]="Tongue"}(Ki||(Ki={}));class es{constructor(t,e,i){this.description="",this.tags=[],this.version=110,this.tmatrix=new ts,this.vertWeights=new Map,this.z_depth=-1,this.special_pose=new Map,this.uvLayers=new Map,this.file=t,this.type=e;const s=function(t){return t.split("/").reverse()[0]}(function(t){return t.split(".")[0]}(t));var o;this.name=(o=s).charAt(0).toUpperCase()+o.slice(1),this.human=i}loadMeshAndObject(){return new Ji(this._obj_file)}_finalize(t){this.weights=t.map((t=>t._weights)),this.ref_vIdxs=t.map((t=>t._verts)),this.offsets=t.map((t=>t._offset))}getCoords(t){const e=this.tmatrix.getMatrix(this.human.scene.vertexMorphed),i=this.ref_vIdxs,s=this.weights,o=this.offsets,n=new Float32Array(3*i.length);for(let a=0;a<i.length;++a){let r=s[a][0],l=s[a][1],h=s[a][2],d=i[a],c=3*d[0],u=3*d[1],p=3*d[2],g=et(J(),Y(o[a][0],o[a][1],o[a][2]),e),f=t[c+0]*r+t[u+0]*l+t[p+0]*h+g[0],m=t[c+1]*r+t[u+1]*l+t[p+1]*h+g[1],x=t[c+2]*r+t[u+2]*l+t[p+2]*h+g[2];n[3*a]=f,n[3*a+1]=m,n[3*a+2]=x}return n}getVertexWeights(t,e=void 0,i=!1){const s=this._getVertexWeights(t);return new ft(this.file,{weights:s})}_getVertexWeights(t){if(this.vertexBoneWeights)throw Error("not implemented");const e={};return t._data.forEach((([t,i],s)=>{const o=[];Zi(t,i,((t,e)=>{let i=this.vertWeights.get(t);if(void 0!==i)for(let[t,s]of i){const i=s*e;i>1e-4&&o.push([t,i])}})),o.length>0&&(e[s]=o)})),e}}function is(t,e,i=Ki.Clothes){const s=function(t,e,i=Ki.Clothes,s){void 0===s&&(s=S.readFile(e));const o=new E(s),n=e.substring(0,e.lastIndexOf("/")),a=new es(e,i,t),r=[];let l=0,h=0;for(let i of o){if(i=i.trim(),0===i.length)continue;if("#"===i[0])continue;const s=i.split(/\s+/);if(0===s.length)continue;const o=s.shift();if("name"!==o)if("uuid"!==o)if("description"!==o)if("tag"!==o)if("version"!==o)if("z_depth"!==o)if("max_pole"!==o)if("special_pose"!==o)if("verts"!==o)if("weights"!==o)if("delete_verts"!==o)if("obj_file"!==o)if("material"!==o)if("vertexboneweights_file"!==o)if("backface_culling"!=o)if("transparent"!=o)if("uvLayer"!=o)if("x_scale"!==o)if("y_scale"!==o)if("z_scale"!==o)if("shear_x"!=o)if("shear_y"!=o)if("shear_z"!=o)if("l_shear_x"!=o)if("l_shear_y"!=o)if("l_shear_z"!=o)if("r_shear_x"!=o)if("r_shear_y"!=o)if("r_shear_z"!=o)if("basemesh"!==o)if(-1===["shapekey","subsurf","shrinkwrap","solidify","objfile_layer","uvtex_layer","use_projection","mask_uv_layer","texture_uv_layer","delete","vertexgroup_file"].findIndex((t=>t===o))){if(l!=ss){if(l==os)throw Error("doWeights");console.warn(`Unknown keyword ${o} found in proxy file ${e}`);break}{const e=new Qi(t);r.push(e),0==s.length?e.fromSingle([o],h,a.vertWeights):e.fromTriple([o,...s],h,a.vertWeights),h+=1}}else console.warn(`Deprecated parameter "${o}" used in proxy file. Please remove.`);else a.basemesh=s[0];else a.tmatrix.getShearData(s,2,"Right");else a.tmatrix.getShearData(s,1,"Right");else a.tmatrix.getShearData(s,0,"Right");else a.tmatrix.getShearData(s,2,"Left");else a.tmatrix.getShearData(s,1,"Left");else a.tmatrix.getShearData(s,0,"Left");else a.tmatrix.getShearData(s,2,void 0);else a.tmatrix.getShearData(s,1,void 0);else a.tmatrix.getShearData(s,0,void 0);else a.tmatrix.getScaleData(s,2);else a.tmatrix.getScaleData(s,1);else a.tmatrix.getScaleData(s,0);else{let t,e;s.length>1?(t=parseInt(s[0]),e=s[1]):(t=0,e=s[0]),a.uvLayers.set(t,as(n,e,".mhuv"))}else console.warn('Deprecated parameter "transparent" used in proxy file. Set property in material file instead.');else console.warn('Deprecated parameter "backface_culling" used in proxy file. Set property backfaceCull in material instead.');else{console.log("loaded weights..."),a._vertexBoneWeights_file=as(n,s[0],".jsonw");const t=S.readFile(a._vertexBoneWeights_file);let e;try{e=JSON.parse(t)}catch(e){throw console.log(`Failed to parse JSON in ${a._vertexBoneWeights_file}:\n${t.substring(0,256)}`),e}a.vertexBoneWeights=new ft(a._vertexBoneWeights_file,e)}else{const t=as(n,s[0],".mhmat");a._material_file=t}else a._obj_file=as(n,s[0],".obj");else l=ns;else l=os;else l=ss;else a.special_pose.set(s[0],s[1]);else a.max_pole=parseInt(s[0]);else a.z_depth=parseInt(s[0]);else a.version=parseInt(s[0]);else a.tags.push(s.join(" ").toLowerCase());else a.description=s.join(" ");else a.uuid=s.join(" ");else a.name=s.join(" ")}-1===a.z_depth&&(console.warn(`Proxy file ${e} does not specify a Z depth. Using 50.`),a.z_depth=50);return a.max_pole*=2,a._finalize(r),a}(t,e.substring(0,e.lastIndexOf("."))+((i===Ki.Proxymeshes?".proxy":".mhclo")+".z"),i);return s.mesh=s.loadMeshAndObject(),s}const ss=1,os=2,ns=3;function as(t,e,i){return`${t}/${e.substring(0,e.indexOf("."))}${i}`}function rs(t,e,i){return t[e+4*i]}function ls(t){let e=t;const i=new Es,s=t.proxies.get(Ki.Teeth),o=[{xyz:t.vertexMorphed,fxyz:t.baseMesh.fxyz,uv:t.baseMesh.uv,fuv:t.baseMesh.fuv,vertexWeights:t.skeleton.vertexWeights,start:t.baseMesh.groups[qi.SKIN].startIndex,length:t.baseMesh.groups[qi.SKIN].length,name:"skin",r:1,g:.5,b:.5},{xyz:t.vertexMorphed,fxyz:t.baseMesh.fxyz,uv:t.baseMesh.uv,fuv:t.baseMesh.fuv,vertexWeights:t.skeleton.vertexWeights,start:t.baseMesh.groups[qi.EYEBALL0].startIndex,length:t.baseMesh.groups[qi.EYEBALL0].length,name:"eyeL",r:0,g:1,b:.5},{xyz:t.vertexMorphed,fxyz:t.baseMesh.fxyz,uv:t.baseMesh.uv,fuv:t.baseMesh.fuv,vertexWeights:t.skeleton.vertexWeights,start:t.baseMesh.groups[qi.EYEBALL1].startIndex,length:t.baseMesh.groups[qi.EYEBALL1].length,name:"eyeR",r:1,g:0,b:0},{xyz:s.getCoords(t.vertexMorphed),fxyz:s.mesh.fxyz,uv:s.mesh.uv,fuv:s.mesh.fuv,vertexWeights:s.getVertexWeights(t.skeleton.vertexWeights),start:0,length:s.mesh.fxyz.length,name:"teeth",r:1,g:1,b:1},{xyz:t.vertexMorphed,fxyz:t.baseMesh.fxyz,uv:t.baseMesh.uv,fuv:t.baseMesh.fuv,vertexWeights:t.skeleton.vertexWeights,start:t.baseMesh.groups[qi.TOUNGE].startIndex,length:t.baseMesh.groups[qi.TOUNGE].length,name:"tounge",r:1,g:0,b:0}];return`<?xml version="1.0" encoding="utf-8"?>\n<COLLADA xmlns="http://www.collada.org/2005/11/COLLADASchema" version="1.4.1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\n  <asset>\n    <contributor>\n      <author>makehuman.js user</author>\n      <authoring_tool>https://github.com/markandre13/makehuman.js</authoring_tool>\n    </contributor>\n    <created>${(new Date).toISOString()}</created>\n    <modified>${(new Date).toISOString()}</modified>\n    <unit name="meter" meter="0.1"/>\n    <up_axis>Y_UP</up_axis>\n  </asset>\n  <library_images/>\n`+function(t){let e="  <library_effects>\n";return t.forEach((t=>{e+=`    <effect id="${t.name}-effect">\n      <profile_COMMON>\n        <technique sid="common">\n          <lambert>\n            <emission>\n              <color sid="emission">0 0 0 1</color>\n            </emission>\n            <diffuse>\n              <color sid="diffuse">${t.r} ${t.g} ${t.b} 1</color>\n            </diffuse>\n            <reflectivity>\n              <float sid="specular">0.0</float>\n            </reflectivity>\n          </lambert>\n        </technique>\n      </profile_COMMON>\n    </effect>\n`})),e+="  </library_effects>\n",e}(o)+function(t){let e="  <library_materials>\n";return t.forEach((t=>{e+=`    <material id="${t.name}-material" name="${t.name}">\n      <instance_effect url="#${t.name}-effect"/>\n    </material>\n`})),e+="  </library_materials>\n",e}(o)+function(t,e,i){for(let t of i)Ss(t.xyz,t.uv,t.fxyz,t.fuv,t.start,t.length,e);let s=`  <library_geometries>\n    <geometry id="${cs}" name="${ds}">\n      <mesh>\n        <source id="${us}">\n          <float_array id="${ps}" count="${e.xyz.length}">${e.xyz.join(" ")}</float_array>\n          <technique_common>\n            <accessor source="#${ps}" count="${e.xyz.length/3}" stride="3">\n              <param name="X" type="float"/>\n              <param name="Y" type="float"/>\n              <param name="Z" type="float"/>\n            </accessor>\n          </technique_common>\n        </source>\n        <vertices id="${gs}">\n          <input semantic="POSITION" source="#${us}"/>\n        </vertices>\n        <source id="${fs}">\n          <float_array id="${ms}" count="${e.uv.length}">${e.uv.join(" ")}</float_array>\n          <technique_common>\n            <accessor source="#${ms}" count="${e.uv.length/2}" stride="2">\n              <param name="S" type="float"/>\n              <param name="T" type="float"/>\n            </accessor>\n          </technique_common>\n        </source>\n`;for(let t=0;t<i.length;++t){let o="";Zi(e.indices[t].fxyz,e.indices[t].fuv,((t,e)=>{o=`${o}${t} ${e} `})),s+=`        <polylist material="${i[t].name}-material" count="${e.indices[t].fxyz.length/4}">\n          <input semantic="VERTEX" source="#${gs}" offset="0"/>\n          <input semantic="TEXCOORD" source="#${fs}" offset="1" set="1"/>\n          <vcount>${"4 ".repeat(e.indices[t].fxyz.length/4)}</vcount>\n          <p>${o}</p>\n        </polylist>\n`}return s+="      </mesh>\n    </geometry>\n  </library_geometries>\n",s}(0,i,o)+function(t,e,i){const s=t.skeleton.boneslist.map((t=>t.name));let o="";t.skeleton.boneslist.forEach((t=>{o+=function(t){return Ms(P(z(),t.matRestGlobal))}(t)+" "})),o=o.trimEnd();const{boneWeightPairs:n,weightMap:a}=function(t){let e=new Array(t.xyz.length/3);for(let t=0;t<e.length;++t)e[t]=[];const i=new Map;return{boneWeightPairs:e,weightMap:i}}(e);for(const s of i)As(s.xyz,s.vertexWeights,t.skeleton.bones,e,n,a);const r=function(t){const e=new Array(t.size);return t.forEach(((t,i)=>{e[t]=i})),e}(a),l=function(t){const e=[];return t.forEach((t=>{t.forEach((t=>t.forEach((t=>e.push(t)))))})),e}(n);return`  <library_controllers>\n    <controller id="${vs}" name="${xs}">\n      <skin source="#${cs}">\n        <bind_shape_matrix>${Ms(Hs)}</bind_shape_matrix>\n        <source id="${bs}">\n          <Name_array id="${ys}" count="3">${s.join(" ").replace(/\./g,"_")}</Name_array>\n          <technique_common>\n            <accessor source="#${ys}" count="${s.length}" stride="1">\n              <param name="JOINT" type="name"/>\n            </accessor>\n          </technique_common>\n        </source>\n        <source id="${ks}">\n          <float_array id="${_s}" count="${16*s.length}">${o}</float_array>\n          <technique_common>\n            <accessor source="#${_s}" count="${s.length}" stride="16">\n              <param name="TRANSFORM" type="float4x4"/>\n            </accessor>\n          </technique_common>\n        </source>\n        <source id="${ws}">\n          <float_array id="${Cs}" count="${r.length}">${r.join(" ")}</float_array>\n          <technique_common>\n            <accessor source="#${Cs}" count="${r.length}" stride="1">\n              <param name="WEIGHT" type="float"/>\n            </accessor>\n          </technique_common>\n        </source>\n        <joints>\n          <input semantic="JOINT" source="#${bs}"/>\n          <input semantic="INV_BIND_MATRIX" source="#${ks}"/>\n        </joints>\n        <vertex_weights count="${n.length}">\n          <input semantic="JOINT" source="#${bs}" offset="0"/>\n          <input semantic="WEIGHT" source="#${ws}" offset="1"/>\n          <vcount>${n.map((t=>t.length)).join(" ")}</vcount>\n          <v>${l.join(" ")}</v>\n        </vertex_weights>\n      </skin>\n    </controller>\n  </library_controllers>\n`}(e,i,o)+'  <library_animations>\n    <animation id="action_container-Armature" name="Armature">\n        \x3c!-- X --\x3e\n       <animation id="Armature_jaw_ArmatureAction___jaw___rotation_euler_X" name="Armature_jaw">\n         <source id="Armature_jaw_ArmatureAction___jaw___rotation_euler_X-input">\n           <float_array id="Armature_jaw_ArmatureAction___jaw___rotation_euler_X-input-array" count="3">0.04166662 0.4166666 0.8333333</float_array>\n           <technique_common>\n             <accessor source="#Armature_jaw_ArmatureAction___jaw___rotation_euler_X-input-array" count="3" stride="1">\n               <param name="TIME" type="float"/>\n             </accessor>\n           </technique_common>\n         </source>\n         <source id="Armature_jaw_ArmatureAction___jaw___rotation_euler_X-output">\n           <float_array id="Armature_jaw_ArmatureAction___jaw___rotation_euler_X-output-array" count="3">0.0 20.0 0.0</float_array>\n           <technique_common>\n             <accessor source="#Armature_jaw_ArmatureAction___jaw___rotation_euler_X-output-array" count="3" stride="1">\n               <param name="ANGLE" type="float"/>\n             </accessor>\n           </technique_common>\n         </source>\n         <source id="Armature_jaw_ArmatureAction___jaw___rotation_euler_X-interpolation">\n           <Name_array id="Armature_jaw_ArmatureAction___jaw___rotation_euler_X-interpolation-array" count="3">LINEAR LINEAR LINEAR</Name_array>\n           <technique_common>\n             <accessor source="#Armature_jaw_ArmatureAction___jaw___rotation_euler_X-interpolation-array" count="3" stride="1">\n               <param name="INTERPOLATION" type="name"/>\n             </accessor>\n           </technique_common>\n         </source>\n         <sampler id="Armature_jaw_ArmatureAction___jaw___rotation_euler_X-sampler">\n           <input semantic="INPUT" source="#Armature_jaw_ArmatureAction___jaw___rotation_euler_X-input"/>\n           <input semantic="OUTPUT" source="#Armature_jaw_ArmatureAction___jaw___rotation_euler_X-output"/>\n           <input semantic="INTERPOLATION" source="#Armature_jaw_ArmatureAction___jaw___rotation_euler_X-interpolation"/>\n         </sampler>\n         <channel source="#Armature_jaw_ArmatureAction___jaw___rotation_euler_X-sampler" target="Armature_jaw/rotationX.ANGLE"/>\n       </animation>\n       \x3c!-- Y, Z, ... --\x3e\n     </animation>\n   </library_animations>\n'+function(t,e){let i=`  <library_visual_scenes>\n    <visual_scene id="${hs}" name="${hs}">\n      <node id="${xs}" name="${xs}" type="NODE">\n        <matrix sid="transform">${Ms(Hs)}</matrix>\n${Ts(xs,t.skeleton.roots[0])}\n`;i+=`        <node id="${ds}" name="${ds}" type="NODE">\n          <matrix sid="transform">${Ms(Hs)}</matrix>\n          <instance_controller url="#${vs}">\n            <skeleton>#${xs}_${t.skeleton.roots[0].name}</skeleton>\n            <bind_material>\n              <technique_common>\n`;for(let t=0;t<e.length;++t)i+=`                <instance_material symbol="${e[t].name}-material" target="#${e[t].name}-material">\n                  <bind_vertex_input semantic="UVMap" input_semantic="TEXCOORD" input_set="0"/>\n                </instance_material>\n`;return i+="              </technique_common>\n            </bind_material>\n          </instance_controller>\n        </node>\n",i+="      </node>\n    </visual_scene>\n  </library_visual_scenes>\n",i}(e,o)+`  <scene>\n    <instance_visual_scene url="#${hs}"/>\n  </scene>\n</COLLADA>`}const hs="Scene",ds="Human",cs=`${ds}-mesh`,us=`${cs}-positions`,ps=`${us}-array`,gs=`${cs}-vertices`,fs=`${cs}-texcoords`,ms=`${fs}-array`,xs="Armature",vs=`${`${xs}_${ds}`}-skin`,bs=`${vs}-joints`,ys=`${bs}-array`,ws=`${vs}-weights`,Cs=`${ws}-array`,ks=`${vs}-bind_poses`,_s=`${ks}-array`;class Es{constructor(){this.indices=[],this.xyz=[],this.uv=[],this.indexMap=new Map}getIndex(t,e){var i;return null===(i=this.indexMap.get(t))||void 0===i?void 0:i.fxyz.get(e)}addPoint(t,e,i,s){let o=this.indexMap.get(t);void 0===o&&(o={fxyz:new Map,fuv:new Map},this.indexMap.set(t,o));let n=o.fxyz.get(i);if(void 0===n){n=this.xyz.length/3,o.fxyz.set(i,n);const e=3*i,s=[t[e],t[e+1],t[e+2]];this.xyz.push(...s)}let a=o.fuv.get(s);if(void 0===a){a=this.uv.length/2,o.fuv.set(s,a);const t=2*s,i=[e[t],e[t+1]];this.uv.push(...i)}const r=this.indices[this.indices.length-1];r.fxyz.push(n),r.fuv.push(a)}addMesh(){this.indices.push({fxyz:[],fuv:[]})}addQuad(t,e,i,s,o){this.addPoint(t,e,i[o],s[o]),this.addPoint(t,e,i[o+1],s[o+1]),this.addPoint(t,e,i[o+2],s[o+2]),this.addPoint(t,e,i[o+3],s[o+3])}getQuadXYZ(t,e){const i=3*this.indices[t].fxyz[4*e],s=3*this.indices[t].fxyz[4*e+1],o=3*this.indices[t].fxyz[4*e+2],n=3*this.indices[t].fxyz[4*e+3];return[[this.xyz[i],this.xyz[i+1],this.xyz[i+2]],[this.xyz[s],this.xyz[s+1],this.xyz[s+2]],[this.xyz[o],this.xyz[o+1],this.xyz[o+2]],[this.xyz[n],this.xyz[n+1],this.xyz[n+2]]]}getQuadUV(t,e){const i=2*this.indices[t].fuv[4*e],s=2*this.indices[t].fuv[4*e+1],o=2*this.indices[t].fuv[4*e+2],n=2*this.indices[t].fuv[4*e+3];return[[this.uv[i],this.uv[i+1]],[this.uv[s],this.uv[s+1]],[this.uv[o],this.uv[o+1]],[this.uv[n],this.uv[n+1]]]}}function Ss(t,e,i,s,o,n,a){const r=o+n;a.addMesh();for(let n=o;n<r;n+=4)a.addQuad(t,e,i,s,n)}function As(t,e,i,s,o,n){e._data.forEach(((e,a)=>{Zi(e[0],e[1],((e,r)=>{const l=s.getIndex(t,e);if(void 0===l)return;let h=n.get(r);void 0===h&&(h=n.size,n.set(r,h)),o[l].push([i.get(a).index,h])}))}))}const Hs=O(z());function Ms(t){const e=[0,4,8,12,1,5,9,13,2,6,10,14,3,7,11,15];let i="";for(let s=0;s<16;++s){i+=`${t[e[s]]} `}return i.trimEnd()}function Ts(t,e,i=4,s=!1){const o=function(t){let e="";for(let i=0;i<t;++i)e+="  ";return e}(i);let n="";n+=`${o}<node id="${t}_${e.name.replace(/\./g,"_")}" name="${e.name}" sid="${e.name.replace(/\./g,"_")}" type="JOINT">\n`;const{x:a,y:r,z:l}=function(t){const e=rs(t,0,0)*rs(t,0,0)+rs(t,0,1)*rs(t,0,1);let i,s,o;return e<Number.EPSILON?(i=Math.atan2(-rs(t,1,2),rs(t,1,1)),s=Math.atan2(-rs(t,2,0),e),o=0):(i=Math.atan2(rs(t,2,1),rs(t,2,2)),s=Math.atan2(-rs(t,2,0),e),o=Math.atan2(rs(t,1,0),rs(t,0,0))),{x:i,y:s,z:o}}(e.matRestRelative);n+=`${o}  <rotate sid="rotationX">1 0 0 ${a}</rotate>\n`,n+=`${o}  <rotate sid="rotationY">0 1 0 ${r}</rotate>\n`,n+=`${o}  <rotate sid="rotationZ">0 0 1 ${l}</rotate>\n`,n+=`${o}  <translate sid="location">${e.matRestRelative[3]} ${e.matRestRelative[7]} ${e.matRestRelative[11]}</translate>\n`,n+=`${o}  <extra>\n`,n+=`${o}    <technique profile="blender">\n`;const h=new Set,d=ot(it(),e.yvector4,e.matRestGlobal);for(let t of e.children){const e=ot(it(),st(0,0,0,1),t.matRestGlobal);u=e,p=void 0,g=void 0,f=void 0,m=void 0,x=void 0,v=void 0,b=void 0,y=void 0,p=(c=d)[0],g=c[1],f=c[2],m=c[3],x=u[0],v=u[1],b=u[2],y=u[3],Math.abs(p-x)<=L*Math.max(1,Math.abs(p),Math.abs(x))&&Math.abs(g-v)<=L*Math.max(1,Math.abs(g),Math.abs(v))&&Math.abs(f-b)<=L*Math.max(1,Math.abs(f),Math.abs(b))&&Math.abs(m-y)<=L*Math.max(1,Math.abs(m),Math.abs(y))&&h.add(t)}var c,u,p,g,f,m,x,v,b,y;if(s&&(n+=`${o}      <connect sid="connect" type="bool">1</connect>\n`),n+=`${o}      <layer sid="layer" type="string">0</layer>\n`,0===h.size){const t=ot(it(),st(0,0,0,1),e.matRestGlobal),i=nt(it(),d,t);n+=`${o}      <tip_x sid="tip_x" type="float">${i[0]}</tip_x>\n`,n+=`${o}      <tip_y sid="tip_y" type="float">${i[1]}</tip_y>\n`,n+=`${o}      <tip_z sid="tip_z" type="float">${i[2]}</tip_z>\n`}n+=`${o}    </technique>\n`,n+=`${o}  </extra>\n`;for(let s of e.children)n+=Ts(t,s,i+1,h.has(s));return n+=`${o}</node>\n`,n}class Rs extends wi{constructor(t){super(t),this.config.expandColumn=!0}get colCount(){return 2}showCell(t,e){if(void 0===this.model)return void console.log("no model");const i=this.model.rows[t.row].node;switch(t.col){case 0:this.treeCell(t,e,i.bone.name);break;case 1:const s=a(o,{children:[n(Xt,{model:i.x,style:{width:"50px"}}),n(Xt,{model:i.y,style:{width:"50px"}}),n(Xt,{model:i.z,style:{width:"50px"}})]});e.replaceChildren(...s)}}}class Ns extends wi{constructor(t){super(t),this.config.expandColumn=!0}get colCount(){return 2}showCell(t,e){if(void 0===this.model)return void console.log("no model");const i=this.model.rows[t.row].node;switch(t.col){case 0:this.treeCell(t,e,i.label);break;case 1:if(i.model){const t=a(o,{children:[n(Xt,{model:i.model,style:{width:"50px"}}),n(we,{model:i.model,style:{width:"200px"}})]});e.replaceChildren(...t)}}}}class $s{constructor(t,e,i){const s=t.createProgram();if(null===s)throw Error("Unable to create WebGLProgram");const o=$s.compileShader(t,t.VERTEX_SHADER,e),n=$s.compileShader(t,t.FRAGMENT_SHADER,i);if(t.attachShader(s,o),t.attachShader(s,n),t.linkProgram(s),!t.getProgramParameter(s,t.LINK_STATUS))throw Error(`Unable to initialize WebGLProgram: ${t.getProgramInfoLog(s)}`);this.gl=t,this.program=s,this.vertexPosition=t.getAttribLocation(this.program,"aVertexPosition"),this.vertexNormal=t.getAttribLocation(this.program,"aVertexNormal"),this.projectionMatrix=$s.getUniformLocation(t,this.program,"uProjectionMatrix"),this.modelViewMatrix=$s.getUniformLocation(t,this.program,"uModelViewMatrix"),this.normalMatrix=$s.getUniformLocation(t,this.program,"uNormalMatrix")}bind(t,e,i,s){const o=this.gl.FLOAT;this.gl.bindBuffer(this.gl.ARRAY_BUFFER,e),this.gl.vertexAttribPointer(this.vertexPosition,3,o,false,0,0),this.gl.enableVertexAttribArray(this.vertexPosition),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,i),this.gl.vertexAttribPointer(this.vertexNormal,3,o,false,0,0),this.gl.enableVertexAttribArray(this.vertexNormal),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,t)}init(t,e,i){this.gl.useProgram(this.program),this.gl.uniformMatrix4fv(this.projectionMatrix,!1,t),this.gl.uniformMatrix4fv(this.modelViewMatrix,!1,e),this.gl.uniformMatrix4fv(this.normalMatrix,!1,i)}static compileShader(t,e,i){const s=t.createShader(e);if(null===s)throw Error("Unable to create WebGLShader");if(t.shaderSource(s,i),t.compileShader(s),!t.getShaderParameter(s,t.COMPILE_STATUS))throw t.deleteShader(s),Error(`An error occurred compiling the ${e} WebGLShader: ${t.getShaderInfoLog(s)}`);return s}static getUniformLocation(t,e,i){const s=t.getUniformLocation(e,i);if(null===s)throw Error(`Internal Error: Failed to get uniform location for ${i}`);return s}}class Ls extends $s{constructor(t){super(t,Is,Ds),this._color=$s.getUniformLocation(t,this.program,"uColor")}setColor(t){this.gl.uniform4fv(this._color,t)}}const Is="\n// this is our input per vertex\nattribute vec4 aVertexPosition;\nattribute vec3 aVertexNormal;\n\n// input for all vertices (uniform for the whole shader program)\nuniform mat4 uNormalMatrix;\nuniform mat4 uModelViewMatrix;\nuniform mat4 uProjectionMatrix;\n\nuniform vec4 uColor;\n\n// data exchanged with other graphic pipeline stages\nvarying lowp vec4 vColor;\nvarying highp vec3 vLighting;\n\nvoid main(void) {\n  gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;\n\n  highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);\n  highp vec3 directionalLightColor = vec3(1, 1, 1);\n  highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));\n\n  highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);\n\n  highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);\n  vLighting = ambientLight + (directionalLightColor * directional);\n\n  vColor = uColor;\n}",Ds="\nvarying lowp vec4 vColor;\nvarying highp vec3 vLighting;\nvoid main(void) {\n  gl_FragColor = vec4(vec3(vColor[0],vColor[1],vColor[2]) * vLighting, vColor[3]);\n}";class Bs extends $s{constructor(t){super(t,zs,Vs),this.textureCoord=t.getAttribLocation(this.program,"aTextureCoord"),this.uSampler=t.getUniformLocation(this.program,"uSampler")}texture(t){this.gl.activeTexture(this.gl.TEXTURE0),this.gl.bindTexture(this.gl.TEXTURE_2D,t),this.gl.uniform1i(this.uSampler,0)}bind(t,e,i,s){if(super.bind(t,e,i,s),s){const t=2,e=this.gl.FLOAT,i=!1,o=0,n=0;this.gl.bindBuffer(this.gl.ARRAY_BUFFER,s),this.gl.vertexAttribPointer(this.textureCoord,t,e,i,o,n),this.gl.enableVertexAttribArray(this.textureCoord)}}}const zs="\n// this is our input per vertex\nattribute vec4 aVertexPosition;\nattribute vec3 aVertexNormal;\nattribute vec2 aTextureCoord;\n\n// input for all vertices (uniform for the whole shader program)\nuniform mat4 uNormalMatrix;\nuniform mat4 uModelViewMatrix;\nuniform mat4 uProjectionMatrix;\n\n// data exchanged with other graphic pipeline stages\nvarying highp vec2 vTextureCoord;\nvarying highp vec3 vLighting;\n\nvoid main(void) {\n  gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;\n  highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);\n  highp vec3 directionalLightColor = vec3(1, 1, 1);\n  highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));\n  highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);\n  highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);\n\n  // out\n  vLighting = ambientLight + (directionalLightColor * directional);\n  vTextureCoord = aTextureCoord;\n}",Vs="\nvarying highp vec2 vTextureCoord;\nvarying highp vec3 vLighting;\nuniform sampler2D uSampler;\nvoid main(void) {\n  highp vec4 texelColor = texture2D(uSampler, vTextureCoord);\n  gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);\n}";function Os(t,e,i){function s(e,i){t[e]+=i[0],t[e+1]+=i[1],t[e+2]+=i[2]}for(let t=0;t<i.length;){const o=3*i[t++],n=3*i[t++],a=3*i[t++],r=3*i[t++],l=Y(e[o],e[o+1],e[o+2]),h=Y(e[n],e[n+1],e[n+2]),d=Y(e[a],e[a+1],e[a+2]),c=J(),u=J(),p=J();q(c,h,l),q(u,d,l),Q(p,c,u),s(o,p),s(n,p),s(a,p),s(r,p)}for(let i=0;i<e.length;i+=3){const e=Y(t[i],t[i+1],t[i+2]);Z(e,e),t[i]=e[0],t[i+1]=e[1],t[i+2]=e[2]}return t}class Ps{constructor(t,e,i,s,o,n=!0){if(this.gl=t,this.fvertex=i,this.quads=n,!1===n)return this.glIndices=this.createBuffer(t.ELEMENT_ARRAY_BUFFER,t.STATIC_DRAW,Uint16Array,i),this.glVertex=this.createBuffer(t.ARRAY_BUFFER,t.STATIC_DRAW,Float32Array,e),this.normal=new Float32Array(e.length),function(t,e,i){function s(e,i){t[e]+=i[0],t[e+1]+=i[1],t[e+2]+=i[2]}for(let t=0;t<i.length;){const o=3*i[t++],n=3*i[t++],a=3*i[t++],r=Y(e[o],e[o+1],e[o+2]),l=Y(e[n],e[n+1],e[n+2]),h=Y(e[a],e[a+1],e[a+2]),d=J(),c=J(),u=J();q(d,l,r),q(c,h,r),Q(u,d,c),s(o,u),s(n,u),s(a,u)}for(let i=0;i<e.length;i+=3){const e=Y(t[i],t[i+1],t[i+2]);Z(e,e),t[i]=e[0],t[i+1]=e[1],t[i+2]=e[2]}}(this.normal,e,i),this.glNormal=this.createBuffer(t.ARRAY_BUFFER,t.STATIC_DRAW,Float32Array,this.normal),void(this.glData={indices:i});const a=function(t,e,i,s){if(void 0!==s&&e.length!==s.length)throw Error(`fvertex and fuv must have the same length, instead it is ${e.length} and ${s.length}`);if(void 0!==s&&void 0===i)throw Error("uv & fuv must both be defined");const o=[],n=new Array(t.length/3*2),a=[],r=[],l=[];function h(t){return e[t]}function d(o){const h=e[o],d=e[o],c=s[o],u=i[2*c],p=i[2*c+1];if(void 0===n[2*d])return n[2*d]=u,n[2*d+1]=p,h;if(n[2*d]===u&&n[2*d+1]===p)return h;const g=(t.length+r.length)/3,f=3*h,m=t[f],x=t[f+1],v=t[f+2];return a.push(h),r.push(m),r.push(x),r.push(v),l.push(u),l.push(p),g}let c;c=void 0===s?h:d;for(let t=0;t<e.length;t+=4){const e=c(t);o.push(e),o.push(c(t+1));const i=c(t+2);o.push(i),o.push(c(t+3)),o.push(e),o.push(i)}if(void 0===s)return{idxExtra:[],indices:o,vertex:t,texcoord:void 0};const u=new Float32Array(t.length+r.length),p=new Float32Array(n.length+l.length);return u.set(t),u.set(r,t.length),p.set(n),p.set(l,n.length),{indices:o,vertex:u,texcoord:p,idxExtra:a}}(e,i,s,o);this.glData=a,this.glIndices=this.createBuffer(t.ELEMENT_ARRAY_BUFFER,t.STATIC_DRAW,Uint16Array,a.indices),this.glVertex=this.createBuffer(t.ARRAY_BUFFER,t.STATIC_DRAW,Float32Array,a.vertex),a.texcoord&&(this.glTexture=this.createBuffer(t.ARRAY_BUFFER,t.STATIC_DRAW,Float32Array,a.texcoord)),this.normal=new Float32Array(a.vertex.length),Os(this.normal,e,i),this.glData.idxExtra.forEach(((t,i)=>{this.normal[e.length+3*i]=this.normal[3*t],this.normal[e.length+3*i+1]=this.normal[3*t+1],this.normal[e.length+3*i+2]=this.normal[3*t+2]})),this.glNormal=this.createBuffer(t.ARRAY_BUFFER,t.STATIC_DRAW,Float32Array,this.normal)}update(t){this.quads?(this.glData.vertex.set(t),Os(this.normal,t,this.fvertex),this.glData.idxExtra.forEach(((e,i)=>{this.glData.vertex[t.length+3*i]=t[3*e],this.glData.vertex[t.length+3*i+1]=t[3*e+1],this.glData.vertex[t.length+3*i+2]=t[3*e+2],this.normal[t.length+3*i]=this.normal[3*e],this.normal[t.length+3*i+1]=this.normal[3*e+1],this.normal[t.length+3*i+2]=this.normal[3*e+2]})),this.updateBuffer(this.glVertex,this.gl.ARRAY_BUFFER,this.gl.STATIC_DRAW,Float32Array,this.glData.vertex),this.updateBuffer(this.glNormal,this.gl.ARRAY_BUFFER,this.gl.STATIC_DRAW,Float32Array,this.normal)):this.updateBuffer(this.glVertex,this.gl.ARRAY_BUFFER,this.gl.STATIC_DRAW,Float32Array,t)}draw(t,e){this.bind(t),this.gl.drawElements(e,this.glData.indices.length,this.gl.UNSIGNED_SHORT,0)}bind(t){t.bind(this.glIndices,this.glVertex,this.glNormal,this.glTexture)}drawSubset(t,e,i){this.gl.drawElements(t,i/4*6,this.gl.UNSIGNED_SHORT,e/4*6)}createBuffer(t,e,i,s){const o=this.gl.createBuffer();if(null===o)throw Error("Failed to create new WebGLBuffer");return this.updateBuffer(o,t,e,i,s),o}updateBuffer(t,e,i,s,o){this.gl.bindBuffer(e,t),o instanceof Float32Array||o instanceof Int16Array?this.gl.bufferData(e,o,i):this.gl.bufferData(e,new s(o),i)}}function Fs(t){t.width===t.clientWidth&&t.height===t.clientHeight||(t.width=t.clientWidth,t.height=t.clientHeight)}function Ws(t,e){t.viewport(0,0,e.width,e.height),t.clearColor(0,0,0,1),t.clearDepth(1),t.enable(t.DEPTH_TEST),t.depthFunc(t.LEQUAL),t.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT)}function Us(t){const e=45*Math.PI/180,i=t.width/t.height,s=z();return G(s,e,i,.1,100),s}function js(t){const e=z();return P(e,t),function(t,e){if(t===e){var i=e[1],s=e[2],o=e[3],n=e[6],a=e[7],r=e[11];t[1]=e[4],t[2]=e[8],t[3]=e[12],t[4]=i,t[6]=e[9],t[7]=e[13],t[8]=s,t[9]=n,t[11]=e[14],t[12]=o,t[13]=a,t[14]=r}else t[0]=e[0],t[1]=e[4],t[2]=e[8],t[3]=e[12],t[4]=e[1],t[5]=e[5],t[6]=e[9],t[7]=e[13],t[8]=e[2],t[9]=e[6],t[10]=e[10],t[11]=e[14],t[12]=e[3],t[13]=e[7],t[14]=e[11],t[15]=e[15]}(e,e),e}function Gs(t){return 0==(t&t-1)}let Xs;const Js=new Map;function Ys(t){Js.clear(),t.forEach(((t,e)=>{Js.set(`${e.substring(16,17)}/${e.substring(8,10)}`,t)}))}function qs(t,e,i){!function(t){if(void 0!==Xs)return;const e=[0,1,3,0,3,2,4,5,6,7,8,9,10,11,12,13,14,15];Xs=new Ps(t,new Float32Array([-1,1,-2,1,1,-2,-1,-1,-2,1,-1,-2,0,0,2,-1,1,-2,1,1,-2,0,0,2,-1,-1,-2,1,-1,-2,0,0,2,-1,1,-2,-1,-1,-2,0,0,2,1,1,-2,1,-1,-2]),e,void 0,void 0,!1)}(t);const s=[],o=t.canvas;Fs(o),Ws(t,o);const n=Us(o);let a=10,r=-5,l=0;Js.forEach(((o,h)=>{const d=z();W(d,d,[a,r,-25]);const c=rt(o[0],o[1],o[2],o[3]),u=function(t,e){var i=e[0],s=e[1],o=e[2],n=e[3],a=i+i,r=s+s,l=o+o,h=i*a,d=s*a,c=s*r,u=o*a,p=o*r,g=o*l,f=n*a,m=n*r,x=n*l;return t[0]=1-c-g,t[1]=d+x,t[2]=u-m,t[3]=0,t[4]=d-x,t[5]=1-h-g,t[6]=p+f,t[7]=0,t[8]=u+m,t[9]=p-f,t[10]=1-h-c,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}(z(),c);F(d,d,u);const p=js(d);e.init(n,d,p),e.setColor([1,.5,0,1]),Xs.draw(e,t.TRIANGLES);const g=F(z(),n,d),f=st(0,0,2,1),m=ot(it(),f,g);m[0]/=m[3],m[1]/=m[3];const x=(.5*m[0]+.5)*t.canvas.width,v=(-.5*m[1]+.5)*t.canvas.height;if(0===i.children.length){const t=yt(vt(h));t.style.position="absolute",t.style.color="#08f",t.style.fontWeight="bold",t.style.left=`${x}px`,t.style.top=`${v}px`,s.push(t)}else i.children[l].style.left=`${x}px`,i.children[l].style.top=`${v}px`;r+=5,r>=10&&(r=-5,a-=5),++l})),0===i.children.length&&i.replaceChildren(...s)}Ys(new Map([["/%/kc_0x42branch6",[-.0116586,.351683,.928858,-.115784]],["/%/kc_0x41branch6",[-.0157049,.612659,.789144,-.0406618]],["/%/kc_0x40branch6",[-.0206191,.282804,.95885,-.0142731]],["/%/kc_0x42branch5",[-.437385,.408202,.547886,-.584711]],["/%/kc_0x41branch5",[-.740224,-.437169,.169961,-.481731]],["/%/kc_0x40branch5",[-.281567,-.781,.219733,-.512325]],["/%/kc_0x42branch4",[-.0397931,.449987,.892107,.00862156]],["/%/kc_0x41branch4",[-.0155865,.737169,.674928,-.0285038]],["/%/kc_0x40branch4",[-.0438127,.157583,.98258,-.088229]],["/%/kc_0x42branch3",[.0170646,.948076,.313278,.0521385]],["/%/kc_0x41branch3",[.0807505,.524097,.358437,-.768326]],["/%/kc_0x40branch3",[-.0202535,.48423,.462811,-.742238]],["/%/kc_0x42branch1",[.113668,.315253,.921183,-.197781]],["/%/kc_0x41branch1",[-.392768,-.498948,.532651,-.559524]],["/%/kc_0x40branch1",[-.428276,-.163105,.552124,-.696517]]]));class Ks{constructor(t,e){this.proxies=new Map,this.gl=t,this.scene=e,this.base=new Ps(t,e.vertexRigged,e.baseMesh.fxyz,e.baseMesh.uv,e.baseMesh.fuv),e.proxies.forEach((i=>{this.proxies.set(i.type,new Ps(t,i.getCoords(e.vertexRigged),i.mesh.fxyz))}));const i=Zs(e);this.skeleton=new Ps(t,i.vertex,i.indices,void 0,void 0,!1)}update(){this.scene.update(),this.base.update(this.scene.vertexRigged),this.proxies.forEach(((t,e)=>{const i=this.scene.proxies.get(e),s=i.getCoords(this.scene.vertexMorphed),o=i.getVertexWeights(this.scene.skeleton.vertexWeights),n=this.scene.skeleton.skinMesh(s,o._data);t.update(n)}));const t=Zs(this.scene);this.skeleton.update(t.vertex)}}function Zs(t){const e=t.skeleton,i=st(0,0,0,1),s=new Float32Array(6*e.boneslist.length),o=new Array(2*e.boneslist.length);return e.boneslist.forEach(((t,e)=>{const n=t.matPoseGlobal?t.matPoseGlobal:t.matRestGlobal,a=ot(it(),i,n),r=ot(it(),t.yvector4,n),l=6*e,h=2*e;s[l]=a[0],s[l+1]=a[1],s[l+2]=a[2],s[l+3]=r[0],s[l+4]=r[1],s[l+5]=r[2],o[h]=2*e,o[h+1]=2*e+1})),{vertex:s,indices:o}}function Qs(t,e,i,s,o,n,a,r){const l=t.canvas;Fs(l),Ws(t,l);const h=Us(l),d=function(t,e){const i=z();return t===Yi.EXPRESSION?(W(i,i,[.5,-7,-5]),U(i,i,-Math.PI/6,[0,1,0])):(W(i,i,[-0,0,-25]),U(i,i,.7*e,[0,1,0])),i}(a,to),c=js(d);let u;e.init(h,d,c),o.base.bind(e),u=r?[qi.SKIN,[.2,.16,.7/5,1],t.LINES]:[qi.SKIN,[1,.8,.7,1],t.TRIANGLES];for(let i of[u,[qi.EYEBALL0,[0,.5,1,1],t.TRIANGLES],[qi.EYEBALL1,[0,.5,1,1],t.TRIANGLES],[qi.TEETH_TOP,[1,1,1,1],t.TRIANGLES],[qi.TEETH_BOTTOM,[1,1,1,1],t.TRIANGLES],[qi.TOUNGE,[1,0,0,1],t.TRIANGLES],[qi.CUBE,[1,0,.5,1],t.LINE_STRIP]]){const t=i[0];if(t===qi.SKIN&&!r)continue;if(o.proxies.has(Ki.Proxymeshes)&&t===qi.SKIN)continue;if(o.proxies.has(Ki.Eyes)&&(t===qi.EYEBALL0||t===qi.EYEBALL1))continue;if(o.proxies.has(Ki.Teeth)&&(t===qi.TEETH_TOP||t===qi.TEETH_BOTTOM))continue;if(o.proxies.has(Ki.Tongue)&&t===qi.TOUNGE)continue;const s=i[1];e.setColor(s);let a=2*n.baseMesh.groups[t].startIndex,l=n.baseMesh.groups[t].length;const h=i[2];o.base.drawSubset(h,a,l)}if(r){const i=124,s=2*n.baseMesh.groups[2].startIndex,a=n.baseMesh.groups[2].length*i;e.setColor([1,1,1,1]),o.base.drawSubset(t.TRIANGLES,s,a),o.skeleton.draw(e,t.LINES)}let p=r?t.LINES:t.TRIANGLES;if(o.proxies.forEach(((t,i)=>{let s=[.5,.5,.5,1];switch(i){case Ki.Proxymeshes:s=[1,.8,.7,1],r&&(s=[s[0]/5,s[1]/5,s[2]/5,1]);break;case Ki.Clothes:s=[.5,.5,.5,1];break;case Ki.Hair:s=[.2,.1,.1,1];break;case Ki.Eyes:s=[0,.5,1,1];break;case Ki.Eyebrows:case Ki.Eyelashes:s=[0,0,0,1];break;case Ki.Teeth:s=[1,1,1,1];break;case Ki.Tongue:s=[1,0,0,1]}e.setColor(s),t.draw(e,p)})),!r)if(i.init(h,d,c),i.texture(s),o.proxies.has(Ki.Proxymeshes));else{let e=2*n.baseMesh.groups[qi.SKIN].startIndex,s=n.baseMesh.groups[qi.SKIN].length;o.base.bind(i),o.base.drawSubset(t.TRIANGLES,e,s)}}let to=0;function eo(t,e,i,s){const o=t.getContext("webgl2")||t.getContext("experimental-webgl");if(null==o)throw Error("Unable to initialize WebGL. Your browser or machine may not support it.");o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,!0);const n=new Ls(o),a=new Bs(o),r=new Ks(o,i),l=function(t,e){const i=t.createTexture();t.bindTexture(t.TEXTURE_2D,i);const s=t.RGBA,o=t.RGBA,n=t.UNSIGNED_BYTE,a=new Uint8Array([0,0,255,255]);t.texImage2D(t.TEXTURE_2D,0,s,1,1,0,o,n,a);const r=new Image;return r.onload=()=>{console.log(`texture "${e}" has been loaded`),t.bindTexture(t.TEXTURE_2D,i),t.texImage2D(t.TEXTURE_2D,0,s,o,n,r),Gs(r.width)&&Gs(r.height)?t.generateMipmap(t.TEXTURE_2D):(t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR))},r.src=e,i}(o,"data/skins/textures/young_caucasian_female_special_suit.png");let h=0;requestAnimationFrame((function t(d){const c=(d*=.001)-h;h=d;const u=s.value===Yi.WIREFRAME||s.value===Yi.EXPRESSION&&i.wireframe.value;if(void 0!==i.changedProxy){if(i.proxies.has(i.changedProxy)){const t=i.proxies.get(i.changedProxy);r.proxies.set(t.type,new Ps(o,t.getCoords(i.vertexRigged),t.mesh.fxyz))}else r.proxies.delete(i.changedProxy);i.changedProxy=void 0}if(i.updateRequired!==ki.NONE&&r.update(),s.value===Yi.CHORDATA)qs(o,n,e);else Qs(o,n,a,l,r,i,s.value,u),to+=c;requestAnimationFrame(t)}))}var io=Uint8Array,so=Uint16Array,oo=Int32Array,no=new io([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),ao=new io([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),ro=new io([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),lo=function(t,e){for(var i=new so(31),s=0;s<31;++s)i[s]=e+=1<<t[s-1];var o=new oo(i[30]);for(s=1;s<30;++s)for(var n=i[s];n<i[s+1];++n)o[n]=n-i[s]<<5|s;return{b:i,r:o}},ho=lo(no,2),co=ho.b,uo=ho.r;co[28]=258,uo[258]=28;for(var po=lo(ao,0).b,go=new so(32768),fo=0;fo<32768;++fo){var mo=(43690&fo)>>1|(21845&fo)<<1;mo=(61680&(mo=(52428&mo)>>2|(13107&mo)<<2))>>4|(3855&mo)<<4,go[fo]=((65280&mo)>>8|(255&mo)<<8)>>1}var xo=function(t,e,i){for(var s=t.length,o=0,n=new so(e);o<s;++o)t[o]&&++n[t[o]-1];var a,r=new so(e);for(o=1;o<e;++o)r[o]=r[o-1]+n[o-1]<<1;if(i){a=new so(1<<e);var l=15-e;for(o=0;o<s;++o)if(t[o])for(var h=o<<4|t[o],d=e-t[o],c=r[t[o]-1]++<<d,u=c|(1<<d)-1;c<=u;++c)a[go[c]>>l]=h}else for(a=new so(s),o=0;o<s;++o)t[o]&&(a[o]=go[r[t[o]-1]++]>>15-t[o]);return a},vo=new io(288);for(fo=0;fo<144;++fo)vo[fo]=8;for(fo=144;fo<256;++fo)vo[fo]=9;for(fo=256;fo<280;++fo)vo[fo]=7;for(fo=280;fo<288;++fo)vo[fo]=8;var bo=new io(32);for(fo=0;fo<32;++fo)bo[fo]=5;var yo=xo(vo,9,1),wo=xo(bo,5,1),Co=function(t){for(var e=t[0],i=1;i<t.length;++i)t[i]>e&&(e=t[i]);return e},ko=function(t,e,i){var s=e/8|0;return(t[s]|t[s+1]<<8)>>(7&e)&i},_o=function(t,e){var i=e/8|0;return(t[i]|t[i+1]<<8|t[i+2]<<16)>>(7&e)},Eo=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],So=function(t,e,i){var s=new Error(e||Eo[t]);if(s.code=t,Error.captureStackTrace&&Error.captureStackTrace(s,So),!i)throw s;return s},Ao=function(t,e,i,s){var o=t.length,n=s?s.length:0;if(!o||e.f&&!e.l)return i||new io(0);var a=!i,r=a||2!=e.i,l=e.i;a&&(i=new io(3*o));var h=function(t){var e=i.length;if(t>e){var s=new io(Math.max(2*e,t));s.set(i),i=s}},d=e.f||0,c=e.p||0,u=e.b||0,p=e.l,g=e.d,f=e.m,m=e.n,x=8*o;do{if(!p){d=ko(t,c,1);var v=ko(t,c+1,3);if(c+=3,!v){var b=t[(T=4+((c+7)/8|0))-4]|t[T-3]<<8,y=T+b;if(y>o){l&&So(0);break}r&&h(u+b),i.set(t.subarray(T,y),u),e.b=u+=b,e.p=c=8*y,e.f=d;continue}if(1==v)p=yo,g=wo,f=9,m=5;else if(2==v){var w=ko(t,c,31)+257,C=ko(t,c+10,15)+4,k=w+ko(t,c+5,31)+1;c+=14;for(var _=new io(k),E=new io(19),S=0;S<C;++S)E[ro[S]]=ko(t,c+3*S,7);c+=3*C;var A=Co(E),H=(1<<A)-1,M=xo(E,A,1);for(S=0;S<k;){var T,R=M[ko(t,c,H)];if(c+=15&R,(T=R>>4)<16)_[S++]=T;else{var N=0,$=0;for(16==T?($=3+ko(t,c,3),c+=2,N=_[S-1]):17==T?($=3+ko(t,c,7),c+=3):18==T&&($=11+ko(t,c,127),c+=7);$--;)_[S++]=N}}var L=_.subarray(0,w),I=_.subarray(w);f=Co(L),m=Co(I),p=xo(L,f,1),g=xo(I,m,1)}else So(1);if(c>x){l&&So(0);break}}r&&h(u+131072);for(var D=(1<<f)-1,B=(1<<m)-1,z=c;;z=c){var V=(N=p[_o(t,c)&D])>>4;if((c+=15&N)>x){l&&So(0);break}if(N||So(2),V<256)i[u++]=V;else{if(256==V){z=c,p=null;break}var O=V-254;if(V>264){var P=no[S=V-257];O=ko(t,c,(1<<P)-1)+co[S],c+=P}var F=g[_o(t,c)&B],W=F>>4;F||So(3),c+=15&F;I=po[W];if(W>3){P=ao[W];I+=_o(t,c)&(1<<P)-1,c+=P}if(c>x){l&&So(0);break}r&&h(u+131072);var U=u+O;if(u<I){var j=n-I,G=Math.min(I,U);for(j+u<0&&So(3);u<G;++u)i[u]=s[j+u]}for(;u<U;++u)i[u]=i[u-I]}}e.l=p,e.p=z,e.b=u,e.f=d,p&&(d=1,e.m=f,e.d=g,e.n=m)}while(!d);return u!=i.length&&a?function(t,e,i){return(null==e||e<0)&&(e=0),(null==i||i>t.length)&&(i=t.length),new io(t.subarray(e,i))}(i,0,u):i.subarray(0,u)},Ho=new io(0);function Mo(t,e){return Ao(t.subarray((i=t,s=e&&e.dictionary,(8!=(15&i[0])||i[0]>>4>7||(i[0]<<8|i[1])%31)&&So(6,"invalid zlib data"),(i[1]>>5&1)==+!s&&So(6,"invalid zlib data: "+(32&i[1]?"need":"unexpected")+" dictionary"),2+(i[1]>>3&4)),-4),{i:2},e&&e.out,e&&e.dictionary);var i,s}var To="undefined"!=typeof TextDecoder&&new TextDecoder;try{To.decode(Ho,{stream:!0}),1}catch(t){}class Ro{readFile(t){if(t.endsWith(".z")){const e=new XMLHttpRequest;if(e.overrideMimeType("text/plain; charset=x-user-defined"),e.open("GET",t,!1),e.send(null),e.status>400)throw new Error(`Request failed for '${t}': ${e.statusText}`);const i=new ArrayBuffer(e.responseText.length),s=new Uint8Array(i);for(let t=0;t<e.responseText.length;++t)s[t]=e.responseText.charCodeAt(t);return new TextDecoder("utf-8").decode(Mo(s))}if(t.endsWith("/directory.json")){const e=new XMLHttpRequest;if(e.open("GET",t,!1),e.send(null),e.status<400)return e.responseText;throw new Error(`Request failed for '${t}': ${e.statusText}`)}return this.readFile(`${t}.z`)}exists(t){let e=Ro.directoryCache.get(t);if(void 0===e){try{this.listDir(t)}catch(t){return!1}e=Ro.directoryCache.get(t)}return void 0!==e}isFile(t){let e=Ro.directoryCache.get(t);if(void 0===e){try{this.listDir(t)}catch(e){throw Error(`HTTPFSAdapter.isFile('${t}')": failed to load directory ${t}`)}e=Ro.directoryCache.get(t)}if(void 0===e)throw Error(`HTTPFSAdapter.isFile('${t}'): info === undefined`);return!e.isDir}isDir(t){const e=Ro.directoryCache.get(t);if(void 0===e)throw Error(`HTTPFSAdapter.isFile('${t}')`);return e.isDir}listDir(t){let e=Ro.directoryCache.get(t);if(void 0!==e&&void 0!==e.dir)return e.dir;void 0===e&&(e={file:"",isDir:!0,dir:void 0});const i=this.readFile(`data/${t}/directory.json`),s=JSON.parse(i);e.dir=[];for(const i of s){const s=`${t}/${i.file}`;e.dir.push(i.file),i.isDir||Ro.directoryCache.set(s,{file:i.file,isDir:!1})}return Ro.directoryCache.set(t,e),e.dir}realPath(t){return t}joinPath(t,e){return`${t}/${e}`}}Ro.directoryCache=new Map;const No=new CSSStyleSheet;No.replaceSync(mt`
:host {
    display: grid;
    background-color: var(--tx-gray-100);
    border-radius: var(--tx-border-radius);
    border: var(--tx-border-radius);
    margin: 4px;
    padding: 16px;
    row-gap: 6px;
}

::slotted(tx-formlabel) {
    grid-column: 1 / span 1;
    font-size: var(--tx-font-size-info);
    font-weight: bolder;
    text-align: right;
    padding-top: 4px;
    padding-right: 12px;
}

::slotted(tx-formfield) {
    grid-column: 2 / span 1;
    text-align: left;
}

::slotted(tx-formhelp) {
    display: flex;
    grid-column: 2 / span 1;
    font-size: var(--tx-font-size-info);
    color: var(--tx-gray-700);
    fill: var(--tx-gray-700);
}

::slotted(tx-formhelp.tx-error) {
    color: var(--tx-warning-color);
    fill: var(--tx-warning-color);
}

::slotted(tx-formhelp.tx-error)::before {
    content: url("data:image/svg+xml,%3Csvg viewBox='0 0 36 36' width='18' height='18' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='rgb(247,109,116)' d='M17.127 2.579L.4 32.512A1 1 0 001.272 34h33.456a1 1 0 00.872-1.488L18.873 2.579a1 1 0 00-1.746 0zM20 29.5a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5h3a.5.5 0 01.5.5zm0-6a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-12a.5.5 0 01.5-.5h3a.5.5 0 01.5.5z' /%3E%3C/svg%3E");
    width: 18px;
    height: 18px;
    padding-bottom: 3px;
    margin: 0 8px 0 0;
}

::slotted(tx-formhelp) > svg {
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    padding-bottom: 3px;
    margin: 0 8px 0 0;
}`);const $o=new CSSStyleSheet;$o.replaceSync(mt`
:host {
    padding-top: 8px;
    padding-bottom: 8px;
}

::slotted(tx-formlabel) {
    text-align: left;
}

::slotted(tx-formfield) {
    grid-column: 1 / span 1;
}

::slotted(tx-formhelp) {
    grid-column: 1 / span 1;
}`);class Lo extends Wt{constructor(t){super(t),this.attachShadow({mode:"open"}),"narrow"===t?.variant||"narrow"===this.getAttribute("variant")?this.shadowRoot.adoptedStyleSheets=[No,$o]:this.shadowRoot.adoptedStyleSheets=[No],this.shadowRoot.appendChild(wt())}}class Io extends Ut{constructor(t){super(t)}updateView(){this.model?.label?this.innerHTML=this.model.label:this.innerHTML=""}}class Do extends Wt{}class Bo extends Ut{constructor(t){super(t)}updateView(){if(this.model?.error){this.classList.add("tx-error");let t=this.model.error;return this.model.description&&(t+="<br/>"+this.model.description),void(this.innerHTML=t)}this.classList.remove("tx-error"),this.model?.description?this.innerHTML=this.model.description:this.innerHTML=""}}Wt.define("tx-form",Lo),Wt.define("tx-formlabel",Io),Wt.define("tx-formfield",Do),Wt.define("tx-formhelp",Bo);class zo{constructor(t){this.list=new Map,this.allProxyTypes=[Ki.Proxymeshes,Ki.Clothes,Ki.Hair,Ki.Eyes,Ki.Eyebrows,Ki.Eyelashes,Ki.Teeth,Ki.Tongue],this.scene=t;for(const e of this.allProxyTypes){const i=["none"];for(const t of S.listDir(Ki[e].toLowerCase()))"materials"!==t&&i.push(t);const s=new Ft("none",i);s.modified.add((()=>{if(console.log(`${Ki[e]} (${e}) = '${s.value}'`),"none"===s.value)t.proxies.delete(e);else{const i=`data/${Ki[e].toLowerCase()}/${s.value}/${s.value}`,o=Vo(`${i}.mhclo`)?"mhclo":"proxy";console.log(`try toad load '${i}.${o}'`),t.proxies.set(e,is(t.human,`${i}.${o}`,e))}t.changedProxy=e})),this.list.set(e,s)}}}function Vo(t){try{S.isFile(t)}catch(t){return!1}return!0}var Oo;function Po(t){return`${location.origin}${location.pathname}#${t.value}`}!function(t){t.PROXY="proxy",t.EXPRESSION="expression",t.MORPH="morph",t.POSE="pose",t.EXPORT="export",t.MEDIAPIPE="mediapipe",t.CHORDATA="chordata"}(Oo||(Oo={}));class Fo{constructor(t){this.offset=0,this.data=new DataView(t),this.bytes=new Uint8Array(t)}decode(){const t=new Map;if("#bundle"!==this.s())throw Error("not an OSC bundle");if(this.t(),this.i(),"/%%/Chordata/q"!==this.s())throw Error("not a Chordata packet");if(",N"!==this.s())throw Error("Chordata marker is not NIL");for(;this.offset<this.bytes.byteLength;){this.i();const e=this.s(),i=this.s();if(",ffff"!==i){console.log(`unexpected type tag '${i}'`);continue}const s=this.f(),o=this.f(),n=this.f(),a=this.f();t.set(e,[s,o,n,a])}return t}i(){const t=this.data.getInt32(this.offset,!1);return this.offset+=4,t}f(){const t=this.data.getFloat32(this.offset,!1);return this.offset+=4,t}t(){const t=this.i();return{epoch:this.i(),fraction:t}}s(){const t=this.offset;for(;0!==this.data.getUint8(this.offset++););const e=Fo.textDecoder.decode(this.bytes.subarray(t,this.offset-1));return this.align(),e}align(){const t=this.offset%4;0!==t&&(this.offset+=4-t)}}let Wo;Fo.textDecoder=new TextDecoder;const Uo=new $t((()=>{console.log("START"),Uo.enabled=!1,jo.enabled=!0,Wo=function(){const t=new TextEncoder,i=new WebSocket("ws://localhost:9001");return i.binaryType="arraybuffer",i.onerror=t=>{Uo.enabled=!0,jo.enabled=!1,i.close(),Wo=void 0},i.onopen=()=>{console.log("web socket is open"),i.onmessage=s=>e(this,void 0,void 0,(function*(){let e;if(s.data instanceof Blob)e=yield s.data.arrayBuffer();else{if(!(s.data instanceof ArrayBuffer))return void console.log("neither blob nor arraybuffer");e=s.data}const o=new Fo(e);try{Ys(o.decode()),i.send(t.encode("GET CHORDATA"))}catch(t){Uo.enabled=!0,jo.enabled=!1,i.close(),Wo=void 0,console.log("failed to decode chordata"),function(t,e=0,i=t.byteLength){for(;e<i;){let i=e.toString(16).padStart(4,"0");for(let s=0,o=e;s<16&&o<t.byteLength;++s,++o)i+=" "+t[o].toString(16).padStart(2,"0");i=i.padEnd(53," ");for(let s=0,o=e;s<16&&o<t.byteLength;++s,++o){const e=t[o];i+=e>=32&&e<127?String.fromCharCode(e):"."}e+=16,console.log(i)}}(o.bytes)}})),i.send(t.encode("GET CHORDATA"))},i}()})),jo=new $t((()=>{console.log("STOP"),Uo.enabled=!0,jo.enabled=!1,Wo.close(),Wo=void 0}));jo.enabled=!1;var Go=a(Te,{label:"Chordata",value:Oo.CHORDATA,children:[n(te,{variant:Qt.ACCENT,action:Uo,children:"Start"}),n(te,{variant:Qt.NEGATIVE,action:jo,children:"Stop"})]});class Xo{constructor(t,e="auto",i="onlyroot",s){let o;this.bvhJoints=[],this.joints=new Map,this.jointslist=[],this.convertFromZUp=!1,this.lineNumber=0,this.name=t,this.allowTranslation=i,"auto"===e?o=!0:(o=!1,this.convertFromZUp=e),void 0===s&&(s=S.readFile(t));const n=new E(s);let a,r=0;for(let t of n){++this.lineNumber,t=t.trim();const e=t.split(/\s+/);switch(r){case 0:this.expect(e,"HIERARCHY",0),r=1;break;case 1:this.expect(e,"ROOT",1),a=this.addRootJoint(e[1]),r=2;break;case 2:this.expect(e,"{",0),r=3;break;case 3:this.expect(e,"OFFSET",3),this.__calcPosition(a,[parseFloat(e[1]),parseFloat(e[2]),parseFloat(e[3])]),r=4;break;case 4:this.expect(e,"CHANNELS");const t=parseInt(e[1]);if(a.channels=e.slice(2),t!==a.channels.length)throw Error(`Expected ${t} but got ${a.channels.length} at line ${this.lineNumber}.`);r=5;break;case 5:switch(e[0]){case"JOINT":{const t=new Jo(e[1],this);this.bvhJoints.push(t),this.joints.set(t.name,t),a.children.push(t),t.parent=a,a=t,r=2}break;case"End":r=6;break;case"}":void 0===a.parent?r=9:a=a.parent;break;default:throw Error(`Expected keywords 'JOINT', 'End' or '}' in BVH file at line ${this.lineNumber}.`)}break;case 6:this.expect(e,"{",0),r=7;break;case 7:{this.expect(e,"OFFSET",3);const t=new Jo("End effector",this);this.bvhJoints.push(t),a.children.push(t),t.parent=a,t.channels=[],this.__calcPosition(t,[parseFloat(e[1]),parseFloat(e[2]),parseFloat(e[3])]),r=8}break;case 8:this.expect(e,"}",0),r=5;break;case 9:o&&(this.convertFromZUp=this._autoGuessCoordinateSystem()),this.expect(e,"MOTION",0),r=10;break;case 10:this.expect(e,"Frames:",1),this.frameCount=parseInt(e[1]),r=11;break;case 11:this.expect(e,"Frame",2),this.frameTime=parseFloat(e[2]),r=12;break;case 12:{if(1===e.length&&0===e[0].length){r=13;break}if(0===e.length){r=13;break}let t=0;for(const i of this.bvhJoints)for(let s=0;s<i.channels.length;++s){if(t>=e.length)throw Error(`Not enough MOTION entries in line ${this.lineNumber}.`);i.frames.push(parseFloat(e[t++]))}}break;case 13:break;default:throw Error(`Unexpected state ${r}`)}}this.jointslist=[this.rootJoint];let l=0;for(;l<this.jointslist.length;){const t=this.jointslist[l++];this.jointslist.push(...t.children)}for(const t of this.jointslist)t.calculateFrames()}expect(t,e,i=void 0){if(void 0===i&&t.length<1||t[0]!==e)throw Error(`Expected keyword '${e}' in BVH file at line ${this.lineNumber}.`);if(void 0!==i&&t.length!==i+1||t[0]!==e)throw Error(`Expected keyword '${e}' in BVH file at line ${this.lineNumber}.`)}addRootJoint(t){return this.rootJoint=this.__addJoint(t),this.rootJoint}addJoint(t){}__addJoint(t){const e=new Jo(t,this);return"End effector"!==e.name&&this.joints.set(t,e),this.bvhJoints.push(e),e}_autoGuessCoordinateSystem(){let t;const e=["head","spine03","spine02","spine01","upperleg02.L","lowerleg02.L"];for(;void 0===t&&0!=e.length;){const i=e.pop();if(t=this.joints.get(i),void 0===t&&(t=this.joints.get(i.substring(0,1).toUpperCase()+i.substring(1))),void 0!==t&&0===t.children.length&&(console.log(`Cannot use reference joint ${t.name} for determining axis system, it is an end-effector (has no children)`),t=void 0),void 0===t)return console.log(`Could not auto guess axis system for BVH file ${this.name} because no known joint name is found. Using Y up as default axis orientation.`),!1;const s=t.children[0],o=[0,s.position[1]-t.position[1],s.position[2]-t.position[2]];return!(Math.abs(o[1])>Math.abs(o[2]))}return!0}__calcPosition(t,e){t.offset=e,void 0===t.parent?t.position=e:(t.position=[...e],t.parent.position.forEach(((e,i)=>t.position[i]+=e)))}createAnimationTrack(t,e){function i(t){if(void 0===t)return t;const e=t.match(/(.*)_\d+$/);return null!==e?e[1]:t}if(void 0===e&&(e=this.name),void 0===t)throw Error("skel === undefined: not implemented yet");if(t instanceof Array)throw Error("skel === string[]: not implemented yet");let s=[];for(const e of t.getBones()){if(e.reference_bones.length>0)throw Error("bone with reference_bones not implemented yet");{const t=i(e.name),o=this.getJointByCanonicalName(t);if(void 0!==o){if(o.matrixPoses.length!==this.frameCount)throw Error("yikes");s.push(...o.matrixPoses)}else{const t=new Array(this.frameCount);t.fill(z()),s.push(...t)}}}return function(t,e,i,s){const o=t.length/s,n=Array(t.length);let a=0;for(let e=0;e<s;++e)for(let i=0;i<o;++i)n[a]=t[e+i*s],++a;return n}(s,0,this.frameTime,this.frameCount)}getJoint(t){return this.joints.get(t)}getJointByCanonicalName(t){t=t.toLowerCase().replace(" ","_").replace("-","_");for(const e of this.joints.keys())if(t===e.toLowerCase().replace(" ","_").replace("-","_"))return this.getJoint(e)}}class Jo{constructor(t,e){this.children=[],this.matrixPoses=[],this.frames=[],this.name=t,this.skeleton=e}calculateFrames(){const t=this.channels.length,e=this.skeleton.frameCount,i=e*t;if(this.frames.length<i)throw console.log(`Frame data: ${this.frames}`),new Error(`Expected frame data length for joint ${this.name} is ${i} found ${this.frames.length}`);let s,o,n,a="",r=[];function l(t,e,i,s){const o=new Array(i/s);for(let n=e,a=0;n<i;n+=s,++a)o[a]=t[n];return o}function h(t,e){for(let i=0;i<e.length;++i)e[i]=t*e[i];return e}const d=Math.PI/180;if(this.channels.forEach(((e,c)=>{switch(e){case"Xposition":s=l(this.frames,c,i,t);break;case"Yposition":this.skeleton.convertFromZUp?n=function(t){for(let e=0;e<t.length;++e)t[e]=-t[e];return t}(l(this.frames,c,i,t)):o=l(this.frames,c,i,t);break;case"Zposition":this.skeleton.convertFromZUp?o=l(this.frames,c,i,t):n=l(this.frames,c,i,t);break;case"Xrotation":const e=h(d,l(this.frames,c,i,t));a="x"+a,r.push(e);break;case"Yrotation":let u;this.skeleton.convertFromZUp?(u=h(-d,l(this.frames,c,i,t)),a="z"+a):(u=h(d,l(this.frames,c,i,t)),a="y"+a),r.push(u);break;case"Zrotation":const p=h(d,l(this.frames,c,i,t));a=this.skeleton.convertFromZUp?"y"+a:"z"+a,r.push(p)}})),a="s"+a,this.rotOrder=a,this.matrixPoses=new Array(e),r.length>0&&r.length<3);else if(r.length>=3)for(let t=0;t<e;++t)this.matrixPoses[t]=Si(r[2][t],r[1][t],r[0][t],a);let c;switch(this.skeleton.allowTranslation){case"all":c=!0;break;case"onlyroot":c=void 0===this.parent;break;case"none":c=!1}!c||void 0===s&&void 0===o&&void 0===n||(void 0===s&&(s=new Array(e),s.fill(0)),void 0===o&&(o=new Array(e),o.fill(0)),void 0===n&&(n=new Array(e),n.fill(0)),this.matrixPoses.forEach(((t,e)=>{t[3]=s[e],t[7]=o[e],t[11]=n[e]})))}}function Yo(t,e,i,s=0,o=!0){const n=4*Number.EPSILON;let a=ct(ht(),t);const r=ct(ht(),e);if(0===i)return a;if(1===i)return r;let l=pt(a,r);if(Math.abs(Math.abs(l)-1)<n)return a;if(o&&l<0){l=-l;for(let t=0;t<a.length;++t)a[t]=-a[t]}const h=Math.acos(l)+s*Math.PI;if(Math.abs(h)<n)return a;const d=1/Math.sin(h),c=Math.sin((1-i)*h)*d,u=Math.sin(i*h)*d,p=ht();for(let t=0;t<a.length;++t)a[t]*=c,r[t]*=u,p[t]=r[t]+a[t];return p}class qo extends Be{constructor(t){super(),this.poseUnit=[],this.bone=[];for(let e of t.facePoseUnitsNames.sort()){const t=0,i=new Ei(t,{label:e,min:0,max:1,step:.05,default:t});i.modified.add((t=>{t!==c.ALL&&t!==c.VALUE||this.modified.trigger(t)})),this.poseUnit.push(i)}const e=new Set;!function t(i){e.add(i.name),i.children.forEach((e=>t(e)))}(t.skeleton.bones.get("head")),Array.from(e).sort().forEach((e=>{const i=t.skeleton.poseNodes.find(e);void 0===i?console.log(`failed to find node for '${e}'`):(i.x.label=i.y.label=i.z.label=e,this.bone.push(i))}))}get colCount(){return 2}get rowCount(){return Math.max(this.poseUnit.length,this.bone.length)}clear(){for(let t of this.poseUnit)t.value=0,t.default=0}setPoseUnit(t,e){for(let i of this.poseUnit)if(i.label===t){i.value=i.default=e;break}}}class Ko{constructor(t){this.poseUnitName2Frame=new Map,this.facePoseUnits=new Xo("data/poseunits/face-poseunits.bvh","auto","none"),this.skeleton=t,this.base_anim=this.facePoseUnits.createAnimationTrack(t,"Expression-Face-PoseUnits"),this.facePoseUnitsNames=JSON.parse(S.readFile("data/poseunits/face-poseunits.json")).framemapping,this.facePoseUnitsNames.forEach(((t,e)=>this.poseUnitName2Frame.set(t,e))),this.expressions=S.listDir("expressions").filter((t=>t.endsWith(".mhpose"))).map((t=>t.substring(0,t.length-7))),this.model=new qo(this),this.model.modified.add((t=>{const e=this.getBlendedPose();for(let t=0;t<this.skeleton.boneslist.length;++t){const i=this.skeleton.boneslist[t],s=i.matRestGlobal,o=Zo(e[t],s),n=this.skeleton.poseNodes.find(i.name);if(n){let{x:t,y:e,z:s}=Ai(o);tn(t)&&(t=0),tn(e)&&(e=0),tn(s)&&(s=0),n.x.value=360*t/(2*Math.PI),n.y.value=360*e/(2*Math.PI),n.z.value=360*s/(2*Math.PI);const a=Si(t,e,s);sn(o,a)||(console.log(`poseNode ${t}, ${e}, ${s} didn't set matPose properly for ${i.name}`),console.log(o),console.log(a))}else console.log(`ExpressionManager: node pose node found for bone ${i.name}`),i.matPose=o}this.skeleton.update()}))}setExpression(t){if("string"==typeof t){const e=t;if(-1===(t=this.expressions.findIndex((t=>t===e))))throw Error(`'${e} is not a known expression'`)}const e=this.expressions[t],i=JSON.parse(S.readFile(`data/expressions/${e}.mhpose`)).unit_poses;this.model.modified.withLock((()=>{this.model.clear();for(let t of Object.getOwnPropertyNames(i)){const e=i[t];this.model.setPoseUnit(t,e)}}))}getBlendedPose(){const t=this.skeleton,e=this.base_anim,i=[],s=[];for(const t of this.model.poseUnit)i.push(this.poseUnitName2Frame.get(t.label)),s.push(t.value);const o=i,n=t.boneslist.length,a=new Array(n);if(1===o.length)throw Error("yikes");{const t=ht();for(let i=0;i<n;++i){const b=e[o[0]*n+i],y=e[o[1]*n+i];let w=dt(ht(),b),C=dt(ht(),y);w=Yo(t,w,s[0]),C=Yo(t,C,s[1]);let k=ut(ht(),C,w);for(let a=2;a<o.length;++a){const r=e[o[a]*n+i];let l=dt(ht(),r);l=Yo(t,l,s[a]),k=ut(ht(),l,k)}a[i]=(r=z(),l=k,h=void 0,d=void 0,c=void 0,u=void 0,p=void 0,g=void 0,f=void 0,m=void 0,x=void 0,v=void 0,h=new I(3),d=-l[0],c=-l[1],u=-l[2],p=l[3],g=l[4],f=l[5],m=l[6],x=l[7],(v=d*d+c*c+u*u+p*p)>0?(h[0]=2*(g*p+x*d+f*u-m*c)/v,h[1]=2*(f*p+x*c+m*d-g*u)/v,h[2]=2*(m*p+x*u+g*c-f*d)/v):(h[0]=2*(g*p+x*d+f*u-m*c),h[1]=2*(f*p+x*c+m*d-g*u),h[2]=2*(m*p+x*u+g*c-f*d)),function(t,e,i){var s=e[0],o=e[1],n=e[2],a=e[3],r=s+s,l=o+o,h=n+n,d=s*r,c=s*l,u=s*h,p=o*l,g=o*h,f=n*h,m=a*r,x=a*l,v=a*h;t[0]=1-(p+f),t[1]=c+v,t[2]=u-x,t[3]=0,t[4]=c-v,t[5]=1-(d+f),t[6]=g+m,t[7]=0,t[8]=u+x,t[9]=g-m,t[10]=1-(d+p),t[11]=0,t[12]=i[0],t[13]=i[1],t[14]=i[2],t[15]=1}(r,l,h),r)}}var r,l,h,d,c,u,p,g,f,m,x,v;return a}}function Zo(t,e){let i=V(t[0],t[1],t[2],0,t[4],t[5],t[6],0,t[8],t[9],t[10],0,0,0,0,1);const s=P(z(),e),o=F(z(),s,i);return F(i,o,e),i[12]=i[13]=i[14]=0,i}const Qo=1e-5;function tn(t){return Math.abs(t)<=Qo}function en(t,e){return tn(t-e)}function sn(t,e){for(let i=0;i<t.length;++i)if(!en(t[i],e[i]))return!1;return!0}function on(t,e){const i=new Ko(e),s=new Ft(i.expressions[0],i.expressions,{label:"Expression"});return s.modified.add((()=>{i.setExpression(s.value)})),a(Te,{label:"Expression",value:Oo.EXPRESSION,style:{overflow:"none"},children:[a(Lo,{children:[n(Io,{model:s}),n(Do,{children:n(xe,{model:s})}),n(Bo,{model:s}),n(Io,{model:t.wireframe}),n(Do,{children:n(re,{model:t.wireframe})}),n(Bo,{model:t.wireframe})]}),n("br",{}),n(gi,{model:i.model,style:{width:"487px",height:"100%"}})]})}function nn(){try{S.setInstance(new Ro),function(){const t=new class{};console.log("loading assets...");const e=new k,i=new Ji("data/3dobjs/base.obj"),r=new _i(e,i);e.scene=r;const l=new zo(r);e.modified.add((()=>r.updateRequired=ki.MORPH));const h=Ni(r,"data/rigs/default.mhskel");r.skeleton=h,Fi(e,"data/modifiers/modeling_modifiers.json"),Fi(e,"data/modifiers/measurement_modifiers.json");const d=Gi(e,"data/modifiers/modeling_sliders.json");(function(){const t=N.getInstance();for(const e of t.findTargets("macrodetails"));})(),console.log("everything is loaded..."),wi.register(Ns,Ci,Wi),wi.register(Rs,Ci,Ti);const c=new Pt(Yi.POLYGON,Yi),u=new Pt(Oo.PROXY,Oo);u.modified.add((()=>{switch(t.overlay&&t.overlay.replaceChildren(),u.value){case Oo.PROXY:case Oo.MORPH:case Oo.MEDIAPIPE:c.value=Yi.POLYGON;break;case Oo.POSE:case Oo.EXPORT:c.value=Yi.WIREFRAME;break;case Oo.EXPRESSION:c.value=Yi.EXPRESSION;break;case Oo.CHORDATA:c.value=Yi.CHORDATA}})),function(t){if(location.hash.length>1){const e=location.hash.substring(1);void 0===t.indexOf(e)?history.replaceState(void 0,"",Po(t)):t.value=e}else history.replaceState(void 0,"",Po(t));window.onpopstate=e=>{location.hash.length>1?t.value=location.hash.substring(1):t.value=Oo.PROXY},t.modified.add((e=>{location.hash!==`#${e}`&&history.pushState(void 0,"",Po(t))}))}(u);const p=new Ci(Wi,d);h.poseChanged.add((t=>{r.updateRequired===ki.NONE&&(r.updateRequired=ki.POSE)}));const g=new Ci(Ti,h.poseNodes),f=new Tt(!0),m=new Tt(!1);f.enabled=!1,m.enabled=!1;const x=function(){const t=document.createElement("a");return t.type="text/plain",t.style.display="hidden",t.download="makehuman.dae",t}();a(o,{children:[a(Me,{model:u,style:{position:"absolute",left:0,width:"500px",top:0,bottom:0},children:[n(Te,{label:"Proxy",value:Oo.PROXY,children:n(Lo,{variant:"narrow",children:l.allProxyTypes.map((t=>a(o,{children:[n(Io,{children:Ki[t]}),n(Do,{children:n(xe,{id:Ki[t],model:l.list.get(t)})}),n(Bo,{model:l.list.get(t)})]})))})}),on(r,h),n(Te,{label:"Morph",value:Oo.MORPH,children:n(gi,{model:p,style:{width:"100%",height:"100%"}})}),n(Te,{label:"Pose",value:Oo.POSE,children:n(gi,{model:g,style:{width:"100%",height:"100%"}})}),n(Te,{label:"Export",value:Oo.EXPORT,children:a("div",{style:{padding:"10px"},children:[a("p",{children:[n(se,{model:f,title:"Export additional Blender specific information (for material, shaders, bones, etc.)."})," Use Blender Profile"]}),a("p",{children:[n(se,{model:m,title:"Reduce the precision of the exported data to 6 digits."})," Limit Precision"]}),a("p",{children:[n("u",{children:"NOTE"}),": When importing into Blender, only the first material may look correct in the UV editor while rendering will still be okay. A workaround is to separate the mesh by material after import. (Edit Mode, P)."]}),a("p",{children:[n("u",{children:"NOTE"}),": Exporting the pose is not implemented yet. There is just some hardcoded animation of the jaw."]}),n(te,{action:()=>function(t,e){e.download="makehuman.dae",e.href=URL.createObjectURL(new Blob([ls(t)],{type:"text/plain"})),e.dispatchEvent(new MouseEvent("click"))}(r,x),children:"Export Collada"})]})}),n(Te,{label:"Mediapipe",value:Oo.MEDIAPIPE,children:"Mediapipe coming soon"}),Go]}),a("div",{style:{position:"absolute",left:"500px",right:0,top:0,bottom:0,overflow:"hidden"},children:[n("canvas",{set:s(t,"canvas"),style:{width:"100%",height:"100%"}}),n("div",{set:s(t,"overlay"),style:{position:"absolute",left:0,right:0,top:0,bottom:0,overflow:"hidden"}})]})]}).appendTo(document.body),eo(t.canvas,t.overlay,r,c)}()}catch(t){console.log(t),t instanceof Error?alert(`${t.name}: ${t.message}`):alert(t)}}return je.register(class extends je{showCell(t,e){e.replaceChildren(vt(this.model.get(t.row)))}},class extends Be{constructor(t){super(),this.data=t}get colCount(){return 1}get rowCount(){return this.data.length}get(t){return this.data[t]}}),je.register(class extends je{get colCount(){return 6}getColumnHead(t){switch(t){case 0:return n(o,{children:"Pose Unit"});case 2:return n(o,{children:"Bone"});case 3:return n(o,{children:"X"});case 4:return n(o,{children:"Y"});case 5:return n(o,{children:"Z"})}return n(o,{children:"Value"})}showCell(t,e){switch(t.col){case 0:t.row<this.model.poseUnit.length&&e.replaceChildren(...n(o,{children:this.model.poseUnit[t.row].label}));break;case 1:t.row<this.model.poseUnit.length&&e.replaceChildren(n(Xt,{style:{width:"60px"},model:this.model.poseUnit[t.row]}));break;case 2:if(t.row<this.model.bone.length){const i=this.model.bone[t.row].x.label;void 0!==i&&e.replaceChildren(...n(o,{children:i}))}break;case 3:t.row<this.model.bone.length&&e.replaceChildren(n(Xt,{style:{width:"60px"},model:this.model.bone[t.row].x}));break;case 4:t.row<this.model.bone.length&&e.replaceChildren(n(Xt,{style:{width:"60px"},model:this.model.bone[t.row].y}));break;case 5:t.row<this.model.bone.length&&e.replaceChildren(n(Xt,{style:{width:"60px"},model:this.model.bone[t.row].z}))}}},qo),window.onload=()=>{nn()},t.main=nn,t.runMediaPipe=function(){const t=new class{};document.body.replaceChildren(...n(o,{children:n("canvas",{set:s(t,"canvas"),style:{width:"480px",height:"480px",border:"1px #fff solid"}})}));const i=new TextEncoder,a=new WebSocket("ws://localhost:9001");a.binaryType="arraybuffer",a.onopen=()=>{console.log("web socket is open"),a.onmessage=s=>e(this,void 0,void 0,(function*(){let e;if(s.data instanceof Blob)e=yield s.data.arrayBuffer();else{if(!(s.data instanceof ArrayBuffer))return void console.log("neither blob nor arraybuffer");e=s.data}!function(t,e){const i=t.getContext("webgl2")||t.getContext("experimental-webgl");if(null==i)throw Error("Unable to initialize WebGL. Your browser or machine may not support it.");i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!0);const s=new Ls(i);Fs(t),Ws(i,t);const o=Us(t),n=z();W(n,n,[.2,0,-.5]),U(n,n,0,[0,1,0]);const a=js(n);s.init(o,n,a);const r=new Float32Array(e),l=new Array(r.length/3);for(let t=0;t<l.length;++t)l[t]=t;let h,d,c,u,p,g;h=d=r[0],c=u=r[1],p=g=r[2];for(let t=3;t<r.length;t+=3)h=Math.min(h,r[t]),d=Math.max(d,r[t]),c=Math.min(c,r[t+1]),u=Math.max(u,r[t+1]),p=Math.min(p,r[t+2]),g=Math.max(g,r[t+2]);const f=h+=(d-h)/2,m=c+=(u-c)/2,x=p+=(g-p)/2;for(let t=3;t<r.length;t+=3)r[t]-=f,r[t+1]=-1*(r[t+1]-m),r[t+2]=r[t+2]-x;const v=new Ps(i,r,l,void 0,void 0,!1);s.setColor([10,8,7,1]),v.bind(s),i.drawElements(i.POINTS,l.length,i.UNSIGNED_SHORT,0),s.setColor([0,1.8,0,1]);const b=[[10,338,297,332,284,251,389,356,454,323,361,288,397,365,379,378,400,377,152,148,176,149,150,136,172,58,132,93,234,127,162,21,54,103,67,109,10],[10,151,9,8,168,6,197,195,5,4,1,94,2,164,11,12,13,14,15,16,17,18,200,199,175,152],[139,71,68,104,69,108,151,337,299,333,298,301,368,264,447,366,401,435,367,364,394,395,369,396,175,171,140,170,169,135,138,215,177,137,227,34,139],[199,208,32,211,210,214,192,213,147,123,116,143,156,70,63,105,66,107,9,336,296,334,293,300,383,372,345,352,376,433,416,434,430,431,262,428,199],[102,115,220,45,4,275,440,344,331],[129,49,131,134,51,5,281,363,360,279,358],[209,198,236,3,195,248,456,420,429],[214,207,205,36,142,126,217,174,196,197,419,399,437,355,371,266,425,427,434],[192,187,50,101,100,47,114,188,122,6,351,412,343,277,329,330,280,411,416],[111,117,118,119,120,121,128,245],[340,346,347,348,349,350,357,465],[31,228,229,230,231,232,233,244],[261,448,449,450,451,452,453,464],[25,110,24,23,22,26,112,243],[255,339,254,253,252,256,341,463],[55,65,52,53,46,156],[285,295,282,283,276,383],[413,441,442,443,444,445,353],[189,221,222,223,224,225,124],[190,56,28,27,29,30,247],[414,286,258,257,259,260,467],[202,57,186,92,165,167,164,393,391,322,410,287,422],[210,212,216,206,203],[430,432,436,426,423],[417,168,193],[234,143,35,226,130],[359,446,265,372,454],[398,384,385,386,387,388,466,263],[263,249,390,373,374,380,381,382,362],[173,157,158,159,160,161,246,33],[7,163,144,145,153,154,155,133],[422,424,418,421,200,201,194,204,202],[285,8,55],[458,459,309,392,289,305,290,250,458],[60,75,59,166,79,239,238,20,60],[240,235,219,218,237,44,1,274,457,438,439,455,460,328,2,99,240],[458,461,354,19,125,241,238],[250,462,370,94,141,242,20],[278,294,327,326,97,98,64,48],[43,106,182,83,18,313,406,335,273],[264,342],[34,113],[474,473,476,473,475,473,477],[469,471,468,470,472],[317,14,87,178,88,95,78,191,80,81,82,13,312,311,310,415,308,324,318,402,317],[316,15,86,179,89,96,62,183,42,41,38,12,268,271,272,407,292,325,319,403,316],[315,16,85,180,90,77,76,184,74,73,72,11,302,303,304,408,306,307,320,404,315],[314,17,84,181,91,146,61,185,40,39,37,11,267,269,270,409,291,375,321,405,314]];for(const t of b)new Ps(i,r,t,void 0,void 0,!1).bind(s),i.drawElements(i.LINE_STRIP,t.length,i.UNSIGNED_SHORT,0),34===t[0]&&s.setColor([8,0,0,1])}(t.canvas,e),a.send(i.encode("GET FACE"))})),a.send(i.encode("GET FACE"))}},t}({});
//# sourceMappingURL=makehuman.js.map
