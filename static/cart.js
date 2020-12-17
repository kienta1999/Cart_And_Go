$("#close-form").click(function (e) { 
    e.preventDefault();
    $("#myForm").hide();
});

$("#checkout_btn").click(function (e) { 
    e.preventDefault();
    $("#myForm").show();
});

$(".remove-btn").click(function (e) { 
    e.preventDefault();
    let foodId = $(e.target).attr("id").substring(7)
    console.log(foodId);
    
    let form = $('<form>')
    .attr("action", "deleteCart")
    .attr("method", "POST")
    .append(
        $('<input>')
        .attr("type", "hidden")
        .attr("name", "id")
        .attr("value", foodId)
    )
    // /<form method="post">
    $(document.body).append(form);
    form.submit()
});
