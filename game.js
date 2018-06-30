	var t=0;//变形标志
	var tt=0;//下一个变形标志
	var time;//下落定时器
	var time2;//快速下落定时器
	var timel;//快速左移定时器
	var timer;//快速右移定时器
	var speed = 500;//下落速度
	var n=0;//形状标志
	var tn=0;//下一个形状标志
	var ls;//当前形状数组
	var f = false;//开始标志
	var flagRun = false;//运行标志
	var temp1;//暂停时 临时存储当前形状数组
	//复制当前形状数组
	function arrayClone(array){ 
		var as=[]; 
		for(var i=0,l=array.length;i<l;i++) {
			var aa = array[i].slice(0);
			as.push(aa); 
		}	
		return as; 		
	} 
	//S形
	var s0 = new Array("-2,5","-2,6","-3,6","-3,7");
	var s1 = new Array("-1,7","-2,7","-2,6","-3,6");
	var ss = new Array(s0,s1,s0,s1,"s");
	//Z形
	var z0 = new Array("-1,5","-2,5","-2,6","-3,6");
	var z1 = new Array("-3,5","-3,6","-2,6","-2,7");
	var zs = new Array(z0,z1,z0,z1,"z");
	//反L形
	var ll0 = new Array("-3,5","-3,6","-2,6","-1,6");
	var ll1 = new Array("-3,4","-3,5","-3,6","-2,4");
	var ll2 = new Array("-3,5","-2,5","-1,5","-1,6");
	var ll3 = new Array("-2,4","-2,5","-2,6","-3,6");
	var lls = new Array(ll0,ll1,ll2,ll3,"ll");
	//L形
	var l0 = new Array("-3,5","-3,6","-2,5","-1,5");
	var l1 = new Array("-3,5","-2,5","-2,6","-2,7");
	var l2 = new Array("-1,5","-1,6","-2,6","-3,6");
	var l3 = new Array("-3,5","-3,6","-3,7","-2,7");
	var ls = new Array(l0,l1,l2,l3,"l");
	//一形
	var y0 = new Array("-2,4","-2,5","-2,6","-2,7");
	var y1 = new Array("-4,6","-3,6","-2,6","-1,6");
	var ys = new Array(y0,y1,y0,y1,"y");
	//T形
	var t0 = new Array("-2,5","-2,6","-2,7","-1,6");
	var t1 = new Array("-3,6","-2,6","-2,7","-1,6");
	var t2 = new Array("-3,6","-2,5","-2,6","-2,7");
	var t3 = new Array("-3,6","-2,6","-2,5","-1,6");
	var ts = new Array(t0,t1,t2,t3,"t");
	//田形
	var tt0 = new Array("-2,5","-2,6","-1,5","-1,6");
	var tts = new Array(tt0,tt0,tt0,tt0,"tt");
	//点形
	var d0 = new Array("-2,6","-2,6","-2,6","-2,6");
	var ds = new Array(d0,d0,d0,d0,"d");
	var arrays = new Array();
	arrays[0]=ts;arrays[1]=tts;arrays[2]=ys;arrays[3]=ls;arrays[4]=zs;arrays[5]=ss;arrays[6]=lls;arrays[7]=ds;
	//消除函数
	function del(){
		var count = 0;
		for(var i=0;i<20;i++){
			var l = $("#tb tr").eq(i).children("td[class='hid']").size();
			if(l==0){
				count++;
				$("#tb tr").eq(i).remove();
				//console.log($("#tb tr").eq(i));
				$("#tb").prepend("<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
				$("#tb tr:first td").attr("class","hid");
				$("#score").text($("#score").text()-0+10);
				cgcl();
			}
		}
		var score = $("#score").text()-0;
		var level = $("#level");
		var score2=0;
		for(var i=1;i<=count;i++){
			if(score2==0) score2=1;
			score2=score2*i;
		}
		score +=score2;
		$("#score").text(score);
		if(score>=0 && score<100){
			speed=500;
			level.text(1);
			level.css("color","#1111ff");
			$("#score").css("color","#1111ff");
			$("#gametime").css("color","1111ff");
		}
		else if(score>=100 && score<200){
			speed=350;
			level.text(2);
			level.css("color","#11ff11");
			$("#score").css("color","#11ff11");
			$("#gametime").css("color","#11ff11");
		}
		else if(score>=200 && score<300){
			speed=250;
			level.text(3);
			level.css("color","#FF8800");
			$("#score").css("color","#FF8800");
			$("#gametime").css("color","#FF8800");
		}
		else if(score>=300 && score<400){
			speed=150;
			level.text(4);
			level.css("color","#FF5555");
			$("#score").css("color","#FF5555");
			$("#gametime").css("color","#FF5555");
		}else{
			speed=100;
			level.text(5);
			level.css("color","#FF0000");
			$("#score").css("color","#FF0000");
			$("#gametime").css("color","#FF0000");
		}
		//游戏结束
		if( $("#tb tr:first").children("td[class='hid']").size()!=13){
			clearTimeout(time);
			ls = null;
				f=false;
				flagRun=false;
				$("#g_o").css("display","block");
		}
	}
	//开始下落函数
	function beginDown(){
		time = setTimeout("beginDown();",speed);
		down();
	}
	//左移
	function quickLeft(){
		left();
		timel = setTimeout("left()",100);
	}
	function left(){
		f2(ls[t]);
		var temp = arrayClone(ls);
		//判断
		for(var i=0;i<4;i++){
			for(var j=0;j<temp[i].length;j++){
				var s = temp[i][j];
				var ss = s.split(",");
				s = ss[0]+","+(ss[1]-0-1);
				temp[i][j]=s;
			}
		}
		if(check(temp[t])==true){
			ls = temp;
		}
		f1(ls[t],ls[4]);
	}
	//右移
	function quickRight(){
		right();
		timer = setTimeout("right()",100);
	}
	function right(){
		f2(ls[t]);
		//判断
		for(var i=0;i<4;i++){
			for(var j=0;j<ls[i].length;j++){
				var s = ls[i][j];
				var ss = s.split(",");
				s = ss[0]+","+(ss[1]-0+1);
				ls[i][j]=s;
			}
		}
		if(check(ls[t])==false){
			for(var i=0;i<4;i++){
				for(var j=0;j<ls[i].length;j++){
					var s = ls[i][j];
					var ss = s.split(",");
					s = ss[0]+","+(ss[1]-0-1);
					ls[i][j]=s;
				}
			}
		}
		f1(ls[t],ls[4]);
	}
	//下落
	function down(){
			if(!f){
			   return false;}
			else{
			f2(ls[t]);
			for(var j=0;j<ls[t].length;j++){
				var b = ls[t][j];
				var bb = b.split(",");
				if(bb[0]-0==19){
					f1(ls[t],ls[4]);
					n = tn;
					ls =arrayClone(arrays[n]);
					console.log(ls);
					tn = Math.floor(Math.random()%0.8*10);
					t=tt;
					tt=Math.floor(Math.random()%0.4*10);
					showNext(arrayClone(arrays[tn]),arrayClone(arrays[tn])[4]);
					del();
					return false;
				}
				var p = bb[0]-0+1;
				if(p<0)
					p=0;
				var td = $("#tb tr").eq(p).children("td").eq(bb[1]);
				if(td.attr("class")!="hid"){
					f1(ls[t],ls[4]);
					n = tn;
					ls =arrayClone(arrays[n]);
					tn = Math.floor(Math.random()%0.8*10);
					console.log(ls);
					t=tt;
					tt=Math.floor(Math.random()%0.4*10);
					showNext(arrayClone(arrays[tn]),arrayClone(arrays[tn])[4]);
					del();
					return false;
				}
			}
			for(var i=0;i<4;i++){
				for(var j=0;j<ls[i].length;j++){
					var s = ls[i][j];
					var ss = s.split(",");
					s = ss[0]-0+1+","+ss[1];
					ls[i][j]=s;
				}
			}
			f1(ls[t],ls[4]);
			return true;
			}
	}
	function quickDown(){
		down();
		time2 = setTimeout("quickDown",100);
	}
	//判断
	function check(l){
		for(var i=0;i<l.length;i++){
			var a = l[i].split(",")
			if(a[0]>=20 || a[1]<0 || a[1]>=13)
				return false;
			var n = a[0]-0;
			if(n<0)
				continue;
			var td = $("#tb tr").eq(n).children("td").eq(a[1]);
			if(td.attr("class")!="hid"){
				return false;
			}
		}
		return true;
	}
	//显示下一个方块
	function showNext(l,color){
		for(var i=0;i<4;i++){
			var a = l[tt][i].split(",");
			var td = $("#tb2 td");
			td.attr("class","hid");
		}
		for(var i=0;i<4;i++){
			var a = l[tt][i].split(",");
			var td = $("#tb2 tr").eq(a[0]-0+4).children("td").eq(a[1]-0-4);
			td.attr("class",color);
		}
	}
	//显示方块
	function f1(l,color){
		for(var i=0;i<4;i++){
			var a = l[i].split(",");
			if(a[0]-0<0)
				continue;
			var td = $("#tb tr").eq(a[0]).children("td").eq(a[1]);
			td.attr("class",color);
			cgcl();
		}
	}
	//取消方块的显示
	function f2(l){
		for(var i=0;i<4;i++){
			var a = l[i].split(",");
			if(a[0]-0<0)
				continue;
			var td = $("#tb tr").eq(a[0]).children("td").eq(a[1]);
			td.attr("class","hid");
			cgcl();
		}
	}
	function cgcl(){
		var c = $("table:first").css("background-color");
		if(c=="rgb(34, 34, 34)"){
			$("table:first td[class='hid']").css("border","1px solid #222");
			$("table:first td[class!='hid']").css("border","1px solid #aaa");
		}else{
			$("table:first td[class='hid']").css("border","1px solid #fff");
			$("table:first td[class!='hid']").css("border","1px solid #aaa");
		}
	}
	//注册事件
	$(document).ready(function(){
		$("#changeColor").click(
			function(){
				var c = $("table:first").css("background-color");
				if(c=="rgb(34, 34, 34)"){
					$("table:first").css("background-color","#fff");
					$("table:first td[class='hid']").css("border","1px solid #fff");
					$(this).blur();
				}else{
					$("table:first").css("background-color","#222");
					$("table:first td[class='hid']").css("border","1px solid #222");
					$(this).blur();
				}
			}
		);
		//生成表格
		var s= "";
		for(var i = 0;i<20;i++){	
			s+="<tr>"
			for(var j = 0 ;j <13;j++){
				s+="<td></td>";
			}
			s+="</tr>"
		}
		$("#tb").append(s);
		$("td").attr("class","hid");
		//按键按下
		$("body").keydown(function(e){
			//下键
			if(e.keyCode==40 || e.keyCode==83){
				quickDown();
			}
			//左键
			if(e.keyCode==37 || e.keyCode==65){
				quickLeft();
			}
			//右键
			if(e.keyCode==39 || e.keyCode==68){
				quickRight();
			}
		});		
		//按键抬起
		$("body").keyup(function(e){
			//变形
			if(e.keyCode==38 || e.keyCode==87){
				f2(ls[t]);
				//判断
				t+=1;
				if(t==4)
					t=0;
				if(check(ls[t])==false){
					if(t==0)
						t=3;
					else
						t-=1;
					f1(ls[t],ls[4]);
					return false;
				}
				f1(ls[t],ls[4]);
			}
			//Enter 开始游戏
			if(e.keyCode==13){
				if(!f){
					$("#g_o").css("display","none");
					$("td").attr("class","hid");
					cgcl();
					n = Math.floor(Math.random()%0.8*10);
					ls = arrayClone(arrays[n]);
					t=Math.floor(Math.random()%0.4*10);
					speed=500;
					$("#score").text("0");
					$("#level").text("0");
					$("#gametime").text("0");
					f=true;
					flagRun=true;
					beginDown();
				}else if(flagRun){
					temp1 = ls;
					ls=null;
					clearTimeout(time);
					flagRun=false;
					$("#d_p").css("display","block");
				}else if(!flagRun){
					ls = temp1;
					flagRun=true;
					$("#d_p").css("display","none");
					beginDown();
				}
			}
			//左
			if(e.keyCode==37 || e.keyCode==65){
				clearTimeout(timel);
			}
			//下
			if(e.keyCode==40 || e.keyCode==83){
				clearTimeout(time2);
			}
			//右
			if(e.keyCode==39 || e.keyCode==68){
				clearTimeout(timer);
			}
			//速下
			//alert(e.keyCode);
			if(e.keyCode==32){
				while(down());
			}
		});
	});
	var num=0;
    var gt = setInterval(function(){
		if(!f){
			num=0;
		}
		else if(!flagRun){
			num=num;
		}
		else{
        num++;  
        var gametime = document.getElementById("gametime");  
        gametime.innerText = num;   
		}		
    },1000);