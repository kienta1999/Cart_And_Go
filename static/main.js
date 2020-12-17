jQuery(document).ready(function(){
    $("a.image").click(function (e) { 
        e.preventDefault();
        let imgID = e.target.id;
        let quantityID = "food-quantity-" + imgID.substr(4)
        let inputID = "val-" + + imgID.substr(4)
        console.log(quantityID);
        let quantity = Number($("#" + quantityID).html()) + 1
        console.log(quantity);
        $("#" + quantityID).html(quantity);
        $("#" + inputID).val(quantity);
    });
});