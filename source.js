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

        //console.log(self.get_settings().widget_code);
        //console.log(self.get_settings().password);
        //console.log(self.get_settings().hash);
        //url: 'http://amobase.saas/article/search?q=contacts'

        console.log(AMOCRM.widgets.system);

        var url = 'https://' + AMOCRM.widgets.system.subdomain + '.amocrm.ru/widgets/' + AMOCRM.widgets.system.subdomain + '/loader/code_44/proxy/?link=http://amobase.saas/article/search?q=' + value + '&page=1&amouser=' + AMOCRM.widgets.system.amouser + '&amohash=' + AMOCRM.widgets.system.amohash;

        
        var data1 = jQuery('Как вывести на экран большее количество контактов/компаний?

Контакты/Компании → Просмотр/Редактирование/Управление
... рейдите по ссылке: https://ACCAUNT.amocrm.ru/contacts/list/?ELEMENT_COUNT=500слово "аккаунт", надо ...
Раскрыть
Чтобы вывести 500 контактов в новой версии,перейдите по ссылке: https://ACCAUNT.amocrm.ru/contacts/list/?ELEMENT_COUNT=500
слово "аккаунт", надо заменить на ваш поддомен аккаунта.

Чтобы сделать это для старой версии, Вам нужно справа внизу изменить количество контактов, показываемых на странице, например с 50 на 30. Далее, в адресной строке в самом конце найдите число "30", замените его на "500" и нажмите enter. У вас на странице будут показаны 500 контактов.

Если вы хотите вывести 500 контактов одновременно с использованием какого-либо фильтра, то вам необходимо применить нужный вам фильтр, а затем в адресной строке добавить &ELEMENT_COUNT=500.

ВАЖНО! Больше контактов на одной странице вывести нельзя, только 50 (стандартно) или 500.').text();


';
        
        console.log(url);
        $.ajax({
          type: "GET",
          url: url,
          success: function (data) {
            console.log(data);
            Contact.display_modal(data1);
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
  Contact.display_modal = function (data) {
    //var string = '';
    //for (var i = 0; i < contacts.length; i++) {
    //  string = string + contacts[i];
    //}
    //if (contacts[0].length !== 0) {
    var modal = Contact.modal(data);
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
