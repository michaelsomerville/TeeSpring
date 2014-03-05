var DashboardModel = Backbone.Model.extend({
	defaults: {
		campaignName:"",
		orderedAndGoal:"",
		status:"",
		endDate:"",
		orderPlace:"",
		tShirtOrdered:"",
		tippingPoint:"",
		getPaid:""
	},
	parse: function(resp) {
		console.log('Model: Got the response back');
		return resp;
	}
});
var dashboardModel = new DashboardModel();