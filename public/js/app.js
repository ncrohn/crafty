$(function() {

  var buttons = $('tr button');

  buttons.click(function(event) {
    event.preventDefault();

    var $this = $(this);
    var id = $this.parents('tr').attr('data-id');

    $.post('/start/'+id).success(function() {
      $this.hide();
    });

  });

});