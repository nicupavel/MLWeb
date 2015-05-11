
//Hash by x,y to make it easier to find a point for remove operations
function PointData()
{
	this.points = {};
}

PointData.prototype.add = function(p)
{

	if (typeof this.points[p.x] === "undefined")
		this.points[p.x] = {}

	this.points[p.x][p.y] = true;
}

PointData.prototype.getAsArray = function()
{
	var a = [];
	for (x in this.points)
		for (y in this.points[x])
			a.push([+x, +y]);

	return a;
}

PointData.prototype.toJSON = function() {
	return JSON.stringify(this.points);
}

PointData.prototype.fromJSON = function(json) {
	this.points = JSON.parse(json);
	return this;
}

PointData.prototype.fromFile = function(fileHandle)
{
	var fr = new FileReader();
	var self = this;

	fr.onloadend = function()
	{
		if (!this.result)
		{
			console.log("Cannot read file %s", fileHandle.name);
			return false;
		}
		self.points = JSON.parse(this.result);
		app.refresh();
	}
	fr.readAsText(fileHandle);

	return true;
}