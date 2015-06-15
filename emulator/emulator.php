<?

if (empty($_GET['img'])) {
	
	echo '
		<style type="text/css">
			img.emu {
				margin: 10px;
				padding: 10px;
				width: 200px;
				height: 200px;
				border: 1px solid silver;
			}
		</style>
	';
	
	$baseUri = parse_url($_SERVER['REQUEST_URI'])['path'];
	
	for ($i = 1 ; $i < 29 ; $i++) {
		$rnd = substr(md5(microtime() . $i), 0, 4);
		printf('<img src="%s?img=true&rnd=%s&index=%s" class="emu">', $baseUri, $rnd, $i);
	}
	
} else {

	// Return up to 70% errors
	if (rand(1, 10) <= 7) {
		
		header("HTTP/1.0 408 Request Timeout");
		
	} else {

		header('content-type: image/jpeg');
		$fh = fopen(__DIR__.'/img.jpg', 'r');
		fpassthru($fh);
		fclose($fh);
		
	}
	
}