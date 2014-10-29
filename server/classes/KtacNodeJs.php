<?php
class KtacNodeJs {
	
	static function startServer() {
		  
      global $user;
      
		if(Nodejs::checkChannel("ktacChannel")) {
			//echo "already connected to the nodejs server";
			
			nodejs_add_user_to_channel($user->uid, "ktacChannel");
			
			return;
		}
		
		
		
		//echo Nodejs::checkChannel("ktacChannel");
		Nodejs::initConfig();
		//$response = drupal_http_request(Nodejs::$baseUrl . "nodejs/channel/check/ktacChannel", array('headers' => Nodejs::$headers));
		//print_r($response); die;
		//if($response->code == -111) { // -111 is "connection refused", a symptom of the server not running
		$execOutput = array();
		 
		//system("pwd");
		$command = //"cd " . __DIR__ . "/../../nodejs;" .
		//"pwd;" .
		"/usr/local/bin/forever" .
		" -c /usr/bin/nodejs" .
		" -p /var/www/logs/.forever" .
		" -l /var/www/logs/.forever/forever.log" .
		" -o /var/www/logs/.forever/out.log" .
		" -e /var/www/logs/.forever/err.log" .
		" --pidFile /var/www/logs/.forever/forever.pid" .
		" --sourceDir " .  __DIR__ . "/../../../nodejs" .
		" -a" . // append to log files
		" start /server.js";
		exec($command, $execOutput);
		//print_r($command);
		$maxRetries = 5;
		$retryDelay = 1;
		
		
		
		
		for($retryNum = 0; $retryNum < $maxRetries; $retryNum++) {
			//$response = drupal_http_request(Nodejs::$baseUrl . "nodejs/channel/check/ktacChannel", array('headers' => Nodejs::$headers));
			 
			//if(!isset($response->error)) {
			nodejs_get_add_channel("ktacChannel");
			if(Nodejs::checkChannel("ktacChannel")) {
				break;
			}
			//echo "retry fail " . $retryNum . "<br>";
			if($retryNum > 2) {
				sleep(1);
			}
		}
		if($retryNum == $maxRetries) {
			echo "Error in launching nodejs server.  Try refreshing.  This is a bug."; die;
		}
		 
		 
		//echo $command;
		//print_r($execOutput);
		//}
		
		//nodejs_get_add_channel("ktacChannel");
		nodejs_add_user_to_channel($user->uid, "ktacChannel");
	}
	
}