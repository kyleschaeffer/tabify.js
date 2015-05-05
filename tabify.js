/*! tabify.js v1.0 | MIT License | https://github.com/oldrivercreative/wptabify.js */
(function($){
    $.fn.tabify = function(options){
        
        // settings
        var settings = $.extend(true, {}, {
            selector: this.selector,
            disabled: $('#MSOLayout_InDesignMode').val() == 0 ? false : true,
            panel: '.ms-webpartzone-cell',
            container: '.ms-webpart-zone',
            title: 'h2.ms-webpart-titleText:eq(0)',
            cssclass: 'ui-tabs',
            oninit: false,
            onchange: false,
            destroy: false
        }, options);
        
        // wptabify
        this.each(function(){
            
            // get objects
            var panel = $(this).closest(settings.panel);
            var container = part.closest(settings.container);
            
            // destroy?
            if(settings.destroy){
                container.trigger('tabs-destroy');
            }
            
            // create
            else {
                
                // init
                container.on('tabs-init', function(){

                    // add classes
                    container.addClass(settings.cssclass);
                    
                    // tabs
                    var ul = $('<ul class="' + settings.cssclass + '-nav" />');
                    
                    // create tabs
                    zone.children(settings.partselector).each(function(i){
                        
                        // get cell
                        var cell = $(this);
                        
                        // not tabify cell?
                        if(cell.find(settings.selector).size() == 0){
                            
                            // id
                            var id = 'wp-section' + i;
                            cell.attr('id', id);
                            
                            // title
                            var titletext = 'No title';
                            var title = cell.find(settings.titleselector);
                            
                            // found title
                            if(title.size() > 0){
                                titletext = title.text();
                            }
                            
                            // create link
                            ul.append('<li><a href="#' + id + '">' + titletext + '</a></li>');
                            
                        }
                        
                    });
                    
                    // add tabs
                    container.prepend(ul);
                    
                    // oninit?
                    if(typeof(settings.oninit) == 'function'){
                        settings.oninit();
                    }

                });
                
                // destroy
                container.on('tabs-destroy', function(){
                    
                    // remove classes
                    container.removeClass(settings.cssclass);
                    
                    // remove ids
                    container.find(settings.panel).removeAttr('id');
                    
                    // remove tabs
                    container.children('ul.ui-tabs').remove();
                    
                });

                // not in design mode?
                if(settings.editmode){
                    
                    // init
                    zone.trigger('tabs-init');
                    
                }
                
            }

        });
        
        // done
        return this;
        
    };
}(jQuery));
