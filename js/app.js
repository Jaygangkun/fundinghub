var x, i, j, selElmnt, a, b, c;
/*look for any elements with the class "custom-own-select":*/
function startCustomSelect(){
  x = document.getElementsByClassName("custom-own-select");
  for (i = 0; i < x.length; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    /*for each element, create a new DIV that will act as the selected item:*/
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /*for each element, create a new DIV that will contain the option list:*/
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < selElmnt.length; j++) {
      /*for each option in the original select element,
      create a new DIV that will act as an option item:*/
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener("click", function(e) {
          /*when an item is clicked, update the original select box,
          and the selected item:*/
          var y, i, k, s, h;
          s = this.parentNode.parentNode.getElementsByTagName("select")[0];
          h = this.parentNode.previousSibling;
          for (i = 0; i < s.length; i++) {
            if (s.options[i].innerHTML == this.innerHTML) {
              s.selectedIndex = i;
              h.innerHTML = this.innerHTML;
              y = this.parentNode.getElementsByClassName("same-as-selected");
              for (k = 0; k < y.length; k++) {
                y[k].removeAttribute("class");
              }
              this.setAttribute("class", "same-as-selected");
              break;
            }
          }
          h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function(e) {
        /*when the select box is clicked, close any other select boxes,
        and open/close the current select box:*/
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
    });
  }
  function closeAllSelect(elmnt) {
    /*a function that will close all select boxes in the document,
    except the current select box:*/
    var x, y, i, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    for (i = 0; i < y.length; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i)
      } else {
        y[i].classList.remove("select-arrow-active");
      }
    }
    for (i = 0; i < x.length; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
      }
    }
  }
  /*if the user clicks anywhere outside the select box,
  then close all select boxes:*/
  document.addEventListener("click", closeAllSelect);
}


$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
});

