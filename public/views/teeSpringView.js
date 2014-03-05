var LoginView = Backbone.View.extend({
	url: 'http://localhost:3000/login',
	template:_.template('<form class="form-signin">'+
						'<h2 class="form-signin-heading">Please sign in</h2>'+
						'<input type="text" id="email" class="form-control" placeholder="Email address" required="" autofocus="">'+
						'<input type="password" id="password" class="form-control" placeholder="Password" required="">'+
						'<button id="loginBtn" href="#login" class="btn btn-lg btn-primary btn-block" >Sign in</button>'+
						'</form>'),
	events: {
		submit:"login"
	},
	initialize: function() {
		this.model.on('change', this.render, this);	
		this.model.on('destroy', this.destroy, this);
	},
	render: function() {
		var attributes = this.model.toJSON();
		this.$el.html(this.template(attributes));
	},
	login: function(e) {
		e.preventDefault();
	  this.model.set({
		"email": $('#email').val(),
		"password": $('#password').val()
	  });
	  this.model.save({},{
	  	success: function(model, response, options){
	  		Backbone.history.navigate('getCampaigns', {trigger: true});
	  	}
	  });
	  
	}
});

var DashboardView = Backbone.View.extend({
	template:_.template('<div>'+
						'<h3><%= campaignName %></h3>'+
						'<span><%= orderedAndGoal %>, </span>'+
						'<span><%= status %>, </span>'+
						'<span><%= endDate %>, </span>'+
						'</div>'),
	initialize: function() {
		//this.model.on('change', this.render, this);	
	},
	render: function() {
		console.log('what happens here')
		var attributes = this.model.toJSON();
		this.$el.html(this.template(attributes));
		//this.$el.appendTo('.container');
		return this;
	},
});
var dashboardView = new DashboardView({model: dashboardModel});

var DashboardListView = Backbone.View.extend({
	initialize: function() {
		this.collection.on('add', this.addOne, this);
		this.collection.on('reset', this.addAll, this);
	},
	addOne: function(item) {
		var dashboardViewItem = new DashboardView({model: item});
		dashboardViewItem.render();
		this.$el.append(dashboardViewItem.el);
		//this.$el.appendTo('.container');
	},
	addAll: function() {
		this.collection.forEach(this.addOne, this);
	},
	render: function() {
		this.addAll();
	}
});

var dashboardListView = new DashboardListView({collection: dashboardList});