<?php 

function ktacClientIncludes() {
	
	$clientJavascriptLibraries = array(
		"three",
		//"three.min",
	);
	
	$clientJavascriptClasses = array(
	  "KtacConfig",
	  "KtacFunctions",
	  "KtacLocation",
	  "KtacConsole",
	  "KtacChatEntry",
		"KtacPacketQueue",
	  "KtacPacket",
	  "KtacLoadZonePacket",
	  "KtacSetBlockPacket",
		"KtacCameraControls",
		"KtacHighlight",
		"KtacBlendAnim",
		"KtacAction",
		"KtacBubble",
		"KtacMesh",
		"KtacMeshGroup",
		"KtacActor",
		"KtacMultiMeshActor",
		"KtacActorSavePacket",
		"KtacBoundingBox",
		"KtacBlock",
		"KtacUndefinedBlock",
		"KtacGrassBlock",
		"KtacDirtBlock",
		"KtacSiamese1",
		"KtacTree1",
		"KtacWorld",
		"KtacLogpile",
		"KtacWheatfield",
		"KtacFrameLimiter",
		"KtacFpsStats"
	);
	
	drupal_add_js("
	  var KTAC_CLIENT_LINK = \"" . KTAC_CLIENT_LINK . "\";
	  var KTAC_CONFIG = " . KtacConfig::getJson() . ";
	  ", "inline");
	
	foreach($clientJavascriptLibraries as $libName) {
		drupal_add_js(KTAC_CLIENT_LINK . "libraries/" . $libName . ".js");
	}
	
	foreach($clientJavascriptClasses as $className) {
		drupal_add_js(KTAC_CLIENT_LINK . "classes/" . $className . ".js");
	}
	
	drupal_add_js(KTAC_CLIENT_LINK . 'client.js', 'file');
	
	drupal_add_css(KTAC_CLIENT_LINK . 'clientStyles.css'); // couldn't be named "client.css" due to a drupal_add_css() quirk
	
	
	
}




?>