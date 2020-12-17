// switch betwwen sign in and register tabs
$(document).ready(function () {
  $(".register_tab").click(function () {
    $("#register_box").show();
    $("#login_box").hide();
    $(".register_tab").addClass("active");
    $(".login_tab").removeClass("active");
  });
  $(".login_tab").click(function () {
    $("#login_box").show();
    $("#register_box").hide();
    $(".login_tab").addClass("active");
    $(".register_tab").removeClass("active");
  });
  $("#here_btn").click(function () {
    $("#register_box").show();
    $("#login_box").hide();
    $(".register_tab").addClass("active");
    $(".login_tab").removeClass("active");
  });
});