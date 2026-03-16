const expeditionsData = [
	{
		user_id: 1,
		shape_id: 2,
		coordinates: "LINESTRING(-73.98 40.74, -73.99 40.75, -74.00 40.76)",
		timestamp: new Date(1701254364220),
		duration: 1240,
		accuracy: 87,
	},
	{
		user_id: 2,
		shape_id: 1,
		coordinates:
			"LINESTRING(51.47261 0.08686, 51.47265 0.08688, 51.47263 0.08687, 51.47260 0.08690, 51.47257 0.08690)",
		timestamp: new Date(1698765980000),
		duration: 540,
		accuracy: 73,
	},
	{
		user_id: 3,
		shape_id: 3,
		coordinates:
			"LINESTRING(-35.67526 153.00644, -35.67522 153.00775, -35.67808 153.00543, -35.67642 153.00594, -35.67572 153.00765, -35.67491 153.00725)",
		timestamp: new Date(1700342892000),
		duration: 3200,
		accuracy: 61,
	},
	{
		user_id: 4,
		shape_id: 4,
		coordinates:
			"LINESTRING(-15.21200 24.15731, -15.20971 24.15482, -15.20801 24.15495, -15.20580 24.15652, -15.20821 24.15627)",
		timestamp: new Date(1695472392000),
		duration: 780,
		accuracy: 55,
	},
	{
		user_id: 5,
		shape_id: 1,
		coordinates:
			"LINESTRING(9.54596 -13.27013, 9.54818 -13.26841, 9.54866 -13.27130, 9.54613 -13.26945, 9.54870 -13.27197)",
		timestamp: new Date(1702309396723),
		duration: 4100,
		accuracy: 90,
	},
	{
		user_id: 1,
		shape_id: 3,
		coordinates:
			"LINESTRING(-28.42031 -5.20763, -28.42130 -5.20684, -28.42204 -5.20722, -28.42347 -5.20997, -28.41971 -5.20647)",
		timestamp: new Date(1699472892000),
		duration: 620,
		accuracy: 48,
	},
	{
		user_id: 2,
		shape_id: 2,
		coordinates:
			"LINESTRING(-45.06329 27.94783, -45.06462 27.94567, -45.06377 27.94543, -45.06139 27.94319, -45.05928 27.94524)",
		timestamp: new Date(1701828182845),
		duration: 1850,
		accuracy: 76,
	},
	{
		user_id: 3,
		shape_id: 4,
		coordinates:
			"LINESTRING(15.51316 144.01001, 15.51462 144.00694, 15.51438 144.00786, 15.51595 144.00419, 15.51770 144.00152)",
		timestamp: new Date(1703536028742),
		duration: 2900,
		accuracy: 33,
	},
	{
		user_id: 4,
		shape_id: 1,
		coordinates:
			"LINESTRING(12.72653 -164.43656, 12.72831 -164.43660, 12.72607 -164.43499, 12.72200 -164.43339, 12.72317 -164.43415)",
		timestamp: new Date(1701415926535),
		duration: 990,
		accuracy: 67,
	},
	{
		user_id: 5,
		shape_id: 2,
		coordinates:
			"LINESTRING(-48.87248 -89.98705, -48.87546 -89.98854, -48.87712 -89.98766, -48.87968 -89.99091, -48.88093 -89.99221)",
		timestamp: new Date(1698897932384),
		duration: 3750,
		accuracy: 81,
	},
	{
		user_id: 1,
		shape_id: 4,
		coordinates:
			"LINESTRING(19.10026 -109.02132, 19.10285 -109.02102, 19.10360 -109.01581, 19.10442 -109.01704, 19.10677 -109.01475)",
		timestamp: new Date(1702345895010),
		duration: 510,
		accuracy: 95,
	},
	{
		user_id: 2,
		shape_id: 3,
		coordinates:
			"LINESTRING(24.56891 80.20311, 24.56823 80.20438, 24.57120 80.20263, 24.56404 80.19746, 24.55707 80.19359)",
		timestamp: new Date(1701892012345),
		duration: 6800,
		accuracy: 42,
	},
	{
		user_id: 3,
		shape_id: 2,
		coordinates:
			"LINESTRING(-35.67526 153.00644, -35.67808 153.00543, -35.67360 153.00653, -35.67196 153.00338, -35.67719 153.00860)",
		timestamp: new Date(1700000000000),
		duration: 2100,
		accuracy: 19,
	},
	{
		user_id: 5,
		shape_id: 3,
		coordinates:
			"LINESTRING(-15.21200 24.15731, -15.20971 24.15482, -15.21040 24.15402, -15.21327 24.15689, -15.21211 24.15505)",
		timestamp: new Date(1699000000000),
		duration: 8300,
		accuracy: 88,
	},
	{
		user_id: 4,
		shape_id: 4,
		coordinates:
			"LINESTRING(9.54596 -13.27013, 9.54818 -13.26841, 9.54455 -13.26976, 9.54791 -13.27163, 9.55089 -13.27213)",
		timestamp: new Date(1703253252646),
		duration: 415,
		accuracy: 60,
	},
	{
		user_id: 2,
		shape_id: 2,
		coordinates:
			"LINESTRING(0.08685904075329771 51.4726140295975, 0.08685904075329771 51.4726140295975, 0.08685904075329771 51.4726140295975, 0.08685902132924347 51.47261402251752, 0.08684647059538388 51.47261955842928, 0.08685314372546071 51.472622101313654, 0.08687998124041751 51.47264513534455, 0.08687398760558439 51.4726336387836, 0.08689316084681947 51.47262124845196, 0.0868956976198563 51.472601278140296, 0.08690312781489862 51.47257248424941, 0.08689220904188208 51.47258595798098, 0.0868868276188385 51.47257668937136)",
		timestamp: new Date(17032532526461),
		duration: 1000,
		accuracy: 99,
	},
];

export default expeditionsData;
