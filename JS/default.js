var k,n,p,q,r,u,v,w,x,y,z,A;
(function(){var b=document.getElementById("canvas");b.offset=.95;var l=b.getContext("2d"),g=[],a=0;k={};n=function(c){var a=c.type+c.width+c.height+"";if(!(a in k)){var b=document.createElement("canvas"),f=b.getContext("2d");b.width=c.width+1;b.height=c.height+1;f.beginPath();f.rect(0,0,c.width,c.height);f.stroke();k[a]=b}return k[a]};window.addEventListener("resize",function(){p()});p=function(){b.width=window.innerWidth*b.offset;b.height=window.innerHeight*b.offset;b.style.left=(window.innerWidth-
b.width)/2+"px";b.style.top=(window.innerHeight-b.height)/2+"px";b.style.position="absolute"};q=function(){return b.width};r=function(){return b.height};u=function(){l.clearRect(0,0,b.width,b.height)};v=function(c){g.push(c)};w=function(c){for(var a=0,b=c.length;a<b;a++)"square"!=c[a].type&&"strafingSquare"!=c[a].type||c[a].h(l)};x=function(a){var b=0,h=0;if(a.offsetParent){do b+=a.offsetLeft,h+=a.offsetTop;while(a===a.offsetParent);return{x:b,y:h}}return{x:0,y:0}};y=function(){return x(b)};z=function(){return a};
A=function(){u();w(g);window.requestAnimationFrame(function(){a++})}})();p();var B;
(function(){var b=!1,l=!1,g=!1,a=!1,c=!1,t=!1,h=!1,f=[],m={x:null,y:null,b:null,m:null};window.addEventListener("mousemove",function(a){var c=y();m.x=a.pageX-c.x;m.y=a.pageY-c.y});window.addEventListener("mouseDown",function(){m.b=!0;f.push({event:"mouseDown",data:B()})});window.addEventListener("mouseup",function(){m.b=!1;f.push({event:"mouseUp",data:B()})});window.addEventListener("mousewheel",function(){});window.addEventListener("keydown",function(d){d=d.keyCode?d.keyCode:e.which;if(37===d||65===
d)g=!0,f.push({event:"left",data:B()});if(38===d||87===d)b=!0,f.push({event:"up",data:B()});if(39===d||68===d)a=!0,f.push({event:"right",data:B()});if(40===d||83===d)l=!0,f.push({event:"down",data:B()});16===d&&(t=!0,f.push({event:"shift",data:B()}));27===d&&(c=!0,f.push({event:"escape",data:B()}));32===d&&(h=!0,f.push({event:"space",data:B()}))});window.addEventListener("keyup",function(d){d=d.keyCode?d.keyCode:e.which;if(38===d||87===d)b=!1;if(37===d||65===d)g=!1;if(39===d||68===d)a=!1;if(40===
d||83===d)l=!1;32===d&&(h=!1);16===d&&(t=!1);27===d&&(c=!1)});B=function(){return{l:b,b:l,left:g,right:a,escape:c,shift:t,j:h,i:m}}})();function C(){D();0==C.frame%200&&console.log("Animation frame: "+z()+"\nLoop frame: "+C.frame+"\nRender frame: "+E.frame);C.frame++}function E(){A();E.frame++}E.frame=0;C.frame=0;setInterval(C,1);setInterval(E,1E3/35);var D,F,G,H;
(function(){function b(a,c){var b=n({type:"strafingSquare",width:a,height:c}),h={type:"strafingSquare",x:Math.random()*q(),y:Math.random()*r(),width:a,height:c,f:500*Math.random(),g:function(){return h.f/300},h:function(a){a.drawImage(b,h.x,h.y)},c:5,a:[l]};return h}function l(a){var c=a.c,b=a.f;a.c++;c<b?a.x+=a.g():c>b&&c<2*b?a.x-=a.g():c>b&&(a.c=0)}var g=[];F=function(a,c){return b(a,c)};G=function(a){if(a.a)for(var b=0,g=a.a.length;b<g;b++)a.a[b](a)};H=function(a){a.a&&g.push(a)};D=function(){for(var a=
0,b=g.length;a<b;a++)G(g[a])}})();for(var I=0;3E3>I;I++){var J=F(10,10);H(J);v(J)};