var DashboardView = Backbone.View.extend({
	template:_.template('<div>'+
						'<h3><%= campaignName %></h3>'+
						'<span><%= orderedAndGoal %>, </span>'+
						'<span><%= status %>, </span>'+
						'<span><%= endDate %>, </span>'+
						'</div>'),
	initialize: function() {
		this.model.on('change', this.render, this);	
	},
	render: function() {
		console.log('what happens here')
		var attributes = this.model.toJSON();
		this.$el.html(this.template(attributes));
	},
});
var dashboardView = new DashboardView({model: dashboardModel});
dashboardView.render();
$(".container").append(dashboardView.el);