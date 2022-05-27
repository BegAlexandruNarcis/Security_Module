<?php
	header("Access-Control-Allow-Origin: http://localhost:3000");
	header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
	header("Access-Control-Allow-Headers: Content-Type, Authorization");
	include "./Connection.php";
	$postdata = file_get_contents("php://input");
	if(isset($postdata) && !empty($postdata)){
		$request = json_decode($postdata);
		$email = $request->email;
		$sql = "Select ROLES,RoleName FROM [NOKIA].[ROLES] as role LEFT JOIN [NOKIA].[USERS] on role.ID=ROLES WHERE EMAIL ='$email' ";
		try{
			$statement = $conn->prepare($sql);
			$statement->execute();
		}catch (PDOException $e){
			echo "Databse Error: " , $e->getMessage();
		}catch(Exception $e){
			echo "General Error: " , $e->getMessage();
		}
		$arr = $statement->fetchAll(PDO::FETCH_ASSOC);
		print json_encode($arr);
	}
    
?>