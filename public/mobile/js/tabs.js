function tabs(id, current, eveName) {
	this.oWrap = $(id);
	//默认显示第几个
	this.current = current;
	//触发的事件类型
	this.eveName = eveName;
	this.oTitle = this.oWrap.find(".tab-title > li");
	this.oContent = this.oWrap.find(".tab-content > li");
	console.log(this.oTitle);
	//自动初始化
	this.init();
}
tabs.prototype = {
	constructor: tabs,
	setActive: function(x) {
		//移除所有的active

		this.oTitle.removeClass("active");
		this.oTitle.eq(x).addClass("active");
	},
	showContent: function(x) {
		//隐藏所有的content
		this.oContent.css("display", "none");
		this.oContent.eq(x).css("display", "block");
		for(var i = 0; i < this.oContent.length; i++) {
			this.oContent[i].style.display = "none";
		}
		this.oContent[x].style.display = "block";
	},
	init: function() {
		//转存this
		var self = this;
		//绑定事件
		this.oTitle.each(function(i) {
			$(this).attr("index", i)
			if(self.eveName == "hover") {
				$(this).mouseover(function() {
					self.setActive($(this).attr("index"));
					self.showContent($(this).attr("index"));
				})
			} else {
				$(this).on(self.eveName, function() {
					self.setActive($(this).attr("index"));
					self.showContent($(this).attr("index"));
				});
			}
		})

		//默认显示选项卡
		if(self.current) {
			self.setActive(self.current);
			self.showContent(self.current);
		}
	}
}