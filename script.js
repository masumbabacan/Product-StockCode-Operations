(function($){
    let app = {
        siteUrl:"**",
        stockCode : "",
        data : "",
        func: {
            getStockCode: () => {
                app.stockCode = stockCode;
            },
            getFolderUrl: async () => {
                await $.ajax({
                    url:"**",
                    type:'post',
                    data:{stockCode : app.stockCode},
                    success:(data) =>{
                        app.data = JSON.parse(data);
                    }
                });
            },
            addFolderButtons: async () => {
                $("[data-src='#product-threadri-content']").remove();
                $(".product-favorite-buttons .product-popup").addClass("d-none");
                for (const key in app.data) {
                   await $(".product-area-top").find(".product-threadri").append(`
                        <div class="w-100">
                            <a href="javascript:;" data-fancybox data-type="iframe" data-src="${app.siteUrl + app.data[key].url.replace("../", "/")}"  class="${app.data[key].btnType + " " + app.data[key].class} folder-button d-flex justify-content-center align-items-center border w-100 mb-3">
                                <div class=" d-flex justify-content-between align-items-center">
                                    ${app.data[key].svg}
                                    ${app.data[key].btnName}
                                </div>
                            </a>
                        </div>
                    `);
                }
            },
            productPopupButtonActive: () => {
                let productPopup = $(".product-left .product-favorite-buttons .product-popup a");
                let pdfButton = $(".product-threadri a:eq(1)");
                productPopup.attr("data-src",$(".product-threadri a:eq(0)").attr("data-src"))
                productPopup.attr("href","javascript:;")
                productPopup.attr("data-type","iframe")
                pdfButton.attr("href",$(".product-threadri a:eq(1)").attr("data-src"));
                pdfButton.attr("target","_blank");
                pdfButton.removeAttr("data-src");
                pdfButton.removeAttr("data-type");
                pdfButton.removeAttr("data-fancybox");
            }
        }
    }
    $(document).ready(() => {
        if (window.location.href.indexOf("/urun") !== -1) {
            app.func.getStockCode();
            app.func.getFolderUrl().then(() => {
                app.func.addFolderButtons().then(() => {
                    app.func.productPopupButtonActive();
                    if ($(".product-threadri .theree-d").length > 0) {
                        $(".product-favorite-buttons .product-popup").removeClass("d-none");
                    }
                    
                });
            });
        }
    });
})(jQuery);
