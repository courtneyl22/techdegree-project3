//Project 3 Interactive Form

$('#name').focus();      //focuses on the name input element on load.

//job role

$('#other-title').hide();                  //by default, the 'other' input field is hidden.
$('#title').on('change', function() {          
  if($('#title').val() === 'other'){    //with this function, when & only when the 'other' option is selected, the 'other' input field is visible.
    $('#other-title').show().focus();
  } else {
    $('#other-title').hide();
  } 
});

//t-shirt info

$('#colors-js-puns').hide()
$('#design').on('change', function() {

  if($('#design').val() == 'js puns') {
    for (let i = 0; i < $('#color').children().length; i ++) {
        const stringOption = $('#color').children().eq(i).text();   //I want to show only the colors for Heart JS design here.
        const stringPuns = stringOption.indexOf('JS Puns'); 

        $('#colors-js-puns').show();
        if (stringPuns >= 0) {
          $('#color').children().eq(i).show();
          $('#color').children().eq(i).attr('selected', true);
        } else{
          $('#color').children().eq(i).hide();
        }
      } 
  } else if ($('#design').val() == 'heart js') {
    for (let i = 0; i < $('#color').children().length; i ++) {
      const stringOption = $('#color').children().eq(i).text();     //I want to show only the colors for Heart JS design here.
      const stringJS = stringOption.indexOf('JS shirt');

      $('#colors-js-puns').show();

      if (stringJS >= 0) {
        $('#color').children().eq(i).show();
        $('#color').children().eq(i).attr('selected', true);
      } else{
        $('#color').children().eq(i).hide();
      }
    } 
  } else {
    $('#colors-js-puns').hide();
  }
});

//register for activities

let totalCost = 0;
$('.activities').append('<label>Total Cost: $0</label>');

$('.activities').on('change', function (event) {
  //first set of activities that are conflicting

  const $frameworks = $('input[name="js-frameworks"]');
  const $express = $('input[name="express"]');
  
  if ($frameworks.is(':checked')) {             //preventing express workshop from being selected while js frameworks is selected
    $express.prop('disabled', true);
  } else {
    $express.prop('disabled', false);
  }

  if ($express.is(':checked')) {              //preventing js frameworks from being selected while express workshop is selected
    $frameworks.prop('disabled', true); 
  } else {
    $frameworks.prop('disabled', false);
  }

  //second set of activities that are conflicting

  const $libs = $('input[name="js-libs"]');
  const $node = $('input[name="node"]');

  if ($libs.is(':checked')) {                 //preventing node workshop from being selected while js libraries is selected
    $node.prop('disabled', true);
  } else {
    $node.prop('disabled', false);
  }

  if ($node.is(':checked')) {                //preventing js libraries workshop from being selected while node is selected
    $libs.prop('disabled', true);
  } else {
    $libs.prop('disabled', false);
  }

  //calculating total cost of activities

  let checkedActivity = event.target;                               
  let activityText = checkedActivity.parentNode.textContent;        //this gathers the entire text of the selected checkbox's parent, label
  let priceIndex = activityText.indexOf('$');                       //this now gathers the text of the selected, only starting with '$'
  let price = activityText.slice(priceIndex + 1);                   

  if (checkedActivity.checked) {
    totalCost += parseInt(price);
  } else {
    totalCost -= parseInt(price);
  }

  $('.activities label').last().text('Total Cost: $' + totalCost);
});

//payment info 

const $paypal = $("body > div > form > fieldset:nth-child(5) > div:nth-child(5) > p");    //to keep the paragraph tags separate, I created 2 variables and 
const $bitcoin = $("body > div > form > fieldset:nth-child(5) > div:nth-child(6) > p");   //assigned the element's path to them.
$('option[value=select_method]').hide();
$('select option[value="credit card"]').attr("selected", true);
$($paypal).hide();
$($bitcoin).hide();

$('#payment').on('change', function() {
  if($('#payment').val() === 'credit card'){              //whenever credit card is selected.
    $('#credit-card').show();
    $('#cc-num').focus();
    $($paypal).hide();
    $($bitcoin).hide();
  } else if ($('#payment').val() === 'paypal') {          //whenever paypal is selected.
    $($paypal).show();
    $($bitcoin).hide();
    $('#credit-card').hide();
  } else {                                                //whenever bitcoin is selected.
    $($bitcoin).show();
    $($paypal).hide();
    $('#credit-card').hide();
  }
});


