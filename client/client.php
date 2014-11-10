<?php 

function ktacClientIncludes() {
	
	$clientJavascriptLibraries = array(
		"three",
	);
	
	$clientJavascriptClasses = array(
	  "KtacConfig",
	  "KtacFunctions",
	  "KtacLocation",
	  "KtacConsole",
	  "KtacPacket",
	  "KtacLoadZonePacket",
	  "KtacSetBlockPacket",
		"KtacCameraControls",
		"KtacHighlight",
		"KtacBlendAnim",
		"KtacAction",
		"KtacBubble",
		"KtacActor",
		"KtacBoundingBox",
		"KtacBlock",
		"KtacUndefinedBlock",
		"KtacGrassBlock",
		"KtacDirtBlock",
		"KtacSiamese1",
		"KtacTree1",
		"KtacWorld",
	);
	
	foreach($clientJavascriptLibraries as $libName) {
		drupal_add_js(KTAC_CLIENT_LINK . "libraries/" . $libName . ".js");
	}
	
	foreach($clientJavascriptClasses as $className) {
		drupal_add_js(KTAC_CLIENT_LINK . "classes/" . $className . ".js");
	}
	
	drupal_add_js(KTAC_CLIENT_LINK . 'client.js', 'file');
	
	drupal_add_css(KTAC_CLIENT_LINK . 'clientStyles.css'); // couldn't be named "client.css" due to a drupal_add_css() quirk
	
	drupal_add_js("var KTAC_CLIENT_LINK = \"" . KTAC_CLIENT_LINK . "\";", "inline");
	
}




?>