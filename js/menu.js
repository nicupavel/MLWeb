var Menu = (function(Menu) { //Module start

	Menu.init = function()
	{
		var inputClusters = $('clusters');
		var selDistance = $('distance');
		var inputDelay = $('delay');
		var btnRun = $('btnRun');
		var btnNew = $('btnNew');
		var btnSave = $('btnSave');
		var btnLoad = $('btnLoad');

		btnRun.onclick = function()
		{
			var k = +inputClusters.value || 2;
			var dist = selDistance.options[selDistance.selectedIndex].text;
			var delay = +inputDelay.value || 1;

			app.classifier.clustersData.k = k;
			app.classifier.distance = Distance[dist] || Distance.euclidean;

			app.classifier.cluster(app.data.getAsArray(), delay, app.ui.drawClusters);
		}

		btnNew.onclick = function()
		{
			app.clear();
		}

		btnSave.onclick = function()
		{
			var d = new Date();
			var savename = "MLWeb Points Data " + d.toDateString() + "-" + d.toLocaleTimeString();
			console.log("Saving to file %s", savename);
			Menu.disksave(savename);
		}

		btnLoad.onclick = function()
		{
			console.log("Added load event");
			Menu.diskloadEvent(btnLoad, Menu.diskload)
		}
	}

	Menu.diskload = function()
	{
		console.log("Loading from file %s", $('diskloadfile').files[0]);
		if (!app.data.fromFile($('diskloadfile').files[0]))
		{
			console.log("Aborting data load");
		}

		$('diskloadfile').value = ""; //reset value so we can reload the same name savefile

	}

	Menu.disksave = function(savename)
	{

		$('savedata').download = savename;
		$('savedata').href = 'data:application/force-download,' + encodeURIComponent(app.data.toJSON());
		$('savedata').click();
	}

	Menu.diskloadEvent = function(div, func)
	{
		div.addEventListener("change", func, false);
	}

//------------------------ MODULE END ----------------------
return Menu; }(Menu || {})); //Module end