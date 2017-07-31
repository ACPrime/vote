function TipBox(cfg){  
    this.config = {   
        width          : 250,      
        height         : 170,                 
        str            : '正在处理',       
        windowDom      : window,   
        setTime        : 0,     
        hasMask        : true,    
        hasMaskWhite   : false,   
        clickDomCancel : false,    
        callBack       : null, 
        hasBtn         : false, 
        type           : 'success'  
    }  
    $.extend(this.config,cfg);    
    
    //存在就retrun  
    if(TipBox.prototype.boundingBox) return;  
      
    //初始化  
    this.render(this.config.type);    
    return this;   
};  
  
//外层box  
TipBox.prototype.boundingBox = null;  
  
//渲染  
TipBox.prototype.render = function(tipType,container){    
    this.renderUI(tipType);   
      
    //绑定事件  
    this.bindUI();   
      
    //初始化UI  
    this.syncUI();   
    $(container || this.config.windowDom.document.body).append(TipBox.prototype.boundingBox);     
};  
  
//渲染UI  
TipBox.prototype.renderUI = function(tipType){   
    TipBox.prototype.boundingBox = $("<div id='animationTipBox'></div>");         
    tipType == 'load'    && this.loadRenderUI();  
    TipBox.prototype.boundingBox.appendTo(this.config.windowDom.document.body);  
                  
    //是否显示遮罩  
    if(this.config.hasMask){  
        this.config.hasMaskWhite ? this._mask = $("<div class='mask_white'></div>") : this._mask = $("<div class='mask'></div>");  
        this._mask.appendTo(this.config.windowDom.document.body);  
    }     
    //定时消失  
    _this = this;  
    !this.config.setTime && typeof this.config.callBack === "function" && (this.config.setTime = 1);      
    this.config.setTime && setTimeout( function(){ _this.close(); }, _this.config.setTime );  
};  
  
TipBox.prototype.bindUI = function(){  
    _this = this;             
      
    //点击空白立即取消  
    this.config.clickDomCancel && this._mask && this._mask.click(function(){_this.close();});                        
};  
TipBox.prototype.syncUI = function(){             
    TipBox.prototype.boundingBox.css({  
        width       : this.config.width+'px',  
        height      : this.config.height+'px',  
        marginLeft  : "-"+(this.config.width/2)+'px',  
        marginTop   : "-"+(this.config.height/2)+'px'  
    });   
};  

//加载动画load UI  
TipBox.prototype.loadRenderUI = function(){  
    var load = "<div class='load'>";  
        load += "<div class='icon_box'>";  
    for(var i = 1; i < 4; i++ ){  
        load += "<div class='cirBox"+i+"'>";  
        load +=     "<div class='cir1'></div>";  
        load +=     "<div class='cir2'></div>";  
        load +=     "<div class='cir3'></div>";  
        load +=     "<div class='cir4'></div>";  
        load += "</div>";  
    }  
    load += "</div>";  
    load += "</div>";  
    load += "<div class='dec_txt'>"+this.config.str+"</div>";  
    TipBox.prototype.boundingBox.append(load);  
};  
  
//关闭  
TipBox.prototype.close = function(){      
    TipBox.prototype.destroy();  
    this.destroy();  
    this.config.setTime && typeof this.config.callBack === "function" && this.config.callBack();                  
};  
  
//销毁  
TipBox.prototype.destroy = function(){  
    this._mask && this._mask.remove();  
    TipBox.prototype.boundingBox && TipBox.prototype.boundingBox.remove();   
    TipBox.prototype.boundingBox = null;  
};  