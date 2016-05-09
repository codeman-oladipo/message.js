/*****************************************************************************************
Author : Adebanji Oguntade
Project : Message.js is a micro javascript framework for displaying messages on a web page
******************************************************************************************/

(function(){
  /* try { */
        var obj = {};
        var htmlStr = '<img src="images/close.png" class="closeIcon" alt="" /><img src=""   class="placeholder" alt="" /><div inner></div>'
        var themes = ['grey', 'aurora', 'azure', 'dark', 'light', 'default_theme']
        var icons = ['alert', 'info', 'mark', 'img']  
        var timeouts = ['1', '2', '3', '4', '5', '6', '7', '8']
        var fadeEffects = ['fadeOut', 'slideDown']
            
/*obj.elements = {
        'messageBox' : $('ul[message]'),
        'closeButton' :  $('.closeIcon'),
        'messageItem' : $('ul[message] li'),
        'themes' : $('ul[theme]')
    };*/
       
       obj.elements = {
        'messageBox' : document.querySelectorAll('ul[message]'),
        'closeButton' : document.querySelectorAll('.closeIcon'),
        'messageItem' : document.querySelectorAll('ul[message] li'),
        'themes' : document.querySelectorAll('ul[message] li'),
    };
    
obj.effects = {
      
       fadeOut : function() {
           return $(this).parent().fadeOut("fast", clear);
                },
       slideDown : function() {
            return $(this).parent().hide("fast", clear);
                },
       noEffect : function() {
            return $(this).parent().slideDown("fast", clear);
                },
       getStyle : function() {
           return obj.elements.messageBox[0].getAttribute('fadeStyle')
        } 
    }
    
obj.methods = {
        
IsvalidProp : function(item, arr) {
                if (arr.indexOf(item) == -1) {
                    return false;
                  }
                    return true;
                 },
        
getThemes :  function(elem){
             var theme_name = obj.elements.messageBox[0].getAttribute('theme');
             var getStyle = obj.elements.messageBox[0].getAttribute('fadeStyle');

             if (this.IsvalidProp(getStyle, fadeEffects)) {     
                $('ul[message]').find('img.closeIcon').on('click', obj.effects[getStyle]);       
                   } else {
                $('ul[message]').find('img.closeIcon').on('click', obj.effects['noEffect']) 
               }

             if (this.IsvalidProp(theme_name, themes)) {
                 elem.children('div[inner]').addClass(theme_name);
                  } else {
                 elem.children('div[inner]').addClass('default_theme'); 
               }                  
               },
    
getIcons : function() {         
           $.each(obj.elements.messageItem, function(key, value){
           var self = $(this)
           var content = $(this).text();
           var iconType = value.getAttribute('icon');
           self.empty().append(htmlStr);
           self.find('div[inner]').text(content);
           self.parent    
              switch(iconType) {
                      case 'alert' : 
                      self.children('img.placeholder').attr('src' , 'images/alert.png');    
                      break;
                      case 'info' : 
                      self.children('img.placeholder').attr('src' , 'images/info.png'); 
                      break;
                      case 'mark' :
                      self.children('img.placeholder').attr('src' , 'images/mark.png');
                      break;
                      case 'error' :
                      self.children('img.placeholder').attr('src' , 'images/error.png');
                      break;
                      default :
                      self.children('img.placeholder').remove();
              }
          }); 
      },
        
timeoutManager : function() {
       var timeout_value = obj.elements.messageBox[0].getAttribute('timeout');
         /*if (obj.elements.messageBox.attr('timeout')) {     */    
             if (this.IsvalidProp(timeout_value, timeouts)) {
                 messageTimeOut(timeout_value*10000);
                 /*pauseFade(obj.elements.messageBox);*/
             } else {
                 console.log(timeout_value + " - Invalid timeout value :  Permitted values - " + timeouts)
             }
          /*}  */ 
       }
    }
    
/*var pauseFade = function(elem){
                    elem.on('mouseover', function(){
                    $(this).stop().css('opacity', '1')
                  })
                }*/

var messageTimeOut = function(duration) {
                $('ul[message]').fadeOut(duration);
            }
  
var clear = function(){
                 $(this).remove();
                 if ($('ul[message] li').length == 0) {
                     obj.elements.messageBox.css('display' , 'none')
                 }
             }  

obj.methods.timeoutManager() 
obj.methods.getIcons()
obj.methods.getThemes(obj.elements.messageItem);
obj.elements.messageBox.removeClass('hide');
       
/*   } catch(err) {
       console.log(err.message)
}*/   
       
}())