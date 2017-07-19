define(['jquery', 'lib/components/base/modal'], function ($, Modal) {
    var Contact = {};

    Contact.data = [];
    Contact.type = [];

    Contact.csv_request = function () {
        var request = 'https://yodnorobov2.amocrm.ru/ajax/' + Contact.type + '/export/?&export_type=csv';
        for (var i = 0; i < Contact.data.length; i++) {
            request = request + '&filter[ID][' + i + ']=' + Contact.data[i]['ids'];
        }
        document.location.href = request;
    };

    Contact.ids_getter = function (self) {

        console.log('id getter');

        
        var c_data = self.list_selected().selected;
        console.log(c_data);
        
        // $('#js-sub-lists-container').children().remove(); //Контейнер очищается затем в контейнер собираются элементы, выделенные в списке.контейнер - div блок виджета, отображается в правой колонке.
        var names = [], // Массив имен
            length = c_data.length; // Количество выбранных id (отсчет начинается с 0)
        for (var i = 0; i < length; i++) {
            names[i] = {
                ids: c_data[i].id
            };
        }


        for (i = 0; i < length; i++) {
            $('#js-ac-sub-lists-container').append('<p>ID:' + names[i].ids + '</p>');
        }
        Contact.data = names;
    };

    Contact.leads_selected = function (self) {
        //self.widgetsOverlay(false);
        Contact.ids_getter(self);
        Contact.type = 'leads';
        Contact.csv_request();
    };

    Contact.contacts_selected = function (self) {
        
        console.log('selected');
        
        //$(".list-multiple-actions__item__icon.icon.icon-delete-trash").after("<div class='item'>Тест</div>") 
        
        //self.widgetsOverlay(false);
        //Contact.ids_getter(self);
        //Contact.type = 'contacts';
        //Contact.csv_request();
    };
    
        Contact.customers_selected = function (self) {
        //self.widgetsOverlay(false);
        console.log(self);
        //var c_data = self.list_selected().selected;
        //console.log(c_data);
        Contact.type = 'customers';
        Contact.ids_getter(self);
    };

    Contact.render = function (self) {
        
        //$(function() {    
        //    console.log('loaded');
        //    $('#widgets_block').show();
        //});
        
        console.log('render');
        
        //$('body').on('click', '.icon-delete-trash', function(){console.log('42append42')});
        
        //$(".icon-delete-trash").on('appendCompleted', function(){
    //console.log('append completed');
//});
        
        
        
        //$(".list-multiple-actions__item__icon.icon.icon-delete-trash").after("<div class='item'>Тест</div>") 
        
        //$(".control-checkbox__body").children().each(function(){
            //settimeout($(".list-multiple-actions__item__icon.icon.icon-delete-trash").after("<div class='item'>Тест</div>"),1000)
        //}

        //self.widgetsOverlay(false);

        console.log(self.system().area);

        // console.log('render');
        // console.log(self.system().area);
        //
        var lang = self.i18n('userLang');
        w_code = self.get_settings().widget_code; //в данном случае w_code='new-widget'
        //
        self.render_template({
             caption: {
                 class_name: 'js-ac-caption',
                 html: ''
             },
             body: '',
             render: '\
                   <div class="ac-form">\
               <div id="js-ac-sub-lists-container">\
               </div>\
                   <div id="js-ac-sub-subs-container">\
                   </div>\
                   <div class="ac-form-button ac_sub">SEND</div>\
                   </div>\
               <div class="ac-already-subs"></div>\
                   <link type="text/css" rel="stylesheet" href="./style.css" >'
         });
         console.log('rendering end');
         Contact.init(self);
        return true;
    };

    Contact.bind_function = function (self) {
        // if (self.system().area === 'clist' || 'llist') {
            $('.ac-form-button').on('click', function () {
                Contact.csv_request();
            });
        // }
        return true;
    };

    Contact.get_ccard_info = function (self) //Сбор информации из карточки контакта
    {
        if (self.system().area === 'ccard') {
            var phones = $('.js-linked-with-actions.js-linked-has-actions.js-linked-has-value .linked-form__cf.text-input');
            var new_phones = [];
            for (var i = 0; i < phones.length; i++) {
                new_phones.push(phones[i].defaultValue.replace(/[^0-9]/g, ''));
            }

            var url = window.location.href;
            var strArray = url.split('/');
            var current_id = strArray.pop();

            var promises = [];
            for (var j = 0; j < new_phones.length; j++) {
                promises.push(new Promise(function (resolve, reject) {
                    var phone = new_phones.pop();
                    var link = '/private/api/v2/json/contacts/list?query=' + phone;
                    $.get(link,
                        function (data) {
                            var result = [];
                            var len = data['response']['contacts'].length;
                            for (var i = 0; i < len; i++) {
                                if (parseInt(data['response']['contacts'][i]['id']) === parseInt(current_id)) {
                                    continue;
                                }
                                result.push(data['response']['contacts'][i]['name'].link('https://yodnorobov2.amocrm.ru/contacts/detail/' + data['response']['contacts'][i]['id']) + '<br>');
                            }
                            resolve(result);
                        }, "json");
                }));
            }
            Promise.all(promises).then(function (results) {
                Contact.display_modal(results);
            });
        }
        else {
            return false;
        }
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
        if (self.system().area === 'ccard') {
            self.contacts = Contact.get_ccard_info(self);
        }
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
    return Contact;
});

