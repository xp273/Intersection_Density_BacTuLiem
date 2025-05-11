<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Chi tiết</title>

        <link rel="stylesheet" href="css/style.css">
        <link rel="stylesheet" href="css/navbar.css">

        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
        <script src="js/navbar.js" defer></script>
    </head>
    
    <body>
    
            <nav class="navbar">
                <div class="logo">WEBGIS </div>
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

            <div class="container">
                <div class="content-section">
                    <h1>Phân tích mức độ ảnh hưởng của ngập úng lên hệ thống đường và các nút giao thông trên địa bàn Bắc Từ Liêm</h1>
                    
                    <div class="introduction">
                        <p>Giao thông là một trong những ngành nghề đã và đang tích hợp GIS một cách mạnh mẽ. Bằng cách sử dụng GIS, người sử dụng có thể thu thập được góc nhìn thực tế và mới nhất các thông tin như tình trạng của đường xá và ảnh hưởng của thời tiết và các hiện tượng thiên tai lên hệ thống giao thông.
		Trong dự án này, chúng ta sẽ phân tích khả năng xảy ra ngập úng và ảnh hưởng của ngập úng lên hệ thống giao thông, cụ thể là phân tích các tuyến đường và các nút giao thông sẽ bị ảnh hưởng bởi ngập úng ở quận Bắc Từ Liêm.
