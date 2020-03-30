(function (){

    var dataChangedEvent = new Event('dataChanged')
    $(document).ready(function(){

        /* Get Product Data from call to /products */
        var products = []
        var cartContent = []

        /* Fetch Product Data and Cart Data */
        $.get({
           url: 'http://localhost:8010/products',
           success: function(data) {
                products = data.products
                $.get({
                   url: 'http://localhost:8010/cart',
                   success: function(data) {
                        cartContent = data.cart
                        window.dispatchEvent(dataChangedEvent)
                   }
                })
           }
        })

        $(window).on("dataChanged", function() {

            /* Create The table of Products */
            createProductTable(products)

             /* Set Cart Summary and update current cart content table */
            updateCart()

            /* Display detailed Product data and addToCart form when an item is selected */
            $(".products").click(function() {
                $("#details").empty()
                $("#moreDetails").show()
                $("#closeBt").show()
                const productId = $(this)[0].id
                console.log(productId)
                var product;
                products.forEach(function(element){
                    if(element.id == productId){product = element}

                })
                $("#details").append(
                    "<img width='75%' src='"+product.image_url+"'>"+
                    "<br><p>" +  product.description+ "<br>$"+
                    product.unit_cost+"</p><br>")

                 /* add addToCart form to add item to cart */
                $("#addToCart").show()

                $("#prodInput")[0].value = productId

                /* Override the forms post request so that the page does not refresh, just the DOM */
                $("#addToCart").submit(function (event){
                    event.preventDefault();

                    /* Make Manual Post Request to Cart */
                    $.post({
                       url: '/cart',
                       data: $("#addToCart").serialize(),
                       success: function() {
                            $.get({
                               url: 'http://localhost:8010/cart',
                               success: function(data) {
                                    cartContent = data.cart
                                    updateCart()
                                    window.dispatchEvent(dataChangedEvent)
                               }
                            })
                       }
                    })
                })

                 /* Add functionality to close button */
                $(closeBt).click(function(){ $("#moreDetails").hide()})
            })

            $("#sortC").click(function(){
                sortCost()
                createProductTable()
            })

            $("#sortN").click(function(){
                sortProduct()
                createProductTable()
            })

            /* Display and Hide Cart Contents */
            $("#viewCart").click(function() {$("#cartContents").show()})
            $("#closeCart").click(function() {$("#cartContents").hide()})

        })

        /* Function to update cart summary and cart content table */
        function updateCart(){
            $("#cartBody").empty()

                var totalCost = 0
                var totalItems = 0
                for(var i=0; i<cartContent.length; i++) {
                    $("#cartBody").append(
                        "<tr><td>" + cartContent[i].name+"</td>"+
                        "<td>" + cartContent[i].quantity+"</td>"+
                        "<td>$"+cartContent[i].cost+"</td></tr>"
                    )
                    totalCost += cartContent[i].cost
                    totalItems += cartContent[i].quantity
                }
                $("#totalCost").empty().append("Total Cost = $"+totalCost)
                $("#cartSummary").empty().append(totalItems+" items in cart = $"+totalCost)
        }

        function sortCost(){
            for(var i =0; i < products.length-1; i++){
                var lowestCostItem = i;
                for(var j = i+1; j < products.length; j++){
                    if(products[j].unit_cost < products[lowestCostItem].unit_cost){
                        lowestCostItem = j;
                    }
                }
                var temp = products[lowestCostItem];
                products[lowestCostItem] = products[i];
                products[i] = temp;
            }
            window.dispatchEvent(dataChangedEvent)
        }

        function sortProduct(){
            for(var i =0; i < products.length-1; i++){
                var lowestCostItem = i;
                for(var j = i+1; j < products.length; j++){
                    if(products[j].name < products[lowestCostItem].name){
                        lowestCostItem = j;
                    }
                }
                var temp = products[lowestCostItem];
                products[lowestCostItem] = products[i];
                products[i] = temp;
            }
            console.log(products)
            console.log(products[0].id)
            window.dispatchEvent(dataChangedEvent)
        }

        function createProductTable(){
            $("#tableOfProducts").empty()
            /* Update table of products once the data has been fetched */
             for(var i=0; i<products.length; i++) {
                $("#tableOfProducts").append("<tr><td class='products' id='"+products[i].id+"'>"
                + products[i].name+ "</td><td>$"+products[i].unit_cost+"</td></tr>")
             }
        }


    })
})()


