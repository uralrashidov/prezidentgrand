(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{1334:function(t,e,n){"use strict";n.r(e);n(707);var o=[{title:"ID",dataIndex:"id",key:"id",scopedSlots:{customRender:"id"}},{title:"Turi",dataIndex:"type",key:"type",scopedSlots:{customRender:"type"}},{title:"Berilgan vaqti",dataIndex:"givenDate",key:"givenDate",scopedSlots:{customRender:"givenDate"}},{title:"Fayl",dataIndex:"action",scopedSlots:{customRender:"action"}}],l={props:{data:{typeof:Array,default:null}},data:function(){return{columns:o,current:1,total:50,items:this.data}},methods:{handelChange:function(t){var e=5*(t-1),n=5*t-1;this.items.splice(e,n)}},mounted:function(){this.total=this.data.length%5==0?this.data.length/5*10:10*(parseInt(this.data.length/5)+1)}},d=n(24),component=Object(d.a)(l,(function(){var t=this,e=t._self._c;return e("div",[e("a-table",{attrs:{scroll:{x:"calc(700px + 40%)",y:800},pagination:!1,columns:t.columns,"data-source":t.items,rowKey:function(t,e){return e}},scopedSlots:t._u([{key:"name",fn:function(text){return e("div",{},[t._v(t._s(text))])}},{key:"action",fn:function(text,n){return e("span",{},[e("a",{attrs:{download:"",target:"_blank",href:n.fileUrl}},[t._v("Faylni ko'rish")])])}}])})],1)}),[],!1,null,null,null);e.default=component.exports}}]);