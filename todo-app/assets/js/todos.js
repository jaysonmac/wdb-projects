$('ul').on('click', 'li', function() {
  $(this).toggleClass('done');
});

$('ul').on('click', '.delete', function(e) {
  $(this).parent().slideUp(400, function() {
    $(this).remove();
  });
  e.stopPropagation();
});

$('input[type="text"]').keypress(function(e) {
  if(e.which==13 && $(this).val()!='') {
    var todo = '<li><span class="delete"><i class="far fa-trash-alt"></i></span> '+$(this).val()+'</li>';
    $('ul').append(todo);
    $(this).val('');
  }
});

$('h1').on('click', '.fa-plus, .fa-minus', function() {
  $('input[type="text"]').stop().slideToggle();
  $(this).toggleClass("fa-plus fa-minus");
});