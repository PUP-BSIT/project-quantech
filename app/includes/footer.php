<!-- Footer navigation -->
<div class="footer-navigation">
    <a href="index.php" class="navigation-button <?php echo (basename($_SERVER['PHP_SELF']) == 'index.php') ? 'active' : ''; ?>">
        <img src="upload/homepage.png" alt="Home Icon">
        Home
    </a>
    <a href="tracking.php" class="navigation-button <?php echo (basename($_SERVER['PHP_SELF']) == 'tracking.php') ? 'active' : ''; ?>">
        <img src="upload/tracking.png" alt="Order Icon">
        Deliver Status
    </a>
    <a href="notifications.php" class="navigation-button <?php echo (basename($_SERVER['PHP_SELF']) == 'notifications.php') ? 'active' : ''; ?>">
        <img src="upload/order.png" alt="Tracking Icon">
        Notifications
    </a>
</div>

<style>
    .footer-navigation {
        display: flex;
        justify-content: space-around;
        align-items: center;
        background-color: #d3e6fd; 
        padding: 12px 0;
        position: relative;
        margin-top: 20px; 
    }

    .footer-navigation .navigation-button {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: black; 
        text-decoration: none;
        font-size: 14px;
        cursor: pointer;
    }

    .footer-navigation .navigation-button img {
        margin-bottom: 5px; 
        max-width: 25px; 
    }

    .footer-navigation .navigation-button.active {
        font-weight: bold; /* Set the bold font for the active link */
    }

    .content {
            margin-bottom: 60px; 
        }
</style>