</p>
                    </div>
                    
                    <h2>Mục tiêu của dự án</h2>
                    <div class="goals-section">
                        <p>Dự án này hướng đến việc phân tích và đánh giá mức độ ảnh hưởng của ngập úng lên hệ thống giao thông tại quận Bắc Từ Liêm, với các mục tiêu cụ thể như sau:</p>
                        
                        <ul class="goals-list">
                            <li><strong>Xác định các khu vực có nguy cơ ngập úng cao:</strong> Sử dụng dữ liệu địa hình, lượng mưa và các yếu tố khác để xác định các khu vực có nguy cơ ngập úng cao trong quận Bắc Từ Liêm.</li>
                        
                            <li><strong>Xây dựng bản đồ nguy cơ:</strong> Tạo bản đồ thể hiện các khu vực có nguy cơ ngập úng và mức độ ảnh hưởng đến hệ thống giao thông.</li>
                            <li><strong>Thống kê dữ liệu của các quận:</strong> Vẽ biểu đồ thể hiện tỉ lệ ngập của đường trong các quận khác nhau.</li>
                        </ul>
                    </div>
            
                        <h2>Tính cấp thiết của đề tài</h2>
                        <div class="urgent-section">
                            <p>Ngập úng đô thị là một trong những vấn đề cấp bách mà quận Bắc Từ Liêm đang phải đối mặt, đặc biệt trong bối cảnh biến đổi khí hậu và đô thị hóa nhanh chóng. Việc phân tích mức độ ảnh hưởng của ngập úng lên hệ thống giao thông có tính cấp thiết vì những lý do sau:</p>
                            
                            <ul class="urgent-list">
                                <li><strong>Tác động kinh tế:</strong> Ngập úng gây ra thiệt hại lớn về kinh tế do làm gián đoạn giao thông, ảnh hưởng đến hoạt động kinh doanh và sinh hoạt của người dân.</li>
                                <li><strong>An toàn giao thông:</strong> Ngập úng làm tăng nguy cơ tai nạn giao thông, đe dọa tính mạng và tài sản của người tham gia giao thông.</li>
                                <li><strong>Quy hoạch đô thị:</strong> Kết quả nghiên cứu sẽ cung cấp cơ sở khoa học cho việc quy hoạch hệ thống giao thông và thoát nước trong tương lai.</li>
                                <li><strong>Ứng phó khẩn cấp:</strong> Xác định các khu vực có nguy cơ ngập cao giúp chính quyền địa phương xây dựng phương án ứng phó khẩn cấp khi có mưa lớn.</li>
                                <li><strong>Phát triển bền vững:</strong> Nghiên cứu góp phần vào mục tiêu phát triển đô thị bền vững, thích ứng với biến đổi khí hậu của quận Bắc Từ Liêm.</li>
                            </ul>
                        </div>
                        
                        <h2>Phương pháp nghiên cứu</h2>
                        <div class="method-section">
                            <p>Nghiên cứu sử dụng phương pháp phân tích không gian GIS để đánh giá mức độ ảnh hưởng của ngập úng lên hệ thống giao thông:</p>
                            <ol>
                                <li><strong>Thu thập dữ liệu:</strong> Dữ liệu về địa hình, hệ thống giao thông, lượng mưa, và lịch sử ngập úng tại quận Bắc Từ Liêm.</li>
                                <li><strong>Xây dựng mô hình ngập úng:</strong> Sử dụng mô hình thủy văn để mô phỏng các kịch bản ngập úng khác nhau.</li>
                                <li><strong>Phân tích không gian:</strong> Xác định các tuyến đường và nút giao thông bị ảnh hưởng bởi ngập úng.</li>
                                <li><strong>Đánh giá mức độ ảnh hưởng:</strong> Phân loại các tuyến đường và nút giao thông theo mức độ ảnh hưởng.</li>
                                <li><strong>Đề xuất giải pháp:</strong> Đề xuất các giải pháp giảm thiểu tác động của ngập úng lên hệ thống giao thông.</li>
                            </ol>
                        </div>

                        <h2>Dữ liệu</h2>
                        <div class="urgent-section">
                            <p>Các bộ dữ liệu sử dụng trong dự án:</p>
                            <ol>
                                <li><strong>Bộ dữ liệu về biên giới các cấp của Việt Nam bởi GADM:</strong> https://gadm.org/data.html.</li>
                                <li><strong>Bộ dữ liệu tổng hợp của Việt Nam được trích xuất từ OpenStreetMap bởi GEOFABRIK:</strong> https://download.geofabrik.de/asia/vietnam.html.</li>
                                
                            </ol>
                        </div>
            
                            </tbody>
                        </table>
                    </div>
                    
                </div>
            </div>

            <style>
                .container {
                    max-width: 1200px;
                    margin: 20px auto;
                    padding: 0 20px;
                }
                
                .content-section {
                    background-color: #fff;
                    padding: 30px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0,0,0,0.1);
                }
                
                h1 {
                    color: #2c3e50;
                    margin-bottom: 20px;
                    text-align: center;
                }
                
                h2 {
                    color: #3498db;
                    margin: 25px 0 15px;
                    border-bottom: 1px solid #eee;
                    padding-bottom: 10px;
                }
                
                .introduction {
                    background-color: #f8f9fa;
                    padding: 15px;
                    border-radius: 5px;
                    margin-bottom: 20px;
                }
                
                .urgent-section {
                    background-color: #fff8e1;
                    padding: 15px;
                    border-radius: 5px;
                    border-left: 4px solid #ffc107;
                    margin-bottom: 20px;
                }
                
                .urgent-list {
                    padding-left: 20px;
                }
                
                .urgent-list li {
                    margin-bottom: 10px;
                }
                
                .goals-section {
                    background-color: #e6f7ff;
                    padding: 15px;
                    border-radius: 5px;
                    border-left: 4px solid #1890ff;
                    margin-bottom: 20px;
                }
                
                .goals-list {
                    padding-left: 20px;
                }
                
                .goals-list li {
                    margin-bottom: 10px;
                }
                
                .method-section {
                    background-color: #e8f4f8;
                    padding: 15px;
                    border-radius: 5px;
                    border-left: 4px solid #3498db;
                    margin-bottom: 20px;
                }
                
                .method-section ol {
                    padding-left: 20px;
                }
                
                .method-section li {
                    margin-bottom: 10px;
                }
                
                .data-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 20px 0;
                }
                
                .data-table th, .data-table td {
                    border: 1px solid #ddd;
                    padding: 12px;
                    text-align: center;
                }
                
                .data-table th {
                    background-color: #3498db;
                    color: white;
                }
                
                .data-table tr:nth-child(even) {
                    background-color: #f2f2f2;
                }
            </style>
    </body>
</html>
