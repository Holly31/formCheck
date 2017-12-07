function formCheck() {
	massage = "请按正确格式将信息补充完整";
	errNum = 0;
}
formCheck.prototype = {
	getCode: function(ele) {
		var arr = function() {
			var arrcode = [];
			var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
			for(var i = 0; i < 4; i++) {
				arrcode.push(arr[Math.floor(Math.random() * 35)])
			}
			return arrcode;
		}
		var arr = arr();
		var render = function() {
			var img = '';
			arr.forEach(function(index, val) {
				img = img + '<p>' + index + '</p>';
			})
			$(ele).empty();
			$(img).appendTo($(ele))
			skew();
		};
		var skew = function() {
			var color = ['#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '00CC99', '#00CCCC', '#00CCFF', '00FF00', '#00FF33'];
			var degree = [40, -40, ]
			$(ele).find('p').each(function(i, obj) {
				var col = Math.floor(Math.random() * color.length)
				var skew = Math.floor(Math.random() * degree[Math.floor(Math.random() * degree.length)])
				$(obj).css({ 'color': color[col], 'transform': 'skewX(' + skew + 'deg)' })
			})
		};
		render();
	},
	isEmpty: function(ele, t) {
		var con = $(ele).val().replace(/(^\s+)|(\s+$)/g, ""),
			type = $(ele).attr('data-type'),
			$tips=$(ele).siblings('.tips').html(),
			self=this;
		if(t==2){
			var size=$(ele).find("input:checked").size();
			if(size==0){
				con="";
			}else{
				con="1";
			}
		}
		if(con.length == 0) {
			$(ele).parents('.row').addClass('active');
			if(t==2){
				$(ele).addClass('active');
			}
		} else {
			if(t == 1) {
				if(con == 0) {
					$(ele).parents('.row').addClass('active');
				} else {
					$(ele).parents('.row').removeClass('active');
				}
			}else {
				if(t==2){
					$(ele).removeClass('active');
				}else{
					if(type){
						self.isValid(ele);
					}else{
						$(ele).parents('.row').removeClass('active');
					}
				}
			}
		}
	},
	validCode: function() {
		var codeval = $('.yzm').val();
		var codestr = $('#getCode').text();
		if(codeval == codestr) {
			$('.yzm').parents('.row').removeClass('active');
		} else {
			$('.yzm').parents('.row').addClass('active');
			$('.yzm').siblings('.err').find('.err_text').text("验证码输入错误");
		}
	},
	isValid: function(ele) {
		var validateObj = {
			"name": {
				err: "姓名格式错误",
				reg: /^([\u4e00-\u9fa5]+|([a-z]+\s?)+)$/,
			},
			"phone": {
				err: "手机号码格式错误",
				reg: /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/,
			},
			"tel": {
				err: "电话号码格式错误",
				reg: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/
			},
			"numbers": {
				err: "输入格式有误",
				reg: /^[0-9]\d*$/,
			},
			"email": {
				err: "邮箱地址输入错误",
				reg: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
			},
			"passwords": {
				err: "密码，至少8位，需包含字母和数字",
				reg: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/,
			}
		};
		var type = $(ele).attr('data-type');
		var $require = $(ele).attr("required");
		var $err = validateObj[type].err,
			$reg = validateObj[type].reg,
			$tips=$(ele).siblings('.tips'),
			$tipText=$(ele).siblings('.tips').html(),
			con = $(ele).val().replace(/(^\s+)|(\s+$)/g, "");
		if(validateObj[type]) {
			if(!$require) {//非必填
				if(!$reg.test(con)) {
					if(con.length == 0) {
						$(ele).parents('.row').removeClass('active');
						$tips.remove();
						$('<span class="tips">'+$tipText+'</span>').insertAfter($(ele));
					} else {
						$(ele).parents('.row').addClass('active');
						$tips.remove();
						$('<span class="tips">'+$err+'</span>').insertAfter($(ele));
					}
				} else {
					$(ele).parents('.row').removeClass('active');
					$tips.html($tipText);
				}
			} else {//必填
				if(!$reg.test(con)) {
					$(ele).parents('.row').addClass('active');
					if(con.length==0){
						$tips.html($tipText);
					}else{
						$tips.html($err);
					}
				} else {
					$(ele).parents('.row').removeClass('active');
					$tips.html($tipText);
				}
			}
		}
	},
	submitForm: function(ele) {
		var self = this;
		var $must = $(ele).find('input[required]'); //输入框
		var $textarea=$(ele).find('textarea[required]');//多行文本框
		var $defaultSelect = $(ele).find('select[required]'); //下拉框
		var $choice=$(ele).find('.choice[required]');//
		var $dataType = $(ele).find('input[data-type]'); //输入格式
		$must.each(function(index, dom) {
			self.isEmpty(dom);
		})
		$textarea.each(function(index, dom) {
			self.isEmpty(dom);
		})
		$defaultSelect.each(function(i, dom) {
			self.isEmpty(dom, 1);
		})
		$dataType.each(function(i, dom) {
			self.isValid(dom);
		})
		$choice.each(function(i,dom){
			self.isEmpty(dom, 2);
		})
		if($('#getCode') && $('.yzm') && errNum == 0) {
			self.validCode();
		}
		errNum = $(ele).find('.active').length;
		if(errNum==0){
			return true;
		}else{
			alert(massage);
			return false;
		}
	},
	focusinfo: function(ele) {
		var ftips = $(ele).siblings('.tips');
		$(ele).parents('.row').removeClass('active');
		if(ftips) {
			ftips.hide();
		}
	},
	onblurinfo: function(ele) {
		var	ftype = $(ele).attr('data-type'),
			self = this;
		var ftips = $(ele).siblings('.tips');
		if(ftips) {
			ftips.show();
		}
		self.isEmpty(ele);
	},
}