function validateEmail(email) {
    email = email.trim();
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function initApplicationPage(){
    if($('#birthday').length != 0){
        $('#birthday').datepicker({
            format: 'mm/dd/yyyy'
        });

        $('#birthday').on('changeDate', function(ev){
            $(this).datepicker('hide');
        });
    }

    if( localStorage.getItem('from_home') != null && localStorage.getItem('from_home') == '1'){
        $('#loan_amount_requested').val(localStorage.getItem('home_loan_amount'));
        $('#purpose_of_the_loan').val(localStorage.getItem('home_loan_purpose'));
        $('#how_much_debt_do_you_have').val(localStorage.getItem('how_much_debt_do_you_have'));
        
        localStorage.setItem('from_home', '0');

        if(localStorage.getItem('home_loan_purpose') == 'Debt Consolidation'){
            $('#how_much_debt_do_you_have_row').show();
        }
        else{
            $('#how_much_debt_do_you_have_row').hide();
        }
    }
        
    $(document).on('click', '#referral_info_check', function(){
        if($('#referral_info_check input').is(':checked')){
            $('#referral_info_wrap').css('visibility', 'visible');
        }
        else{
            $('#referral_info_wrap').css('visibility', 'hidden');
        }
    })

    $(document).on('click', '#purpose_of_the_loan_select .select-items > div', function(){
        if($('#purpose_of_the_loan').val() == 'Debt Consolidation'){
            $('#how_much_debt_do_you_have_row').show();
        }
        else{
            $('#how_much_debt_do_you_have_row').hide();
        }
    })

    

    function checkValidate(){

        if($('#loan_amount_requested').val() == ''){
            $('#loan_amount_requested').parent().addClass('empty');
            $('#loan_amount_requested').focus();
            return false;
        }
        else{
            $('#loan_amount_requested').parent('.input-field-container').removeClass('empty');
        }

        if($('#purpose_of_the_loan').val() == ''){
            $('#purpose_of_the_loan').parent().addClass('empty');
            $('#purpose_of_the_loan').focus();
            return false;
        }
        else{
            $('#purpose_of_the_loan').parent('').removeClass('empty');
        }

        if($('#what').val() == ''){
            $('#what').parent().addClass('empty');
            $('#what').focus();
            return false;
        }
        else{
            $('#what').parent('').removeClass('empty');
        }

        if($('#what').val() == ''){
            $('#what').parent().addClass('empty');
            $('#what').focus();
            return false;
        }
        else{
            $('#what').parent('').removeClass('empty');
        }

        if($('#last_name').val() == ''){
            $('#last_name').parent().addClass('empty');
            $('#last_name').focus();
            return false;
        }
        else{
            $('#last_name').parent('').removeClass('empty');
        }

        if($('#street_address').val() == ''){
            $('#street_address').parent().addClass('empty');
            $('#street_address').focus();
            return false;
        }
        else{
            $('#street_address').parent('').removeClass('empty');
        }

        if($('#unit_number').val() == ''){
            $('#unit_number').parent().addClass('empty');
            $('#unit_number').focus();
            return false;
        }
        else{
            $('#unit_number').parent('').removeClass('empty');
        }

        if($('#city').val() == ''){
            $('#city').parent().addClass('empty');
            $('#city').focus();
            return false;
        }
        else{
            $('#city').parent('').removeClass('empty');
        }

        if($('#state_of_current_address').val() == ''){
            $('#state_of_current_address').parent().addClass('empty');
            $('#state_of_current_address').focus();
            return false;
        }
        else{
            $('#state_of_current_address').parent('').removeClass('empty');
        }

        if($('#zip_code').val() == ''){
            $('#zip_code').parent().addClass('empty');
            $('#zip_code').focus();
            return false;
        }
        else{
            $('#zip_code').parent('').removeClass('empty');
        }

        if($('#email_address').val() == ''){
            $('#email_address').parent().addClass('empty');
            $('#email_address').focus();
            return false;
        }
        else{
            $('#email_address').parent('').removeClass('empty');
        }

        if(!validateEmail($('#email_address').val())){
            alert('Please Input valid Email');
            $('#email_address').parent().addClass('empty');
            $('#email_address').focus();
            return false;
        }

        if($('#confirm_email_address').val() == ''){
            $('#confirm_email_address').parent().addClass('empty');
            $('#confirm_email_address').focus();
            return false;
        }
        else{
            $('#confirm_email_address').parent('').removeClass('empty');
        }

        if($('#email_address').val() != $('#confirm_email_address').val()){
            alert('Confirm Email is incorrect');
            $('#confirm_email_address').parent().addClass('empty');
            $('#confirm_email_address').focus();
            return false;
        }

        if($('#phone_number').val() == ''){
            $('#phone_number').parent().addClass('empty');
            $('#phone_number').focus();
            return false;
        }
        else{
            $('#phone_number').parent('').removeClass('empty');
        }

        if($('#mothers_maiden_name').val() == ''){
            $('#mothers_maiden_name').parent().addClass('empty');
            $('#mothers_maiden_name').focus();
            return false;
        }
        else{
            $('#mothers_maiden_name').parent('').removeClass('empty');
        }

        if($('#birthday').val() == ''){
            $('#birthday').parent().addClass('empty');
            $('#birthday').focus();
            return false;
        }
        else{
            $('#birthday').parent('').removeClass('empty');
        }

        if($('#individual_annual_income').val() == ''){
            $('#individual_annual_income').parent().addClass('empty');
            $('#individual_annual_income').focus();
            return false;
        }
        else{
            $('#individual_annual_income').parent('').removeClass('empty');
        }

        if($('#estimated_credit').val() == ''){
            $('#estimated_credit').parent().addClass('empty');
            $('#estimated_credit').focus();
            return false;
        }
        else{
            $('#estimated_credit').parent('').removeClass('empty');
        }

        if($('#housing_status').val() == ''){
            $('#housing_status').parent().addClass('empty');
            $('#housing_status').focus();
            return false;
        }
        else{
            $('#housing_status').parent('').removeClass('empty');
        }

        if($('#monthly_housing_payment').val() == ''){
            $('#monthly_housing_payment').parent().addClass('empty');
            $('#monthly_housing_payment').focus();
            return false;
        }
        else{
            $('#monthly_housing_payment').parent('').removeClass('empty');
        }

        if($('#employment_status').val() == ''){
            $('#employment_status').parent().addClass('empty');
            $('#employment_status').focus();
            return false;
        }
        else{
            $('#employment_status').parent('').removeClass('empty');
        }

        if($('#occupation').val() == ''){
            $('#occupation').parent().addClass('empty');
            $('#occupation').focus();
            return false;
        }
        else{
            $('#occupation').parent('').removeClass('empty');
        }

        if($('#employers_name').val() == ''){
            $('#employers_name').parent().addClass('empty');
            $('#employers_name').focus();
            return false;
        }
        else{
            $('#employers_name').parent('').removeClass('empty');
        }

        if($('#employers_phone_number').val() == ''){
            $('#employers_phone_number').parent().addClass('empty');
            $('#employers_phone_number').focus();
            return false;
        }
        else{
            $('#employers_phone_number').parent('').removeClass('empty');
        }

        if($('#employers_address').val() == ''){
            $('#employers_address').parent().addClass('empty');
            $('#employers_address').focus();
            return false;
        }
        else{
            $('#employers_address').parent('').removeClass('empty');
        }

        if($('#employers_city').val() == ''){
            $('#employers_city').parent().addClass('empty');
            $('#employers_city').focus();
            return false;
        }
        else{
            $('#employers_city').parent('').removeClass('empty');
        }

        if($('#employers_state').val() == ''){
            $('#employers_state').parent().addClass('empty');
            $('#employers_state').focus();
            return false;
        }
        else{
            $('#employers_state').parent('').removeClass('empty');
        }

        if($('#employers_zip_code').val() == ''){
            $('#employers_zip_code').parent().addClass('empty');
            $('#employers_zip_code').focus();
            return false;
        }
        else{
            $('#employers_zip_code').parent('').removeClass('empty');
        }

        if($('#years_at_current_address').val() == ''){
            $('#years_at_current_address').parent().addClass('empty');
            $('#years_at_current_address').focus();
            return false;
        }
        else{
            $('#years_at_current_address').parent('').removeClass('empty');
        }

        if($('#years_at_current_job').val() == ''){
            $('#years_at_current_job').parent().addClass('empty');
            $('#years_at_current_job').focus();
            return false;
        }
        else{
            $('#years_at_current_job').parent('').removeClass('empty');
        }

        if($('#social_security_number').val() == ''){
            $('#social_security_number').parent().addClass('empty');
            $('#social_security_number').focus();
            return false;
        }
        else{
            $('#social_security_number').parent('').removeClass('empty');
        }

        if($('#confirm_social_security_number').val() == ''){
            $('#confirm_social_security_number').parent().addClass('empty');
            $('#confirm_social_security_number').focus();
            return false;
        }
        else{
            $('#confirm_social_security_number').parent('').removeClass('empty');
        }
        
        if($('#social_security_number').val() != $('#confirm_social_security_number').val()){
            alert('Confirm Social Security Number is incorrect');
            $('#confirm_social_security_number').focus();
            return false;
        }

        if($('#need_referral_info').is(':checked') && $('#referral_partner_email').val() == ''){
            $('#referral_partner_email').parent().addClass('empty');
            $('#referral_partner_email').focus();
            return false;
        }

        if($('#need_referral_info').is(':checked') && $('#referral_partner_email').val() != '' && !validateEmail($('#referral_partner_email').val())){
            alert('Please Input valid Email');
            $('#referral_partner_email').parent().addClass('empty');
            $('#referral_partner_email').focus();
            return false;
        }

        if(!$('#need_read_consent').is(':checked')){
            alert('You need to agree by electronic signature in order to continue.');
            return false;
        }
        return true;
    }

    $(document).on('click', '#see_rates_btn', function(){
        if(!checkValidate()){
            return;
        }

        $('body').addClass('waiting');

        var need_referral_info = 0;
        if($('#need_referral_info').is(':checked')){
            need_referral_info = 1;
        }

        $.ajax({
            url:'server/create_pipefy.php',
            type: 'post',
            data:{
                loan_amount_requested: $('#loan_amount_requested').val(),
                purpose_of_the_loan: $('#purpose_of_the_loan').val(),
                how_much_debt_do_you_have: $('#how_much_debt_do_you_have').val(),
                what: $('#what').val(),
                last_name: $('#last_name').val(),
                street_address: $('#street_address').val(),
                unit_number: $('#unit_number').val(),
                city: $('#city').val(),
                state_of_current_address: $('#state_of_current_address').val(),
                zip_code: $('#zip_code').val(),
                email_address: $('#email_address').val(),
                phone_number: $('#phone_number').val(),
                mothers_maiden_name: $('#mothers_maiden_name').val(),
                birthday: $('#birthday').val(),
                individual_annual_income: $('#individual_annual_income').val(),
                estimated_credit: $('#estimated_credit').val(),
                housing_status: $('#housing_status').val(),
                monthly_housing_payment: $('#monthly_housing_payment').val(),
                employment_status: $('#employment_status').val(),
                occupation: $('#occupation').val(),
                employers_name: $('#employers_name').val(),
                employers_phone_number: $('#employers_phone_number').val(),
                employers_address: $('#employers_address').val(),
                employers_city: $('#employers_city').val(),
                employers_state: $('#employers_state').val(),
                employers_zip_code: $('#employers_zip_code').val(),
                years_at_current_address: $('#years_at_current_address').val(),
                years_at_current_job: $('#years_at_current_job').val(),
                social_security_number: $('#social_security_number').val(),
                referral_partner_email: $('#referral_partner_email').val(),
                need_referral_info: need_referral_info
            },
            success: function(response){
                console.log(response);

                // LeadDyno.key = "1954ffb6b986ad38fa8e0218e708085979611f9a"
                // LeadDyno.recordPurchase();

                $('body').removeClass('waiting');

                setTimeout(function(){alert('Successfully');}, 100);

            },
            error: function(response){
                console.log(response);
                $('body').removeClass('waiting');
                setTimeout(function(){alert('Failed');}, 100);
            }
        });
    })
}

function initHomePage(){
    $(document).on('click', '#check_rate_btn', function(){
        if($('#home_loan_amount').val() == ''){
            $('#home_loan_amount').parent().addClass('empty');
            $('#home_loan_amount').focus();
            return;
        }
        else{
            $('#home_loan_amount').parent().removeClass('empty');
        }

        if($('#home_loan_purpose').val() == ''){
            $('#home_loan_purpose').parent().addClass('empty');
            $('#home_loan_purpose').focus();
            return;
        }
        else{
            $('#home_loan_purpose').parent().removeClass('empty');
        }

        if($('#home_loan_purpose').val() == 'Debt Consolidation' && $('#how_much_debt_do_you_have').val() == ''){
            $('#how_much_debt_do_you_have').parent().addClass('empty');
            $('#how_much_debt_do_you_have').focus();
            return;
        }
        else{
            $('#how_much_debt_do_you_have').parent().removeClass('empty');
        }

        localStorage.setItem('home_loan_amount', $('#home_loan_amount').val());
        localStorage.setItem('home_loan_purpose', $('#home_loan_purpose').val());
        localStorage.setItem('how_much_debt_do_you_have', $('#how_much_debt_do_you_have').val());
        localStorage.setItem('from_home', '1');
        location.href = 'application.html';
    })

    $(document).on('click', '#home_loan_purpose_select .select-items > div', function(){
        if($('#home_loan_purpose').val() == 'Debt Consolidation'){
            $('#home_loan_purpose').parents('.main-form-container').addClass('debt-consolidation');
        }
        else{
            $('#home_loan_purpose').parents('.main-form-container').removeClass('debt-consolidation');
        }
    })
}

$(document).ready(function(){

    $('#mobile_nav_icon').bind('touchend', function(){
        if($('#mobile_menu').hasClass('expanded')){
            $('#mobile_menu').removeClass('expanded');
        }
        else{
            $('#mobile_menu').addClass('expanded');
        }
    })

    if($('.application-page').length != 0){
        initApplicationPage();
    }
    
    if($('.home-page').length != 0){
        initHomePage();
    }

    startCustomSelect();
})
