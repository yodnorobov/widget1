define(['jquery', 'lib/components/base/modal'], function ($, Modal) {

  var Contact = {};

  Contact.data = [];
  Contact.type = [];

  Contact.render = function (self) {

    //console.log(self.system().area);

    if (self.system().area === 'cucard' || 'lcard') {
      console.log(self.system().area);
    }

    //var lang = self.i18n('userLang');
    //w_code = self.get_settings().widget_code; //в данном случае w_code='new-widget'
    //
    //console.log(w_code);

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

  Contact.bind_function = function (self) {
    if (self.system().area === 'culist' || 'llist') {

      $('.search_field_text').keyup(function () {
        var value = $('.search_field_text').val();

        console.log(self.get_settings().widget_code);
        console.log(self.get_settings().password);
        console.log(self.get_settings().hash);

        //console.log(value);

        $.ajax({
          type: "GET",
          url: 'https://yodnorobov.amocrm.ru/widgets/yodnorobov/loader/code_43/proxy/?value=%D0%B1%D0%BB%D0%BE%D0%BA%D0%B8%D1%80%D0%BE%D0%B2%D0%BA%D0%B0&amouser=yodnorobov@team.amocrm.com&amohash=35f0cde343e0d07871c275b5c2e1e149',
          success: function (data) {
            console.log(
              Contact.display_modal()
            )
          }
          //dataType: 'json'
        });
      });

      //$('.ac-form-button').on('click', function () {
      //  var search_data = $('.search_field_text').text();
      //  console.log('BUTTON CLICKED' + search_data);
      //});
    }
    return true;
  };

  Contact.display_modal = function () {
    //var string = '';
    //for (var i = 0; i < contacts.length; i++) {
    //  string = string + contacts[i];
    //}
    //if (contacts[0].length !== 0) {
    var modal = Contact.modal("есть дубли!");
    setTimeout(modal.destroy.bind(modal), 5000);
    //}
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

  Contact.init = function (self) {
    console.log('init');
    return true;
  };
  return Contact;
});
