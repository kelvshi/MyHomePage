(function(){function d(a){this.tokens=[];this.tokens.links={};this.options=a||t.defaults;this.rules=l.normal;if(this.options.gfm)this.rules=this.options.tables?l.tables:l.gfm}function n(a,f){this.options=f||t.defaults;this.links=a;this.rules=s.normal;if(!this.links)throw Error("Tokens array requires a `links` property.");if(this.options.gfm)this.rules=this.options.breaks?s.breaks:s.gfm;else if(this.options.pedantic)this.rules=s.pedantic}function o(a){this.tokens=[];this.token=null;this.options=a||
t.defaults}function p(a,f){return a.replace(!f?/&(?!#?\w+;)/g:/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function i(a,f){a=a.source;f=f||"";return function h(b,c){if(!b)return RegExp(a,f);c=c.source||c;c=c.replace(/(^|[^\[])\^/g,"$1");a=a.replace(b,c);return h}}function w(){}function u(a){for(var f=1,h,b;f<arguments.length;f++){h=arguments[f];for(b in h)if(Object.prototype.hasOwnProperty.call(h,b))a[b]=h[b]}return a}function t(a,f,h){if(h||
typeof f==="function"){if(!h){h=f;f=null}f=u({},t.defaults,f||{});var b=f.highlight,c,j,e=0;try{c=d.lex(a,f)}catch(g){return h(g)}j=c.length;var m=function(){var k,q;try{k=o.parse(c,f)}catch(x){q=x}f.highlight=b;return q?h(q):h(null,k)};if(!b||b.length<3)return m();delete f.highlight;if(!j)return m();for(;e<c.length;e++)(function(k){if(k.type!=="code")return--j||m();return b(k.text,k.lang,function(q,x){if(x==null||x===k.text)return--j||m();k.text=x;k.escaped=true;--j||m()})})(c[e])}else try{if(f)f=
u({},t.defaults,f);return o.parse(d.lex(a,f),f)}catch(z){z.message+="\nPlease report this to https://github.com/chjj/marked.";if((f||t.defaults).silent)return"<p>An error occured:</p><pre>"+p(z.message+"",true)+"</pre>";throw z;}}var l={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:w,hr:/^( *[-*_]){3,} *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,nptable:w,lheading:/^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,blockquote:/^( *>[^\n]+(\n[^\n]+)*\n*)+/,list:/^( *)(bull) [\s\S]+?(?:hr|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
html:/^ *(?:comment|closed|closing) *(?:\n{2,}|\s*$)/,def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,table:w,paragraph:/^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,text:/^[^\n]+/};l.bullet=/(?:[*+-]|\d+\.)/;l.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;l.item=i(l.item,"gm")(/bull/g,l.bullet)();l.list=i(l.list)(/bull/g,l.bullet)("hr",/\n+(?=(?: *[-*_]){3,} *(?:\n+|$))/)();l._tag="(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|@)\\b";
l.html=i(l.html)("comment",/<\!--[\s\S]*?--\>/)("closed",/<(tag)[\s\S]+?<\/\1>/)("closing",/<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g,l._tag)();l.paragraph=i(l.paragraph)("hr",l.hr)("heading",l.heading)("lheading",l.lheading)("blockquote",l.blockquote)("tag","<"+l._tag)("def",l.def)();l.normal=u({},l);l.gfm=u({},l.normal,{fences:/^ *(`{3,}|~{3,}) *(\S+)? *\n([\s\S]+?)\s*\1 *(?:\n+|$)/,paragraph:/^/});l.gfm.paragraph=i(l.paragraph)("(?!","(?!"+l.gfm.fences.source.replace("\\1","\\2")+"|"+l.list.source.replace("\\1",
"\\3")+"|")();l.tables=u({},l.gfm,{nptable:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,table:/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/});d.rules=l;d.lex=function(a,f){return(new d(f)).lex(a)};d.prototype.lex=function(a){a=a.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n");return this.token(a,true)};d.prototype.token=function(a,f){a=a.replace(/^ +$/gm,"");for(var h,b,c,j,e,g,m;a;){if(c=this.rules.newline.exec(a)){a=
a.substring(c[0].length);c[0].length>1&&this.tokens.push({type:"space"})}if(c=this.rules.code.exec(a)){a=a.substring(c[0].length);c=c[0].replace(/^ {4}/gm,"");this.tokens.push({type:"code",text:!this.options.pedantic?c.replace(/\n+$/,""):c})}else if(c=this.rules.fences.exec(a)){a=a.substring(c[0].length);this.tokens.push({type:"code",lang:c[2],text:c[3]})}else if(c=this.rules.heading.exec(a)){a=a.substring(c[0].length);this.tokens.push({type:"heading",depth:c[1].length,text:c[2]})}else if(f&&(c=this.rules.nptable.exec(a))){a=
a.substring(c[0].length);e={type:"table",header:c[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:c[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:c[3].replace(/\n$/,"").split("\n")};for(g=0;g<e.align.length;g++)e.align[g]=/^ *-+: *$/.test(e.align[g])?"right":/^ *:-+: *$/.test(e.align[g])?"center":/^ *:-+ *$/.test(e.align[g])?"left":null;for(g=0;g<e.cells.length;g++)e.cells[g]=e.cells[g].split(/ *\| */);this.tokens.push(e)}else if(c=this.rules.lheading.exec(a)){a=a.substring(c[0].length);this.tokens.push({type:"heading",
depth:c[2]==="="?1:2,text:c[1]})}else if(c=this.rules.hr.exec(a)){a=a.substring(c[0].length);this.tokens.push({type:"hr"})}else if(c=this.rules.blockquote.exec(a)){a=a.substring(c[0].length);this.tokens.push({type:"blockquote_start"});c=c[0].replace(/^ *> ?/gm,"");this.token(c,f);this.tokens.push({type:"blockquote_end"})}else if(c=this.rules.list.exec(a)){a=a.substring(c[0].length);j=c[2];this.tokens.push({type:"list_start",ordered:j.length>1});c=c[0].match(this.rules.item);h=false;m=c.length;for(g=
0;g<m;g++){e=c[g];b=e.length;e=e.replace(/^ *([*+-]|\d+\.) +/,"");if(~e.indexOf("\n ")){b-=e.length;e=!this.options.pedantic?e.replace(RegExp("^ {1,"+b+"}","gm"),""):e.replace(/^ {1,4}/gm,"")}if(this.options.smartLists&&g!==m-1){b=l.bullet.exec(c[g+1])[0];if(j!==b&&!(j.length>1&&b.length>1)){a=c.slice(g+1).join("\n")+a;g=m-1}}b=h||/\n\n(?!\s*$)/.test(e);if(g!==m-1){h=e.charAt(e.length-1)==="\n";b||(b=h)}this.tokens.push({type:b?"loose_item_start":"list_item_start"});this.token(e,false);this.tokens.push({type:"list_item_end"})}this.tokens.push({type:"list_end"})}else if(c=
this.rules.html.exec(a)){a=a.substring(c[0].length);this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:c[1]==="pre"||c[1]==="script"||c[1]==="style",text:c[0]})}else if(f&&(c=this.rules.def.exec(a))){a=a.substring(c[0].length);this.tokens.links[c[1].toLowerCase()]={href:c[2],title:c[3]}}else if(f&&(c=this.rules.table.exec(a))){a=a.substring(c[0].length);e={type:"table",header:c[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:c[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:c[3].replace(/(?: *\| *)?\n$/,
"").split("\n")};for(g=0;g<e.align.length;g++)e.align[g]=/^ *-+: *$/.test(e.align[g])?"right":/^ *:-+: *$/.test(e.align[g])?"center":/^ *:-+ *$/.test(e.align[g])?"left":null;for(g=0;g<e.cells.length;g++)e.cells[g]=e.cells[g].replace(/^ *\| *| *\| *$/g,"").split(/ *\| */);this.tokens.push(e)}else if(f&&(c=this.rules.paragraph.exec(a))){a=a.substring(c[0].length);this.tokens.push({type:"paragraph",text:c[1].charAt(c[1].length-1)==="\n"?c[1].slice(0,-1):c[1]})}else if(c=this.rules.text.exec(a)){a=a.substring(c[0].length);
this.tokens.push({type:"text",text:c[0]})}else if(a)throw Error("Infinite loop on byte: "+a.charCodeAt(0));}return this.tokens};var s={escape:/^\\([\\`*{}\[\]()#+\-.!_>])/,autolink:/^<([^ >]+(@|:\/)[^ >]+)>/,url:w,tag:/^<\!--[\s\S]*?--\>|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,link:/^!?\[(inside)\]\(href\)/,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,strong:/^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,em:/^\b_((?:__|[\s\S])+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
code:/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,del:w,text:/^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/};s._inside=/(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;s._href=/\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;s.link=i(s.link)("inside",s._inside)("href",s._href)();s.reflink=i(s.reflink)("inside",s._inside)();s.normal=u({},s);s.pedantic=u({},s.normal,{strong:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/});s.gfm=
u({},s.normal,{escape:i(s.escape)("])","~|])")(),url:/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,del:/^~~(?=\S)([\s\S]*?\S)~~/,text:i(s.text)("]|","~]|")("|","|https?://|")()});s.breaks=u({},s.gfm,{br:i(s.br)("{2,}","*")(),text:i(s.gfm.text)("{2,}","*")()});n.rules=s;n.output=function(a,f,h){return(new n(f,h)).output(a)};n.prototype.output=function(a){for(var f="",h,b;a;)if(b=this.rules.escape.exec(a)){a=a.substring(b[0].length);f+=b[1]}else if(b=this.rules.autolink.exec(a)){a=a.substring(b[0].length);
if(b[2]==="@"){h=b[1].charAt(6)===":"?this.mangle(b[1].substring(7)):this.mangle(b[1]);b=this.mangle("mailto:")+h}else b=h=p(b[1]);f+='<a href="'+b+'">'+h+"</a>"}else if(b=this.rules.url.exec(a)){a=a.substring(b[0].length);b=h=p(b[1]);f+='<a href="'+b+'">'+h+"</a>"}else if(b=this.rules.tag.exec(a)){a=a.substring(b[0].length);f+=this.options.sanitize?p(b[0]):b[0]}else if(b=this.rules.link.exec(a)){a=a.substring(b[0].length);f+=this.outputLink(b,{href:b[2],title:b[3]})}else if((b=this.rules.reflink.exec(a))||
(b=this.rules.nolink.exec(a))){a=a.substring(b[0].length);h=(b[2]||b[1]).replace(/\s+/g," ");h=this.links[h.toLowerCase()];if(!h||!h.href){f+=b[0].charAt(0);a=b[0].substring(1)+a}else f+=this.outputLink(b,h)}else if(b=this.rules.strong.exec(a)){a=a.substring(b[0].length);f+="<strong>"+this.output(b[2]||b[1])+"</strong>"}else if(b=this.rules.em.exec(a)){a=a.substring(b[0].length);f+="<em>"+this.output(b[2]||b[1])+"</em>"}else if(b=this.rules.code.exec(a)){a=a.substring(b[0].length);f+="<code>"+p(b[2],
true)+"</code>"}else if(b=this.rules.br.exec(a)){a=a.substring(b[0].length);f+="<br>"}else if(b=this.rules.del.exec(a)){a=a.substring(b[0].length);f+="<del>"+this.output(b[1])+"</del>"}else if(b=this.rules.text.exec(a)){a=a.substring(b[0].length);f+=p(this.smartypants(b[0]))}else if(a)throw Error("Infinite loop on byte: "+a.charCodeAt(0));return f};n.prototype.outputLink=function(a,f){return a[0].charAt(0)!=="!"?'<a href="'+p(f.href)+'"'+(f.title?' title="'+p(f.title)+'"':"")+">"+this.output(a[1])+
"</a>":'<img src="'+p(f.href)+'" alt="'+p(a[1])+'"'+(f.title?' title="'+p(f.title)+'"':"")+">"};n.prototype.smartypants=function(a){if(!this.options.smartypants)return a;return a.replace(/--/g,"â€”").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1â€˜").replace(/'/g,"â€™").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1â€œ").replace(/"/g,"â€").replace(/\.{3}/g,"â€¦")};n.prototype.mangle=function(a){for(var f="",h=a.length,b=0,c;b<h;b++){c=a.charCodeAt(b);if(Math.random()>0.5)c="x"+c.toString(16);f+="&#"+c+";"}return f};o.parse=
function(a,f){return(new o(f)).parse(a)};o.prototype.parse=function(a){this.inline=new n(a.links,this.options);this.tokens=a.reverse();for(a="";this.next();)a+=this.tok();return a};o.prototype.next=function(){return this.token=this.tokens.pop()};o.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0};o.prototype.parseText=function(){for(var a=this.token.text;this.peek().type==="text";)a+="\n"+this.next().text;return this.inline.output(a)};o.prototype.tok=function(){switch(this.token.type){case "space":return"";
case "hr":return"<hr>\n";case "heading":return"<h"+this.token.depth+' id="'+this.token.text.toLowerCase().replace(/[^\w]+/g,"-")+'">'+this.inline.output(this.token.text)+"</h"+this.token.depth+">\n";case "code":if(this.options.highlight){var a=this.options.highlight(this.token.text,this.token.lang);if(a!=null&&a!==this.token.text){this.token.escaped=true;this.token.text=a}}if(!this.token.escaped)this.token.text=p(this.token.text,true);return"<pre><code"+(this.token.lang?' class="'+this.options.langPrefix+
this.token.lang+'"':"")+">"+this.token.text+"</code></pre>\n";case "table":a="";var f,h,b,c;a+="<thead>\n<tr>\n";for(h=0;h<this.token.header.length;h++){f=this.inline.output(this.token.header[h]);a+="<th";if(this.token.align[h])a+=' style="text-align:'+this.token.align[h]+'"';a+=">"+f+"</th>\n"}a+="</tr>\n</thead>\n";a+="<tbody>\n";for(h=0;h<this.token.cells.length;h++){f=this.token.cells[h];a+="<tr>\n";for(c=0;c<f.length;c++){b=this.inline.output(f[c]);a+="<td";if(this.token.align[c])a+=' style="text-align:'+
this.token.align[c]+'"';a+=">"+b+"</td>\n"}a+="</tr>\n"}a+="</tbody>\n";return"<table>\n"+a+"</table>\n";case "blockquote_start":for(a="";this.next().type!=="blockquote_end";)a+=this.tok();return"<blockquote>\n"+a+"</blockquote>\n";case "list_start":h=this.token.ordered?"ol":"ul";for(a="";this.next().type!=="list_end";)a+=this.tok();return"<"+h+">\n"+a+"</"+h+">\n";case "list_item_start":for(a="";this.next().type!=="list_item_end";)a+=this.token.type==="text"?this.parseText():this.tok();return"<li>"+
a+"</li>\n";case "loose_item_start":for(a="";this.next().type!=="list_item_end";)a+=this.tok();return"<li>"+a+"</li>\n";case "html":return!this.token.pre&&!this.options.pedantic?this.inline.output(this.token.text):this.token.text;case "paragraph":return"<p>"+this.inline.output(this.token.text)+"</p>\n";case "text":return"<p>"+this.parseText()+"</p>\n"}};w.exec=w;t.options=t.setOptions=function(a){u(t.defaults,a);return t};t.defaults={gfm:true,tables:true,breaks:false,pedantic:false,sanitize:false,
smartLists:false,silent:false,highlight:null,langPrefix:"lang-",smartypants:false};t.Parser=o;t.parser=o.parse;t.Lexer=d;t.lexer=d.lex;t.InlineLexer=n;t.inlineLexer=n.output;t.parse=t;if(typeof exports==="object")module.exports=t;else if(typeof define==="function"&&define.amd)define(function(){return t});else this.marked=t}).call(function(){return this||(typeof window!=="undefined"?window:global)}());
var hljs=new function(){function d(b){return b.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;")}function n(b){for(b=b.firstChild;b;b=b.nextSibling){if("CODE"==b.nodeName)return b;if(3!=b.nodeType||!b.nodeValue.match(/\s+/))break}}function o(b,c){return Array.prototype.map.call(b.childNodes,function(j){return 3==j.nodeType?c?j.nodeValue.replace(/\n/g,""):j.nodeValue:"BR"==j.nodeName?"\n":o(j,c)}).join("")}function p(b){b=(b.className+" "+b.parentNode.className).split(/\s+/);b=b.map(function(j){return j.replace(/^language-/,
"")});for(var c=0;c<b.length;c++)if(h[b[c]]||"no-highlight"==b[c])return b[c]}function i(b){var c=[];return function j(e,g){for(var m=e.firstChild;m;m=m.nextSibling)3==m.nodeType?g+=m.nodeValue.length:"BR"==m.nodeName?g+=1:1==m.nodeType&&(c.push({event:"start",offset:g,node:m}),g=j(m,g),c.push({event:"stop",offset:g,node:m}));return g}(b,0),c}function w(b,c,j){function e(D){return"<"+D.nodeName+Array.prototype.map.call(D.attributes,function(A){return" "+A.nodeName+'="'+d(A.value)+'"'}).join("")+">"}
for(var g=0,m="",z=[];b.length||c.length;){var k=(b.length&&c.length?b[0].offset!=c[0].offset?b[0].offset<c[0].offset?b:c:"start"==c[0].event?b:c:b.length?b:c).splice(0,1)[0];if(m+=d(j.substr(g,k.offset-g)),g=k.offset,"start"==k.event){m+=e(k.node);z.push(k.node)}else if("stop"==k.event){var q,x=z.length;do{x--;q=z[x];m+="</"+q.nodeName.toLowerCase()+">"}while(q!=k.node);for(z.splice(x,1);x<z.length;){m+=e(z[x]);x++}}}return m+d(j.substr(g))}function u(b){function c(e,g){return RegExp(e,"m"+(b.cI?
"i":"")+(g?"g":""))}function j(e,g){function m(D,A){A.split(" ").forEach(function(B){B=B.split("|");k[B[0]]=[D,B[1]?Number(B[1]):1];z.push(B[0])})}if(!e.compiled){e.compiled=true;var z=[];if(e.k){var k={};if(e.lR=c(e.l||hljs.IR,true),"string"==typeof e.k)m("keyword",e.k);else for(var q in e.k)e.k.hasOwnProperty(q)&&m(q,e.k[q]);e.k=k}g&&(e.bWK&&(e.b="\\b("+z.join("|")+")\\s"),e.bR=c(e.b?e.b:"\\B|\\b"),e.e||e.eW||(e.e="\\B|\\b"),e.e&&(e.eR=c(e.e)),e.tE=e.e||"",e.eW&&g.tE&&(e.tE+=(e.e?"|":"")+g.tE));
e.i&&(e.iR=c(e.i));void 0===e.r&&(e.r=1);e.c||(e.c=[]);for(q=0;q<e.c.length;q++){"self"==e.c[q]&&(e.c[q]=e);j(e.c[q],e)}e.starts&&j(e.starts,g);var x=[];for(q=0;q<e.c.length;q++)x.push(e.c[q].b);e.tE&&x.push(e.tE);e.i&&x.push(e.i);e.t=x.length?c(x.join("|"),true):{exec:function(){return null}}}}j(b)}function t(b,c){function j(v,y){return v.e&&v.eR.test(y)?v:v.eW?j(v.parent,y):void 0}function e(){var v;if(void 0!==k.sL)if(k.sL&&!h[k.sL])v=d(q);else{v=k.sL?t(k.sL,q):l(q);v=(k.r>0&&(D+=v.keyword_count,
x+=v.r),'<span class="'+v.language+'">'+v.value+"</span>")}else{v=d(q);if(k.k){var y="",r=0;k.lR.lastIndex=0;for(var C=k.lR.exec(v);C;){y+=v.substr(r,C.index-r);r=k;var E=C;E=z.cI?E[0].toLowerCase():E[0];(r=r.k.hasOwnProperty(E)&&r.k[E])?(D+=r[1],y+='<span class="'+r[0]+'">'+C[0]+"</span>"):y+=C[0];r=k.lR.lastIndex;C=k.lR.exec(v)}v=y+v.substr(r)}}return v}function g(v,y){var r=v.cN?'<span class="'+v.cN+'">':"";v.rB?(A+=r,q=""):v.eB?(A+=d(y)+r,q=""):(A+=r,q=y);k=Object.create(v,{parent:{value:k}});
x+=v.r}function m(v,y){if(q+=v,void 0===y)return A+=e(),0;var r;a:{r=k;for(var C=0;C<r.c.length;C++){var E=r.c[C].bR.exec(y);if(E&&0==E.index){r=r.c[C];break a}}r=void 0}if(r)return A+=e(),g(r,y),r.rB?0:y.length;if(r=j(k,y)){r.rE||r.eE||(q+=y);A+=e();do{k.cN&&(A+="</span>");k=k.parent}while(k!=r.parent);return r.eE&&(A+=d(y)),q="",r.starts&&g(r.starts,""),r.rE?0:y.length}if(k.i&&k.iR.test(y))throw"Illegal";return q+=y,y.length||1}var z=h[b];u(z);var k=z,q="",x=0,D=0,A="";try{for(var B,G,F=0;;){if(k.t.lastIndex=
F,B=k.t.exec(c),!B)break;G=m(c.substr(F,B.index-F),B[0]);F=B.index+G}return m(c.substr(F)),{r:x,keyword_count:D,value:A,language:b}}catch(H){if("Illegal"==H)return{r:0,keyword_count:0,value:d(c)};throw H;}}function l(b){var c={keyword_count:0,r:0,value:d(b)},j=c,e;for(e in h)if(h.hasOwnProperty(e)){var g=t(e,b);g.language=e;g.keyword_count+g.r>j.keyword_count+j.r&&(j=g);g.keyword_count+g.r>c.keyword_count+c.r&&(j=c,c=g)}return j.language&&(c.second_best=j),c}function s(b,c,j){return c&&(b=b.replace(/^((<[^>]+>|\t)+)/gm,
function(e,g){return g.replace(/\t/g,c)})),j&&(b=b.replace(/\n/g,"<br>")),b}function a(b,c,j){var e=o(b,j),g=p(b);if("no-highlight"!=g){var m=g?t(g,e):l(e);g=m.language;var z=i(b);if(z.length){var k=document.createElement("pre");k.innerHTML=m.value;m.value=w(z,i(k),e)}m.value=s(m.value,c,j);c=b.className;c.match("(\\s|^)(language-)?"+g+"(\\s|$)")||(c=c?c+" "+g:g);b.innerHTML=m.value;b.className=c;b.result={language:g,kw:m.keyword_count,re:m.r};m.second_best&&(b.second_best={language:m.second_best.language,
kw:m.second_best.keyword_count,re:m.second_best.r})}}function f(){f.called||(f.called=true,Array.prototype.map.call(document.getElementsByTagName("pre"),n).filter(Boolean).forEach(function(b){a(b,hljs.tabReplace)}))}var h={};this.LANGUAGES=h;this.highlight=t;this.highlightAuto=l;this.fixMarkup=s;this.highlightBlock=a;this.initHighlighting=f;this.initHighlightingOnLoad=function(){window.addEventListener("DOMContentLoaded",f,false);window.addEventListener("load",f,false)};this.IR="[a-zA-Z][a-zA-Z0-9_]*";
this.UIR="[a-zA-Z_][a-zA-Z0-9_]*";this.NR="\\b\\d+(\\.\\d+)?";this.CNR="(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)";this.BNR="\\b(0b[01]+)";this.RSR="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|\\.|-|-=|/|/=|:|;|<|<<|<<=|<=|=|==|===|>|>=|>>|>>=|>>>|>>>=|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~";this.BE={b:"\\\\[\\s\\S]",r:0};this.ASM={cN:"string",b:"'",e:"'",i:"\\n",c:[this.BE],r:0};this.QSM={cN:"string",b:'"',e:'"',i:"\\n",c:[this.BE],r:0};this.CLCM={cN:"comment",b:"//",e:"$"};
this.CBLCLM={cN:"comment",b:"/\\*",e:"\\*/"};this.HCM={cN:"comment",b:"#",e:"$"};this.NM={cN:"number",b:this.NR,r:0};this.CNM={cN:"number",b:this.CNR,r:0};this.BNM={cN:"number",b:this.BNR,r:0};this.inherit=function(b,c){var j={},e;for(e in b)j[e]=b[e];if(c)for(e in c)j[e]=c[e];return j}};
hljs.LANGUAGES.bash=function(d){var n={cN:"variable",b:"\\$[a-zA-Z0-9_#]+"},o={cN:"variable",b:"\\${([^}]|\\\\})+}"},p={cN:"string",b:'"',e:'"',i:"\\n",c:[d.BE,n,o],r:0},i={cN:"string",b:"'",e:"'",c:[{b:"''"}],r:0},w={cN:"test_condition",b:"",e:"",c:[p,i,n,o],k:{literal:"true false"},r:0};return{k:{keyword:"if then else elif fi for break continue while in do done echo exit return set declare",literal:"true false"},c:[{cN:"shebang",b:"(#!\\/bin\\/bash)|(#!\\/bin\\/sh)",r:10},n,o,d.HCM,p,i,d.inherit(w,
{b:"\\[ ",e:" \\]",r:0}),d.inherit(w,{b:"\\[\\[ ",e:" \\]\\]"})]}}(hljs);
hljs.LANGUAGES.cs=function(d){return{k:"abstract as base bool break byte case catch char checked class const continue decimal default delegate do double else enum event explicit extern false finally fixed float for foreach goto if implicit in int interface internal is lock long namespace new null object operator out override params private protected public readonly ref return sbyte sealed short sizeof stackalloc static string struct switch this throw true try typeof uint ulong unchecked unsafe ushort using virtual volatile void while ascending descending from get group into join let orderby partial select set value var where yield",c:[{cN:"comment",
b:"///",e:"$",rB:true,c:[{cN:"xmlDocTag",b:"///|<\!--|--\>"},{cN:"xmlDocTag",b:"</?",e:">"}]},d.CLCM,d.CBLCLM,{cN:"preprocessor",b:"#",e:"$",k:"if else elif endif define undef warning error line region endregion pragma checksum"},{cN:"string",b:'@"',e:'"',c:[{b:'""'}]},d.ASM,d.QSM,d.CNM]}}(hljs);
hljs.LANGUAGES.ruby=function(d){var n={keyword:"and false then defined module in return redo if BEGIN retry end for true self when next until do begin unless END rescue nil else break undef not super class case require yield alias while ensure elsif or include"},o={cN:"yardoctag",b:"@[A-Za-z]+"},p=[{cN:"comment",b:"#",e:"$",c:[o]},{cN:"comment",b:"^\\=begin",e:"^\\=end",c:[o],r:10},{cN:"comment",b:"^__END__",e:"\\n$"}];o={cN:"subst",b:"#\\{",e:"}",l:"[a-zA-Z_][a-zA-Z0-9_]*(\\!|\\?)?",k:n};var i=[d.BE,
o],w=[{cN:"string",b:"'",e:"'",c:i,r:0},{cN:"string",b:'"',e:'"',c:i,r:0},{cN:"string",b:"%[qw]?\\(",e:"\\)",c:i},{cN:"string",b:"%[qw]?\\[",e:"\\]",c:i},{cN:"string",b:"%[qw]?{",e:"}",c:i},{cN:"string",b:"%[qw]?<",e:">",c:i,r:10},{cN:"string",b:"%[qw]?/",e:"/",c:i,r:10},{cN:"string",b:"%[qw]?%",e:"%",c:i,r:10},{cN:"string",b:"%[qw]?-",e:"-",c:i,r:10},{cN:"string",b:"%[qw]?\\|",e:"\\|",c:i,r:10}];i={cN:"function",bWK:true,e:" |$|;",k:"def",c:[{cN:"title",b:"[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?",
l:"[a-zA-Z_][a-zA-Z0-9_]*(\\!|\\?)?",k:n},{cN:"params",b:"\\(",e:"\\)",l:"[a-zA-Z_][a-zA-Z0-9_]*(\\!|\\?)?",k:n}].concat(p)};d=p.concat(w.concat([{cN:"class",bWK:true,e:"$|;",k:"class module",c:[{cN:"title",b:"[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?",r:0},{cN:"inheritance",b:"<\\s*",c:[{cN:"parent",b:"("+d.IR+"::)?"+d.IR}]}].concat(p)},i,{cN:"constant",b:"(::)?(\\b[A-Z]\\w*(::)?)+",r:0},{cN:"symbol",b:":",c:w.concat([{b:"[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?"}]),
r:0},{cN:"symbol",b:"[a-zA-Z_][a-zA-Z0-9_]*(\\!|\\?)?:",r:0},{cN:"number",b:"(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",r:0},{cN:"number",b:"\\?\\w"},{cN:"variable",b:"(\\$\\W)|((\\$|\\@\\@?)(\\w+))"},{b:"("+d.RSR+")\\s*",c:p.concat([{cN:"regexp",b:"/",e:"/[a-z]*",i:"\\n",c:[d.BE,o]}]),r:0}]));return o.c=d,i.c[1].c=d,{l:"[a-zA-Z_][a-zA-Z0-9_]*(\\!|\\?)?",k:n,c:d}}(hljs);
hljs.LANGUAGES.diff=function(){return{c:[{cN:"chunk",b:"^\\@\\@ +\\-\\d+,\\d+ +\\+\\d+,\\d+ +\\@\\@$",r:10},{cN:"chunk",b:"^\\*\\*\\* +\\d+,\\d+ +\\*\\*\\*\\*$",r:10},{cN:"chunk",b:"^\\-\\-\\- +\\d+,\\d+ +\\-\\-\\-\\-$",r:10},{cN:"header",b:"Index: ",e:"$"},{cN:"header",b:"=====",e:"=====$"},{cN:"header",b:"^\\-\\-\\-",e:"$"},{cN:"header",b:"^\\*{3} ",e:"$"},{cN:"header",b:"^\\+\\+\\+",e:"$"},{cN:"header",b:"\\*{5}",e:"\\*{5}$"},{cN:"addition",b:"^\\+",e:"$"},{cN:"deletion",b:"^\\-",e:"$"},{cN:"change",
b:"^\\!",e:"$"}]}}(hljs);
hljs.LANGUAGES.javascript=function(d){return{k:{keyword:"in if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const",literal:"true false null undefined NaN Infinity",built_in:"clearInterval clearTimeout document event FormData frames history Image localStorage location name navigator Option parent screen sessionStorage setInterval setTimeout Storage window XMLHttpRequest Buffer clearImmediate console exports global module process querystring require setImmediate __dirname __filename indexOf lastIndexOf search Array Boolean Date decodeURI decodeURIComponent encodeURI encodeURIComponent Error eval EvalError Function isFinite isNaN JSON Math Number Object parseInt parseFloat RangeError ReferenceError RegExp String SyntaxError TypeError URIError alert confirm console Debug opera prompt WSH"},c:[d.ASM,
d.QSM,d.CLCM,d.CBLCLM,d.CNM,{b:"("+d.RSR+"|\\b(case|return|throw)\\b)\\s*",k:"return throw case",c:[d.CLCM,d.CBLCLM,{cN:"regexp",b:"/",e:"/[gim]*",i:"\\n",c:[{b:"\\\\/"}]},{b:"<",e:">;",sL:"xml"}],r:0},{cN:"function",bWK:true,e:"{",k:"function",c:[{cN:"title",b:"[A-Za-z$_][0-9A-Za-z$_]*"},{cN:"params",b:"\\(",e:"\\)",c:[d.CLCM,d.CBLCLM],i:"[\"'\\(]"}],i:"\\[|%"}]}}(hljs);
hljs.LANGUAGES.css=function(d){var n={cN:"function",b:d.IR+"\\(",e:"\\)",c:[d.NM,d.ASM,d.QSM]};return{cI:true,i:"[=/|']",c:[d.CBLCLM,{cN:"id",b:"\\#[A-Za-z0-9_-]+"},{cN:"class",b:"\\.[A-Za-z0-9_-]+",r:0},{cN:"attr_selector",b:"\\[",e:"\\]",i:"$"},{cN:"pseudo",b:":(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\\"\\']+"},{cN:"at_rule",b:"@(font-face|page)",l:"[a-z-]+",k:"font-face page"},{cN:"at_rule",b:"@",e:"[{;]",eE:true,k:"import page media charset",c:[n,d.ASM,d.QSM,d.NM]},{cN:"tag",b:d.IR,r:0},{cN:"rules",b:"{",
e:"}",i:"[^\\s]",r:0,c:[d.CBLCLM,{cN:"rule",b:"[^\\s]",rB:true,e:";",eW:true,c:[{cN:"attribute",b:"[A-Z\\_\\.\\-]+",e:":",eE:true,i:"[^\\s]",starts:{cN:"value",eW:true,eE:true,c:[n,d.NM,d.QSM,d.ASM,d.CBLCLM,{cN:"hexcolor",b:"\\#[0-9A-F]+"},{cN:"important",b:"!important"}]}}]}]}]}}(hljs);
hljs.LANGUAGES.xml=function(){var d={eW:true,c:[{cN:"attribute",b:"[A-Za-z0-9\\._:-]+",r:0},{b:'="',rB:true,e:'"',c:[{cN:"value",b:'"',eW:true}]},{b:"='",rB:true,e:"'",c:[{cN:"value",b:"'",eW:true}]},{b:"=",c:[{cN:"value",b:"[^\\s/>]+"}]}]};return{cI:true,c:[{cN:"pi",b:"<\\?",e:"\\?>",r:10},{cN:"doctype",b:"<!DOCTYPE",e:">",r:10,c:[{b:"\\[",e:"\\]"}]},{cN:"comment",b:"<\!--",e:"--\>",r:10},{cN:"cdata",b:"<\\!\\[CDATA\\[",e:"\\]\\]>",r:10},{cN:"tag",b:"<style(?=\\s|>|$)",e:">",k:{title:"style"},c:[d],
starts:{e:"</style>",rE:true,sL:"css"}},{cN:"tag",b:"<script(?=\\s|>|$)",e:">",k:{title:"script"},c:[d],starts:{e:"<\/script>",rE:true,sL:"javascript"}},{b:"<%",e:"%>",sL:"vbscript"},{cN:"tag",b:"</?",e:"/?>",c:[{cN:"title",b:"[^ />]+"},d]}]}}(hljs);
hljs.LANGUAGES.http=function(){return{i:"\\S",c:[{cN:"status",b:"^HTTP/[0-9\\.]+",e:"$",c:[{cN:"number",b:"\\b\\d{3}\\b"}]},{cN:"request",b:"^[A-Z]+ (.*?) HTTP/[0-9\\.]+$",rB:true,e:"$",c:[{cN:"string",b:" ",e:" ",eB:true,eE:true}]},{cN:"attribute",b:"^\\w",e:": ",eE:true,i:"\\n|\\s|=",starts:{cN:"string",e:"$"}},{b:"\\n\\n",starts:{sL:"",eW:true}}]}}(hljs);
hljs.LANGUAGES.java=function(d){return{k:"false synchronized int abstract float private char boolean static null if const for true while long throw strictfp finally protected import native final return void enum else break transient new catch instanceof byte super volatile case assert short package default double public try this switch continue throws",c:[{cN:"javadoc",b:"/\\*\\*",e:"\\*/",c:[{cN:"javadoctag",b:"@[A-Za-z]+"}],r:10},d.CLCM,d.CBLCLM,d.ASM,d.QSM,{cN:"class",bWK:true,e:"{",k:"class interface",
i:":",c:[{bWK:true,k:"extends implements",r:10},{cN:"title",b:d.UIR}]},d.CNM,{cN:"annotation",b:"@[A-Za-z]+"}]}}(hljs);
hljs.LANGUAGES.php=function(d){var n={cN:"variable",b:"\\$+[a-zA-Z_-æ¯][a-zA-Z0-9_-æ¯]*"},o=[d.inherit(d.ASM,{i:null}),d.inherit(d.QSM,{i:null}),{cN:"string",b:'b"',e:'"',c:[d.BE]},{cN:"string",b:"b'",e:"'",c:[d.BE]}],p=[d.BNM,d.CNM],i={cN:"title",b:d.UIR};return{cI:true,k:"and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return implements parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception php_user_filter default die require __FUNCTION__ enddeclare final try this switch continue endfor endif declare unset true false namespace trait goto instanceof insteadof __DIR__ __NAMESPACE__ __halt_compiler",c:[d.CLCM,
d.HCM,{cN:"comment",b:"/\\*",e:"\\*/",c:[{cN:"phpdoc",b:"\\s@[A-Za-z]+"}]},{cN:"comment",eB:true,b:"__halt_compiler.+?;",eW:true},{cN:"string",b:"<<<['\"]?\\w+['\"]?$",e:"^\\w+;",c:[d.BE]},{cN:"preprocessor",b:"<\\?php",r:10},{cN:"preprocessor",b:"\\?>"},n,{cN:"function",bWK:true,e:"{",k:"function",i:"\\$|\\[|%",c:[i,{cN:"params",b:"\\(",e:"\\)",c:["self",n,d.CBLCLM].concat(o).concat(p)}]},{cN:"class",bWK:true,e:"{",k:"class",i:"[:\\(\\$]",c:[{bWK:true,eW:true,k:"extends",c:[i]},i]},{b:"=>"}].concat(o).concat(p)}}(hljs);
hljs.LANGUAGES.python=function(d){var n={cN:"prompt",b:"^(>>>|\\.\\.\\.) "},o=[{cN:"string",b:"(u|b)?r?'''",e:"'''",c:[n],r:10},{cN:"string",b:'(u|b)?r?"""',e:'"""',c:[n],r:10},{cN:"string",b:"(u|r|ur)'",e:"'",c:[d.BE],r:10},{cN:"string",b:'(u|r|ur)"',e:'"',c:[d.BE],r:10},{cN:"string",b:"(b|br)'",e:"'",c:[d.BE]},{cN:"string",b:'(b|br)"',e:'"',c:[d.BE]}].concat([d.ASM,d.QSM]),p={cN:"title",b:d.UIR},i={cN:"params",b:"\\(",e:"\\)",c:["self",d.CNM,n].concat(o)};p={bWK:true,e:":",i:"[${=;\\n]",c:[p,i],
r:10};return{k:{keyword:"and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda nonlocal|10",built_in:"None True False Ellipsis NotImplemented"},i:"(</|->|\\?)",c:o.concat([n,d.HCM,d.inherit(p,{cN:"function",k:"def"}),d.inherit(p,{cN:"class",k:"class"}),d.CNM,{cN:"decorator",b:"@",e:"$"},{b:"\\b(print|exec)\\("}])}}(hljs);
hljs.LANGUAGES.sql=function(d){return{cI:true,c:[{cN:"operator",b:"(begin|start|commit|rollback|savepoint|lock|alter|create|drop|rename|call|delete|do|handler|insert|load|replace|select|truncate|update|set|show|pragma|grant)\\b(?!:)",e:";",eW:true,k:{keyword:"all partial global month current_timestamp using go revoke smallint indicator end-exec disconnect zone with character assertion to add current_user usage input local alter match collate real then rollback get read timestamp session_user not integer bit unique day minute desc insert execute like ilike|2 level decimal drop continue isolation found where constraints domain right national some module transaction relative second connect escape close system_user for deferred section cast current sqlstate allocate intersect deallocate numeric public preserve full goto initially asc no key output collation group by union session both last language constraint column of space foreign deferrable prior connection unknown action commit view or first into float year primary cascaded except restrict set references names table outer open select size are rows from prepare distinct leading create only next inner authorization schema corresponding option declare precision immediate else timezone_minute external varying translation true case exception join hour default double scroll value cursor descriptor values dec fetch procedure delete and false int is describe char as at in varchar null trailing any absolute current_time end grant privileges when cross check write current_date pad begin temporary exec time update catalog user sql date on identity timezone_hour natural whenever interval work order cascade diagnostics nchar having left call do handler load replace truncate start lock show pragma exists number",
aggregate:"count sum min max avg"},c:[{cN:"string",b:"'",e:"'",c:[d.BE,{b:"''"}],r:0},{cN:"string",b:'"',e:'"',c:[d.BE,{b:'""'}],r:0},{cN:"string",b:"`",e:"`",c:[d.BE]},d.CNM]},d.CBLCLM,{cN:"comment",b:"--",e:"$"}]}}(hljs);hljs.LANGUAGES.ini=function(d){return{cI:true,i:"[^\\s]",c:[{cN:"comment",b:";",e:"$"},{cN:"title",b:"^\\[",e:"\\]"},{cN:"setting",b:"^[a-z0-9\\[\\]_-]+[ \\t]*=[ \\t]*",e:"$",c:[{cN:"value",eW:true,k:"on off true false yes no",c:[d.QSM,d.NM]}]}]}}(hljs);
hljs.LANGUAGES.perl=function(d){var n={cN:"subst",b:"[$@]\\{",e:"\\}",k:"getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qqfileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmgetsub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedirioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when",
r:10},o={cN:"variable",b:"\\$\\d"},p={cN:"variable",b:"[\\$\\%\\@\\*](\\^\\w\\b|#\\w+(\\:\\:\\w+)*|[^\\s\\w{]|{\\w+}|\\w+(\\:\\:\\w*)*)"},i=[d.BE,n,o,p],w={b:"->",c:[{b:d.IR},{b:"{",e:"}"}]},u={cN:"comment",b:"^(__END__|__DATA__)",e:"\\n$",r:5};d=[o,p,d.HCM,u,{cN:"comment",b:"^\\=\\w",e:"\\=cut",eW:true},w,{cN:"string",b:"q[qwxr]?\\s*\\(",e:"\\)",c:i,r:5},{cN:"string",b:"q[qwxr]?\\s*\\[",e:"\\]",c:i,r:5},{cN:"string",b:"q[qwxr]?\\s*\\{",e:"\\}",c:i,r:5},{cN:"string",b:"q[qwxr]?\\s*\\|",e:"\\|",c:i,
r:5},{cN:"string",b:"q[qwxr]?\\s*\\<",e:"\\>",c:i,r:5},{cN:"string",b:"qw\\s+q",e:"q",c:i,r:5},{cN:"string",b:"'",e:"'",c:[d.BE],r:0},{cN:"string",b:'"',e:'"',c:i,r:0},{cN:"string",b:"`",e:"`",c:[d.BE]},{cN:"string",b:"{\\w+}",r:0},{cN:"string",b:"-?\\w+\\s*\\=\\>",r:0},{cN:"number",b:"(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",r:0},{b:"("+d.RSR+"|\\b(split|return|print|reverse|grep)\\b)\\s*",k:"split return print reverse grep",r:0,c:[d.HCM,u,{cN:"regexp",b:"(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*",
r:10},{cN:"regexp",b:"(m|qr)?/",e:"/[a-z]*",c:[d.BE],r:0}]},{cN:"sub",bWK:true,e:"(\\s*\\(.*?\\))?[;{]",k:"sub",r:5},{cN:"operator",b:"-\\w\\b",r:0}];return n.c=d,w.c[1].c=d,{k:"getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qqfileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmgetsub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedirioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when",
c:d}}(hljs);hljs.LANGUAGES.json=function(d){var n={literal:"true false null"},o=[d.QSM,d.CNM],p={cN:"value",e:",",eW:true,eE:true,c:o,k:n},i={b:"{",e:"}",c:[{cN:"attribute",b:'\\s*"',e:'"\\s*:\\s*',eB:true,eE:true,c:[d.BE],i:"\\n",starts:p}],i:"\\S"};d={b:"\\[",e:"\\]",c:[d.inherit(p,{cN:null})],i:"\\S"};return o.splice(o.length,0,i,d),{c:o,k:n,i:"\\S"}}(hljs);
hljs.LANGUAGES.cpp=function(d){var n={keyword:"false int float while private char catch export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const struct for static_cast|10 union namespace unsigned long throw volatile static protected bool template mutable if public friend do return goto auto void enum else break new extern using true class asm case typeid short reinterpret_cast|10 default double register explicit signed typename try this switch continue wchar_t inline delete alignof char16_t char32_t constexpr decltype noexcept nullptr static_assert thread_local restrict _Bool complex",built_in:"std string cin cout cerr clog stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap array shared_ptr"};
return{k:n,i:"</",c:[d.CLCM,d.CBLCLM,d.QSM,{cN:"string",b:"'\\\\?.",e:"'",i:"."},{cN:"number",b:"\\b(\\d+(\\.\\d*)?|\\.\\d+)(u|U|l|L|ul|UL|f|F)"},d.CNM,{cN:"preprocessor",b:"#",e:"$"},{cN:"stl_container",b:"\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",e:">",k:n,r:10,c:["self"]}]}}(hljs);
(function(d){function n(a,f){for(var h=a.length;h--;)if(a[h]===f)return h;return-1}function o(a,f,h){var b,c,j,e;void 0===h&&(h=f,f="all");a=a.replace(/\s/g,"");b=a.split(",");""==b[b.length-1]&&(b[b.length-2]+=",");for(j=0;j<b.length;j++){if(c=[],a=b[j].split("+"),a.length>1){c=a.slice(0,a.length-1);for(e=0;e<c.length;e++)c[e]=l[c[e]];a=[a[a.length-1]]}a=a[0];a=s[a]||a.toUpperCase().charCodeAt(0);a in w||(w[a]=[]);w[a].push({shortcut:b[j],scope:f,method:h,key:b[j],mods:c})}}function p(a,f,h){a.addEventListener?
a.addEventListener(f,h,false):a.attachEvent&&a.attachEvent("on"+f,function(){h(window.event)})}var i,w={},u={16:false,18:false,17:false,91:false},t="all",l={"éˆ¬":16,shift:16,"éˆ±":18,alt:18,option:18,"éˆ±":17,ctrl:17,control:17,"éˆ±":91,command:91},s={backspace:8,tab:9,clear:12,enter:13,"return":13,esc:27,escape:27,space:32,left:37,up:38,right:39,down:40,del:46,"delete":46,home:36,end:35,pageup:33,pagedown:34,",":188,".":190,"/":191,"`":192,"-":189,"=":187,";":186,"'":222,"[":219,"]":221,"\\":220};for(i=
1;20>i;i++)l["f"+i]=111+i;for(i in l)o[i]=false;p(document,"keydown",function(a){var f,h,b,c,j;if(h=(a.target||a.srcElement).tagName,f=a.keyCode,(93==f||224==f)&&(f=91),f in u){u[f]=true;for(c in l)l[c]==f&&(o[c]=true)}else if("INPUT"!=h&&"SELECT"!=h&&"TEXTAREA"!=h&&f in w)for(h=0;h<w[f].length;h++)if(b=w[f][h],b.scope==t||"all"==b.scope){j=b.mods.length>0;for(c in u)(!u[c]&&n(b.mods,+c)>-1||u[c]&&-1==n(b.mods,+c))&&(j=false);(0!=b.mods.length||u[16]||u[18]||u[17]||u[91])&&!j||b.method(a,b)===false&&
(a.preventDefault?a.preventDefault():a.returnValue=false,a.stopPropagation&&a.stopPropagation(),a.cancelBubble&&(a.cancelBubble=true))}});p(document,"keyup",function(a){var f;a=a.keyCode;if((93==a||224==a)&&(a=91),a in u){u[a]=false;for(f in l)l[f]==a&&(o[f]=false)}});p(window,"focus",function(){for(i in u)u.hasOwnProperty(i)&&(u[i]=false)});d.key=o;d.key.setScope=function(a){t=a||"all"};"undefined"!=typeof module&&(module.exports=key)})(this);