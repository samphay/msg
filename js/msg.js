/**
 * CopyRight Samphay
 * 2017/03/06
 * msg.js
 * version : 1.0.0
 */
"use strict";
(function (exports) {
    /**
     * extend form jQuery
     * @returns {*|object}
     */
    function extend() {
        var src, copyIsArray, copy, name, options, clone,
            target = arguments[ 0 ] || {},
            i = 1,
            length = arguments.length,
            deep = false;
        if ( typeof target === "boolean" ) {
            deep = target;
            target = arguments[ i ] || {};
            i++;
        }
        if ( typeof target !== "object" && !typeof (target) == "function") {
            target = {};
        }
        if ( i === length ) {
            target = this;
            i--;
        }
        for ( ; i < length; i++ ) {
            if ( ( options = arguments[ i ] ) != null ) {
                for ( name in options ) {
                    if(options.hasOwnProperty(name)){
                        src = target[ name ];
                        copy = options[ name ];
                        if ( target === copy ) {
                            continue;
                        }
                        if ( deep && copy && ( typeof ( copy )=="object" ||
                            ( copyIsArray = Array.isArray( copy ) ) ) ) {
                            if ( copyIsArray ) {
                                copyIsArray = false;
                                clone = src && Array.isArray( src ) ? src : [];
                            } else {
                                clone = src && typeof ( src )=="object" ? src : {};
                            }
                            target[ name ] = extend( deep, clone, copy );
                        } else if ( copy !== undefined ) {
                            target[ name ] = copy;
                        }
                    }
                }
            }
        }
        return target;
    }
    /**
     * CreateElement
     * @param {[type]} tagName [description]
     */
    function CreateElement(tagName) {
        this.element = document.createElement(tagName.toUpperCase());
        return this;
    }
    
    /**
     * @type {Object}
     */
    CreateElement.prototype = {
        css : function (cssStyle) {
            var This = this;
            for(var i in cssStyle){
                if(cssStyle.hasOwnProperty(i)){
                    This.element.style[i] = cssStyle[i];
                }
            }
            return this;
        },
        attr : function (name, val) {
            if(!val){
                if(this.element.hasAttribute(name)){
                    return this.element.getAttribute(name)
                }else{
                    return null;
                }
            }else{
                this.element.setAttribute(name,val);
            }
            return this
        },
        append : function (nodeElement) {
            this.element.appendChild(nodeElement);
            return this;
        },
        remove : function (nodeElement) {
            this.element.removeChild(nodeElement);
            return this;
        },
        html : function (context) {
            this.element.innerHTML = context;
            return this;
        },
        hide : function () {
            this.element.style.display = "none";
            return this;
        },
        show : function () {
            this.element.style.display = "";
            return this;
        },
        on : function (eventType , callback) {
            var This = this;
            this.element.addEventListener(eventType,function (e) {
                callback.call(this,e,This);
            });
            return This;
        }
    };
    /**
     * Modal
     * @constructor
     */
    function Modal() {
        this.id = "Modal_Samphay_"+new Date()*1;
        this.confirmText = "确定";
        this.cancelText = "取消";
        var Template = new this.createElement("DIV");
        Template.element.className = "Modal_Samphay";
        var m = {
        	transition:"all .2s",
            // transitionTimingFunction:"ease-out-in",
            transitionTimingFunction:"cubic-bezier(0.68, -0.55, 0.27, 1.55)",
            WebkitTransition:"all .2s",
            // WebkitTransitionTimingFunction:"ease-out-in"
            WebkitTransitionTimingFunction:"cubic-bezier(0.68, -0.55, 0.27, 1.55)"
        };
        Template.css({
            position : "fixed",
            top : "0",
            left : "0",
            fontSize : "14px",
            width : "100%",
            height : "100%",
            backgroundColor : "rgba(0,0,0,0.2)",
            zIndex : "99"
        }).css(m).attr("id",this.id);
        var Box = new this.createElement("DIV");
        Box.css({
            position : "absolute",
            left : "50%",
            top : "50%",
            transform : "translate(-50%,-50%) scale(1)",
            WebkitTransform : "translate(-50%,-50%) scale(1)",
            width : "280px",
            maxWidth : "280px",
            height : "auto",
            borderRadius : "12px",
            WebkitBorderRadius : "12px",
            backgroundColor : "rgba(255,255,255,1)",
            padding : "16px 0 0",
            overflow : "hidden",
            opacity : "0.96"
        }).css(m);
        var head = new this.createElement("DIV").css({
            textAlign : "center",
            position : "relative",
            padding : "0 12px 12px",
            fontSize : "18px"
        }).css(m);
        Box.append(head.element);
        var content = new this.createElement("DIV").css({
            textAlign : "center",
            position : "relative",
            maxHeight : 0.8*window.innerHeight+"px",
            overflowY : "scroll",
            // overflowX : "hidden",
            overflowX : "scroll",
            fontWeight : "600",
            fontSize : "16px",
            // minHeight : "0.4rem",
            padding : "0 12px 16px"
        });
        Box.append(content.element);
        var footer = new this.createElement("DIV").css({
            fontSize : "0",
            textAlign : "center",
            position : "relative",
            borderTop : "1px solid #ccc"
        }).css(m);
        var btn_confirm = new this.createElement("DIV");
        var btn_cancel = new this.createElement("DIV");
        var btnCss = {
            display : "inline-block",
            fontSize : "16px",
            padding : "12px",
            boxSizing : "border-box",
            width : "50%",
            color: "#007aff"/*,*/
            /*transition:"all .2s",
            transitionTimingFunction:"ease-out",
            WebkitTransition:"all .2s",
            WebkitTransitionTimingFunction:"ease-out"*/
        };
        btn_cancel.html(this.cancelText).css(btnCss).css({
            // backgroundColor : "#d2d2d2",
            // color : "#666",
            borderRight : "1px solid #ccc"
        }).css(m).on("touchstart",function(e,el){
        	this.setAttribute("bg",this.style.backgroundColor);
    		el.css({
    			backgroundColor : "#f2f2f2"
    		});
        }).on("touchend",function(e,el){
			el.css({
    			backgroundColor : this.getAttribute("bg")
    		});
        });
        btn_confirm.html(this.confirmText).css(btnCss).css({
            fontWeight : "600"
            // backgroundColor : "#F44336",
            // color : "#fff"
        }).css(m).on("touchstart",function(e,el){
        	this.setAttribute("bg",this.style.backgroundColor);
    		el.css({
    			backgroundColor : "#f2f2f2"
    		});
        }).on("touchend",function(e,el){
			el.css({
    			backgroundColor : this.getAttribute("bg")
    		});
        });
        footer.append(btn_cancel.element);
        footer.append(btn_confirm.element);
        Box.append(footer.element);
        Template.append(Box.element);

        this.modal = Template.element;
        this.Template = Template;
        this.Box = Box;
        this.head = head;
        this.content = content;
        this.footer = footer;
        this.btn_confirm = btn_confirm;
        this.btn_cancel = btn_cancel;
    }

    /**
     *
     * @type {{init: Modal.init, open: Modal.open, close: Modal.close}}
     */
    Modal.prototype={
        createElement : CreateElement,
        init : function (option) {
            var opt = {
                head : null,
                context : "",
                btnCount : 2,
                confirm : null,
                cancel : null,
                confirmText : "确定",
                cancelText : "取消"
            };
            var Modal_Samphay_scrollbar = "Modal_Samphay_scrollbar";
            if(document.querySelectorAll("."+Modal_Samphay_scrollbar).length==0){
            	var header = document.getElementsByTagName("head")[0];
	            var style = new this.createElement("STYLE");
	            style.element.className = Modal_Samphay_scrollbar;
	            style.html(".Modal_Samphay ::-webkit-scrollbar{display:none;}");
            	header.appendChild(style.element);
            }
            opt = extend(opt,option);
            var Modal = this;
            if(!opt.head){
                Modal.head.hide();
            }else{
                Modal.head.html(opt.head);
            }
            Modal.content.html(opt.context);
            var btnCss = {
                width : (100/opt.btnCount)+"%"
            };
            if(opt.btnCount==1){
                Modal.btn_cancel.hide();
                Modal.btn_confirm.css({
                    backgroundColor : "#fff",
                    // color : "#333",
                    width : "100%"
                })
            }else if(opt.btnCount==0){
                Modal.footer.hide();
            }
            Modal.btn_cancel.css(btnCss).html(opt.cancelText).on("click",function () {
                typeof opt.cancel=="function"?
                    opt.cancel():function () {};
                Modal.close();
            });
            Modal.btn_confirm.css(btnCss).html(opt.confirmText).on("click",function () {
                typeof opt.confirm=="function"?
                    opt.confirm():function () {};
                Modal.close();
            });
            Modal.open();
        },
        transform : function () {
            var Model = this;
            var transform = Model.Box.element.style.transform.split(" ");
            var I = -1;
            var newTransform = [];
            transform.map(function (v, i) {
                if(v.indexOf("scale")>-1){
                    transform[i] = "scale(0)";
                    I = i;
                }
            });
            newTransform = extend(newTransform,transform);
            if(I>-1){
                newTransform[I] = "scale(1)";
            }else{
                transform.push("scale(0)");
                newTransform.push("scale(1)");
            }
            transform = transform.join(" ");
            newTransform = newTransform.join(" ");
            Model.Box.css({
                transform : transform,
                WebkitTransform : transform,
                opacity : 0
            });
            setTimeout(function () {
                Model.Box.css({
                    transform : newTransform,
                    WebkitTransform : newTransform,
                    opacity : 1
                });
            },10);
        },
        open : function () {
            window.document.body.appendChild(this.modal);
            this.transform();
        },
        close : function () {
            window.document.body.removeChild(
                window.document.getElementById(this.id)
            );

        }
    };
    /**
     *
     * @param context
     * @param callback
     * @private
     */
    function _alert(context, callback) {
        var msg = new Modal();
        msg.init({
            context : context,
            btnCount : 1,
            confirm : callback
        });
        return false;
    }

    /**
     *
     * @param option
     * @private
     */
    function _confirm(option) {
        var msg = new Modal();
        option = option || {};
        msg.init(option);
        return false;
    }

    /**
     *
     * @param context
     * @param time
     * @private
     */
    function _tips(context, time) {
        time = time || 1000;
        var msg = new Modal();
        msg.Box.css({
            width : "auto",
            top : "10%",
            transform : "translate(-50%,0)",
            WebkitTransform : "translate(-50%,0)",
            backgroundColor : "rgba(0,0,0,.6)",
            color : "#fff"
        });
        msg.init({
            context : context,
            btnCount : 0
        });
        /*msg.content.css({
            backgroundColor : "rgba(0,0,0,.4)",
            color : "#fff"
        });*/
        setTimeout(function () {
            msg.close();
        },time);
        return false;
    }
    
    exports.msg = {
        alert : _alert,
        tips : _tips,
        confirm : _confirm
    }
})(window);