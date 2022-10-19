function ajax(param){
	try{
	  if(param && typeof param=="object"){
		  //ajax过程
		  //1.创建ajax对象
		  var xmlHttp;
		  if(window.XMLHttpRequest){
			  //IE7+ 
			  xmlHttp=new XMLHttpRequest(); 
		   }else{
			   //IE6
			   xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
		    }
	     //2.设置请求方法和目标地址
		 xmlHttp.open(param.type,param.url);
		 //get方法带参数请求,数据附加到url后面
		 if(param.type=="GET" && param.data!=undefined){
			 xmlHttp.open(param.type,param.url+"?"+param.data);
	      }
		  //3.设置数据编码
		  switch(param.contentType){
			 case 'urlencoded':
			    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
				break;
			 case 'json':
			     xmlHttp.setRequestHeader("Content-type","application/json"); 
	            break;
		  }
		  //4.绑定onreadystatechange事件，监控ajax请求过程
		  xmlHttp.onreadystatechange=function(){
			   if(xmlHttp.readyState==4 && xmlHttp.status==200){
				    var data=xmlHttp.responseText;
					switch(param.dataType){
					  case "html":
					    param.success(data);
					    break;
					  case "json":
					   try{
						   var json=JSON.parse(data);
						   param.success(json);
						   }catch(e){
							   alert(e.message);
						   }
						 break;
					  case "xml":
					    var xmlData=xmlHttp.responseXML;
						param.success(xmlData);
						break;
					  default:
					      param.success(data);
			        }   
			    }  
	      }
		  //5.发送请求
		  //POST方法带参数请求
		  if(param.type=="POST" && param.data!=undefined){
			  xmlHttp.send(param.data);  
		   }else{
			  xmlHttp.send(); 
		   }
	  }else{
		 throw new Error("对象为空或不是对象");  
	  }	
	}catch(e){
		
    }
}