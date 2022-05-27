<?php header('Access-Control-Allow-Origin: *'); 
include "./Connection.php";
$sql = "
            SELECT
                   [Nume],
                     [Prenume],
                   [Email]
                   
            FROM [NOKIA].[CUSTOMER] AS CUST
            LEFT JOIN [NOKIA].[USERS] AS USERS
            ON USERS.[ID] = CUST.[Users_ID]
            

            ";


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
?>