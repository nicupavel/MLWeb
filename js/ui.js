function UI(classifier)
{
	var layer = null;
	var context = null;
	var dotSize = 3;
	var markerSize = 8;

	createCanvas();
	sizeCanvas();
	positionCanvas();
	Menu.init();

	layer.addEventListener("mousedown", handleMouseClick, false);
	toggleRightClick(false);

	this.drawMarkers = function(points) { return drawMarkers(points); }
	this.drawClusters = function(clustersData) { return drawClusters(clustersData); }
	this.drawPoints = function(points) { return drawPoints(points); }
	this.clear = function() { context.clearRect(0, 0, layer.width, layer.height); }

	function createCanvas()
	{
		if ((layer = $('draw')) === null)
			layer = addTag('main', 'canvas');

		layer.id = "draw";
		context = layer.getContext("2d");
	}

	function sizeCanvas()
	{
		var w = window.innerWidth;
		var h = window.innerHeight;

		layer.width = w;
		layer.height = h;
		layer.style.cssText = "";
		layer.style.width = w;
		layer.style.height = h;
	}

	function positionCanvas()
	{
		layer.style.cssText += 'z-index: 0; position:absolute; left: 0px; top: 0px;';
		layer.tabIndex = 1;
		layer.focus();
	}

	function handleMouseClick(e)
	{
		c = getMouseInfo(e);

		app.data.add(c);
		drawCircle(c.x, c.y, dotSize, null);
	}

	function getMouseInfo(e)
	{
		var mx, my, rclick;
		var vp = $('main');
		if (e.which) rclick = (e.which == 3);
		else if (e.button) rclick = (e.button == 2);

		mx = e.pageX - layer.offsetLeft;// - vp.clientLeft - vp.offsetLeft + vp.scrollLeft;
		my = e.pageY - layer.offsetTop;// - vp.clientTop - vp.offsetTop + vp.scrollTop;

		return {x: +mx, y: +my, rclick: rclick };
	}

	function drawCircle(x, y, radius, fillColor)
	{
		context.beginPath();
		context.arc(x, y, radius, 0, 2 * Math.PI);
		if (typeof fillColor !== "undefined" && fillColor !== null)
		{
			context.fillStyle = fillColor;
			context.fill();
		}
		context.stroke();
	}

	function drawPoints(points)
	{
		for (var i = 0; i < points.length; i++)
			drawCircle(points[i][0], points[i][1], dotSize);
	}

	function drawClusters(clustersData)
	{
		console.log("Drawing clusters %o", clustersData);
		context.clearRect(0, 0, layer.width, layer.height);

		drawPoints(app.data.getAsArray());
		drawMarkers(clustersData.centers);

		for (var i = 0; i < clustersData.k; i++)
		{
			var cluster =  clustersData.clusters[i];

			if (! cluster)
				continue;

			var color = clustersData.colors[i];
			var colorStr = "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")";

			var cx = clustersData.centers[i][0];
			var cy = clustersData.centers[i][1];

			for (var j = 0; j < cluster.length; j++)
			{
				var x = cluster[j][0];
				var y = cluster[j][1];

				context.beginPath();
				context.moveTo(cx, cy);
				context.lineTo(x, y);
				context.strokeStyle = colorStr;
				context.stroke();

				drawCircle(x, y, dotSize, colorStr);
			}
		}
	}

	function drawMarkers(points)
	{
		for (var i = 0; i < points.length; i++)
			drawMarker(points[i][0], points[i][1]);
	}

	function drawMarker(x, y)
	{
		context.beginPath();
		context.rect(x - markerSize/2, y - markerSize/2, markerSize, markerSize);
		context.fillStyle = "red";
		context.fill();
		context.stroke();
	}
}
