(function($){
    app = {
        siteUrl:"here the server is determined",
        stockCode : "",
        data : "",
        func: {
            getStockCode: () => {
                for (const iterator of $(".product-right .product-box .product-list-title")) {
                    if ($(iterator).text() == "Stok Kodu") {
                        app.stockCode = $(iterator).parent().find(".product-list-content").text();
                    }
                }
            },
            getFolderUrl: async () => {
            await $.ajax({
                    url:"thePlaceToBeRequestedIsDeterminedHere",
                    type:'post',
                    data:{stockCode : app.stockCode},
                    success:(data) =>{
                      app.data = JSON.parse(data);
                    }
                });
            },
            addFolderButtons: () => {
                $(".product-right .product-compare").after(`<div class="d-flex align-items-center justify-content-end folder-buttons w-100 mt-5"></div>`);
                for (const key in app.data) {
                    $(".product-area-top").find(".folder-buttons").append(`
                        <div class="d-flex justify-content-center align-items-center w-100">
                            <a href="${app.siteUrl + app.data[key].url}" rel="noopener noreferrer" target="_blank" class="${app.data[key].btnType + " " + app.data[key].class} folder-button w-100 mx-1">
                                    <span class="text-white">${app.data[key].btnName}</span>
                            </a>
                        </div>
                    `);
                }
            }
        }
    }
    $(document).ready(() => {
        if (window.location.href.indexOf("/urun") !== -1) {
        app.func.getStockCode();
        app.func.getFolderUrl().then(() => {
            app.func.addFolderButtons();
        });
    }
    });
})(jQuery);