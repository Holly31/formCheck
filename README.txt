# formCheck
简单的表单验证js，对输入框，下拉框，单选框，复选框等非空校验及文本格式校验

数据格式校验(data-type)有6种:
1)name 名字
2)phone 手机
3)tel 电话
4)numbers 数字
5)email 邮箱
6)passwords 至少8位，需包含字母和数字的密码


html:
<form class="form form2 clearfix">
    				<div class="row">
    					<label>姓名：</label>
    					<input type="text" data-type="name" required />         <!--必填字段加required属性即可，data-type是输入文本格式校验-->
    					<span class="tips">姓名不能为空</span>                   <!--错误提示-->
    				</div>
    				<div class="row choice" required="required">
    					<label>性别：</label>
    					<label><input type="radio" name="sex" value="1"/>男</label>
    					<label><input type="radio" name="sex" value="2"/>女</label>
    					<span class="tips">请选择性别</span>
    				</div>
    				<div class="row">
    					<label>电话号码：</label>
    					<input type="text" data-type="tel" />
    				</div>
    				<div class="row">
    					<label>手机号码：</label>
    					<input type="text" data-type="phone" required />
    					<span class="tips">手机号不能为空</span>
    				</div>
    				<div class="row">
    					<label>邮箱：</label>
    					<input type="text" data-type="email" required />
    					<span class="tips">邮箱不能为空</span>
    				</div>
    				<div class="row">
    					<label>总价：</label>
    					<input type="text" data-type="numbers" required />
    					<span class="tips">总价不能为空</span>
    				</div>
    				<div class="row choice" required="required">
    					<label>兴趣爱好：</label>
    					<label><input type="checkbox" name="hobby" value="1">摄影</label>
    					<label><input type="checkbox" name="hobby" value="2">户外</label>
    					<label><input type="checkbox" name="hobby" value="3">健身</label>
    					<label><input type="checkbox" name="hobby" value="4">绘画</label>
    					<label><input type="checkbox" name="hobby" value="5">其它</label>
    					<span class="tips">请选择兴趣爱好</span>
    				</div>
    				<div class="row">
    					<label>类型：</label>
    					<select required>
    						<option value="">请选择</option>
    						<option value="1">普通用户</option>
    						<option value="2">会员</option>
    					</select>
    					<span class="tips">请选择类型</span>
    				</div>
    				<div class="row">
    					<label>备注：</label>
    					<textarea required>
    						
    					</textarea>
    					<span class="tips">必填项</span>
    				</div>
    				<div>
    					<input type="button" class="tijiao" value="提交" />
    				</div>
   </form>
   
   javascript:
   $(function(){
		var F=new formCheck();
		$('.tijiao').off().on('click',function(){
				var a=F.submitForm('.form2');
				console.log(a);
		})
	})
  如果需要有focusin及focusout效果，分别调用focusinfo(), onblurinfo()
  例：
  var F=new formCheck();
		$('.login').click(function(){
				var a=F.submitForm('.form1');
				console.log(a);
		})
		$('.form1 input').focusin(function(){
			F.focusinfo(this);
		})
		$('.form1 input').focusout(function(){
			F.onblurinfo(this);
		})
  
