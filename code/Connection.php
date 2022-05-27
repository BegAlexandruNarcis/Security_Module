<?php
    $servername = "sqlsrv:Server=(local)\sqlexpress;Database=master";
    $username = "PROJECTDB";
    $password = "12345";
    
    $conn = new PDO($servername, $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	
	

?>