/**
 * 
 * validation
 * 
*/ 

//validation functions for each required section

const validName = () => {
  let $nameInput = $('#name');

  //name field cannot be empty 
    let $validName = $nameInput.val();
    if($validName) {
      $nameInput.removeClass('invalid').addClass('valid');
      $('#name').prev().text('Name:').css('color', 'black');
      return true;
    } else {
      $nameInput.removeClass('valid').addClass('invalid');
      $nameInput.prev().text('Enter a name').css('color', 'red');
      return false;
    }
} 

const validEmail = () => {
  let $emailInput = $('#mail');

  // Must be a valid email address
    let regex = /^[^@]+@[^@.]+\.[a-z]+$/i;
    let $validEmail = regex.test($emailInput.val());
    if ($validEmail) {
      $emailInput.removeClass('invalid').addClass('valid');
      $emailInput.prev().text('Email:').css('color', 'black');
      return true;
    } else if ($emailInput.val() !== '') { 
      $emailInput.removeClass('valid').addClass('invalid');
      $emailInput.prev().text('Enter valid email').css('color', 'red');
    return false;
    } else {
      $emailInput.removeClass('valid').addClass('invalid');
      $emailInput.prev().text('Email cannot be empty').css('color', 'red');
      return false;
    }
}

//real-time validation for email
$('#mail').on("input", () => {
  validEmail()
});
  
const validCreditCard = () => {
  let $ccNumber = $('#cc-num');
   
  //13 to 16 digits for cc number
  let regex = /^\d{13,16}$/;
  let $validCc = regex.test($ccNumber.val());
  if ($validCc) {
    $ccNumber.removeClass('invalid').addClass('valid');
    $ccNumber.prev().text('Card Number:').css('color', 'black');
    return true;
  } else { 
    $ccNumber.removeClass('valid').addClass('invalid');
    $ccNumber.prev().text('Enter a valid card number').css('color', 'red');
    return false;
  }
}

const validZipCode = () => {
  let $zipCode = $('#zip')  
  let regex = /\d{5}/;
  let $validZip = regex.test($zipCode.val());
  
  //5 digits for zip code
  if ($validZip) {
    $zipCode.removeClass('invalid').addClass('valid');
    $zipCode.prev().text('Zip Code:').css('color', 'black');
    return true;
  } else {
    $zipCode.removeClass('valid').addClass('invalid');
    $zipCode.prev().text('Enter a zip code').css('color', 'red');
    return false;
  }
}

const validCvv = () => {
  let $cvv = $('#cvv');
  let regex = /\d{3}/;
  let $validCvv = regex.test($cvv.val());

  //3 digits for cvv 
  if ($validCvv) {
    $cvv.removeClass('invalid').addClass('valid');
    $cvv.prev().text('CVV:').css('color', 'black');
    return true;
  } else { 
    $cvv.removeClass('valid').addClass('invalid');
    $cvv.prev().text('Enter a CVV').css('color', 'red');
    return false;  
  }
}

//making sure an activity is checked
const validActivities = () => {
    let $activityInput = $('.activities input:checked');
    let $activityLegend = $('.activities legend');
    if ($activityInput.length > 0) {      
      $activityLegend.text('Register for Activities:').css('color', '#817402e6');
      return true;        
    } else {
      $activityLegend.text('Please Select an Activity').css('color', 'red');
      return false;
    }
}

//making sure everything is validated when the register button is clicked.
$('form').on('submit', function(e){
  if ($('#payment').val() === 'credit card') {
    if(validName() & validEmail() & validActivities() & validCreditCard() & validCvv() & validZipCode()) {
      alert('Successfully Registered!');
      return true;
    } else {
      e.preventDefault();
      alert('Please fill out required fields.');
      return false;
    }
  }  else {
      if (validName() & validEmail() & validActivities()) {
        alert('Successfully Registered!');
      } else {
        e.preventDefault();
        alert('Please fill out required fields');
      }
  }
}); 