function test_window() {
	const window: Titanium.UI.Window = Ti.UI.createWindow({
		title: 'Test',
		backgroundColor: 'white',
		borderRadius: 10
	});

	window.setBackgroundColor('blue');
	window.opacity = 0.92;

	const matrix = Ti.UI.create2DMatrix().scale(1.1, 1);
	window.transform = matrix;

	let label: Titanium.UI.Label;
	label = Ti.UI.createLabel({
		color: '#900',
		text: 'Simple label'
	});
	label.textAlign = Ti.UI.TEXT_ALIGNMENT_LEFT;
	label.setWidth(Ti.UI.SIZE);
	label.setHeight(Ti.UI.SIZE);
	window.add(label);
	window.open();
}

function test_tableview() {
	const data: Titanium.UI.TableViewRow[] = [];
	for (let i = 0; i < 10; i++) {
		const row = Ti.UI.createTableViewRow();
		const label = Ti.UI.createLabel({
			left: 10,
			text: 'Row ' + (i + 1)
		});
		const image = Ti.UI.createImageView({
			url: 'KS_nav_ui.png'
		});
		const button = Ti.UI.createButton({
			right: 10,
			height: 30,
			width: 80,
			title: 'Button example'
		});
		row.add(label);
		row.add(image);
		row.add(button);
		data.push(row);
	}
	const table = Ti.UI.createTableView({
		data,
		style: Ti.UI.iOS.TableViewStyle.PLAIN
	});
}

function test_fs() {
	let imageDir = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory + 'downloaded_images');
	if (!imageDir.exists()) {
		imageDir.createDirectory();
	}
	let data: Titanium.Blob; // tslint:disable-line:prefer-const
	let imageFile = Ti.Filesystem.getFile(imageDir.resolve() + 'image.jpg');
	if (!imageFile.write(data)) {
		Ti.UI.createAlertDialog({
			message: 'IO Error'
		}).show();
	}
	imageFile = null;
	imageDir = null;
}

function test_network() {
	const url = "http://www.appcelerator.com";
	const client = Ti.Network.createHTTPClient({
		// function called when the response data is available
		onload: (e: SuccessResponse) => {
			alert(this.responseText);
		},
		// function called when an error occurs, including a timeout
		onerror: (e: FailureResponse) => {
			alert(e.error);
		},
		timeout: 5000  // in milliseconds
	});
	// Prepare the connection.
	client.open('GET', url);
	// Send the request.
	client.send();
}

function test_map() {
	const win = Ti.UI.createWindow();
	const mountainView = Ti.Map.createAnnotation({
		animate: true,
		leftButton: '../images/appcelerator_small.png',
		myid: 1
	});
	mountainView.setLatitude(37.390749);
	mountainView.setLongitude(-122.081651);
	mountainView.setTitle('Appcelerator');
	mountainView.setSubtitle('Mountain View, CA');
	mountainView.setPincolor(Ti.Map.ANNOTATION_RED);

	const mapview = Ti.Map.createView({
		mapType: Ti.Map.STANDARD_TYPE,
		region: {
			latitude: 37.390749, longitude: -122.081651,
			latitudeDelta: 0.01, longitudeDelta: 0.01
		},
		animate: true,
	});
	mapview.regionFit = true;
	mapview.userLocation = true;
	mapview.annotations = [mountainView];
	mapview.addEventListener('click', event => {
		if (event.clicksource === 'leftButton' || event.clicksource === 'leftPane') {
			alert(event.title + ' left button clicked');
		}
	});
	win.add(mapview);
	win.open();
}
