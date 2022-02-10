<?php
header('Access-Control-Allow-Origin: *');
if (isset( $_POST["stockCode"])) {
    $pattern="../projedosyalar";
    $folders = array_diff(scandir($pattern), array('..', '.'));
    $stockCode = $_POST["stockCode"];
    $urls = [];
    foreach ($folders as $folder) {
        if (is_dir($pattern . "/" . $folder) && strpos($folder,$stockCode) !== false) {
            $folder_url =$pattern . "/" . $folder;
            $folder_name = "3D";
            $folder_class = "theree-d";
            $folder_btn_name = "3D";
            $folder_btn_type = "btn btn-success";
            $urls[$folder_name]['url'] = $folder_url;
            $urls[$folder_name]['class'] = $folder_class;
            $urls[$folder_name]['btnName'] = $folder_btn_name;
            $urls[$folder_name]['btnType'] = $folder_btn_type;
            $files = array_diff(scandir($folder_url), array('..', '.'));
            foreach ($files as $file) {
                if (is_file($folder_url . "/" . $file) && strpos($file,$stockCode) !== false) {
                    $file_url =$folder_url . "/" . $file;
                    $file_name = "pdf";
                    $file_class = "Pdf";
                    $file_btn_name = "Pdf";
                    $file_btn_type = "btn btn-danger";
                    $urls[$file_name]['url'] = $file_url;
                    $urls[$file_name]['class'] = $file_class;
                    $urls[$file_name]['btnName'] = $file_btn_name;
                    $urls[$file_name]['btnType'] = $file_btn_type;
                }
            }
        }
    }
    print_r(json_encode($urls));
}
?>