var app = new App();

function App()
{
	this.data = null;
	this.ui = null;
	this.classifier = null;

	this.init = function()
	{
		this.data = new PointData();
		this.classifier = new KMeans(4, Distance.euclidean);
		this.ui = new UI(this.classifier);
	}

	this.clear = function()
	{
		this.data = new PointData();
		this.classifier.clear();
		this.ui.clear();
	}

	this.refresh = function()
	{
		this.classifier.clear();
		this.ui.clear();
		this.ui.drawPoints(this.data.getAsArray());
	}
}

window.addEventListener("load", function() { app.init() });