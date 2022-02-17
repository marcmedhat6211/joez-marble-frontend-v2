$(document).ready(function() {
    var addressForm = $("#address_form");
    var shippingDetailsContainer = $("#shipping_details_container");
    addressForm.validate();
    let addressFormInputs = addressForm.find("input");
    addressFormInputs.each(function() {
        let inputName = $(this).attr("name");
        console.log(inputName);
        $(this).on("input", function() {
            shippingDetailsContainer.find(`.${inputName}`).text($(this).val());
        });
    });
});