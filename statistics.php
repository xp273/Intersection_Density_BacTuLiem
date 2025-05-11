<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Statistics</title>
        <link rel="stylesheet" href="css/style.css">
        <link rel="stylesheet" href="css/navbar.css">
    </head>
    <body>
        <!-- Navbar -->
        <nav class="navbar">
            <div class="logo">WEBGIS</div>
            <ul class="nav-links">
                <li><a href="/index.php">Trang chủ</a></li>
                <li><a href="/statistics.php">Thống kê</a></li>
                <li><a href="/details.php">Chi tiết</a></li>
                <li><a href="/contact.php">Liên lạc</a></li>
            </ul>
            <div class="hamburger">
                <span class="line"></span>
                <span class="line"></span>
                <span class="line"></span>
            </div>
        </nav>
        
        </div>
      
        <div id="content" include_html="python/output/intersection_data.html"></div>
        <div id="content" include_html="python/output/flooded_roads.html"></div>
        <div id="content" include_html="python/output/flooded_intersections.html"></div>

        <script>
            function includeHTML() {
                var z, i, elmnt, file, xhttp;
                /* Loop through a collection of all HTML elements: */
                z = document.getElementsByTagName("*");
                for (i = 0; i < z.length; i++) {
                    elmnt = z[i];
                    /* Search for elements with a certain attribute: */
                    file = elmnt.getAttribute("include_html");
                    if (file) {
                        /* Make an HTTP request using the attribute value as the file name: */
                        xhttp = new XMLHttpRequest();
                        xhttp.onreadystatechange = function() {
                            if (this.readyState == 4) {
                                if (this.status == 200) {
                                    elmnt.innerHTML = this.responseText;
                                }
                                if (this.status == 404) {
                                    elmnt.innerHTML = "Page not found.";
                                }
                                /* Remove the attribute, and call this function once more: */
                                elmnt.removeAttribute("include_html");
                                includeHTML();
                            }
                        };
                        xhttp.open("GET", file, true);
                        xhttp.send();
                        /* Exit the function: */
                        return;
                    }
                }
            }
            includeHTML();
        </script>
    </body>
</html>