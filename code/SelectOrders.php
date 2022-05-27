<?php header('Access-Control-Allow-Origin: *'); 
include "./Connection.php";
$sql = "
            SELECT
                   [CustomerName]
					,[Email]
					,[OrderNumber]
					,[OrderDate]
					,[Oras]
					,[Judet]
					,[Strada]
					,[Numar]
					,[Bloc]
					,[Scara]
                    ,[CodPostal]
                    ,[Total]       
            FROM [NOKIA].[ORDER]
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