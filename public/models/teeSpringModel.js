var LoginModel = Backbone.Model.extend({
	url:'/login',
	
	defaults: {
		email:"",
		password:""
	},
	parse: function(resp) {
		console.log('Model: Got the response back');
		return resp;
	},
	/*login: function() {
		console.log('Model: Login function:'+JSON.stringify(this));
		this.save();
			/*{}, {
				success: function(resp) {
					console.log(JSON.stringify(resp));
					var dashboards = [
						{campaignName:"Whats up",status:"Married", orderPlace:"Lko"},
						{campaignName:"Howdy ho!",status:"Single", orderPlace:"HTD"}
					];
					dashboardList.reset(resp);
					//dashboardModel.set(resp.get("0"));
					//window.location = 'templates/dashboard.html'
				},
				error: function(error) {
					console.log('error: '+JSON.stringify(error));
				}
			});
	},*/
	redirect: function() {
		console.log('inside redirect method');
	}
});
var loginModel = new LoginModel();

var DashboardModel = Backbone.Model.extend({
	defaults: {
		campaignName:"",
		orderedAndGoal:"",
		status:"",
		endDate:"",
		orderPlace:"",
	},
	parse: function(resp) {
		console.log('Model: Got the response back');
		return resp;
	}
});
var dashboardModel = new DashboardModel();


var DashboardList = Backbone.Collection.extend({
	url:'/getCampaigns',
	model: DashboardModel
});
var dashboardList = new DashboardList();