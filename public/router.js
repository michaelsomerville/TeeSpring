var Router = Backbone.Router.extend({
	routes: {
		"":"home",
		"login":"login",
		"getCampaigns":"getCampaigns"
	},
	start: function() {
		Backbone.history.start({pushState:true});
	},
	home: function() {
		var loginView = new LoginView({model: loginModel});
		loginView.render();
		$(".container").append(loginView.el);
	}, 
	login: function(event) {
		event.preventDefault();
	},
	getCampaigns: function() {
		dashboardList.fetch();
		//var dashboardListView = new DashboardListView({collection: dashboardList});-
		console.log(JSON.stringify(dashboardList));
		dashboardListView.render();
		$('.container').html(dashboardListView.el);
	}
});

var app = new Router();
app.start();