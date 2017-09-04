define(['jquery', 'lib/components/base/modal'], function ($, Modal) {

  var Contact = {};

  Contact.render = function (self) {
    if (self.system().area === 'cucard' || 'lcard') {
      console.log(self.system().area);
    }

    self.render_template({
      caption: {
        class_name: 'js-ac-caption',
        html: ''
      },
      body: '',
      render: '\
        <input class="search_field_text" name="q" type="text">\
        <link type="text/css" rel="stylesheet" href="https://yodnorobov.github.io/widget1/style.css" >'
    });

    return true;
  };

  Contact.bind_function = function (self) {
    if (self.system().area === 'cucard' || 'lcard') {
      var globalTimeout = null;
      
      $('.search_field_text').keyup(function () {
        
         if (globalTimeout != null) {
    clearTimeout(globalTimeout);
  }
  globalTimeout = setTimeout(function() {
    globalTimeout = null;  
        var value = $('.search_field_text').val();
        console.log(value);
        var url = 'https://' + AMOCRM.widgets.system.subdomain + '.amocrm.ru/widgets/' + AMOCRM.widgets.system.subdomain + '/loader/code_47/proxy2/?link=https://amobase.amocrm.ru/search?q=' + value + '&page=1&amouser=' + AMOCRM.widgets.system.amouser + '&amohash=' + AMOCRM.widgets.system.amohash;
        var url2 = 'https://test1-yodnorobov.codeanyapp.com/proxy.php';
        $.ajax({
          type: "GET",
          url: url,
          data: {"link":"https://amobase.amocrm.ru/article/search?q=" + value},
          success: function (data) {
            Contact.display_modal(data);
          }
        });
      }, 2000);
      });
    }
    return true;
  };
  Contact.display_modal = function (data) {
    var modal = Contact.modal(data);
    //setTimeout(modal.destroy.bind(modal), 5000);
    //}
  };
  Contact.modal = function (data) {
    var modal = new Modal({
      class_name: 'modal-window',
      init: function ($modal_body) {
        
        $modal_body.css({
                                        width: '50%',
                                        height: '100%',
                                        overflow : 'auto',
                                        padding: '0',
          
                                    });
        
        var $this = $(this);
        $modal_body
          .trigger('modal:loaded') //запускает отображение модального окна
          .html('<div>' + data + '<div>')
          .trigger('modal:centrify')  //настраивает модальное окно
          .append('<span class="modal-body__close"><span class="icon icon-modal-close"></span></span>');
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
