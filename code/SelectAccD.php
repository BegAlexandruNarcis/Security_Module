<?php header('Access-Control-Allow-Origin: *'); 
include "./Connection.php";
$sql = "
            SELECT
                   [Item_ID],
                     [ItemName],
                   [BuyPrice],
                   [SellPrice],
                   [Qty],
                   [ShippingCost],
                   [PackingFees],
                   [Taxes]
            FROM [NOKIA].[ACCOUNTANT] 
            

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