define(['jquery', 'lib/components/base/modal'], function ($, Modal) {
    var Contact = {};

    Contact.data = [];
    Contact.type = [];
    
    Contact.settings_function = function (self){
        console.log('settings callback');
        console.log(self);
        console.log(self.get_settings());
        self.get_settings().acccount = 42;
        console.log(self.get_settings());
    }

//     Contact.csv_request = function () {
//         var request = 'https://yodnorobov2.amocrm.ru/ajax/' + Contact.type + '/export/?&export_type=csv';
//         for (var i = 0; i < Contact.data.length; i++) {
//             request = request + '&filter[ID][' + i + ']=' + Contact.data[i]['ids'];
//         }
//         document.location.href = request;
//     };

//     Contact.ids_getter = function (self) {

//         console.log('id getter');
        
//         var c_data = self.list_selected().selected;
//         console.log(c_data);
        
//         // $('#js-sub-lists-container').children().remove(); //Контейнер очищается затем в контейнер собираются элементы, выделенные в списке.контейнер - div блок виджета, отображается в правой колонке.
//         var names = [], // Массив имен
//             length = c_data.length; // Количество выбранных id (отсчет начинается с 0)
//         for (var i = 0; i < length; i++) {
//             names[i] = {
//                 ids: c_data[i].id
//             };
//         }


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
        
        console.log(self.get_settings());        
        
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
        
        console.log('render function');
        console.log(self.system().area);
        
        if (self.system().area === 'cucard' || 'lcard') {
            
            console.log(self.system().area);
        }
        
        
//         self.add_call_notify = function(mess){
//     var w_name = self.i18n('widget').name,
//         date_now = Math.ceil(Date.now()/1000),
//         lang = self.i18n('settings'),
//         n_data = {
//             from: mess.from,
//             to: mess.to,
//             duration: mess.duration,
//             link: mess.link,
//             text: w_name + ': ' + mess.text,
//             date: date_now
//         };
 
//     if (mess.element && mess.element.id && mess.element.type){
//         n_data.element = mess.element;
//     }
   
//     AMOCRM.notifications.add_call(n_data);
// };
 
// /*---------------------------------------*/
// var notify_data={};
// notify_data.from = '+7 (999) 111 22 33';
// notify_data.to = 'User Name';
// notify_data.duration = 65;
// notify_data.link = 'https://example.com/dialog.mp3';
// notify_data.text = 'Widget text';
// notify_data.element = { id: 1003619, type: "contact" };
 
// self.add_call_notify(notify_data);
        
        //$(function() {    
        //    console.log('loaded');
        //    $('#widgets_block').show();
        //});
        
        console.log('render');
        console.log(self.get_settings());
        
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
        if (self.system().area === 'clist' || 'llist') {
            $('.ac-form-button').on('click', function () {
//                 Contact.csv_request();
            });
        // }
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
//         if (self.system().area === 'ccard') {
//             self.contacts = Contact.get_ccard_info(self);
//         }
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

