<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Delivery Partner App</title>
    <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Poppins" />
    <link rel="stylesheet" href="dist/styles.css">
    <style>
        .deliveries-list {
            margin-bottom: 30px;
        }

        .delivery-item {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #ddd;
            padding: 10px 0;
        }

        .update-status-form {
            margin-top: 20px;
        }

        form {
            display: flex;
            flex-direction: column;
            max-width: 300px;
        }
        .tracking-table {
            margin-top: 20px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        th, td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
            position: relative;
        }

        th {
            background-color: #d3e6fd; 
        }

        tr:hover {
            background-color: #f5f5f5;
        }

        .details-button {
            display: none;
            position: absolute;
            bottom: 10px;
            right: 3px;
            background-color: #0d44af; 
            color: #fff; 
            padding: 5px 5px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        .status-cell:hover .details-button {
            display: block;
        }

        .view-more-button,
        .view-less-button {
            display: block;
            margin: 20px auto;
            padding: 10px;
            background-color: #0d44af; 
            color: #fff; 
            border: none;
            border-radius: 5px;
            cursor: pointer;
            position: relative;
            z-index: 1;
        }


        .view-less-button {
            display: none;
        }

        .search-container {
            margin-top: 10px;
            padding-bottom: 10px;
            text-align: center;
            position: relative;
        }

        .search-input-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 55%;
            margin: 0 auto;
            position: relative;
        }

        .search-input {
            padding: 13px;
            border: none;
            border-radius: 60px; 
            box-sizing: border-box;
            outline: none;
            width: 80%; 
            background-color: #d3e6fd; 
            padding-right: 40px; 
        }

        .search-icon {
            position: absolute;
            right: 100px;
            top: 50%;
            transform: translateY(-50%);
            max-width: 20px; 
            cursor: pointer;
        }

        .search-input::placeholder {
            color: #555; 
        }

        .search-input:focus {
            border-color: #4395f7; 
            box-shadow: 0 0 5px rgba(67, 149, 247, 0.7); 
        }

        .weather-widget {
            margin-bottom: 20px;
        }

        .weather-widget-container {
            text-align: center;
            margin-top: 30px;
            margin-right: 30px;
        }

        .weather-info {
            background-color: #0e81e4; 
            color: #fff; 
            padding: 15px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .weather-info h2 {
            font-size: 15px; 
            margin-bottom: 10px;
            color: #fff; 
        }
        .temperature-container {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .temperature {
            font-size: 24px;
            font-weight: bold;
            color: #fff; 
        }

        .cloud-icon {
            max-width: 25px; 
            margin-right: 5px; 
        }

        .description {
            font-size: 16px;
            color: #fff; 
        }

        .qdexpress-logo-container {
            margin-top: 20px;
            text-align: left;
            padding: 30px;
        }

        .qdexpress-logo {
            max-width: 200px; 
            border-radius: 50%; 
        }

        .additional-text {
            font-size: 18px;
            line-height: 1.6;
            color: black;
            margin-top: 0px;
            text-align: justify;
            padding: 10px;
        }

        .additional-text h2 {
            color: #0d44af; 
        }
    </style>
</head>
<body>

    <div class="app-container">

        <div class="header">
            <div class="qdexpress-logo-container">
                <img class="qdexpress-logo" src="upload/qdexpress-logo.jpg" alt="QDExpress Logo">
            </div>

            <!-- Weather widget container -->
            <div class="weather-widget-container">
                <div class="weather-info">
                    <h2>WEATHER TODAY</h2>
                    <div id="weatherWidget">
                        <?php
                            $apiKey = 'b08f0dc18be515f55ecea4bc67c6abb5';
                            $latitude = 14.5204;
                            $longitude = 121.0190;
                        ?>
                    </div>
                </div>
            </div>
        </div>
        

        <div class="content">
            <div class="additional-text">
                <h2>Hey rider, User123</h2>
                <p>How's it going today? Are you excited for your next adventure with QDExpress?<Obj></Obj> Our fleet of top-of-the-line vehicles is waiting to take you anywhere you need to go.</p>
            </div>

            <div class="search-container">
                <div class="search-input-container">
                    <input type="text" id="searchInput" class="search-input" placeholder="Search">
                    <img class="search-icon" src="upload/search.png" alt="Search Icon">
                </div>
            </div>

            <!-- Table to display tracking information -->
            <div class="tracking-table">
                <table id="trackingTable">
                    <thead>
                        <tr class="header-row">
                            <th>Receiver Name</th>
                            <th>Receiver Address</th>
                            <th>Delivery Status</th>
                        </tr>
                    </thead>
                    <tbody id="trackingBody">
                        <?php
                            $trackingData = [
                                ['John Doe', '123 Main St, Cityville', 'Pending'],
                                ['Jane Smith', '456 Oak St, Townsville', 'Completed'],
                                ['Rose Fernandez', 'Lower Bicutan, Taguig City', 'Completed'],
                                ['Nicole Alcid', 'Ususan, Taguig City', 'Pending'],
                                ['Kaila Marie Alima', 'Betterliving, Parañaque City', 'Completed'],
                                ['Simounne Cruz', 'Signal, Taguig City', 'Pending'],
                            ];

                            $rowLimit = 5;

                            for ($index = 0; $index < min($rowLimit, count($trackingData)); $index++) {
                                $rowClass = ($index === 0) ? 'light-blue' : '';
                                echo "<tr class='{$rowClass}'>";
                                foreach ($trackingData[$index] as $colIndex => $value) {
                                    if ($colIndex === 2) {
                                        echo '<td class="status-cell">' . $value . '<button class="details-button">View Details</button></td>';
                                    } else {
                                        echo '<td>' . $value . '</td>';
                                    }
                                }
                                echo '</tr>';
                            }
                        ?>
                    </tbody>
                </table>
                <?php if (count($trackingData) > $rowLimit): ?>
                    <button class="view-more-button" onclick="showMoreRows()">View More</button>
                    <button class="view-less-button" onclick="showLessRows()">View Less</button>
                <?php endif; ?>
            </div>

        </div>

        <?php include 'includes/footer.php'; ?>

    </div>
<?php include('includes/scripts.php');?>
</body>
</html>
