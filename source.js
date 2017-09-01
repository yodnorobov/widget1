define(['jquery', 'lib/components/base/modal'], function ($, Modal) {
  var Contact = {};

  Contact.data = [];
  Contact.type = [];

  Contact.render = function (self) {

    console.log('render function');
    console.log(self.system().area);

    if (self.system().area === 'cucard' || 'lcard') {
      console.log(self.system().area);
    }

    var lang = self.i18n('userLang');
    w_code = self.get_settings().widget_code; //в данном случае w_code='new-widget'

    console.log(w_code);

    self.render_template({
      caption: {
        class_name: 'js-ac-caption',
        html: ''
      },
      body: '',
      render: '\
                  <input class="search_field_text" name="q" type="text">'
    });

    return true;
  };

  Contact.modal = function (data) {
    var modal = new Modal({
      class_name: 'modal-window',
      init: function ($modal_body) {
        var $this = $(this);
        $modal_body
          .trigger('modal:loaded') //запускает отображение модального окна
          .html(data)
          .trigger('modal:centrify')  //настраивает модальное окно
          .append('<span class="modal-body__close">X<span class="icon icon-modal-    close"></span></span>');
      },
      destroy: function () {
      }
    });
    return modal;
  };

  Contact.bind_function = function (self) {
    if (self.system().area === 'culist' || 'llist') {

      $('.search_field_text').keyup(function(){
        var value = $('.search_field_text').val();

        console.log(value);

        $.ajax({
          type: "GET",
          url: 'https://amobase.amocrm.ru/article/search?q=' + value + '&page=1&',
          success: function(data){console.log(data)}
          //dataType: 'json'
        });

        //$('#errmsg').empty();
        //$('#errmsg').text(Value);
      });

      //$('.ac-form-button').on('click', function () {
      //  var search_data = $('.search_field_text').text();
      //  console.log('BUTTON CLICKED' + search_data);
      //});
    }
    return true;
  };

  Contact.display_modal = function (contacts) {
    var string = '';
    for (var i = 0; i < contacts.length; i++) {
      string = string + contacts[i];
    }
    if (contacts[0].length !== 0) {
      var modal = Contact.modal("есть дубли! " + '<br>' + string);
      setTimeout(modal.destroy.bind(modal), 5000);
    }
  };

  Contact.init = function (self) {
    console.log('init');
    return true;
  };
  return Contact;
});
