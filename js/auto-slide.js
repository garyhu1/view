//封装轮播图
function AutoSlide (){}
AutoSlide.prototype = {
	bigbox: null,//最外层的父容器
	boxul: null,//内部存放图片和数字的容器
	imglist: null,//图片集合
	numlist: null,//数字集合
	curnum: "",//数字当前的样式，默认没有
	prov: 0,//上一张显示的图片
	index: 0,//当前要显示的图片
	timer: null,//控制图片的转换
	play: null,//控制自动转换
	imgurl: [],//图片资源
	count: 0,
	//找到对应的节点或者创建新节点
	$: function(id) {
		if(typeof(id) == 'string'){
			if(id.indexOf("#")>=0){
				id = id.replace("#","");
				if(document.getElementById(id)){
					return document.getElementById(id);
				}else{
					alert('没有该容器');
					return null;
				}
			}else{
				return document.createElement(id);
			}
		}else{
			return id;
		}
	},
	//用于初始化
	info: function(id,current,numClass,imgClass,urllist) {
		if(!typeof(current)=='string'||!typeof(numClass)=='string'||!typeof(imgClass)=='string'){
			alert('请检查你的class名');
			return null;
		}
		
		if(!numClass.indexOf('.')||!imgClass.indexOf('.')){
			alert('请检查你的class名');
			return null;
		}
		this.count = this.count<=5?this.count:5;
		this.curnum = current;
		this.imgurl = urllist;
		this.bigbox = this.$(id);
		for(var i = 0;i < 2;i++){
			var ul = this.$('ul');
			for(var j = 0;j < this.count;j++){
				var li = this.$('li');
				li.innerHTML = i==0?imgurl[j]:(j+1);
				ul.appendChild(li);
			}
			this.bigbox.appendChild(ul);
		}
		this.boxul = this.bigbox.getElementsByTagName('ul');
		this.boxul[0].className = imgClass;
		this.boxul[1].className = numClass;
		this.imglist = this.boxul[0].getElementsByTagName('li');
		this.numlist = this.boxul[1].getElementsByTagName('li');
		for(var k = 0;k < imglist.length;k++){
			this.alpha(k,0);
		}
		this.alpha(0,100);
		this.numlist[0].className = current;
	},
	//设置图片的透明度
	alpha: function (a,b){
		this.imglist[a].style.opacity = b/100;
		this.imglist[a].style.filter = "alpha(opacity="+b+")";
	},
	//方法执行入口
	action: function() {
		this.autoplay();
		this.mouseoverandout(this.bigbox,this.numlist);
	},
	//自动播放
	autoplay: function() {
		var that = this;
		this.play = setInterval(function() {
			that.prov = that.index;
			that.index++;
			if(that.index>that.imglist.length-1){
				that.index = 0;
			}
			taht.imgshow(that.index,that.numlist,that.imglist);
		},2000);
	},
	//鼠标移动到区域内的事件
	mouseoverandout: function(box,numlist) {
		var that = this;
		box.onmouseover = function() {
			clearInterval(that.play);
		}
		box.onmouseout = function() {
			that.autoplay();
		}
		
		for(var i = 0;i < numlist.length;i++){
			numlist[i].index = i;
			numlist[i].onmouseover = function() {
				that.prov = that.index;
				that.imgshow(this.index,that.numlist,that.imglist);
			}
		}
	},
	//图片转换的方法
	imgshow: function(ind,numlist,imglist) {
		this.index = ind;
		var pro = 100;
		var cur = 0;
		//清空样式
		for(var i = 0;i < numlist.length;i++){
			numlist[i].className = "";
			this.alpha(i,0);
		}
		numlist[this.index].className = this.curnum;\
		this.alpha(this.prov,100);
		clearInterval(this.timer);
		
		var that = this;
		this.timer = setInterval(function() {
			pro -=2;
			cur +=2;
			if(pro<0){pro = 0;}
			if(cur>100){cur = 100;}
			that.alpha(that.prov,pro);
			that.alpha(that.index,cur);
			if(pro==0&&cur==100){
				clearInterval(that.timer);
			}
		},20);
	}
}
